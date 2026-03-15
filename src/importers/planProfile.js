const METERS_FACTOR = 0.01905;

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function round(value, precision = 0) {
    const factor = 10 ** precision;
    return Math.round(value * factor) / factor;
}

function sub2D(a, b) {
    return {
        x: (a?.x ?? 0) - (b?.x ?? 0),
        y: (a?.y ?? 0) - (b?.y ?? 0),
    };
}

function length2D(v) {
    return Math.hypot(v?.x ?? 0, v?.y ?? 0);
}

function normalize2D(v) {
    const len = length2D(v);
    if (len === 0) return { x: 0, y: 0 };
    return {
        x: (v?.x ?? 0) / len,
        y: (v?.y ?? 0) / len,
    };
}

function dot2D(a, b) {
    return (a?.x ?? 0) * (b?.x ?? 0) + (a?.y ?? 0) * (b?.y ?? 0);
}

function getPlan(path) {
    const localCurvatureThreshold = 0.000063;
    let lastMode = "straight";
    const plan = [];
    let ordinate = 0;
    let planElement = {
        ordinate: 0,
        startIndex: 1,
        elementType: lastMode,
    };

    for (let k = 2; k < path.length; k++) {
        const start = path[k - 2];
        const fin = path[k - 1];
        const dir = path[k];

        const directionInit = sub2D(fin, start);
        const directionNew = sub2D(dir, fin);
        const dir1 = normalize2D(directionInit);
        const dir2 = normalize2D(directionNew);
        const angleCos = dot2D(dir2, dir1);
        const angleRad = Math.acos(clamp(angleCos, -1, 1));
        let angle = angleRad * (180 / Math.PI);
        const cross = dir1.x * dir2.y - dir1.y * dir2.x;
        const directionNewLength = length2D(directionNew);
        const localCurvature = directionNewLength === 0 ? 0 : angleRad / directionNewLength;
        const isCurve = localCurvature > localCurvatureThreshold;
        const isRight = cross < 0;

        if (isRight) angle = -angle;

        let mode = isCurve ? (isRight ? "right" : "left") : "straight";
        if (mode === "right" && lastMode === "left") mode = "straight";
        if (mode === "left" && lastMode === "right") mode = "straight";

        if (mode !== "straight" && lastMode === "straight") {
            planElement.endIndex = k - 1;
            if (planElement.length) ordinate += planElement.length;
            if (planElement.startIndex !== planElement.endIndex) plan.push(planElement);
            planElement = {
                ordinate,
                startIndex: k - 1,
                elementType: mode,
            };
        }

        if (mode === "straight" && lastMode !== "straight") {
            planElement.curveLen = (planElement.curveLen ?? 0) + length2D(directionInit) * METERS_FACTOR;
            planElement.endIndex = k;
            planElement.radius = Math.abs(planElement.curveLen / planElement.angle);
            ordinate += planElement.curveLen;
            if (planElement.startIndex !== planElement.endIndex) plan.push(planElement);
            planElement = {
                ordinate,
                startIndex: k,
                elementType: mode,
            };
        }

        if (mode === "straight" && lastMode === "straight") {
            planElement.length = (planElement.length ?? 0) + length2D(directionInit) * METERS_FACTOR;
        }

        if (mode !== "straight") {
            planElement.angle = (planElement.angle ?? 0) + angleRad;
            planElement.angleDeg = (planElement.angleDeg ?? 0) + angle;
            planElement.curveLen = (planElement.curveLen ?? 0) + length2D(directionInit) * METERS_FACTOR;
        }

        if (k === path.length - 1) {
            planElement.endIndex = k + 1;
            if (planElement.startIndex !== planElement.endIndex) plan.push(planElement);
            if (mode === "straight" && lastMode === "straight") {
                planElement.length = (planElement.length ?? 0) + length2D(directionNew) * METERS_FACTOR;
            }
        }

        lastMode = mode;
    }

    return plan;
}

function getProfile(path) {
    const step = 11;
    const profile = [];
    let segIndex = 0;

    for (let i = 0; i < path.length; i += step) {
        let len = 0;
        for (let k = i; k < i + step; k++) {
            if (!path[k + 1]) break;
            const direction = sub2D(path[k + 1], path[k]);
            len += length2D(direction);
        }

        const ending = i + step <= path.length - 1 ? i + step : path.length - 1;
        const A = path[i].z;
        const B = path[ending].z;
        const slope = round((B - A) / len, 3);

        profile[segIndex] = {
            startIndex: i + 1,
            endIndex: ending + 1,
            slope,
            length: len * METERS_FACTOR,
        };

        segIndex += 1;
    }

    if (profile.length === 0) return [];

    const filteredProfile = [];
    let curStart = profile[0].startIndex;
    let curEnd = profile[0].endIndex;
    let accLen = profile[0].length;
    let accSlope = profile[0].slope;
    let ordinate = 0;
    let groupCount = 1;

    for (let idx = 1; idx < profile.length; idx++) {
        const p = profile[idx];
        if (Math.abs(p.slope - accSlope / groupCount) <= 0.003) {
            curEnd = p.endIndex;
            accLen += p.length;
            accSlope += p.slope;
            groupCount += 1;
        } else {
            filteredProfile.push({
                startIndex: curStart,
                endIndex: curEnd,
                slope: round(accSlope / groupCount, 3),
                length: accLen,
                ordinate,
            });

            ordinate += accLen;
            curStart = p.startIndex;
            curEnd = p.endIndex;
            accLen = p.length;
            accSlope = p.slope;
            groupCount = 1;
        }
    }

    filteredProfile.push({
        startIndex: curStart,
        endIndex: curEnd,
        slope: round(accSlope / groupCount, 3),
        length: accLen,
        ordinate,
    });

    return filteredProfile;
}

async function getPlanProfileFromTrack(name, trackNum) {
    if (!name || !trackNum) {
        console.error("Track name and number must be provided");
        return null;
    }
    const trackRes = await fetch(`/data/metrostroi_data/track_${name}.txt`);
    const trackPaths = await trackRes.json();

    const paths = trackPaths.map(parseGmodVectors);

    if (!paths) return null;

    const trackIndex = Math.max(0, Number(trackNum) - 1);
    const trackPath = paths[trackIndex];
    if (!trackPath) return null;

    const plan = getPlan(trackPath);
    const prof = getProfile(trackPath);

    return { plan, prof };
}

// each entry is '[-293.579 2835.5242 1853.5847]' string, need to parse it into { x: -293.579, y: 2835.5242, z: 1853.5847 } object
function parseGmodVectors(track) {
    return track.map(entry => {
        const [x, y, z] = entry.slice(1, -1).split(' ').map(Number);
        return { x, y, z };
    });
}

const planProfileApi = {
    getPlanProfileFromTrack,
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = planProfileApi;
}

if (typeof globalThis !== "undefined") {
    globalThis.planProfile = planProfileApi;
}
