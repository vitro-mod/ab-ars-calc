function drawSwitches() {
    if (!peregon.switches) return;
    for (let i = 0; i < peregon.switches.length; i++) {
        drawSwitch(peregon.switches[i]);
    }
}

function drawSwitch(switchObj) {
    const x = offsetX + switchObj.x * K;
    const y = curvesY;
    const left = switchObj.left;
    const trailing = switchObj.trailing;

    const line = two.makeLine(x, y, trailing ? x - 40 : x + 40, left ? y - 15 : y + 15);
    const triangle = two.makePath(x, y, trailing ? x - 15 : x + 15, left ? y - 5.5 : y + 5.5, trailing ? x - 15 : x + 15, y);
    triangle.fill = '#000';
    const name = two.makeText(`${switchObj.name}`, trailing ? x - 35 : x + 35, left ? y - 5 : y + 7, { size: 12 });

    return two.makeGroup(line, triangle, name);
}
