class VksCalculator {

    constructor(peregon, peregonConcat) {
        this.peregon = peregon;
        this.peregonConcat = peregonConcat;
        this.tractionCalculator = null;
    }

    calc() {
        for (let i = 0; i < this.peregon.joints.length; i++) {
            const joint = this.peregon.joints[i];
            if (!joint?.vks) continue;
            const nextJoint = this.peregon.joints[i + 1];
            const x = joint.x;

            const vksLength = nextJoint.x - joint.x;
            const { v, l, s } = this.vks(x, vksLength);
            const vf = Math.floor(this.tractionCalculator.V(x + trainHalf));

            joint.vksCalc = { v, l, s, vf };
        }
    }

    vks(x, leng) {
        // let brakeCurve = brakeCalc(x + leng + trainHalf, 1.1, leng);
        // drawVelocity(brakeCurve, -trainHalf).position.x = offsetX;

        let { _modes, _slopes, _radius } = conditions(this.peregon, x);
        let a = 1 / (3.6 * 3.6 * 2 * (1.1 - (_slopes / 100)));
        let b = 0.247;
        let c = -leng - 1.38;

        let D = b * b - 4 * a * c;
        if (D < 0) return false;
        let v = Math.ceil((-b + Math.sqrt(D)) / (2 * a));
        let l = b * v - 1.38;
        let s = v * v * a;

        return { v, l, s };
    }

    setTractionCalculator(tractionCalculator) {
        this.tractionCalculator = tractionCalculator;
    }
}