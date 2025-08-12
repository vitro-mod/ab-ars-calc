function signalRcs(signalName) {
    const signal = peregon.signals.find(el => el.name == signalName);
    const joint = peregon.joints.findIndex(el => el.name == signal.joint);
    const open = peregon.joints.findIndex(el => el.name == (signal.y ?? signal.yg ?? signal.g));
    const result = peregon.joints.slice(joint, open + 1).map(el => 'rc' + el.name);

    return result;
}

function iSignals() {
    let result = '';

    for (let i = 0; i < peregon.signals.length; i++) {
        const signal = peregon.signals[i];
        let nextSignal = peregon.signals[i + 1];
        if (nextSignal?.back) {
            console.log(result);
            return result;
        }

        let aspectsNum = 2;
        if (signal.y) aspectsNum = 3;
        if (signal.yg) aspectsNum = 4;

        if (signal.yg && !signal.y && !signal.g) {
            nextSignal = null;
        }

        const nextString = nextSignal ? `next: 'sig${nextSignal.name.replaceAll('-', '')}', ` : '';
        const rc = signalRcs(signal.name);
        const rcString = "['" + rc.join("', '") + "']";
        const resultString = `{ scheme: 'YYGR', name: 'sig${signal.name.replaceAll('-', '')}', params: {${nextString} rc: ${rcString}, aspectsNum: ${aspectsNum}} },\n`;

        result += resultString;
    }

    console.log(result);

    return result;
}
