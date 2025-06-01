class DrawTrack extends Draw {

    drawPeregon() {
        let group = this.two.makeGroup();

        return group.add(
            this.drawPlan(),
            this.drawSlopes(),
            this.drawTrack(),
        );
    }

    drawTrack() {
        return this.two.makeLine(0, this.trackY, this.peregon.trackLength * this.K, this.trackY);
    }

    drawSlopes() {

        let group = this.two.makeGroup();

        for (let i = 0; i < Object.keys(this.peregon.slopes).length; i++) {
            let el = Object.keys(this.peregon.slopes)[i];
            let arr = Object.keys(this.peregon.slopes);

            let start = Number(el);
            let end = (i < arr.length - 1) ? Number(Object.keys(this.peregon.slopes)[i + 1]) : this.peregon.trackLength;

            group.add(this.drawSlope(start, end, this.peregon.slopes[el]));
        }

        return group;
    }

    drawSlope(x0, xk, slope) {

        let leng = xk - x0;
        let halfH = 15;

        let slopeRect, slopeLine, slopeText, lengthText;
        slopeRect = this.two.makeRectangle(x0 * this.K + leng * this.K / 2, this.slopesY, leng * this.K, halfH * 2);
        slopeRect.fill = '#00000000';

        if (slope > 0) {
            slopeLine = this.two.makeLine(x0 * this.K, this.slopesY + halfH, xk * this.K, this.slopesY - halfH);
            lengthText = this.two.makeText(leng, xk * this.K - 10, this.slopesY + 5, { alignment: 'right' });
            slopeText = this.two.makeText(Math.abs(slope), x0 * this.K + 10, this.slopesY - 5, { alignment: 'left' });
        }
        else if (slope < 0) {
            slopeLine = this.two.makeLine(x0 * this.K, this.slopesY - halfH, xk * this.K, this.slopesY + halfH);
            lengthText = this.two.makeText(leng, x0 * this.K + 10, this.slopesY + 5, { alignment: 'left' });
            slopeText = this.two.makeText(Math.abs(slope), xk * this.K - 10, this.slopesY - 5, { alignment: 'right' });
        }
        else {
            slopeLine = this.two.makeLine(x0 * this.K, this.slopesY, xk * this.K, this.slopesY);
            lengthText = this.two.makeText(leng, (x0 + leng / 2) * this.K, this.slopesY + 8);
            slopeText = this.two.makeText(Math.abs(slope), (x0 + leng / 2) * this.K, this.slopesY - 7);
        }

        return this.two.makeGroup(slopeRect, slopeLine, slopeText, lengthText);
    }

    drawPlan() {

        let group = this.two.makeGroup();

        for (let i = 0; i < Object.keys(this.peregon.curves).length; i++) {
            let el = Object.keys(this.peregon.curves)[i];
            let arr = Object.keys(this.peregon.curves);

            let start = Number(el);
            let end = (i < arr.length - 1) ? Number(Object.keys(this.peregon.curves)[i + 1]) : this.peregon.trackLength;

            if (!this.peregon.curves[el]) {
                group.add(this.drawStraight(start, end));
            }
            else {
                group.add(this.drawCurve(start, end, this.peregon.curves[el]));
            }
        }

        return group;
    }

    drawStraight(x0, xk) {

        let leng = xk - x0;
        let line = this.two.makeLine(x0 * this.K, this.curvesY, xk * this.K, this.curvesY);
        let text = this.two.makeText(`Пр. ${xk - x0} м.`, (x0 + leng / 2) * this.K, this.curvesY - 15);

        return this.two.makeGroup(line, text);
    }

    drawCurve(x0, xk, r = 1) {

        let leng = xk - x0;
        let isLeft = r < 0;
        let h = 25;
        let half = h / 2;
        let lineY = this.curvesY + (isLeft ? half : -half);

        let line = this.two.makeLine(x0 * this.K + half, lineY, xk * this.K - half, lineY);
        let arc1 = this.two.makeArcSegment(x0 * this.K + half, this.curvesY, half, half, Math.PI, (isLeft ? 1 : 3) * Math.PI / 2, 16);
        let arc2 = this.two.makeArcSegment(xk * this.K - half, this.curvesY, half, half, (isLeft ? 1 : -1) * Math.PI / 2, 0, 16);
        let text = this.two.makeText(`Р${Math.abs(r)} К${leng}`, (x0 + leng / 2) * this.K, this.curvesY);

        return this.two.makeGroup(line, arc1, arc2, text);
    }
}
