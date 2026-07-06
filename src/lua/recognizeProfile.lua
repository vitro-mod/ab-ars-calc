local function getPlan(path)
    local LocalCurvatureThreshold = 0.000063
    local lastMode = "straight"
    local plan = {}
    local startIndex = 1
    local ordinate = 0
    local planElement = {
        ordinate = 0,
        startIndex = startIndex,
        elementType = lastMode
    }

    for k, v in pairs(path) do
        if k < 3 then continue end
        local start = path[k - 2]
        local fin = path[k - 1]
        local dir = path[k]
        local startFlat = Vector(start.x, start.y)
        local finFlat = Vector(fin.x, fin.y)
        local dirFlat = Vector(dir.x, dir.y)
        local directionInit = finFlat - startFlat
        local directionNew = dirFlat - finFlat
        local dir1 = directionInit:GetNormalized()
        local dir2 = directionNew:GetNormalized()
        local angleCos = dir2:Dot(dir1)
        local angleRad = math.acos(math.Clamp(angleCos, -1, 1))
        local angle = math.deg(angleRad)
        local cross = dir1.x * dir2.y - dir1.y * dir2.x
        local localCurvature = angleRad / (dirFlat - finFlat):Length()
        local isCurve = localCurvature > LocalCurvatureThreshold
        local isRight = cross < 0
        if isRight then angle = -angle end
        local mode = Either(isCurve, Either(isRight, "right", "left"), "straight")
        if mode == "right" and lastMode == "left" then mode = "straight" end
        if mode == "left" and lastMode == "right" then mode = "straight" end
        if mode ~= "straight" and lastMode == "straight" then
            planElement.endIndex = k - 2
            if planElement.length then ordinate = ordinate + planElement.length end
            if planElement.startIndex ~= planElement.endIndex then table.insert(plan, planElement) end
            planElement = {}
            planElement.ordinate = ordinate
            planElement.startIndex = k - 2
            planElement.elementType = mode
        end

        if mode == "straight" and lastMode ~= "straight" then
            planElement.curveLen = planElement.curveLen or 0
            planElement.curveLen = planElement.curveLen + directionInit:Length() * 0.01905 -- Convert to meters
            planElement.endIndex = k - 1
            planElement.radius = math.abs(planElement.curveLen / planElement.angle)
            ordinate = ordinate + planElement.curveLen
            if planElement.startIndex ~= planElement.endIndex then table.insert(plan, planElement) end
            planElement = {}
            planElement.ordinate = ordinate
            planElement.startIndex = k - 1
            planElement.elementType = mode
        end

        if mode == "straight" and lastMode == "straight" then
            planElement.length = planElement.length or 0
            planElement.length = planElement.length + directionInit:Length() * 0.01905 -- Convert to meters
        end

        if mode ~= "straight" then
            planElement.angle = planElement.angle or 0
            planElement.angle = planElement.angle + angleRad
            planElement.angleDeg = planElement.angleDeg or 0
            planElement.angleDeg = planElement.angleDeg + angle
            planElement.curveLen = planElement.curveLen or 0
            planElement.curveLen = planElement.curveLen + directionInit:Length() * 0.01905 -- Convert to meters
        end

        if k == #path then
            planElement.endIndex = k
            if planElement.startIndex ~= planElement.endIndex then table.insert(plan, planElement) end
            if mode == "straight" and lastMode == "straight" then
                planElement.length = planElement.length or 0
                planElement.length = planElement.length + directionNew:Length() * 0.01905 -- Convert to meters
            end
        end

        lastMode = mode
    end
    return plan
end

local function getProfile(path)
    local step = 11
    ------------------------------------------------------------------
    -- 1-й проход – строим profile как плотный массив
    ------------------------------------------------------------------
    local profile = {}
    local segIndex = 1 -- свой счётчик, независимый от path-индексов
    for i = 1, #path, step do
        local len = 0
        for k = i, i + step - 1 do
            if not path[k + 1] then break end
            local a, b = Vector(path[k].x, path[k].y), Vector(path[k + 1].x, path[k + 1].y)
            len = len + (b - a):Length()
        end

        local ending = (i + step <= #path) and (i + step) or #path
        local A, B = path[i].z, path[ending].z
        local slope = math.Round((B - A) / len, 3)
        profile[segIndex] = {
            -- !!! segIndex, а не i
            startIndex = i,
            endIndex = ending,
            slope = slope,
            length = len * 0.01905, -- если нужно в метрах
        }

        segIndex = segIndex + 1
    end

    ------------------------------------------------------------------
    -- 2-й проход – склеиваем похожие участки
    ------------------------------------------------------------------
    local filteredProfile = {}
    -- инициализируем текущую группу первым элементом
    local curStart = profile[1].startIndex
    local curEnd = profile[1].endIndex
    local accLen = profile[1].length
    local accSlope = profile[1].slope
    local ordinate = 0
    local groupCount = 1
    for idx = 2, #profile do
        local p = profile[idx]
        if math.abs(p.slope - accSlope / groupCount) <= 0.003 then
            -- похожий уклон: продолжаем копить
            curEnd = p.endIndex
            accLen = accLen + p.length
            accSlope = accSlope + p.slope
            groupCount = groupCount + 1
        else
            -- уклон «скакнул» – закрываем предыдущую группу
            table.insert(filteredProfile, {
                startIndex = curStart,
                endIndex = curEnd,
                slope = math.Round(accSlope / groupCount, 3),
                length = accLen,
                ordinate = ordinate,
            })

            ordinate = ordinate + accLen
            -- начинаем новую
            curStart = p.startIndex
            curEnd = p.endIndex
            accLen = p.length
            accSlope = p.slope
            groupCount = 1
        end
    end

    -- не забываем финальную группу
    table.insert(filteredProfile, {
        startIndex = curStart,
        endIndex = curEnd,
        slope = math.Round(accSlope / groupCount, 3),
        length = accLen,
        ordinate = ordinate,
    })
    return filteredProfile
end

local function generatePlanProfile(trackNum)
    trackNum = tonumber(trackNum) or 1

    local paths = Metrostroi.GetTrackPaths()
    if not paths then
        print("[plan_profile] Metrostroi.GetTrackPaths() returned nil")
        return
    end

    local trackPath = paths[trackNum]
    if not trackPath then
        print(string.format("[plan_profile] Track %d not found", trackNum))
        return
    end

    local plan = getPlan(trackPath)
    local profile = getProfile(trackPath)
    local map = game.GetMap()

    if not file.Exists("metrostroi_data", "DATA") then
        file.CreateDir("metrostroi_data")
    end

    local planFileName = string.format("metrostroi_data/plan_%s_%d.json", map, trackNum)
    local profFileName = string.format("metrostroi_data/prof_%s_%d.json", map, trackNum)

    file.Write(planFileName, util.TableToJSON(plan, true))
    file.Write(profFileName, util.TableToJSON(profile, true))

    print(string.format("[plan_profile] Saved plan to %s", planFileName))
    print(string.format("[plan_profile] Saved profile to %s", profFileName))
end

concommand.Add("plan_profile", function(ply, cmd, args, argStr)
    local argTrack = args and args[1]
    if not argTrack then
        print("[plan_profile] Usage: plan_profile <trackNum>  (default 1)")
    end
    generatePlanProfile(argTrack)
end)