local paths = Metrostroi.GetTrackPaths()
if not paths then return end
local trackPath = paths[14]
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

local profile = getProfile(trackPath)
PrintTable(profile)