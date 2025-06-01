local paths = Metrostroi.GetTrackPaths()
if not paths then return end
local trackPath = paths[14]
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

local function drawPlan(path, plan, StraightColor, RightColor, LeftColor)
    for k, elem in pairs(plan) do
        local color = Either(elem.elementType ~= "straight", Either(elem.elementType == "right", RightColor, LeftColor), StraightColor)
        for i = elem.startIndex, elem.endIndex - 1 do
            local start = trackPath[i]
            local fin = trackPath[i + 1]
            render.DrawLine(start, fin, color, true)
        end
    end
end

local plan = getPlan(trackPath)
PrintTable(plan)
-- Draw the track elements
local StraightColor = Color(255, 0, 0)
local RightColor = Color(255, 255, 0)
local LeftColor = Color(0, 255, 0)
hook.Remove("PostDrawTranslucentRenderables", "vitromod_trackeditor_draw")
hook.Add("PostDrawTranslucentRenderables", "vitromod_trackeditor_draw", function() drawPlan(trackPath, plan, StraightColor, RightColor, LeftColor) end)