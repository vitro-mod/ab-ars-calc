R50_MODE = true

function getSignalTrackRerailTrace(trackID, x, isBack)
    local downVector = Vector(0, 0, -300)
    local pos, dir = Metrostroi.GetTrackPosition(Metrostroi.Paths[trackID], x)
    if not pos or not dir then
        print("Failed to get track position for trackID: ", trackID, " at x: ", x)
        return
    end
    local trace = util.TraceLine({
        start = pos,
        endpos = pos + downVector,
        mask = MASK_NPCWORLDSTATIC
    })

    local length = trace.HitPos:Distance(pos) * 2
    local playerPos = Either(isBack, pos + (dir * length), pos - (dir * length))
    local playerAim = (trace.HitPos - playerPos):GetNormalized()
    local rerailTrace = Metrostroi.RerailGetTrackData(trace.HitPos, playerAim)
    if not rerailTrace then
        print("Failed to rerail trace at position: ", trace.HitPos)
        return
    end
    return rerailTrace
end

function getWallTraceLength(trackID, x, isBack)
    local pos, dir = Metrostroi.GetTrackPosition(Metrostroi.Paths[trackID], x)
    local rightVector = Vector(300, 0, 0)
    local trace = util.TraceLine({
        start = pos + Vector(0, 0, -50),
        endpos = pos + rightVector,
        mask = bit.bor(CONTENTS_SOLID, CONTENTS_MOVEABLE, CONTENTS_MONSTER, CONTENTS_WINDOW, CONTENTS_DEBRIS, CONTENTS_GRATE, CONTENTS_AUX)
    })

    local length = trace.HitPos:Distance(pos)
    print(length)
    PrintTable(trace)
    return length, trace
end

function getSignalTrackPositionAngles(rerailTrace)
    if not rerailTrace then
        print("Rerail trace is nil")
        return
    end

    local position = rerailTrace.centerpos - rerailTrace.up * 9.5
    local angles = (-rerailTrace.right):Angle()
    return position, angles
end

function getAutostopTrackPositionAngles(rerailTrace)
    if not rerailTrace then
        print("Rerail trace is nil")
        return
    end

    local position = rerailTrace.centerpos
    local angles = rerailTrace.right:Angle()
    return position, angles
end

function placeSignal(position, angles, options)
    local ent = ents.Create("gmod_track_signal")
    ent:SetPos(position)
    ent:SetAngles(angles)
    ent:Spawn()
    ent.SignalType = options.SignalType
    ent.LensesStr = options.LensesStr
    ent.ARSOnly = options.ARSOnly
    ent.Name = options.Name
    ent.Left = options.Left
    ent.Double = options.Double
    ent.DoubleL = options.DoubleL
    ent.Left = options.Left
    ent.NonAutoStop = options.NonAutoStop
    ent.Routes = {
        {
            NextSignal = "*",
            ARSCodes = options.ARSCodes,
            Lights = options.Lights,
        },
    }

    if R50_MODE then
        ent.IsolateSwitches.FrontArsName = options.FrontArsName
    end

    if R50_MODE and options.Invisible then
        ent.IsolateSwitches.Invisible = true
        ent.IsolateSwitches.UnderHeadSign = true
        ent.IsolateSwitches.HeadsHeightOffset = -20
        ent.IsolateSwitches.HeadsXOffset = options.HeadsXOffset
        ent.IsolateSwitches.CenteredArsName = true
    end

    if R50_MODE and options.Back then
        ent.IsolateSwitches.HideDTM = true
    end

    if R50_MODE and options.SignalName then
        ent.IsolateSwitches.SignalName = options.SignalName
    end

    ent.Lenses = string.Explode("-", ent.LensesStr)
    ent:SendUpdate()
end

function placeAutostop(position, angles, options)
    local ent = ents.Create("gmod_scb_autostop")
    ent:SetPos(position)
    ent:SetAngles(angles)
    ent:SetName(options.Name or "")
    ent:SetNW2String("Name", options.Name or "")
    ent.config = {
        Type = "electric",
        SignalName = options.SignalName or "",
    }

    ent:Spawn()
end

function importSignalData(fileName, trackID)
    for k, v in pairs(ents.FindByClass("gmod_scb_autostop")) do
        local signal = v.Signal
        if signal and signal.TrackPosition and signal.TrackPosition.path.id == trackID then v:Remove() end
    end

    for k, v in pairs(ents.FindByClass("gmod_track_signal")) do
        if v.TrackPosition and v.TrackPosition.path.id == trackID then v:Remove() end
    end

    Metrostroi.UpdateSignalEntities()
    Metrostroi.PostSignalInitialize()
    local json = file.Read("metrostroi_data/calc/" .. fileName, "DATA")
    local signals = util.JSONToTable(json)
    for _, signal in pairs(signals) do
        local rerailTrace = getSignalTrackRerailTrace(trackID, signal.x, signal.Back or false)
        if not rerailTrace then
            print("Failed to get rerail trace for signal: ", signal.Name)
            continue
        end

        if R50_MODE and signal.IsAutostop then
            local position, angles = getAutostopTrackPositionAngles(rerailTrace)
            placeAutostop(position, angles, signal)
        else
            if signal.Invisible and not signal.HeadsXOffset then
                local wallLength, wallTrace = getWallTraceLength(trackID, signal.x, signal.Back or false)
                signal.HeadsXOffset = Either(wallTrace.Hit, wallLength - 154.25, 19)
            end

            local position, angles = getSignalTrackPositionAngles(rerailTrace)
            placeSignal(position, angles, signal)
        end
    end

    Metrostroi.UpdateSignalEntities()
    Metrostroi.PostSignalInitialize()
end

concommand.Add( "metrostroi_signal_import", function(ply, args)
    if IsValid(ply) and not ply:IsAdmin() then return end
    importSignalData(args[1], tonumber(args[2]))
end )

