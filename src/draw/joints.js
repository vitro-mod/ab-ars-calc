class DrawJoints extends Draw {

    drawJoints() {
        for (let i = 0; i < this.peregon.joints.length; i++) {
            const group = this.two.makeGroup();

            let x = this.peregon.joints[i].x;
            let joint;

            if (!this.peregon.joints[i].point) {
                joint = this.drawJoint(x);
            }
            else {
                joint = this.drawPoint(x);
            }

            if (this.peregon.joints[i].vks) {
                let { v, l, s } = vks(this.peregon, i);
                this.drawRay(x + l);
                let vf = Math.floor(this.tractionCalculator.V(x + trainHalf));
                let y = vf;
                let vksText1 = this.two.makeText(`Vф=${vf}км/ч`, this.offsetX + (x + l) * this.K + 4, this.graphY - y * this.Ky, { size: 10, alignment: 'left' });
                let vksText2 = this.two.makeText(`Vр=${v}км/ч`, this.offsetX + (x + l) * this.K + 4, this.graphY + 12 - y * this.Ky, { size: 10, alignment: 'left' });
                let vksText3 = this.two.makeText(`S=${l.toFixed(2)}+${s.toFixed(2)}=${Math.floor((l + s + 1.38))}`, this.offsetX + (x + l) * this.K + 4, this.graphY + 24 - y * this.Ky, { size: 10, alignment: 'left' });
                let vksDash = this.two.makeLine(this.offsetX + (x + l) * this.K, this.graphY, this.offsetX + (x + l) * this.K, 0);
                vksDash.dashes = [this.Ky, this.Ky];
                this.peregon.joints[i].vksLength = l;
            }

            if (i == this.peregon.joints.length - 1) continue;

            let leng = this.peregon.joints[i + 1].x - this.peregon.joints[i].x;
            let half = leng / 2;
            let text = this.two.makeText(this.peregon.joints[i].name, this.offsetX + (x + half) * this.K, this.trackY - 8);
            let code = this.two.makeText(arsCode(this.peregon.joints[i]), this.offsetX + (x + half) * this.K, this.graphY - 5, { size: 10 });
            let lengText = this.two.makeText(`${leng % 1 > 0.05 ? leng.toFixed(1) : Math.floor(leng)} м.`, this.offsetX + (x + half) * this.K, this.trackY + 8, { size: 10 });

            let dash = this.two.makeLine(this.offsetX + x * this.K, this.graphY, this.offsetX + x * this.K, 0);
            dash.dashes = [this.Ky, this.Ky];

            const textGroup = this.two.makeGroup();
            textGroup.add(text);
            textGroup.className = 'rcname';

            group.add(joint, textGroup, lengText, dash);

            let arsS = this.peregon.joints[i].arsCalc;

            if (!arsS) continue;
            for (let k = 0; k < arsS.length; k++) {
                let { jointI, nextJointX, nextJointI, v, sObj } = arsS[k];
                if (k < arsS.length - 1 && arsS[k + 1].nextJointI == arsS[k].nextJointI || arsS[k].nextJointI - i <= 0 || !i) continue;

                let y;
                let breakPoint = this.peregon.arsDrawBreakpoint || 12;
                if (nextJointI < breakPoint)
                    y = (this.graphY - 7.5 * nextJointI * this.Ky - 95 * this.Ky)
                else
                    y = (this.graphY - 7.5 * (nextJointI - breakPoint + 1) * this.Ky);

                let factLength = (nextJointX - x) % 1 > 0.05 ? (nextJointX - x).toFixed(1) : Math.floor((nextJointX - x));

                let tTransmit = this.tractionCalculator.T(nextJointX + trainHalf);
                let tReceive = this.tractionCalculator.T(this.peregon.joints[i - 1].x - trainHalf) + this.interval;
                let fars = Math.trunc(tReceive - tTransmit);

                this.drawArrow(this.offsetX + x * this.K, y, this.offsetX + nextJointX * this.K, y);
                this.two.makeCircle(this.offsetX + x * this.K, y, 1.5).fill = '#000';
                this.two.makeText(`${v}`, this.offsetX + x * this.K - 3, y - 6, { alignment: 'right' });
                let farsText = false;
                if (arsS[k].nextJointI != this.peregon.joints[i + 1].arsCalc[k].nextJointI) {
                    this.two.makeText(`${sObj.p}+${sObj.epk}+${sObj.r}=${sObj.full}`, this.offsetX + x * this.K + 6, y + 6, { size: 8, alignment: 'left' });
                    farsText = this.two.makeText(!isNaN(fars) ? `${factLength} Ф=${fars}с.` : `${factLength}`, this.offsetX + x * this.K + 6, y - 6, { size: 10, alignment: 'left' });
                } else if (!isNaN(fars)) {
                    farsText = this.two.makeText(`Ф=${fars}с.`, this.offsetX + x * this.K + 6, y + 6, { size: 10, alignment: 'left' });
                }

                const prevVI = arsSteps.indexOf(v);
                if (farsText && arsSteps[prevVI ? prevVI - 1 : prevVI] < Math.round(this.peregon.joints[i].vMax)) {
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

    drawJoint(x) {

        let joint = this.two.makeLine(this.offsetX + x * this.K, this.trackY - 3, this.offsetX + x * this.K, this.trackY + 3);
        let bottom = this.two.makeLine(this.offsetX + x * this.K - 3, this.trackY + 3, this.offsetX + x * this.K + 3, this.trackY + 3);
        let top = this.two.makeLine(this.offsetX + x * this.K - 3, this.trackY - 3, this.offsetX + x * this.K + 3, this.trackY - 3);

        let group = this.two.makeGroup(joint, bottom, top);
        group.className = 'joint';

        return group;
    }

    drawPoint(x) {

        let point = this.two.makeCircle(this.offsetX + x * this.K, this.trackY, 2.5);
        point.fill = '#000';

        let group = this.two.makeGroup(point);
        group.className = 'point';
        return group;
    }

    drawRay(x) {

        let point = this.two.makeCircle(this.offsetX + x * this.K, this.trackY + 5, 2);
        let arrow = this.two.makeLine(this.offsetX + x * this.K, this.trackY - 3, this.offsetX + x * this.K + 3, this.trackY - 13);
        let arrow1 = this.two.makeLine(this.offsetX + x * this.K, this.trackY - 9, this.offsetX + x * this.K, this.trackY - 3);
        let arrow2 = this.two.makeLine(this.offsetX + x * this.K + 3.5, this.trackY - 8, this.offsetX + x * this.K, this.trackY - 3);

        let group = this.two.makeGroup(point, arrow, arrow1, arrow2);
        group.className = 'ray';
        return group;
    }
}
