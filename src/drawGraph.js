function arrow(x1, y1, x2, y2, w = 15, h = 1.5) {
    let line = two.makeLine(x1, y1, x2, y2);
    let arr1 = two.makeLine(x2, y2, x2 - w, y2 - h);
    let arr2 = two.makeLine(x2, y2, x2 - w, y2 + h);

    return two.makeGroup(line, arr1, arr2);
}

function drawModes() {

    for (let i = 1; i < Object.keys(modes).length; i++) {

        let el = Object.keys(modes)[i];
        let arr = Object.keys(modes);

        let x = Number(el);

        drawMode(x, modes[el]);

    }
}

function drawMode(x, mode) {

    two.makeLine(offsetX + (x + trainHalf) * K, graphY - V(x) * Ky, offsetX + (x + trainHalf) * K, graphY - V(x) * Ky - 20);
    switch (mode) {
        case 'H':
            two.makeText('Х', offsetX + (x + trainHalf) * K + 3, graphY - V(x) * Ky - 20, { alignment: 'left', size: 10 });
            break;
        case '0':
            two.makeText('0', offsetX + (x + trainHalf) * K + 3, graphY - V(x) * Ky - 20, { alignment: 'left', size: 10 });
            break;
        case 'T':
            two.makeText('Т', offsetX + (x + trainHalf) * K + 3, graphY - V(x) * Ky - 20, { alignment: 'left', size: 10 });
            break;
        case 'P':
            two.makeText('Т1', offsetX + (x + trainHalf) * K + 3, graphY - V(x) * Ky - 20, { alignment: 'left', size: 10 });
            break;
    }
}

function drawAxes() {
    let grid = two.makeGroup();
    let text = two.makeGroup();
    two.makeLine(0, graphY, two.width, graphY);
    let axis = two.makeLine(offsetX, graphY, offsetX, 30);
    axis.dashes = [5, 3, 2, 3].map(el => el * Ky * 2);
    let axis2 = two.makeLine(offsetX + trackLength * K, graphY, offsetX + trackLength * K, 30);
    axis2.dashes = [5, 3, 2, 3].map(el => el * Ky * 2);

    let tH = peregonCalc[peregonCalc.length - 2].Tk;
    let tFull = Math.round(tH) + tStay;

    two.makeLine(axisT, graphY, axisT, 0);

    for (let i = 10; i < 250; i += 10) {
        let dash = two.makeLine(axisT, graphY - i * Ky, two.width, graphY - i * Ky);
        grid.add(dash);
        dash.stroke = '#00000033';
        text.add(two.makeText(i, axisT - 5, graphY - i * Ky, { alignment: 'right' }));
    }

    if (peregon.name) text.add(two.makeText(peregon.name, offsetX, 7));
    two.makeCircle(offsetX, 35, 15, 4);
    two.makeArcSegment(offsetX , 35, 9, 15, Math.PI / 2, 3 * Math.PI / 2, 16).fill = 'black';
    two.makeArcSegment(offsetX, 35, 0, 9, 3 * Math.PI / 2, 5 * Math.PI / 2, 16).fill = 'black';
    two.makeLine(offsetX + 15, 35, offsetX + 15 + 40, 35);
    two.makeLine(offsetX + 15 + 25, 33, offsetX + 15 + 40, 35);
    two.makeText(`${trackLength}м.`, offsetX + 60, 35, { alignment: 'left' });

    if (nextPeregon.name) text.add(two.makeText(nextPeregon.name, offsetX + trackLength * K, 7));
    two.makeCircle(offsetX + trackLength * K, 35, 15, 4);
    two.makeArcSegment(offsetX + trackLength * K, 35, 9, 15, Math.PI / 2, 3 * Math.PI / 2, 16).fill = 'black';
    two.makeArcSegment(offsetX + trackLength * K, 35, 0, 9, 3 * Math.PI / 2, 5 * Math.PI / 2, 16).fill = 'black';
    two.makeLine(offsetX + trackLength * K - 15, 35, offsetX + trackLength * K - 15 - 40, 35);
    two.makeLine(offsetX + trackLength * K - 15 - 25, 37, offsetX + trackLength * K - 15 - 40, 35);
    two.makeText(`${trackLength}м.`, offsetX + trackLength * K - 60, 35, { alignment: 'right' });

    two.makeText(`t=${interval}с.`, axisT + 6, graphY - interval * Ky - 6, { alignment: 'left' });
    two.makeLine(axisT, graphY - interval * Ky, offsetX + trainHalf * K, graphY - interval * Ky);

    two.makeText(`T=${Math.round(tH)}+${tStay}=${tFull}с.`, axisT + 6, graphY - tFull * Ky - 6, { alignment: 'left' })
    two.makeLine(axisT, graphY - tFull * Ky, offsetX * K, graphY - tFull * Ky);

    return two.makeGroup(axis, axis2, grid, text);
}

function drawTime(trCalc, offset = 0, timeOffset = 0) {

    let group = two.makeGroup();

    const pathArray = trCalc.map(segment => new Two.Anchor((segment.Sn + offset) * K, graphY - (segment.Tn + timeOffset) * Ky));
    segment = trCalc[trCalc.length - 1];
    pathArray.push(new Two.Anchor((segment.Sk + offset) * K, graphY - (segment.Tk + timeOffset) * Ky));

    const path = two.makePath(pathArray);
    path.linewidth = graphWidth;
    path.fill = 'transparent';
    path.closed = false;
    group.add(path);

    return group;
}

function drawVelocity(trCalc, offset = 0) {

    let group = two.makeGroup();

    const pathArray = trCalc.map(segment => new Two.Anchor((segment.Sn + offset) * K, graphY - segment.Vn * Ky));
    segment = trCalc[trCalc.length - 1];
    pathArray.push(new Two.Anchor((segment.Sk + offset) * K, graphY - segment.Vk * Ky));
    
    const path = two.makePath(pathArray);
    path.linewidth = graphWidth;
    path.fill = 'transparent';
    path.closed = false;
    group.add(path);

    return group;
}