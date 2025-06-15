class Draw {
    constructor(two, peregon, offsetX, K, Ky) {
        this.two = two;
        this.peregon = peregon;
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
        let line = this.two.makeLine(x1, y1, x2, y2);
        let arr1 = this.two.makeLine(x2, y2, x2 - w, y2 - h);
        let arr2 = this.two.makeLine(x2, y2, x2 - w, y2 + h);

        return this.two.makeGroup(line, arr1, arr2);
    }
}