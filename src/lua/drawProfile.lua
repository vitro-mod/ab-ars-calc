local function countLength(path, startIndex, endIndex)
    local length = 0
    for i = startIndex, endIndex - 1 do
        local start = path[i]
        local fin = path[i + 1]
        local startFlat = Vector(start.x, start.y)
        local finFlat = Vector(fin.x, fin.y)
        length = length + (finFlat - startFlat):Length() * 0.01905 -- Convert to meters
    end
    return length
end

local paths = Metrostroi.GetTrackPaths()
if not paths then return end
local path = paths[4]
local LocalCurvatureThreshold = 0.000063
local lastMode = "straight"
local lastVertMode = "flat"
local startIndex = 1
local plan = {}
local planElement = {
    startIndex = startIndex,
    elementType = lastMode
}

local startProfileIndex = 1
local profile = {}
local profileElement = {
    startIndex = startProfileIndex,
    elementType = lastVertMode
}

for k, v in pairs(path) do
    if k < 3 then continue end
    local start = path[k - 2]
    local fin = path[k - 1]
    local dir = path[k]
    local startFlat = Vector(start.x, start.y)
    local finFlat = Vector(fin.x, fin.y)
    local dirFlat = Vector(dir.x, dir.y)
    local startZ = start.z
    local finZ = fin.z
    local dirZ = dir.z
    local directionInit = finFlat - startFlat
    local directionNew = dirFlat - finFlat
    local directionInitLen = directionInit:Length()
    local directionNewLen = directionNew:Length()
    local i1 = (finZ - startZ) / directionInitLen
    local i2 = (dirZ - finZ) / directionNewLen
    local dir1 = directionInit:GetNormalized()
    local dir2 = directionNew:GetNormalized()
    local angleCos = dir2:Dot(dir1)
    local angleRad = math.acos(math.Clamp(angleCos, -1, 1))
    local angle = math.deg(angleRad)
    local cross = dir1.x * dir2.y - dir1.y * dir2.x
    local localCurvature = angleRad / (dirFlat - finFlat):Length()
    local isCurve = localCurvature > LocalCurvatureThreshold
    local isVertCurve = math.abs(i2 - i1) > 0.005
    local isRight = cross < 0
    if isRight then angle = -angle end
    local mode = Either(isCurve, Either(isRight, "right", "left"), "straight")
    local vertMode = Either(isVertCurve, Either((i2 - i1) > 0, "up", "down"), "flat")
    if mode == "right" and lastMode == "left" then mode = "straight" end
    if mode == "left" and lastMode == "right" then mode = "straight" end
    -- if vertMode == "up" and lastVertMode == "down" then vertMode = "flat" end
    -- if vertMode == "down" and lastVertMode == "up" then vertMode = "flat" end
    if mode ~= "straight" and lastMode == "straight" then
        planElement.endIndex = k - 2
        if planElement.startIndex ~= planElement.endIndex then table.insert(plan, planElement) end
        planElement = {}
        planElement.startIndex = k - 2
        planElement.elementType = mode
    end

    if mode == "straight" and lastMode ~= "straight" then
        planElement.endIndex = k - 1
        planElement.radius = math.abs(planElement.curveLen / planElement.angle)
        if planElement.startIndex ~= planElement.endIndex then table.insert(plan, planElement) end
        planElement = {}
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

    if vertMode ~= "flat" and lastVertMode == "flat" then
        profileElement.endIndex = k - 2
        profileElement.slope = math.Round((path[profileElement.endIndex].z - path[profileElement.startIndex].z) * 0.01905 / profileElement.length, 3)
        if profileElement.startIndex ~= profileElement.endIndex then table.insert(profile, profileElement) end
        profileElement = {}
        profileElement.startIndex = k - 2
        profileElement.elementType = vertMode
    end

    if vertMode == "flat" and lastVertMode ~= "flat" then
        profileElement.endIndex = k - 1
        if profileElement.startIndex ~= profileElement.endIndex then table.insert(profile, profileElement) end
        profileElement = {}
        profileElement.startIndex = k - 1
        profileElement.elementType = vertMode
    end

    profileElement.length = profileElement.length or 0
    profileElement.length = profileElement.length + directionInit:Length() * 0.01905 -- Convert to meters
    if k == #path then
        planElement.endIndex = k
        if planElement.startIndex ~= planElement.endIndex then table.insert(plan, planElement) end
        if mode == "straight" and lastMode == "straight" then
            planElement.length = planElement.length or 0
            planElement.length = planElement.length + directionNew:Length() * 0.01905 -- Convert to meters
        end

        profileElement.endIndex = k
        if profileElement.startIndex ~= profileElement.endIndex then table.insert(profile, profileElement) end
        if vertMode == "flat" and lastVertMode == "flat" then
            profileElement.length = profileElement.length or 0
            profileElement.length = profileElement.length + directionNew:Length() * 0.01905 -- Convert to meters
        end
    end

    lastMode = mode
    lastVertMode = vertMode
