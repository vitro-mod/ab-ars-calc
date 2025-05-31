function drawPeregon() {

    let group = two.makeGroup();

    let plan = drawPlan();
    let slopes = drawSlopes();
    let track = drawTrack();

    return group.add(plan, slopes, track);
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
