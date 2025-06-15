class DrawSwitches extends Draw {

    drawSwitches() {
        if (!this.peregon.switches) return;
        for (let i = 0; i < this.peregon.switches.length; i++) {
            this.drawSwitch(this.peregon.switches[i]);
        }
    }

    drawSwitch(switchObj) {
        const x = this.x(switchObj.x);
        const y = this.curvesY;
        const left = switchObj.left;
        const trailing = switchObj.trailing;

        const line = this.two.makeLine(x, y, trailing ? x - 40 : x + 40, left ? y - 15 : y + 15);
        const triangle = this.two.makePath(x, y, trailing ? x - 15 : x + 15, left ? y - 5.5 : y + 5.5, trailing ? x - 15 : x + 15, y);
        triangle.fill = '#000';
        const name = this.two.makeText(`${switchObj.name}`, trailing ? x - 35 : x + 35, left ? y - 5 : y + 7, { size: 12 });

        return this.two.makeGroup(line, triangle, name);
    }
}