end

-- PrintTable(plan)
-- PrintTable(profile)
filteredProfile = {}
lastFlat = 1
for k, elem in pairs(profile) do
    if elem.elementType == "flat" and k > 1 then
        if not elem.slope then continue end
        if math.abs(elem.slope - profile[lastFlat].slope) < 0.003 then
            filteredProfile[profile[lastFlat].startIndex] = {
                elementType = elem.elementType,
                startIndex = profile[lastFlat].startIndex,
                endIndex = elem.endIndex,
                length = countLength(path, profile[lastFlat].startIndex, elem.endIndex),
                slope = math.Round((path[elem.endIndex].z - path[profile[lastFlat].startIndex].z) * 0.01905 / countLength(path, profile[lastFlat].startIndex, elem.endIndex), 3)
            }
        else
            filteredProfile[elem.startIndex] = elem
        end

        lastFlat = k
    end
end

-- filteredProfile2 = {}
-- for k, elem in pairs(filteredProfile) do
--     if k == 1 then continue end
--     if not elem.slope then continue end
--     if math.abs(elem.slope - filteredProfile[k - 1].slope) < 0.003 then
--         filteredProfile2[filteredProfile[k - 1].startIndex] = {
--             elementType = elem.elementType,
--             startIndex = filteredProfile[k - 1].startIndex,
--             endIndex = elem.endIndex,
--             length = countLength(path, filteredProfile[k - 1].startIndex, elem.endIndex),
--             slope = math.Round((path[elem.endIndex].z - path[filteredProfile[k - 1].startIndex].z) * 0.01905 / countLength(path, filteredProfile[k - 1].startIndex, elem.endIndex), 3)
--         }
--     else
--         filteredProfile2[elem.startIndex] = elem
--     end
-- end

PrintTable(filteredProfile)
-- profile = filteredProfile
-- Draw the track elements
local StraightColor = Color(255, 0, 0)
local RightColor = Color(255, 255, 0)
local LeftColor = Color(0, 255, 0)
local EdgeColor = Color(0, 0, 255)
local EdgeColor2 = Color(255, 0, 255)
hook.Remove("PostDrawTranslucentRenderables", "vitromod_trackeditor_draw")
hook.Add("PostDrawTranslucentRenderables", "vitromod_trackeditor_draw", function()
    -- for k, elem in pairs(plan) do
    --     local color = Either(elem.elementType ~= "straight", Either(elem.elementType == "right", RightColor, LeftColor), StraightColor)
    --     for i = elem.startIndex, elem.endIndex - 1 do
    --         local start = path[i]
    --         local fin = path[i + 1]
    --         render.DrawLine(start, fin, color, true)
    --     end
    -- end
    for k, elem in pairs(profile) do
        local color = Either(elem.elementType ~= "flat", Either(elem.elementType == "down", RightColor, LeftColor), StraightColor)
        for i = elem.startIndex, elem.endIndex - 1 do
            local start = path[i]
            local fin = path[i + 1]
            render.DrawLine(start, fin, color, true)
        end
    end
end)