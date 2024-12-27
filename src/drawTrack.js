function drawPeregon() {

    let group = two.makeGroup();

    let plan = drawPlan();
    let slopes = drawSlopes();
    let track = drawTrack();

    return group.add(plan, slopes, track);
}

function findAutostop(signalI, ind) {
    if (!peregon.signals[signalI]) return false;
    if (!(ind in peregon.signals[signalI])) return false;

    if (peregon.signals[signalI][ind].includes('NEXT'))
        return findAutostop(signalI + 1, peregon.signals[signalI][ind].split('_')[1]);

    return peregon.signals[signalI].autostop ? peregon.signals[signalI].autostop : 0;
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

    nameText = two.makeText(name, offsetX + (isBack ? x + name.length * 10 + 5 : x) * K , textY, { alignment: isBack ? 'right' : 'left' });
    group.add(two.makeLine(offsetX + x * K, signalY - half, offsetX + x * K, signalY + half));
    group.add(two.makeLine(offsetX + x * K - half, signalY - half, offsetX + x * K, signalY - half));
    group.add(two.makeLine(offsetX + x * K - half, signalY + half, offsetX + x * K, signalY + half));
    group.add(two.makeLine(offsetX + x * K, signalY, offsetX + x * K + half * 2, signalY));

    let reversedFormula = formula.split('').reverse().join('');
    for (let i = formula.length - 1; i >= 0; i--) {
        drawLense(isBack ? (offsetX + x * K) - diam * (i + 2) : (offsetX + x * K) + diam * i, reversedFormula[i]);
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

function drawJoints() {
    let group = two.makeGroup();

    for (let i = 0; i < peregon.joints.length; i++) {

        let x = peregon.joints[i].x;
        let joint;

        if (!peregon.joints[i].point) {
            joint = drawJoint(x);
        }
        else {
            joint = drawPoint(x);
        }

        if (peregon.joints[i].vks) {
            let { v, l, s } = vks(i);
            drawRay(x + l);
            let vf = Math.floor(V(x + trainHalf));
            let y = vf;
            let vksText1 = two.makeText(`Vф=${vf}км/ч`, offsetX + (x + l) * K + 4, graphY - y * Ky, { size: 10, alignment: 'left' });
            let vksText2 = two.makeText(`Vр=${v}км/ч`, offsetX + (x + l) * K + 4, graphY + 12 - y * Ky, { size: 10, alignment: 'left' });
            let vksText3 = two.makeText(`S=${l.toFixed(2)}+${s.toFixed(2)}=${Math.floor((l + s + 1.38))}`, offsetX + (x + l) * K + 4, graphY + 24 - y * Ky, { size: 10, alignment: 'left' });
            let vksDash = two.makeLine(offsetX + (x + l) * K, graphY, offsetX + (x + l) * K, 0);
            vksDash.dashes = [Ky, Ky];
            peregon.joints[i].vksLength = l;
        }

        if (i == peregon.joints.length - 1) continue;

        let leng = peregon.joints[i + 1].x - peregon.joints[i].x;
        let half = leng / 2;
        let text = two.makeText(peregon.joints[i].name, offsetX + (x + half) * K, trackY - 8);
        let code = two.makeText(arsCode(peregon.joints[i]), offsetX + (x + half) * K, graphY - 5, { size: 10 });
        let lengText = two.makeText(`${leng % 1 > 0.05 ? leng.toFixed(1) : Math.floor(leng)} м.`, offsetX + (x + half) * K, trackY + 8, { size: 10 });

        let dash = two.makeLine(offsetX + x * K, graphY, offsetX + x * K, 0);
        dash.dashes = [Ky, Ky];

        group.add(joint, text, lengText, dash);

        let arsS = peregon.joints[i].arsCalc;

        if (arsS) {
            for (let k = 0; k < arsS.length; k++) {
                let { jointI, nextJointX, nextJointI, v, sObj } = arsS[k];
                if (k < arsS.length - 1 && arsS[k + 1].nextJointI == arsS[k].nextJointI || arsS[k].nextJointI - i <= 0 || !i) continue;

                let y;
                let breakPoint = peregon.arsDrawBreakpoint || 12;
                if (nextJointI < breakPoint)
                    y = (graphY - 7.5 * nextJointI * Ky - 95 * Ky)
                else
                    y = (graphY - 7.5 * (nextJointI - breakPoint + 1) * Ky);

                let factLength = (nextJointX - x) % 1 > 0.05 ? (nextJointX - x).toFixed(1) : Math.floor((nextJointX - x));

                let tTransmit = T(nextJointX + trainHalf);
                let tReceive = T(peregon.joints[i - 1].x - trainHalf) + interval;
                let fars = Math.trunc(tReceive - tTransmit);

                arrow(offsetX + x * K, y, offsetX + nextJointX * K, y);
                two.makeCircle(offsetX + x * K, y, 1.5).fill = '#000';
                two.makeText(`${v}`, offsetX + x * K - 3, y - 6, { alignment: 'right' });
                let farsText = false;
                if (arsS[k].nextJointI != peregon.joints[i + 1].arsCalc[k].nextJointI) {
                    two.makeText(`${sObj.p}+${sObj.epk}+${sObj.r}=${sObj.full}`, offsetX + x * K + 6, y + 6, { size: 8, alignment: 'left' });
                    farsText = two.makeText(!isNaN(fars) ? `${factLength} Ф=${fars}с.` : `${factLength}`, offsetX + x * K + 6, y - 6, { size: 10, alignment: 'left' });
                } else if (!isNaN(fars)) {
                    farsText = two.makeText(`Ф=${fars}с.`, offsetX + x * K + 6, y + 6, { size: 10, alignment: 'left' });
                }

                const prevVI = arsSteps.indexOf(v);
                if (farsText && arsSteps[prevVI ? prevVI - 1 : prevVI] < Math.round(peregon.joints[i].vMax)) {
                    if (fars < 15) {
                        farsText.fill = 'orange';
                    }
                    if (fars < 5) {
                        farsText.fill = 'red';
                    }
                }
            }
        }
    }

    return group;
}

function drawRay(x) {

    let point = two.makeCircle(offsetX + x * K, trackY + 5, 2);
    let arrow = two.makeLine(offsetX + x * K, trackY - 3, offsetX + x * K + 3, trackY - 13);
    let arrow1 = two.makeLine(offsetX + x * K, trackY - 9, offsetX + x * K, trackY - 3);
    let arrow2 = two.makeLine(offsetX + x * K + 3.5, trackY - 8, offsetX + x * K, trackY - 3);

    let group = two.makeGroup(point, arrow, arrow1, arrow2);
    group.className = 'ray';
    return group;
}

function drawPoint(x) {

    let point = two.makeCircle(offsetX + x * K, trackY, 2.5);
    point.fill = '#000';

    let group = two.makeGroup(point);
    group.className = 'point';
    return group;
}

function drawJoint(x) {

    let joint = two.makeLine(offsetX + x * K, trackY - 3, offsetX + x * K, trackY + 3);
    let bottom = two.makeLine(offsetX + x * K - 3, trackY + 3, offsetX + x * K + 3, trackY + 3);
    let top = two.makeLine(offsetX + x * K - 3, trackY - 3, offsetX + x * K + 3, trackY - 3);

    let group = two.makeGroup(joint, bottom, top);
    group.className = 'joint';
    return group;
}

function drawTrack() {
    return two.makeLine(0, trackY, trackLength * K, trackY);
}

function drawSlopes() {

    let group = two.makeGroup();

    for (let i = 0; i < Object.keys(slopes).length; i++) {
        let el = Object.keys(slopes)[i];
        let arr = Object.keys(slopes);

        let start = Number(el);
        let end = (i < arr.length - 1) ? Number(Object.keys(slopes)[i + 1]) : trackLength;

        group.add(drawSlope(start, end, slopes[el]));
    }

    return group;
}

function drawSlope(x0, xk, slope) {

    let leng = xk - x0;
    let halfH = 15;

    let slopeRect, slopeLine, slopeText, lengthText;
    slopeRect = two.makeRectangle(x0 * K + leng * K / 2, slopesY, leng * K, halfH * 2);
    slopeRect.fill = '#00000000';

    if (slope > 0) {
        slopeLine = two.makeLine(x0 * K, slopesY + halfH, xk * K, slopesY - halfH);
        lengthText = two.makeText(leng, xk * K - 10, slopesY + 5, { alignment: 'right' });
        slopeText = two.makeText(Math.abs(slope), x0 * K + 10, slopesY - 5, { alignment: 'left' });
    }
    else if (slope < 0) {
        slopeLine = two.makeLine(x0 * K, slopesY - halfH, xk * K, slopesY + halfH);
        lengthText = two.makeText(leng, x0 * K + 10, slopesY + 5, { alignment: 'left' });
        slopeText = two.makeText(Math.abs(slope), xk * K - 10, slopesY - 5, { alignment: 'right' });
    }
    else {
        slopeLine = two.makeLine(x0 * K, slopesY, xk * K, slopesY);
        lengthText = two.makeText(leng, (x0 + leng / 2) * K, slopesY + 8);
        slopeText = two.makeText(Math.abs(slope), (x0 + leng / 2) * K, slopesY - 7);
    }

    return two.makeGroup(slopeRect, slopeLine, slopeText, lengthText);
}

function drawPlan() {

    let group = two.makeGroup();

    for (let i = 0; i < Object.keys(curves).length; i++) {
        let el = Object.keys(curves)[i];
        let arr = Object.keys(curves);

        let start = Number(el);
        let end = (i < arr.length - 1) ? Number(Object.keys(curves)[i + 1]) : trackLength;

        if (!curves[el]) {
            group.add(drawStraight(start, end));
        }
        else {
            group.add(drawCurve(start, end, curves[el]));
        }
    }

    return group;
}

function drawStraight(x0, xk) {

    let leng = xk - x0;
    let line = two.makeLine(x0 * K, curvesY, xk * K, curvesY);
    let text = two.makeText(`Пр. ${xk - x0} м.`, (x0 + leng / 2) * K, curvesY - 15);

    return two.makeGroup(line, text);
}

function drawCurve(x0, xk, r = 1) {

    let leng = xk - x0;
    let isLeft = r < 0;
    let h = 25;
    let half = h / 2;
    let lineY = curvesY + (isLeft ? half : -half);

    let line = two.makeLine(x0 * K + half, lineY, xk * K - half, lineY);
    let arc1 = two.makeArcSegment(x0 * K + half, curvesY, half, half, Math.PI, (isLeft ? 1 : 3) * Math.PI / 2, 16);
    let arc2 = two.makeArcSegment(xk * K - half, curvesY, half, half, (isLeft ? 1 : -1) * Math.PI / 2, 0, 16);
    let text = two.makeText(`Р${Math.abs(r)} К${leng}`, (x0 + leng / 2) * K, curvesY);

    return two.makeGroup(line, arc1, arc2, text);
}

function drawSwitches() {
    if (!peregon.switches) return;
    for (let i = 0; i < peregon.switches.length; i++) {
        drawSwitch(peregon.switches[i]);
    }
}

function drawSwitch(switchObj) {
    const x = offsetX + switchObj.x * K;
    const y = curvesY;
    const left = switchObj.left;
    const trailing = switchObj.trailing;

    const line = two.makeLine(x, y, trailing ? x - 40 : x + 40, left ? y - 15 : y + 15);
    const triangle = two.makePath(x, y, trailing ? x - 15 : x + 15, left ? y - 5.5 : y + 5.5, trailing ? x - 15 : x + 15, y);
    triangle.fill = '#000';
    const name = two.makeText(`${switchObj.name}`, trailing ? x - 35 : x + 35, left ? y - 5 : y + 7, { size: 12 });

    return two.makeGroup(line, triangle, name);
}