function drawJoints() {
    for (let i = 0; i < peregon.joints.length; i++) {
        const group = two.makeGroup();

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

        const textGroup = two.makeGroup();
        textGroup.add(text);
        textGroup.className = 'rcname';

        group.add(joint, textGroup, lengText, dash);

        let arsS = peregon.joints[i].arsCalc;

        if (!arsS) continue;
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

function drawJoint(x) {

    let joint = two.makeLine(offsetX + x * K, trackY - 3, offsetX + x * K, trackY + 3);
    let bottom = two.makeLine(offsetX + x * K - 3, trackY + 3, offsetX + x * K + 3, trackY + 3);
    let top = two.makeLine(offsetX + x * K - 3, trackY - 3, offsetX + x * K + 3, trackY - 3);

    let group = two.makeGroup(joint, bottom, top);
    group.className = 'joint';

    return group;
}

function drawPoint(x) {

    let point = two.makeCircle(offsetX + x * K, trackY, 2.5);
    point.fill = '#000';

    let group = two.makeGroup(point);
    group.className = 'point';
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
