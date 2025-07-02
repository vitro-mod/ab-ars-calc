class SignalCalculator {
    constructor(peregon, peregonConcat) {
        this.peregon = peregon;
        this.peregonConcat = peregonConcat;

        this.tractionCalculator = null;
        this.interval = Math.round(3600 / (this.peregon.interval || 40));
    }

    calc() {
        for (let i = 0; i < this.peregon.signals.length; i++) {
            const signal = this.peregon.signals[i];

            if ('joint' in signal) {
                let joint = signal.joint;
                signal.x = this.peregon.joints[this.peregon.joints.map(el => el.name).indexOf(joint)].x;
            }

            signal.calc = {};
            signal.calc.indications = {};

            const x = signal.x;

            const tR = this.tractionCalculator.T(x - trainHalf);
            const tTop = tR + this.interval;
            const tG = tTop;

            signal.calc.tR = tR;
            signal.calc.tTop = tTop;

            for (const abStep of abSteps) {
                if (!(abStep in signal)) continue;

                const xPermit = this.findIndicationX(i, abStep) + trainHalf;
                const tPermit = this.tractionCalculator.T(xPermit) + this.findAutostop(i, abStep);
                const xPermitFull = this.findIndicationX(i, abStep, true) + trainHalf;

                if (!signal.calc.tPermit) {
                    signal.calc.tPermit = tPermit;
                }

                if (!signal.calc.xPermit) {
                    signal.calc.xPermit = xPermit;
                }

                if (!signal.calc.xPermitFull) {
                    signal.calc.xPermitFull = xPermitFull;
                }

                const permitJointI = this.findJointI(signal[abStep]);

                signal.calc.indications[abStep] = { xPermit, tPermit, xPermitFull, permitJointI };
            }

            signal.calc.tsPermit = signal.calc.tPermit - signal.autostop;

            const brakeCurve = this.tractionCalculator.serviceBrakeCalc(x - trainHalf);
            const brakeLength = brakeCurve[0].Sn - brakeCurve[brakeCurve.length - 1].Sk;
            let brakeX = brakeCurve[brakeCurve.length - 1].Sk;
            let brakeV = brakeCurve[brakeCurve.length - 1].Vk;
            let brakeT = this.tractionCalculator.T(brakeX) + this.interval - 2;
            if (brakeV < 20) brakeT = this.interval - 2;
            if (brakeV < 20) brakeX = 0;

            signal.calc.brake = { brakeCurve, brakeLength, brakeX, brakeV, brakeT };
        }


        for (let i = 0; i < this.peregon.signals.length; i++) {

            const signal = this.peregon.signals[i];

            const jointI = this.findJointI(signal.joint);
            signal.calc.jointI = jointI;

            for (const abStep of abSteps) {
                if (!(abStep in signal)) continue;
                const indication = signal.calc.indications[abStep];
                if (indication.permitJointI !== -1) {
                    continue;
                }

                indication.permitJointI = this.findIndicationI(i, abStep);
            }

            
            let lastIndicationI = 0;
            signal.calc.sequence = [];
            const indications = signal.calc.indications;
            let firstIndication = null;
            for (const indication of Object.keys(indications)) {
                if (!firstIndication) {
                    firstIndication = indication;
                }
                const indicationI = indications[indication].permitJointI;
                const I = indicationI - jointI + 2;
                for (let j = 0; j < I - lastIndicationI; j++) {
                    signal.calc.sequence.push(firstIndication === indication && j < I - lastIndicationI - 1 ? (j === 0 ? 'r' : 'yr') : indication);
                }
                lastIndicationI = I;
            }

            const ygrIndex = signal.lenses.replaceAll('-', '').toUpperCase().indexOf('YGR');

            signal.calc.lightsArray = signal.calc.sequence.map((el) => {
                if (el === 'r') return `${ygrIndex + 3}`;
                if (el === 'yr') return `${ygrIndex + 1}${ygrIndex + 3}`;
                if (el === 'y') return `${ygrIndex}`;
                if (el === 'yg') return `${ygrIndex}${ygrIndex + 2}`;
                if (el === 'g') return `${ygrIndex + 2}`;
                return el;
            });

            signal.calc.lights = signal.calc.lightsArray.join('-');
        }
    }

    setTractionCalculator(tractionCalculator) {
        this.tractionCalculator = tractionCalculator;
    }

    findIndicationX(signalI, ind, full) {

        if (!this.peregon.signals[signalI]) return false;
        if (!(ind in this.peregon.signals[signalI])) return false;

        if (this.peregon.signals[signalI][ind].includes('NEXT'))
            return this.findIndicationX(signalI + 1, this.peregon.signals[signalI][ind].split('_')[1], full);

        if (this.peregon.signals[signalI][ind].includes('SECOND'))
            return this.findIndicationX(signalI + 2, this.peregon.signals[signalI][ind].split('_')[1], full);

        return this.findJointX(this.peregon.signals[signalI][ind], full);
    }

    findIndicationI(signalI, ind) {
        if (!this.peregon.signals[signalI]) return false;
        if (!(ind in this.peregon.signals[signalI])) return false;

        if (this.peregon.signals[signalI][ind].includes('NEXT'))
            return this.findIndicationI(signalI + 1, this.peregon.signals[signalI][ind].split('_')[1]);

        if (this.peregon.signals[signalI][ind].includes('SECOND'))
            return this.findIndicationI(signalI + 2, this.peregon.signals[signalI][ind].split('_')[1]);

        return this.findJointI(this.peregon.signals[signalI][ind]);
    }

    findJointX(name, full) {

        let found = false;
        for (let joint of this.peregon.joints) {
            if (found) {
                return joint.x;
            }
            if (joint.name == name) {
                found = true;
                if (joint?.vksCalc?.l && !full) return joint.x + joint.vksCalc.l;
            }
        }
        return false;
    }

    findJointI(name) {
        for (let i = 0; i < this.peregon.joints.length; i++) {
            if (this.peregon.joints[i].name == name) {
                return i;
            }
        }
        return -1;
    }

    findAutostop(signalI, ind) {
        if (!this.peregon.signals[signalI]) return false;
        if (!(ind in this.peregon.signals[signalI])) return false;

        if (this.peregon.signals[signalI][ind].includes('NEXT'))
            return this.findAutostop(signalI + 1, this.peregon.signals[signalI][ind].split('_')[1]);

        if (this.peregon.signals[signalI][ind].includes('SECOND'))
            return this.findAutostop(signalI + 2, this.peregon.signals[signalI][ind].split('_')[1]);

        return this.peregon.signals[signalI].autostop ? this.peregon.signals[signalI].autostop : 0;
    }
}
