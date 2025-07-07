class DrawMKs extends Draw {

    drawMKs() {
        if (!this.peregon.mks) return;
        for (let i = 0; i < this.peregon.mks.length; i++) {
            this.drawMK(this.peregon.mks[i]);
        }
    }

    drawMK(mkObj) {
        console.log('drawMK', mkObj);
        const x = this.x(mkObj.x);
        const y = this.trackY;

        const line1 = this.two.makeLine(x, y - 10, x, y - 30);
        const line2 = this.two.makeLine(x, y + 10, x, y + 30);
        const name = this.two.makeText(`${mkObj.name}`, x, y - 40, { size: 12 });

        return this.two.makeGroup(line1, line2);
    }
}
