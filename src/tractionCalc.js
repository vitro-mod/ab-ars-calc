class TractionCalculator {

    setPeregon(peregon) {
        this.peregon = peregon;
    }

    setPeregonConcat(peregonConcat) {
        this.peregonConcat = peregonConcat;
    }

    calc(stepNum) {
        let tractionCalc = [];

        for (let i = 0; i < stepNum; i++) {

            let Sn = stepLength * i;
            let Vn = i > 0 ? tractionCalc[i - 1].Vk : 0;
            let f = F(this.peregon, Sn, Vn);
            let v2 = (Vn / 3.6 * Vn / 3.6 + 2 * stepLength * f / 111.6);
            let Vk = v2 > 0 ? Math.sqrt(v2) * 3.6 : 0;
            let Tn = i > 0 ? tractionCalc[i - 1].Tk : 0;
            let dT = Math.abs(31 * (Vk - Vn) / f);
            let Tk = Tn + dT;
            let Et = i > 0 ? tractionCalc[i - 1].Et + dT : 0;

            tractionCalc[i] = {
                Sn: Sn,
                Sk: Sn + stepLength,
                Vn: Vn,
                Vk: Vk,
                Et: Et,
                Tn: Tn,
                dT: dT,
                Tk: Tk
            };
        }

        tractionCalc[stepNum] = [];
        tractionCalc[stepNum].Sn = tractionCalc[stepNum - 1].Sk;
        tractionCalc[stepNum].Sk = tractionCalc[stepNum - 1].Sk;
        tractionCalc[stepNum].Vn = tractionCalc[stepNum - 1].Vk;
        tractionCalc[stepNum].Vk = 0;
        tractionCalc[stepNum].Tn = tractionCalc[stepNum - 1].Tk;
        tractionCalc[stepNum].Tk = tractionCalc[stepNum - 1].Tk + this.peregon.tStay;
        tractionCalc[stepNum].Et = tractionCalc[stepNum - 1].Et + tractionCalc[stepNum - 1].dT;
        tractionCalc[stepNum].dT = this.peregon.tStay;

        return tractionCalc;
    }

    brakeCalc(xStop, a = 1.1 / KS, maxLength) {
        let brakeCalc = [];

        let vi = Math.round((xStop) / stepLength);
        let lastDv = 90;

        let Vk = 0;
        for (let i = 0; Vk <= 80; i++) {

            let Sn = -stepLength * i + xStop;
            let Sk = Sn - stepLength;
            let Vn = i > 0 ? brakeCalc[i - 1].Vk : 0;
            let v2 = (Vn / 3.6 * Vn / 3.6 + 2 * stepLength * -Ft(this.peregon, Sn, a) / 111.6);
            Vk = v2 > 0 ? Math.sqrt(v2) * 3.6 : 0;

            // console.log(Math.abs(peregonCalc[vi].Vn - Vn), lastDv, vi)

            if (Math.abs(this.peregonConcat[vi - i].Vn - Vn) >= lastDv) break;
            lastDv = Math.abs(this.peregonConcat[vi - i].Vn - Vn);

            if (maxLength && xStop - Sn >= maxLength) break;

            brakeCalc[i] = {
                Sn: Sn,
                Sk: Sk,
                Vn: Vn,
                Vk: Vk
            }
        }

        return brakeCalc;
    }

    serviceBrakeCalc(xStop, vEnd) {
        let tillIntersection = !vEnd;
        let vK = vEnd || 90;
        let brakeCalc = [];

        let vi = Math.round((xStop) / stepLength);
        let lastDv = 90;

        let Vk = 0;
        for (let i = 0; Vk <= vK; i++) {

            let Sn = -stepLength * i + xStop;
            let Sk = Sn - stepLength;
            let Vn = i > 0 ? brakeCalc[i - 1].Vk : 0;
            let v2 = (Vn / 3.6 * Vn / 3.6 + 2 * stepLength * -Ft(this.peregon, Sn) / 111.6);
            Vk = v2 > 0 ? Math.sqrt(v2) * 3.6 : 0;

            // console.log(Math.abs(peregonCalc[vi].Vn - Vn), lastDv, vi)

            if (!this.peregonConcat[vi - i]) {
                console.warn('No peregonConcat at index', vi - i);
                return false;
            }

            if (tillIntersection && Math.abs(this.peregonConcat[vi - i].Vn - Vn) >= lastDv) break;
            lastDv = Math.abs(this.peregonConcat[vi - i].Vn - Vn);


            brakeCalc[i] = {
                Sn: Sn,
                Sk: Sk,
                Vn: Vn,
                Vk: Vk
            }
        }

        return brakeCalc;
    }

    V(x) {
        for (let i = 0; i < this.peregonConcat.length; i++) {
            if (x >= this.peregonConcat[i].Sn && x <= this.peregonConcat[i].Sk) {
                let dS = this.peregonConcat[i].Sk - this.peregonConcat[i].Sn;
                let dV = this.peregonConcat[i].Vk - this.peregonConcat[i].Vn;
                let dX = x - this.peregonConcat[i].Sn;
                let d = dX / dS;
                return this.peregonConcat[i].Vn + d * dV;
            }
        }
    }

    T(x) {
        for (let i = 0; i < this.peregonConcat.length; i++) {
            if (x >= this.peregonConcat[i].Sn && x <= this.peregonConcat[i].Sk) {
                let dS = this.peregonConcat[i].Sk - this.peregonConcat[i].Sn;
                let dT = this.peregonConcat[i].Tk - this.peregonConcat[i].Tn;
                let dX = x - this.peregonConcat[i].Sn;
                let d = dX / dS;
                return this.peregonConcat[i].Tn + d * dT;
            }
        }
    }
}
