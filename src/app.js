class App {

    async init(line, track, n, paImport, noTimeoutDraw) {
        const peregon = lines[line][track][Number(n) || 0];
        const nextPeregon = lines[line][track][Number(n) + 1 || 1];

        window.peregon = peregon;
        window.nextPeregon = nextPeregon;

        if (paImport) {
            await importTrackPlanProfile(paImport, track, n, peregon, nextPeregon);
        }

        this.loadPeregon(peregon);

        const tractionCalculator = new TractionCalculator();
        tractionCalculator.setPeregon(peregon);
        const peregonCalc = tractionCalculator.calc(this.stepNum);

        const K = 1;
        const Ky = K * 3;

        const offsetX = 110;

        const jointLength = peregon.joints?.[peregon.joints.length - 1]?.x ?? 0;

        const two = new Two({
            width: (jointLength > this.trackLength ? jointLength : this.trackLength) * K + offsetX * 2,
            height: (peregonCalc[peregonCalc.length - 1].Tk + peregon.tStay + this.interval) * Ky + 270
        }).appendTo(document.body);

        const drawGraph = new DrawGraph(two, peregon, offsetX, K, Ky);
        drawGraph.drawAxes(peregonCalc, nextPeregon);

        const drawTrack = new DrawTrack(two, peregon, offsetX, K, Ky);
        drawTrack.drawPeregon().position.x = offsetX;

        if (!noTimeoutDraw) {
            setTimeout(() => {
                drawGraph.drawVelocity(peregonCalc, trainHalf).position.x = offsetX;
                two.update();
            }, 0);

            setTimeout(() => {
                drawGraph.drawTime(peregonCalc, trainHalf).position.x = offsetX;
                two.update();
            }, 0);

            setTimeout(() => {
                drawGraph.drawTime(peregonCalc, -trainHalf).position.x = offsetX;
                two.update();
            }, 0);

            setTimeout(() => {
                drawGraph.drawTime(peregonCalc, trainHalf, this.interval).position.x = offsetX;
                two.update();
            }, 0);
        }

        const prevLeng = this.trackLength;
        const prevTime = peregonCalc[peregonCalc.length - 1].Tk;

        this.loadPeregon(nextPeregon);
        tractionCalculator.setPeregon(nextPeregon);
        const nextPeregonCalc = tractionCalculator.calc(this.stepNum);

        drawTrack.setPeregon(nextPeregon);
        drawTrack.drawPeregon().position.x = offsetX + prevLeng * K;

        if (!noTimeoutDraw) {
            setTimeout(() => {
                drawGraph.drawVelocity(nextPeregonCalc, prevLeng - trainHalf).position.x = offsetX;
                two.update();
            }, 0);

            setTimeout(() => {
                drawGraph.drawTime(nextPeregonCalc, prevLeng - trainHalf, prevTime).position.x = offsetX;
                two.update();
            }, 0);
        }

        this.loadPeregon(peregon);

        const peregonConcat = this.concatPeregon(peregonCalc, nextPeregonCalc);
        tractionCalculator.setPeregonConcat(peregonConcat);
        tractionCalculator.setPeregon(peregon);

        drawGraph.setTractionCalculator(tractionCalculator);
        drawGraph.drawModes();

        const vksCalculator = new VksCalculator(peregon, peregonConcat);
        vksCalculator.setTractionCalculator(tractionCalculator);
        vksCalculator.calc();

        const arsCalculator = new ArsCalculator(peregon, peregonConcat);
        arsCalculator.setTractionCalculator(tractionCalculator);
        arsCalculator.calc();

        const signalCalculator = new SignalCalculator(peregon, peregonConcat);
        signalCalculator.setTractionCalculator(tractionCalculator);
        signalCalculator.calc();

        const drawJoints = new DrawJoints(two, peregon, offsetX, K, Ky);
        drawJoints.setTractionCalculator(tractionCalculator);
        drawJoints.drawJoints();

        const drawSignals = new DrawSignals(two, peregon, offsetX, K, Ky);
        drawSignals.setTractionCalculator(tractionCalculator);
        drawSignals.drawSignals();

        const drawSwitches = new DrawSwitches(two, peregon, offsetX, K, Ky);
        drawSwitches.drawSwitches();

        const drawMKs = new DrawMKs(two, peregon, offsetX, K, Ky);
        drawMKs.drawMKs();

        two.update();

        setupSignalEvents();
    }

    concatPeregon(peregonCalc, nextPeregonCalc) {
        let nextPeregonCopy = JSON.parse(JSON.stringify(nextPeregonCalc));
        let nextPeregonOffset = peregonCalc[peregonCalc.length - 1].Sk;
        let nextPeregonTimeOffset = peregonCalc[peregonCalc.length - 1].Tk;
        for (let i = 0; i < nextPeregonCopy.length; i++) {
            nextPeregonCopy[i].Sn += nextPeregonOffset;
            nextPeregonCopy[i].Sk += nextPeregonOffset;
            nextPeregonCopy[i].Tn += nextPeregonTimeOffset;
            nextPeregonCopy[i].Tk += nextPeregonTimeOffset;
        }
        return peregonCalc.concat(nextPeregonCopy);
    }

    loadPeregon(peregon) {
        const { trackLength, tStay, curves, slopes, modes, interval } = peregon;
        this.trackLength = trackLength;
        this.tStay = tStay;
        this.interval = Math.round(3600 / (interval || 40));
        this.curves = curves;
        this.slopes = slopes;
        this.modes = modes;
        this.stepNum = Math.round(this.trackLength / stepLength);
        this.KS = peregon.K || 1;
        KS = this.KS;
    }
}
