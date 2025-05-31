const query = Object.fromEntries(document.location.search.slice(1).split('&').map(el => el.split('=')));

const colors = {
    red: '#f33',
    yellow: '#fd0',
    green: '#0c6',
    blue: '#0af',
};

const peregon = lines[query.line][query.track][Number(query.n) || 0];
const nextPeregon = lines[query.line][query.track][Number(query.n) + 1 || 1];
const prevPeregon = lines[query.line][query.track][Number(query.n) - 1];

loadPeregon(peregon);
const peregonCalc = tractionCalc();

const K = 1;
const Ky = K * 3;

const KKy = K * Ky;

const offsetX = 110;

const axisV = offsetX - 40;
const axisT = offsetX - 80;

const jointLength = peregon.joints?.[peregon.joints.length - 1]?.x ?? 0;

const two = new Two({
    width: (jointLength > trackLength ? jointLength : trackLength) * K + offsetX * 2,
    height: (peregonCalc[peregonCalc.length - 1].Tk + peregon.tStay + interval) * Ky + 270
}).appendTo(document.body);

const curvesWidth = 2;
const curvesY = two.height - 15;
const slopesWidth = 2;
const slopesY = two.height - 60;
const trackWidth = 2;
const trackY = two.height - 130;
const graphWidth = 2;
const graphY = two.height - 190;

drawAxes();

drawPeregon().position.x = offsetX;

setTimeout(() => {
    drawVelocity(peregonCalc, trainHalf).position.x = offsetX;
    two.update();
}, 0);

setTimeout(() => {
    drawTime(peregonCalc, trainHalf).position.x = offsetX;
    two.update();
}, 0);

setTimeout(() => {
    drawTime(peregonCalc, -trainHalf).position.x = offsetX;
    two.update();
}, 0);

setTimeout(() => {
    drawTime(peregonCalc, trainHalf, interval).position.x = offsetX;
    two.update();
}, 0);

const prevLeng = trackLength;
const prevTime = peregonCalc[peregonCalc.length - 1].Tk;

loadPeregon(nextPeregon);
const nextPeregonCalc = tractionCalc();

drawPeregon().position.x = offsetX + prevLeng * K;

setTimeout(() => {
    drawVelocity(nextPeregonCalc, prevLeng - trainHalf).position.x = offsetX;
    two.update();
}, 0);

setTimeout(() => {
    drawTime(nextPeregonCalc, prevLeng - trainHalf, prevTime).position.x = offsetX;
    two.update();
}, 0);

loadPeregon(peregon);

peregonConcat = concatPeregon();

drawModes();

calcArs();

drawJoints();
drawSignals();
drawSwitches();

two.update();

setupSignalEvents();

// let trackLength, tStay, curves, slopes, modes, stepNum;

function concatPeregon() {
    let nextPeregonCopy = JSON.parse(JSON.stringify(nextPeregonCalc));
    let nextPeregonOffset = peregonCalc[peregonCalc.length - 1].Sk;
    let nextPeregonTimeOffset = peregonCalc[peregonCalc.length - 1].Tk;
    for (let i = 0; i < nextPeregonCopy.length; i++) {
        nextPeregonCopy[i].Sn += nextPeregonOffset;
        nextPeregonCopy[i].Sk += nextPeregonOffset;
        nextPeregonCopy[i].Tn += nextPeregonTimeOffset;
        nextPeregonCopy[i].Tk += nextPeregonTimeOffset;
    }
    return peregonCalc.concat(nextPeregonCopy);
}

function loadPeregon(peregon) {
    ({ trackLength, tStay, curves, slopes, modes } = peregon);
    stepNum = Math.round(trackLength / stepLength);
    KS = peregon.K || 1;
}
