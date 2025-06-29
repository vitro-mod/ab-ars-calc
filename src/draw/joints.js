class DrawJoints extends Draw {

    drawJoints() {
        for (let i = 0; i < this.peregon.joints.length; i++) {
            const group = this.two.makeGroup();

            let x = this.peregon.joints[i].x;
            let joint;

            if (!this.peregon.joints[i].point) {
                joint = this.drawJoint(x);
            } else {
                joint = this.drawPoint(x);
            }

            const vksCalc = this.peregon.joints[i].vksCalc;

            if (vksCalc) {
                this.drawVks(x, i);
            }

            if (i == this.peregon.joints.length - 1) continue;

            const name = this.peregon.joints[i].name;
            const leng = this.peregon.joints[i + 1].x - this.peregon.joints[i].x;
            const half = leng / 2;

            const textX = this.x(x + half + (vksCalc ? ((leng < 50) ? vksCalc.l : vksCalc.l / 2) : 0));

            const text = this.two.makeText(name, textX, this.trackY - 8);
            const code = this.two.makeText(arsCode(this.peregon.joints[i]), textX, this.graphY - 5, { size: 10 });
            const lengText = this.two.makeText(`${leng % 1 > 0.05 ? leng.toFixed(1) : Math.floor(leng)} м`, textX, this.trackY + 8, { size: 10 });

            const dash = this.two.makeLine(this.x(x), this.graphY, this.x(x), 0);
            dash.dashes = [this.Ky, this.Ky];

            const textGroup = this.two.makeGroup();
            textGroup.add(text);
            textGroup.className = 'rcname';

            group.add(joint, textGroup, lengText, dash, code);

            let arsS = this.peregon.joints[i].arsCalc;

            if (!arsS) continue;
            for (let k = 0; k < arsS.length; k++) {
                let { jointI, nextJointX, nextJointI, v, sObj, fArs, factLength } = arsS[k];
                if (k < arsS.length - 1 && arsS[k + 1].nextJointI == arsS[k].nextJointI || arsS[k].nextJointI - i <= 0 || !i) continue;

                let y;
                const breakPoint = this.peregon.arsDrawBreakpoint || 12;
                if (nextJointI < breakPoint) {
                    y = (this.graphY - 7.5 * nextJointI * this.Ky - 95 * this.Ky)
                } else {
                    y = (this.graphY - 7.5 * (nextJointI - breakPoint + 1) * this.Ky);
                }

                if (this.peregon.joints[nextJointI - 1].vksCalc) {
                    this.drawArsVksArrow(x, y, nextJointX, nextJointI);
                } else {
                    this.drawArrow(this.x(x), y, this.x(nextJointX), y);
                }

                this.two.makeCircle(this.x(x), y, 1.5).fill = '#000';
                this.two.makeText(`${v}`, this.x(x) - 3, y - 6, { alignment: 'right' });
                let fArsText = false;
                if (arsS[k].nextJointI != this.peregon.joints[i + 1].arsCalc[k].nextJointI) {
                    this.two.makeText(`${sObj.p}+${sObj.epk}+${sObj.r}=${sObj.full}`, this.x(x) + 6, y + 6, { size: 8, alignment: 'left' });
                    fArsText = this.two.makeText(!isNaN(fArs) ? `${factLength} Ф=${fArs}с.` : `${factLength}`, this.x(x) + 6, y - 6, { size: 10, alignment: 'left' });
                } else if (!isNaN(fArs)) {
                    fArsText = this.two.makeText(`Ф=${fArs}с.`, this.x(x) + 6, y + 6, { size: 10, alignment: 'left' });
                }

                const prevVI = arsSteps.indexOf(v);
                if (fArsText && arsSteps[prevVI ? prevVI - 1 : prevVI] < Math.round(this.peregon.joints[i].vMax)) {
                    if (fArs < 15) {
                        fArsText.fill = 'orange';
                    }
                    if (fArs < 5) {
                        fArsText.fill = 'red';
                    }
                }
            }
        }
    }

    drawJoint(x) {
        const joint = this.two.makeLine(this.x(x), this.trackY - 3, this.x(x), this.trackY + 3);
        const bottom = this.two.makeLine(this.x(x) - 3, this.trackY + 3, this.x(x) + 3, this.trackY + 3);
        const top = this.two.makeLine(this.x(x) - 3, this.trackY - 3, this.x(x) + 3, this.trackY - 3);

        const group = this.two.makeGroup(joint, bottom, top);
        group.className = 'joint';

        return group;
    }

    drawPoint(x) {
        const point = this.two.makeCircle(this.x(x), this.trackY, 2.5);
        point.fill = '#000';

        const group = this.two.makeGroup(point);
        group.className = 'point';

        return group;
    }

    drawRay(x) {
        const point = this.two.makeCircle(this.x(x), this.trackY + 5, 2);
        const arrow = this.two.makeLine(this.x(x), this.trackY - 3, this.x(x) + 3, this.trackY - 13);
        const arrow1 = this.two.makeLine(this.x(x), this.trackY - 9, this.x(x), this.trackY - 3);
        const arrow2 = this.two.makeLine(this.x(x) + 3.5, this.trackY - 8, this.x(x), this.trackY - 3);

        const group = this.two.makeGroup(point, arrow, arrow1, arrow2);
        group.className = 'ray';

        return group;
    }

    drawVks(x, i) {
        const { v, l, s, vf } = this.peregon.joints[i].vksCalc
        const ray = this.drawRay(x + l);
        const y = vf;
        const vFactText = this.two.makeText(`Vф=${vf}км/ч`, this.x(x + l) + 4, this.graphY - y * this.Ky, { size: 10, alignment: 'left' });
        const vAssumedText = this.two.makeText(`Vр=${v}км/ч`, this.x(x + l) + 4, this.graphY + 12 - y * this.Ky, { size: 10, alignment: 'left' });
        const sText = this.two.makeText(`S=${l.toFixed(2)}+${s.toFixed(2)}=${Math.floor((l + s + 1.38))}`, this.x(x + l) + 4, this.graphY + 24 - y * this.Ky, { size: 10, alignment: 'left' });
        const vksDash = this.two.makeLine(this.x(x + l), this.graphY, this.x(x + l), 0);
        vksDash.dashes = [this.Ky, this.Ky];

        return this.two.makeGroup(ray, vFactText, vAssumedText, sText, vksDash);
    }

    drawArsVksArrow(x, y, nextJointX, nextJointI) {
        const vksCalc = this.peregon.joints[nextJointI - 1].vksCalc;
        const vksX = this.peregon.joints[nextJointI - 1].x;
        const line = this.two.makeLine(this.x(x), y, this.x(vksX + vksCalc.l), y);
        const dashedLine = this.two.makeLine(this.x(vksX + vksCalc.l), y, this.x(nextJointX), y);
        dashedLine.dashes = [this.Ky, this.Ky];
        const circle = this.two.makeCircle(this.x(vksX + vksCalc.l), y, 1.5);
        circle.fill = '#000';
        const arrow = this.drawArrow(this.x(nextJointX), y, this.x(nextJointX), y);

        return this.two.makeGroup(line, dashedLine, circle, arrow);
    }
}
