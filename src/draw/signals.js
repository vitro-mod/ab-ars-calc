class DrawSignals extends Draw {
    
    constructor(two, peregon, offsetX, K, Ky) {
        super(two, peregon, offsetX, K, Ky);
        this.colors = {
            red: '#f33',
            yellow: '#fd0',
            green: '#0c6',
            blue: '#0af',
        };
    }

    findAutostop(signalI, ind) {
        if (!this.peregon.signals[signalI]) return false;
        if (!(ind in this.peregon.signals[signalI])) return false;

        if (this.peregon.signals[signalI][ind].includes('NEXT'))
            return this.findAutostop(signalI + 1, this.peregon.signals[signalI][ind].split('_')[1]);

        return this.peregon.signals[signalI].autostop ? this.peregon.signals[signalI].autostop : 0;
    }

    drawAutostop(x, isClosed, isBack = false) {

        const signalY = this.trackY + (isBack ? -20 : 20);
        const signalX = this.x(x);

        const group = this.two.makeGroup();

        const foot = this.two.makeLine(signalX, signalY + 4, signalX, signalY - 4);
        const leg = this.two.makeLine(signalX, signalY, signalX + (isBack ? -10 : 10), signalY);
        const arm = this.two.makeLine(signalX + (isBack ? -10 : 10), signalY, signalX + (isBack ? (isClosed ? -10 : -14) : (isClosed ? 10 : 14)), signalY - (isBack ? (isClosed ? -9 : -8) : (isClosed ? 9 : 8))).linewidth = 3;

        group.add(foot, leg, arm);
    }

    drawSignal(x, formula = 'x', name, isLeft, isBack, row = 0) {

        let group = this.two.makeGroup();

        const radius = 6;
        const diam = radius * 2;
        const half = isBack ? -radius / 2 : radius / 2;

        let signalY = isLeft ? this.trackY - radius * 5 : this.trackY + radius * 5;
        signalY += isLeft ? row * diam * 1.5 : -row * diam * 1.5;

        const textY = isLeft ? (isBack ? signalY + 1 : (signalY - radius * 2.5)) : (isBack ? signalY + 1 : (signalY + radius * 2.5));

        const nameText = this.two.makeText(name, this.x(isBack ? x + name.length * 10 + 5 : x), textY, { alignment: isBack ? 'right' : 'left' });
        group.add(this.two.makeLine(this.x(x), signalY - half, this.x(x), signalY + half));
        group.add(this.two.makeLine(this.x(x) - half, signalY - half, this.x(x), signalY - half));
        group.add(this.two.makeLine(this.x(x) - half, signalY + half, this.x(x), signalY + half));
        group.add(this.two.makeLine(this.x(x), signalY, this.x(x) + half * 2, signalY));

        let reversedFormula = formula.split('').reverse().join('');
        for (let i = formula.length - 1; i >= 0; i--) {
            const lenseX = isBack ? (this.x(x)) - diam * (i + 2) : (this.x(x)) + diam * i;
            const lense = this.drawLense(lenseX, reversedFormula[i], diam, radius, signalY, half);
            group.add(lense);
        }
        group.className = 'signal';
        group.id = name;
        return group;
    }

    drawLense(x, letter, diam, radius, signalY, half) {
        const group = this.two.makeGroup();

        if (letter == '-') {
            group.add(this.two.makeLine(x + diam - radius, signalY, x + diam + radius, signalY));
            return;
        }
        switch (letter) {
            case 'b':
            case 'y':
            case 'g':
            case 'r':
            case 'w':
                group.add(this.two.makeLine(x + diam - radius, signalY - radius, x + diam + radius, signalY + radius));
                group.add(this.two.makeLine(x + diam - radius, signalY + radius, x + diam + radius, signalY - radius));
                break;
        }
        let lense = this.two.makeCircle(x + diam, signalY, radius);
        group.add(lense);
        switch (letter.toUpperCase()) {
            case 'B':
                lense.fill = this.colors.blue;
                break;
            case 'Y':
                lense.fill = this.colors.yellow;
                break;
            case 'G':
                lense.fill = this.colors.green;
                break;
            case 'R':
                lense.fill = this.colors.red;
                break;
            case 'W':
                lense.fill = "white";
                let lenseInner = this.two.makeCircle(x + diam, signalY, half);
                break;
            case 'Z':
                this.two.makeLine(x + radius, signalY, x + radius * 3, signalY);
                this.two.makeLine(x + radius * 2, signalY + radius, x + radius * 2, signalY - radius);
                break;
            default:
                lense.fill = "#00000000";
        }

        return group;
    }

    drawSignals() {

        let group = this.two.makeGroup();

        for (let i = 0; i < this.peregon.signals.length; i++) {

            const signal = this.peregon.signals[i];

            let x = signal.x;
            let lenses = signal.lenses;
            let name = signal.name;
            let isLeft = signal.left;
            let isBack = signal.back;
            let row = signal.row;
            if ('joint' in signal) {
                let joint = signal.joint;
                x = this.peregon.joints[this.peregon.joints.map(el => el.name).indexOf(joint)].x;
            }
            this.drawSignal(x, lenses, name, isLeft, isBack, row);

            let autostop = signal.autostop ? signal.autostop : 0;
            let shift = signal.shift ? signal.shift : 0;
            if (autostop) this.drawAutostop(x - shift, !name[0].match(/[0-9]/), isBack);


            let tR = this.tractionCalculator.T(x - trainHalf);
            let tTop = tR + interval;

            let tPermit = 0;
            let xPermit = 0;
            let xPermitFull = 0;
            let tG = tTop;

            if (signal.y || signal.yg || signal.g) {

                let redLine = this.two.makeLine(this.x(x), this.graphY - tR * this.Ky, this.x(x), this.graphY - tTop * this.Ky);
                redLine.linewidth = 6;
                redLine.stroke = 'red';


                if (this.findIndicationX(i, 'y')) {
                    let xJ = this.findIndicationX(i, 'y') + trainHalf;
                    let t = this.tractionCalculator.T(xJ) + this.findAutostop(i, 'y');
                    let tS = this.tractionCalculator.T(xJ);
                    tPermit = t;
                    xPermit = xJ;
                    xPermitFull = this.findIndicationX(i, 'y', true) + trainHalf;

                    let indLine = this.two.makeLine(this.x(x), this.graphY - t * this.Ky, this.x(x), this.graphY - tTop * this.Ky);
                    indLine.linewidth = 6;
                    indLine.stroke = this.colors.yellow;
                }
                if (this.findIndicationX(i, 'yg')) {
                    let xJ = this.findIndicationX(i, 'yg') + trainHalf;
                    let t = this.tractionCalculator.T(xJ) + this.findAutostop(i, 'yg');
                    if (!tPermit) tPermit = t;
                    if (!xPermit) xPermit = xJ;
                    if (!xPermitFull) xPermitFull = this.findIndicationX(i, 'yg', true) + trainHalf;

                    let indLine = this.two.makeLine(this.x(x), this.graphY - t * this.Ky, this.x(x), this.graphY - tTop * this.Ky);
                    indLine.linewidth = 6;
                    indLine.stroke = this.colors.yellow;
                    let indLine2 = this.two.makeLine(this.x(x), this.graphY - t * this.Ky, this.x(x), this.graphY - tTop * this.Ky);
                    indLine2.linewidth = 6;
                    indLine2.stroke = this.colors.green;
                    indLine2.dashes = [this.Ky, this.Ky];

                }
                if (this.findIndicationX(i, 'g')) {
                    let xJ = this.findIndicationX(i, 'g') + trainHalf;
                    let t = this.tractionCalculator.T(xJ) + this.findAutostop(i, 'g');
                    if (!tPermit) tPermit = t;
                    if (!xPermit) xPermit = xJ;
                    if (!xPermitFull) xPermitFull = this.findIndicationX(i, 'g', true) + trainHalf;
                    tG = t;
                    // this.two.makeLine(this.x(x), this.graphY - t * this.Ky, this.x(xJ - trainHalf), this.graphY - t * this.Ky).stroke = '#000088';
                    let indLine = this.two.makeLine(this.x(x), this.graphY - t * this.Ky, this.x(x), this.graphY - tTop * this.Ky);
                    indLine.linewidth = 6;
                    indLine.stroke = this.colors.green;
                }

                signal.tPermit = tPermit;
                signal.xPermit = xPermit;
                signal.xPermitFull = xPermitFull;

                let tsPermit = tPermit - autostop;

                let horisontals = [];
                horisontals.push(this.two.makeLine(this.x(x) + 9, this.graphY - tsPermit * this.Ky, this.x(xPermit - trainHalf), this.graphY - tsPermit * this.Ky));
                horisontals.push(this.two.makeLine(this.x(x) + 3, this.graphY - tPermit * this.Ky, this.x(x) + 9 + 6, this.graphY - tPermit * this.Ky));
                horisontals.push(this.two.makeLine(this.x(x) + 9, this.graphY - tPermit * this.Ky, this.x(x) + 9, this.graphY - tsPermit * this.Ky));
                horisontals.push(this.two.makeLine(this.x(x) + 9 + 6, this.graphY - tPermit * this.Ky, this.x(x) + 9 + 6, this.graphY - tsPermit * this.Ky));

                let brakeCurve = this.tractionCalculator.serviceBrakeCalc(x - trainHalf);
                let brakeLength = brakeCurve[0].Sn - brakeCurve[brakeCurve.length - 1].Sk;
                let brakeX = brakeCurve[brakeCurve.length - 1].Sk;
                let brakeV = brakeCurve[brakeCurve.length - 1].Vk;
                let brakeT = this.tractionCalculator.T(brakeX) + interval - 2;
                if (brakeV < 20) brakeT = interval - 2;
                if (brakeV < 20) brakeX = 0;

                if (brakeV >= 20) {
                    this.drawArrow(this.x(brakeX + trainHalf), this.graphY - brakeT * this.Ky, this.x(x), this.graphY - brakeT * this.Ky).stroke = '#000088';
                    this.two.makeLine(this.x(brakeX + trainHalf), this.graphY - brakeT * this.Ky, this.x(brakeX + trainHalf), this.graphY - (brakeT + 2) * this.Ky).stroke = '#000088';
                    this.two.makeText(`${Math.floor(brakeV)}`, this.x(brakeX + trainHalf), this.graphY - brakeT * this.Ky + 6, { size: 10, alignment: 'right' });
                    this.two.makeText(`${Math.floor(brakeLength)}`, this.x(x) - 15, this.graphY - brakeT * this.Ky + 6, { size: 10, alignment: 'right' });
                }

                this.two.makeText(`Фаб=${Math.floor(brakeT - tPermit)}с. З=${Math.floor(tTop - tG)}с.`, this.x(x), this.graphY - tTop * this.Ky - 10, { size: 10 });
            }

            let guardV = signal.guard;
            let guardPerX = Number(stepFnNext(this.peregon.slopes, x - shift - trainHalf));
            let guardUklon = stepFn(this.peregon.slopes, x - shift - trainHalf);
            let guardNextUklon = stepFn(this.peregon.slopes, guardPerX + 1);
            let guardS = sPTE(guardV, guardUklon, guardNextUklon, guardPerX - x + trainHalf);

            let guardArrowY = 7 * i + 155;

            let prevXPermit = this.peregon.signals[i - 1] ? this.peregon.signals[i - 1].xPermitFull - trainHalf : this.peregon.joints[1].x;
            prevXPermit = prevXPermit.toFixed(1);
            let guardFullS = (prevXPermit - x) % 1 > 0.05 ? (prevXPermit - x).toFixed(1) : Math.floor(prevXPermit - x);

            let guardText = this.two.makeGroup();

            if (i && signal.guard) {
                guardText.add(this.drawArrow(this.x(x - shift), this.graphY - guardArrowY * this.Ky, this.x(prevXPermit), this.graphY - guardArrowY * this.Ky));
                let guardDot = this.two.makeCircle(this.x(x - shift), this.graphY - guardArrowY * this.Ky, 1.5, 4);
                guardDot.fill = '#000';
                guardText.add(guardDot);
                guardText.add(this.two.makeText(`${Math.floor(guardV)}`, this.x(x - shift) - 3, this.graphY - guardArrowY * this.Ky - 6, { size: 10, alignment: 'right' }));
                guardText.add(this.two.makeText(`${Math.ceil(guardS)}`, this.x(prevXPermit) - 15, this.graphY - guardArrowY * this.Ky + 6, { size: 10, alignment: 'right' }));

                let fullGuard = shift ? `${shift}+${guardFullS}=${Number(guardFullS) + Number(shift)}` : `${guardFullS}`;
                let fullGuardLeng = Number(guardFullS) + Number(shift);
                guardText.add(this.two.makeText(fullGuard, this.x(prevXPermit) - 15, this.graphY - guardArrowY * this.Ky - 6, { size: 10, alignment: 'right' }));

                if (fullGuardLeng < guardS) guardText.stroke = 'red';
            }

            if (signal.service) {
                const serviceV = signal.service;
                const servicePerX = Number(stepFnNext(this.peregon.slopes, x - trainHalf));
                const serviceUklon = stepFn(this.peregon.slopes, x - trainHalf);
                const serviceNextUklon = stepFn(this.peregon.slopes, servicePerX + 1);
                const serviceS = sPTE(serviceV, serviceUklon, serviceNextUklon, servicePerX - x + trainHalf) * 1.15;

                const nextSignalX = this.peregon.joints[this.peregon.joints.map(el => el.name).indexOf(this.peregon.signals[i + 1].joint)].x;
                const serviceFullS = (nextSignalX - x) % 1 > 0.05 ? (nextSignalX - x).toFixed(1) : Math.floor(nextSignalX - x);

                const serviceArrowY = 7 * i + 200;

                const serviceText = this.two.makeGroup();
                const serviceArrow = this.drawArrow(this.x(x), this.graphY - serviceArrowY * this.Ky, this.x(nextSignalX), this.graphY - serviceArrowY * this.Ky);
                const serviceDot = this.two.makeCircle(this.x(x), this.graphY - serviceArrowY * this.Ky, 1.5, 4);
                const serviceVText = this.two.makeText(`${Math.floor(serviceV)}`, this.x(x) - 3, this.graphY - serviceArrowY * this.Ky - 6, { size: 10, alignment: 'right' });
                const serviceSText = this.two.makeText(`${Math.ceil(serviceS)}`, this.x(nextSignalX) - 15, this.graphY - serviceArrowY * this.Ky + 6, { size: 10, alignment: 'right' });
                const serviceFullSText = this.two.makeText(serviceFullS, this.x(nextSignalX) - 15, this.graphY - serviceArrowY * this.Ky - 6, { size: 10, alignment: 'right' });

                serviceArrow.stroke = '#008800';
                serviceDot.stroke = '#008800';

                serviceText.add(serviceArrow, serviceDot, serviceVText, serviceSText, serviceFullSText);
                if (serviceFullS < serviceS) {
                    serviceText.stroke = 'red';
                }
            }

            this.two.makeText(`Вид=${Math.floor(this.vis(x, isLeft))}м.`, this.x(x), this.graphY - tTop * this.Ky - 25, { size: 10 });
        }

        return group;
    }

    vis(x, isLeft) {

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

        let next = stepFnNext(this.peregon.curves, x);
        let lastPlan = Number(stepFnPrev(this.peregon.curves, x));
        if (Number(next) < x) lastPlan = Number(next);
        let shift = x - lastPlan;
        let radius = stepFn(this.peregon.curves, x) ? stepFn(this.peregon.curves, x) : this.peregon.curves[Object.keys(this.peregon.curves)[Object.keys(this.peregon.curves).indexOf(stepFnPrev(this.peregon.curves, x)) - 1]];
        let inCurve = stepFn(this.peregon.curves, x);
        let preStraight = 0;
        if (inCurve) {
            preStraight = Number(stepFnPrev(this.peregon.curves, x)) - Number(Object.keys(this.peregon.curves)[Object.keys(this.peregon.curves).indexOf(stepFnPrev(this.peregon.curves, x)) - 1])
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

    findIndicationX(signalI, ind, full) {

        if (!this.peregon.signals[signalI]) return false;
        if (!(ind in this.peregon.signals[signalI])) return false;

        if (this.peregon.signals[signalI][ind].includes('NEXT'))
            return this.findIndicationX(signalI + 1, this.peregon.signals[signalI][ind].split('_')[1], full);

        return this.findJointX(this.peregon.signals[signalI][ind], full);
    }

    findJointX(name, full) {

        let found = false;
        for (let joint of this.peregon.joints) {
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
}