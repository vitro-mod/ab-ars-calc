async function importTrackPlanProfile(name, track, n, peregon, nextPeregon) {
    const paRes = await fetch(`/data/metrostroi_data/pa_${name}.txt`);
    const pa = await paRes.json();
    const paths = {}

    for (const marker of pa.markers) {
        paths[marker.PAStationPath] = paths[marker.PAStationPath] || [];
        paths[marker.PAStationPath].push({
            TrackX: marker.TrackX,
            TrackPath: marker.TrackPath,
            PAStationName: marker.PAStationName,
            Marker: marker,
        })
    }

    for (const path of Object.values(paths)) {
        path.sort((a, b) => {
            return a.TrackX - b.TrackX;
        });
    }

    const gmTrack = paths[track][0].TrackPath;
    const planRes = await fetch(`/data/metrostroi_data/plan_${name}_${gmTrack}.json`);
    const plan = await planRes.json();
    const profRes = await fetch(`/data/metrostroi_data/prof_${name}_${gmTrack}.json`);
    const prof = await profRes.json();
    // console.log(plan);
    console.log(prof);

    const trackLength1 = Math.round(paths[track][Number(n) + 1].TrackX - paths[track][Number(n)].TrackX);
    const trackLength2 = paths[track][Number(n) + 2] ? Math.round(paths[track][Number(n) + 2].TrackX - paths[track][Number(n) + 1].TrackX) : 300;
    peregon.trackLength = trackLength1;
    nextPeregon.trackLength = trackLength2;

    console.log(`Track length 1: ${trackLength1}`);
    console.log(`Track length 2: ${trackLength2}`);

    const station1X = paths[track][Number(n)].TrackX - trainHalf;
    const station2X = paths[track][Number(n) + 1].TrackX - trainHalf;
    const X3 = station1X + peregon.joints.at(-1).x;
    console.log(`Station 1X: ${station1X}`);
    console.log(`Station 2X: ${station2X}`);
    console.log(`X3: ${X3}`);

    const planBeginEnd = findBeginEnd(plan, station1X, station2X);
    const planBegin = planBeginEnd.begin;
    const planEnd = planBeginEnd.end;
    const peregonPlan = buildPeregonPlan(plan, planBegin, planEnd, station1X);
    peregon.curves = peregonPlan;

    const nextPlanBeginEnd = findBeginEnd(plan, station2X, X3);
    const nextPlanBegin = nextPlanBeginEnd.begin;
    const nextPlanEnd = nextPlanBeginEnd.end;
    const nextPeregonPlan = buildPeregonPlan(plan, nextPlanBegin, nextPlanEnd, station2X);
    nextPeregon.curves = nextPeregonPlan;

    const profBeginEnd = findBeginEnd(prof, station1X, station2X);
    const profBegin = profBeginEnd.begin;
    const profEnd = profBeginEnd.end;
    const peregonProf = buildPeregonProf(prof, profBegin, profEnd, station1X);
    peregon.slopes = peregonProf;

    const nextProfBeginEnd = findBeginEnd(prof, station2X, X3);
    const nextProfBegin = nextProfBeginEnd.begin;
    const nextProfEnd = nextProfBeginEnd.end;
    const nextPeregonProf = buildPeregonProf(prof, nextProfBegin, nextProfEnd, station2X);
    nextPeregon.slopes = nextPeregonProf;

    return paths[track];
}

function findBeginEnd(planOrProf, station1X, station2X) {
    let begin = null;
    let end = null;

    for (let i = 0; i < planOrProf.length; i++) {
        const planElement = planOrProf[i];
        if (begin == null && planElement.ordinate > station1X) {
            begin = i - 1;
        } else if (end == null && planElement.ordinate > station2X) {
            end = i - 1;
        }
    }

    if (begin == null) begin = planOrProf.length - 2;
    if (end == null) end = planOrProf.length - 1;

    return { begin, end };
}

function buildPeregonPlan(plan, begin, end, station1X) {
    const peregonPlan = {};
    for (let i = begin; i <= end; i++) {
        const x = Math.round(plan[i].ordinate - station1X > 0 ? plan[i].ordinate - station1X : 0);
        const radius = plan[i].elementType === 'straight' ? 0 : Math.round(plan[i].radius);
        const sign = plan[i].elementType === 'left' ? -1 : 1;
        peregonPlan[x] = radius * sign;
        // console.log(i, x, plan[i], plan[i].elementType, radius * sign);
    }
    return peregonPlan;
}

function buildPeregonProf(prof, begin, end, station1X) {
    const peregonProf = {};
    for (let i = begin; i <= end; i++) {
        const x = Math.round(prof[i].ordinate - station1X > 0 ? prof[i].ordinate - station1X : 0);
        const slope = Math.round(prof[i].slope * 1000);
        peregonProf[x] = slope;
        console.log(i, x, prof[i], slope);
    }
    return peregonProf;
}