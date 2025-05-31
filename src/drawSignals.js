function findAutostop(signalI, ind) {
    if (!peregon.signals[signalI]) return false;
    if (!(ind in peregon.signals[signalI])) return false;

    if (peregon.signals[signalI][ind].includes('NEXT'))
        return findAutostop(signalI + 1, peregon.signals[signalI][ind].split('_')[1]);

    return peregon.signals[signalI].autostop ? peregon.signals[signalI].autostop : 0;
}

function drawAutostop(x, isClosed) {

    const signalY = trackY + 20;

    two.makeLine(offsetX + x * K, signalY + 4, offsetX + x * K, signalY - 4);
    two.makeLine(offsetX + x * K, signalY, offsetX + x * K + 10, signalY);
    if (isClosed)
        two.makeLine(offsetX + x * K + 10, signalY, offsetX + x * K + 10, signalY - 9).linewidth = 3;
    else
        two.makeLine(offsetX + x * K + 10, signalY, offsetX + x * K + 14, signalY - 8).linewidth = 3;
}

function drawSignal(x, formula = 'x', name, isLeft, isBack, row = 0) {

    let group = two.makeGroup();

    const radius = 6;
    const diam = radius * 2;
    const half = isBack ? -radius / 2 : radius / 2;

    let signalY = isLeft ? trackY - radius * 5 : trackY + radius * 5;
    signalY += isLeft ? row * diam * 1.5 : -row * diam * 1.5;

    const textY = isLeft ? (isBack ? signalY + 1 : (signalY - radius * 2.5)) : (isBack ? signalY + 1 : (signalY + radius * 2.5));

    nameText = two.makeText(name, offsetX + (isBack ? x + name.length * 10 + 5 : x) * K, textY, { alignment: isBack ? 'right' : 'left' });
    group.add(two.makeLine(offsetX + x * K, signalY - half, offsetX + x * K, signalY + half));
    group.add(two.makeLine(offsetX + x * K - half, signalY - half, offsetX + x * K, signalY - half));
    group.add(two.makeLine(offsetX + x * K - half, signalY + half, offsetX + x * K, signalY + half));
    group.add(two.makeLine(offsetX + x * K, signalY, offsetX + x * K + half * 2, signalY));

    let reversedFormula = formula.split('').reverse().join('');
    for (let i = formula.length - 1; i >= 0; i--) {
        const lense = drawLense(isBack ? (offsetX + x * K) - diam * (i + 2) : (offsetX + x * K) + diam * i, reversedFormula[i]);
        group.add(lense);
    }
    group.className = 'signal';
    group.id = name;
    return group;

    function drawLense(x, letter) {
        const group = two.makeGroup();

        if (letter == '-') {
            group.add(two.makeLine(x + diam - radius, signalY, x + diam + radius, signalY));
            return;
        }
        switch (letter) {
            case 'b':
            case 'y':
            case 'g':
            case 'r':
            case 'w':
                group.add(two.makeLine(x + diam - radius, signalY - radius, x + diam + radius, signalY + radius));
                group.add(two.makeLine(x + diam - radius, signalY + radius, x + diam + radius, signalY - radius));
                break;
        }
        let lense = two.makeCircle(x + diam, signalY, radius);
        group.add(lense);
        switch (letter.toUpperCase()) {
            case 'B':
                lense.fill = colors.blue;
                break;
            case 'Y':
                lense.fill = colors.yellow;
                break;
            case 'G':
                lense.fill = colors.green;
                break;
            case 'R':
                lense.fill = colors.red;
                break;
            case 'W':
                lense.fill = "white";
                let lenseInner = two.makeCircle(x + diam, signalY, half);
                break;
            case 'Z':
                two.makeLine(x + radius, signalY, x + radius * 3, signalY);
                two.makeLine(x + radius * 2, signalY + radius, x + radius * 2, signalY - radius);
                break;
            default:
                lense.fill = "#00000000";
        }

        return group;
    }
}

