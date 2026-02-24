class Draw {
    constructor(two, peregon, offsetX, K, Ky) {
        this.two = two;
        this.peregon = peregon;
        this.interval = Math.round(3600 / (this.peregon.interval || 40));
        this.curvesWidth = 2;
        this.curvesY = two.height - 15;
        this.slopesWidth = 2;
        this.slopesY = two.height - 60;
        this.trackWidth = 2;
        this.trackY = two.height - 130;
        this.graphWidth = 2;
        this.graphY = two.height - 190;
        this.offsetX = offsetX;
        this.K = K;
        this.Ky = Ky;
    }

    x(x) {
        return this.offsetX + x * this.K;
    }

    setPeregon(peregon) {
        this.peregon = peregon;
    }

    setTractionCalculator(tractionCalculator) {
        this.tractionCalculator = tractionCalculator;
    }

    drawArrow(x1, y1, x2, y2, w = 15, h = 1.5) {
        const two = this.two;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = dx / len;
        const uy = dy / len;
        // perpendicular unit vector
        const px = -uy;
        const py = ux;

        // base point of arrowhead (point w units back from tip)
        const bx = x2 - ux * w;
        const by = y2 - uy * w;

        // two base corners of the arrowhead
        const p1x = bx + px * h;
        const p1y = by + py * h;
        const p2x = bx - px * h;
        const p2y = by - py * h;

        const line = two.makeLine(x1, y1, x2, y2);
        const arr1 = two.makeLine(x2, y2, p1x, p1y);
        const arr2 = two.makeLine(x2, y2, p2x, p2y);

        return two.makeGroup(line, arr1, arr2);
    }
}