class DrawGraph extends Draw {

    drawModes() {

        for (let i = 1; i < Object.keys(this.peregon.modes).length; i++) {

            let el = Object.keys(this.peregon.modes)[i];
            let arr = Object.keys(this.peregon.modes);

            let x = Number(el);

            this.drawMode(x, this.peregon.modes[el]);
        }
    }

    drawMode(x, mode) {

        const line = this.two.makeLine(this.offsetX + (x + trainHalf) * this.K, this.graphY - this.tractionCalculator.V(x) * this.Ky, this.offsetX + (x + trainHalf) * this.K, this.graphY - this.tractionCalculator.V(x) * this.Ky - 20);
        let modeString = '';

        switch (mode[0]) {
            case 'H':
                modeString = 'Х';
                break;
            case '0':
                modeString = '0';
                break;
            case 'T':
                modeString = 'Т';
                break;
            case 'P':
                modeString = `TP${mode.slice(1)}`;
                break;
        }

        const text = this.two.makeText(modeString, this.offsetX + (x + trainHalf) * this.K + 3, this.graphY - this.tractionCalculator.V(x) * this.Ky - 20, { alignment: 'left', size: 10 });

        return this.two.makeGroup(line, text);
    }

    drawAxes(peregonCalc, nextPeregon) {
        const axisV = this.offsetX - 40;
        const axisT = this.offsetX - 80;

        let grid = this.two.makeGroup();
        let text = this.two.makeGroup();
        this.two.makeLine(0, this.graphY, this.two.width, this.graphY);
        let axis = this.two.makeLine(this.offsetX, this.graphY, this.offsetX, 30);
        axis.dashes = [5, 3, 2, 3].map(el => el * this.Ky * 2);
        let axis2 = this.two.makeLine(this.offsetX + this.peregon.trackLength * this.K, this.graphY, this.offsetX + this.peregon.trackLength * this.K, 30);
        axis2.dashes = [5, 3, 2, 3].map(el => el * this.Ky * 2);

        let tH = peregonCalc[peregonCalc.length - 2].Tk;
        let tFull = Math.round(tH) + this.peregon.tStay;

        this.two.makeLine(axisT, this.graphY, axisT, 0);

        for (let i = 10; i < 250; i += 10) {
            let dash = this.two.makeLine(axisT, this.graphY - i * this.Ky, this.two.width, this.graphY - i * this.Ky);
            grid.add(dash);
            dash.stroke = '#00000033';
            text.add(this.two.makeText(i, axisT - 5, this.graphY - i * this.Ky, { alignment: 'right' }));
        }

        if (this.peregon.name) text.add(this.two.makeText(this.peregon.name, this.offsetX, 7));
        this.two.makeCircle(this.offsetX, 35, 15, 4);
        this.two.makeArcSegment(this.offsetX, 35, 9, 15, Math.PI / 2, 3 * Math.PI / 2, 16).fill = 'black';
        this.two.makeArcSegment(this.offsetX, 35, 0, 9, 3 * Math.PI / 2, 5 * Math.PI / 2, 16).fill = 'black';
        this.two.makeLine(this.offsetX + 15, 35, this.offsetX + 15 + 40, 35);
        this.two.makeLine(this.offsetX + 15 + 25, 33, this.offsetX + 15 + 40, 35);
        this.two.makeText(`${this.peregon.trackLength}м.`, this.offsetX + 60, 35, { alignment: 'left' });

        if (nextPeregon.name) text.add(this.two.makeText(nextPeregon.name, this.offsetX + this.peregon.trackLength * this.K, 7));
        this.two.makeCircle(this.offsetX + this.peregon.trackLength * this.K, 35, 15, 4);
        this.two.makeArcSegment(this.offsetX + this.peregon.trackLength * this.K, 35, 9, 15, Math.PI / 2, 3 * Math.PI / 2, 16).fill = 'black';
        this.two.makeArcSegment(this.offsetX + this.peregon.trackLength * this.K, 35, 0, 9, 3 * Math.PI / 2, 5 * Math.PI / 2, 16).fill = 'black';
        this.two.makeLine(this.offsetX + this.peregon.trackLength * this.K - 15, 35, this.offsetX + this.peregon.trackLength * this.K - 15 - 40, 35);
        this.two.makeLine(this.offsetX + this.peregon.trackLength * this.K - 15 - 25, 37, this.offsetX + this.peregon.trackLength * this.K - 15 - 40, 35);
        this.two.makeText(`${this.peregon.trackLength}м.`, this.offsetX + this.peregon.trackLength * this.K - 60, 35, { alignment: 'right' });

        this.two.makeText(`t=${this.peregon.interval}с.`, axisT + 6, this.graphY - this.peregon.interval * this.Ky - 6, { alignment: 'left' });
        this.two.makeLine(axisT, this.graphY - this.peregon.interval * this.Ky, this.offsetX + trainHalf * this.K, this.graphY - this.peregon.interval * this.Ky);

        this.two.makeText(`T=${Math.round(tH)}+${this.peregon.tStay}=${tFull}с.`, axisT + 6, this.graphY - tFull * this.Ky - 6, { alignment: 'left' })
        this.two.makeLine(axisT, this.graphY - tFull * this.Ky, this.offsetX * this.K, this.graphY - tFull * this.Ky);

        return this.two.makeGroup(axis, axis2, grid, text);
    }

    drawTime(trCalc, offset = 0, timeOffset = 0) {

        let group = this.two.makeGroup();

        const pathArray = trCalc.map(segment => new Two.Anchor((segment.Sn + offset) * this.K, this.graphY - (segment.Tn + timeOffset) * this.Ky));
        const segment = trCalc[trCalc.length - 1];
        pathArray.push(new Two.Anchor((segment.Sk + offset) * this.K, this.graphY - (segment.Tk + timeOffset) * this.Ky));

        const path = this.two.makePath(pathArray);
        path.linewidth = this.graphWidth;
        path.fill = 'transparent';
        path.closed = false;
        group.add(path);

        return group;
    }

    drawVelocity(trCalc, offset = 0) {

        let group = this.two.makeGroup();

        const pathArray = trCalc.map(segment => new Two.Anchor((segment.Sn + offset) * this.K, this.graphY - segment.Vn * this.Ky));
        const segment = trCalc[trCalc.length - 1];
        pathArray.push(new Two.Anchor((segment.Sk + offset) * this.K, this.graphY - segment.Vk * this.Ky));

        const path = this.two.makePath(pathArray);
        path.linewidth = this.graphWidth;
        path.fill = 'transparent';
        path.closed = false;
        group.add(path);

        return group;
    }
}