function drawSignals() {
    let group = two.makeGroup();

    for (let i = 0; i < peregon.signals.length; i++) {

        let x = peregon.signals[i].x;
        let lenses = peregon.signals[i].lenses;
        let name = peregon.signals[i].name;
        let isLeft = peregon.signals[i].left;
        let isBack = peregon.signals[i].back;
        let row = peregon.signals[i].row;
        if ('joint' in peregon.signals[i]) {
            let joint = peregon.signals[i].joint;
            x = peregon.joints[peregon.joints.map(el => el.name).indexOf(joint)].x;
        }
        drawSignal(x, lenses, name, isLeft, isBack, row);

        let autostop = peregon.signals[i].autostop ? peregon.signals[i].autostop : 0;
        let shift = peregon.signals[i].shift ? peregon.signals[i].shift : 0;
        if (autostop) drawAutostop(x - shift, !name[0].match(/[0-9]/));


        let tR = T(x - trainHalf);
        let tTop = tR + interval;

        let tPermit = 0;
        let xPermit = 0;
        let xPermitFull = 0;
        let tG = tTop;

        if (peregon.signals[i].y || peregon.signals[i].yg || peregon.signals[i].g) {

            let redLine = two.makeLine(offsetX + x * K, graphY - tR * Ky, offsetX + x * K, graphY - tTop * Ky);
            redLine.linewidth = 6;
            redLine.stroke = 'red';


            if (findIndicationX(i, 'y')) {
                let xJ = findIndicationX(i, 'y') + trainHalf;
                let t = T(xJ) + findAutostop(i, 'y');
                let tS = T(xJ);
                tPermit = t;
                xPermit = xJ;
                xPermitFull = findIndicationX(i, 'y', true) + trainHalf;

                let indLine = two.makeLine(offsetX + x * K, graphY - t * Ky, offsetX + x * K, graphY - tTop * Ky);
                indLine.linewidth = 6;
                indLine.stroke = colors.yellow;
            }
            if (findIndicationX(i, 'yg')) {
                let xJ = findIndicationX(i, 'yg') + trainHalf;
                let t = T(xJ) + findAutostop(i, 'yg');
                if (!tPermit) tPermit = t;
                if (!xPermit) xPermit = xJ;
                if (!xPermitFull) xPermitFull = findIndicationX(i, 'yg', true) + trainHalf;

                let indLine = two.makeLine(offsetX + x * K, graphY - t * Ky, offsetX + x * K, graphY - tTop * Ky);
                indLine.linewidth = 6;
                indLine.stroke = colors.yellow;
                let indLine2 = two.makeLine(offsetX + x * K, graphY - t * Ky, offsetX + x * K, graphY - tTop * Ky);
                indLine2.linewidth = 6;
                indLine2.stroke = colors.green;
                indLine2.dashes = [Ky, Ky];

            }
            if (findIndicationX(i, 'g')) {
                let xJ = findIndicationX(i, 'g') + trainHalf;
                let t = T(xJ) + findAutostop(i, 'g');
                if (!tPermit) tPermit = t;
                if (!xPermit) xPermit = xJ;
                if (!xPermitFull) xPermitFull = findIndicationX(i, 'g', true) + trainHalf;
                tG = t;
                // two.makeLine(offsetX + x * K, graphY - t * Ky, offsetX + (xJ - trainHalf) * K, graphY - t * Ky).stroke = '#000088';
                let indLine = two.makeLine(offsetX + x * K, graphY - t * Ky, offsetX + x * K, graphY - tTop * Ky);
                indLine.linewidth = 6;
                indLine.stroke = colors.green;
            }

            peregon.signals[i].tPermit = tPermit;
            peregon.signals[i].xPermit = xPermit;
            peregon.signals[i].xPermitFull = xPermitFull;

            let tsPermit = tPermit - autostop;

            let horisontals = [];
            horisontals.push(two.makeLine(offsetX + x * K + 9, graphY - tsPermit * Ky, offsetX + (xPermit - trainHalf) * K, graphY - tsPermit * Ky));
            horisontals.push(two.makeLine(offsetX + x * K + 3, graphY - tPermit * Ky, offsetX + x * K + 9 + 6, graphY - tPermit * Ky));
            horisontals.push(two.makeLine(offsetX + x * K + 9, graphY - tPermit * Ky, offsetX + x * K + 9, graphY - tsPermit * Ky));
            horisontals.push(two.makeLine(offsetX + x * K + 9 + 6, graphY - tPermit * Ky, offsetX + x * K + 9 + 6, graphY - tsPermit * Ky));

            let brakeCurve = serviceBrakeCalc(x - trainHalf);
            let brakeLength = brakeCurve[0].Sn - brakeCurve[brakeCurve.length - 1].Sk;
            let brakeX = brakeCurve[brakeCurve.length - 1].Sk;
            let brakeV = brakeCurve[brakeCurve.length - 1].Vk;
            let brakeT = T(brakeX) + interval - 2;
            if (brakeV < 20) brakeT = interval - 2;
            if (brakeV < 20) brakeX = 0;

            if (brakeV >= 20) {
                arrow(offsetX + (brakeX + trainHalf) * K, graphY - brakeT * Ky, offsetX + x * K, graphY - brakeT * Ky).stroke = '#000088';
                two.makeLine(offsetX + (brakeX + trainHalf) * K, graphY - brakeT * Ky, offsetX + (brakeX + trainHalf) * K, graphY - (brakeT + 2) * Ky).stroke = '#000088';
                two.makeText(`${Math.floor(brakeV)}`, offsetX + (brakeX + trainHalf) * K, graphY - brakeT * Ky + 6, { size: 10, alignment: 'right' });
                two.makeText(`${Math.floor(brakeLength)}`, offsetX + x * K - 15, graphY - brakeT * Ky + 6, { size: 10, alignment: 'right' });
            }

            two.makeText(`Фаб=${Math.floor(brakeT - tPermit)}с. З=${Math.floor(tTop - tG)}с.`, offsetX + x * K, graphY - tTop * Ky - 10, { size: 10 });
        }

        let guardV = peregon.signals[i].guard;
        let guardPerX = Number(stepFnNext(slopes, x - shift - trainHalf));
        let guardUklon = stepFn(slopes, x - shift - trainHalf);
        let guardNextUklon = stepFn(slopes, guardPerX + 1);
        let guardS = sPTE(guardV, guardUklon, guardNextUklon, guardPerX - x + trainHalf);

        let guardArrowY = 7 * i + 155;

        let prevXPermit = peregon.signals[i - 1] ? peregon.signals[i - 1].xPermitFull - trainHalf : peregon.joints[1].x;
        prevXPermit = prevXPermit.toFixed(1);
        let guardFullS = (prevXPermit - x) % 1 > 0.05 ? (prevXPermit - x).toFixed(1) : Math.floor(prevXPermit - x);

        let guardText = two.makeGroup();

        if (i && peregon.signals[i].guard) {
            guardText.add(arrow(offsetX + (x - shift) * K, graphY - guardArrowY * Ky, offsetX + prevXPermit * K, graphY - guardArrowY * Ky));
            let guardDot = two.makeCircle(offsetX + (x - shift) * K, graphY - guardArrowY * Ky, 1.5, 4);
            guardDot.fill = '#000';
            guardText.add(guardDot);
            guardText.add(two.makeText(`${Math.floor(guardV)}`, offsetX + (x - shift) * K - 3, graphY - guardArrowY * Ky - 6, { size: 10, alignment: 'right' }));
            guardText.add(two.makeText(`${Math.ceil(guardS)}`, offsetX + prevXPermit * K - 15, graphY - guardArrowY * Ky + 6, { size: 10, alignment: 'right' }));

            let fullGuard = shift ? `${shift}+${guardFullS}=${Number(guardFullS) + Number(shift)}` : `${guardFullS}`;
            let fullGuardLeng = Number(guardFullS) + Number(shift);
            guardText.add(two.makeText(fullGuard, offsetX + prevXPermit * K - 15, graphY - guardArrowY * Ky - 6, { size: 10, alignment: 'right' }));

            if (fullGuardLeng < guardS) guardText.stroke = 'red';

        }

        two.makeText(`Вид=${Math.floor(vis(x, isLeft))}м.`, offsetX + x * K, graphY - tTop * Ky - 25, { size: 10 });
    }

    return group;
}


