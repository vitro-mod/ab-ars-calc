class ArsCalculator {

    constructor(peregon, peregonConcat) {
        this.peregon = peregon;
        this.peregonConcat = peregonConcat;
    }

    calcArs() {
        for (let i = 0; i < this.peregon.joints.length; i++) {
            let x = this.peregon.joints[i].x;
            let arsS = arsSteps.map(el => {
                // console.log(this.peregon.joints[i].name, x, el, stepFn(this.peregon.slopes, x), stepFn(this.peregon.slopes, Number(stepFnNext(this.peregon.slopes, x)) + 1), Number(stepFnNext(this.peregon.slopes, x)) - x)
                let sObj = sArsObj(el, stepFn(this.peregon.slopes, x), stepFn(this.peregon.slopes, Number(stepFnNext(this.peregon.slopes, x)) + 1), Number(stepFnNext(this.peregon.slopes, x)) - x);

                let nextJoint = this.findNextJoint(x + sObj.full, i);
                let nextJointX = nextJoint.joint?.x || x + sObj.full;
                let nextJointI = nextJoint.i || i;
                let v = el;
                let jointI = i;
                if (this.peregon.joints[i].limit < el) nextJointI = 0;
                if (this.peregon.joints[i].later && this.peregon.joints[i].later[el]) {
                    nextJointI += this.peregon.joints[i].later[el];
                    nextJointX = this.peregon.joints[nextJointI].x;
                }
                else if (this.peregon.joints[i].later && this.peregon.joints[i].later[el] == 0) {
                    nextJointI = 0;
                }

                // if (i && this.peregon.arsAllSteps && nextJoint.i - i ==  )

                return { jointI, nextJointX, nextJointI, v, sObj };
            });

            this.peregon.joints[i].arsCalc = arsS;

            if (this.peregon.arsAllSteps) {
                arsS.forEach((el, ind, arr) => {
                    if (ind && el.nextJointI && el.nextJointI <= arr[ind - 1].nextJointI) {
                        el.nextJointI = arr[ind - 1].nextJointI + 1;
                        el.nextJointX = this.peregon.joints[el.nextJointI]?.x || el.nextJointX;
                    }
                });
            }
            if (i) {
                let beg = Math.round(this.peregon.joints[i - 1].x / stepLength);
                let end = Math.round(this.peregon.joints[i].x / stepLength);
                let max = Math.max(...this.peregonConcat.slice(beg, end).map(el => el.Vn));
                this.peregon.joints[i].vMax = max;
            }
        }
    }

    findNextJoint(x, i = 0) {
        let joint;
        for (i; i < this.peregon.joints.length; i++) {
            if (this.peregon.joints[i].x >= x) {
                joint = this.peregon.joints[i];
                break;
            }
        }
        return { joint, i };
    }
}