function vis(x, isLeft) {

    function visibilityAD(radius, isLeft) {

        radius = Math.abs(radius);
        let D = 5.1;
        let d = 0.6;
        let tunnelRadius = 0.5 * D;
        let OD = radius;
        let OA = radius - tunnelRadius;
        let OC = isLeft ? radius + tunnelRadius - d : radius - tunnelRadius + d;

        let AD = Math.sqrt(OD * OD - OA * OA);
        let AC = Math.sqrt(OC * OC - OA * OA);

        return AD;
    }
    function visibility(radius, isLeft) {

        radius = Math.abs(radius);
        let D = 5.1;
        let d = 0.6;
        let tunnelRadius = 0.5 * D;
        let OD = radius;
        let OA = radius - tunnelRadius;
        let OC = isLeft ? radius + tunnelRadius - d : radius - tunnelRadius + d;

        let AD = Math.sqrt(OD * OD - OA * OA);
        let AC = Math.sqrt(OC * OC - OA * OA);

        return AD + AC;
    }

    let next = stepFnNext(peregon.curves, x);
    let lastPlan = Number(stepFnPrev(peregon.curves, x));
    if (Number(next) < x) lastPlan = Number(next);
    let shift = x - lastPlan;
    let radius = stepFn(peregon.curves, x) ? stepFn(peregon.curves, x) : peregon.curves[Object.keys(peregon.curves)[Object.keys(peregon.curves).indexOf(stepFnPrev(peregon.curves, x)) - 1]];
    let inCurve = stepFn(peregon.curves, x);
    let preStraight = 0;
    if (inCurve) {
        preStraight = Number(stepFnPrev(peregon.curves, x)) - Number(Object.keys(peregon.curves)[Object.keys(peregon.curves).indexOf(stepFnPrev(peregon.curves, x)) - 1])
    }
    let opposite = (radius < 0 && !isLeft || radius > 0 && isLeft);
    let ad = visibilityAD(radius, opposite);
    let visFull = visibility(radius, opposite);
    let halfCurve = (ad - shift > 0 ? ad - shift : 0) + (shift - ad > 0 ? shift - ad : 0);
    if (!inCurve)
        return isNaN(halfCurve + visFull) ? shift : halfCurve + visFull;
    else
        return shift < ad ? ad + preStraight : visFull;
}

function findIndicationX(signalI, ind, full) {

    if (!peregon.signals[signalI]) return false;
    if (!(ind in peregon.signals[signalI])) return false;

    if (peregon.signals[signalI][ind].includes('NEXT'))
        return findIndicationX(signalI + 1, peregon.signals[signalI][ind].split('_')[1], full);

    return findJointX(peregon.signals[signalI][ind], full);
}

function findJointX(name, full) {

    let found = false;
    for (let joint of peregon.joints) {
        if (found) {
            return joint.x;
        }
        if (joint.name == name) {
            found = true;
            if (joint.vksLength && !full) return joint.x + joint.vksLength;
        }
    }
    return false;
}
