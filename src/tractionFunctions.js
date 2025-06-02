function stepFn(valueObj, x) {
    let array = Object.keys(valueObj);
    if (array.length == 1) return valueObj[array[0]];
    for (let i = 0; i < array.length - 1; i++) {
        if (x < Number(array[0])) return valueObj[array[0]];
        else if (x >= Number(array[i]) && x <= Number(array[i + 1])) return valueObj[array[i]];
        else if (x > Number(array[array.length - 1])) return valueObj[array[array.length - 1]];
    }
}

function stepFnNext(valueObj, x) {
    let array = Object.keys(valueObj);
    if (array.length == 1) return array[0];
    for (let i = 0; i < array.length - 1; i++) {
        if (x < Number(array[0])) return array[0];
        else if (x >= Number(array[i]) && x <= Number(array[i + 1])) return array[i + 1];
        else if (x > Number(array[array.length - 1])) return array[array.length - 1];
    }
}

function stepFnPrev(valueObj, x) {
    let array = Object.keys(valueObj);
    if (array.length == 1) return array[0];
    for (let i = 0; i < array.length - 1; i++) {
        if (x < Number(array[0])) return array[0];
        else if (x >= Number(array[i]) && x <= Number(array[i + 1])) return array[i];
        else if (x > Number(array[array.length - 1])) return array[array.length - 1];
    }
}

function Fy(v) {
    if (v < 1) return 122.5;
    else if (v < 27) {
        if (v < 2.03) return 10 + 55 * v;
        else return 121.937682954116 + 0.244056864104766 * v - 0.0318606488172867 * v * v + 0.00169014358374443 * v * v * v - 0.0000446869272402463 * v * v * v * v + 0.000000479527635580269 * v * v * v * v * v;
    }
    else return 106.214780302004 + 0.162404816452404 * v + 0.229006742877741 * v * v - 0.0140580155548956 * v * v * v + 0.000292658136412426 * v * v * v * v - 0.00000266085801327894 * v * v * v * v * v + 0.00000000902065079052568 * v * v * v * v * v * v;
}

function W0(v) {
    // return 0;
    return -(2.05619351969533 + 0.00454788038384904 * v + 0.00225226530397697 * v * v - 0.0000106508609263389 * v * v * v - 0.000000887574443302896 * v * v * v * v + 0.0000000178255203857026 * v * v * v * v * v - 0.0000000000856806811852503 * v * v * v * v * v * v);
}

function Wcurve(radius) {
    return radius == 0 ? 0 : 750 / Math.abs(radius);
}

function conditions(peregon, x) {
    return {
        _modes: stepFn(peregon.modes, x),
        _slopes: stepFn(peregon.slopes, x),
        _radius: stepFn(peregon.curves, x)
    }
}

function F(peregon, x, v) {
    let { _modes, _slopes, _radius } = conditions(peregon, x);
    // console.log(_modes)
    switch (_modes?.[0]) {
        case 'H':
            //Fy-slopes-Wcurve
            return Fy(v) - _slopes - Wcurve(_radius);
        case 'T':
            //-122.65-slopes-Wcurve
            return FT - _slopes - Wcurve(_radius);
        case 'P':
            //-122.65-slopes-Wcurve
            const slope = (Number(_modes.slice(1)) || 210) / 1000;
            return -111.6 * slope - _slopes - Wcurve(_radius);
        default:
            //W0-slopes-Wcurve
            return W0(v) - _slopes - Wcurve(_radius);
    }
}
function Ft(peregon, x, a = 1.1 / 1.15 / KS) {
    let { _modes, _slopes, _radius } = conditions(peregon, x);
    return -111.6 * a - _slopes - Wcurve(_radius);
}

function vks(peregon, i) {
    let joint = peregon.joints[i];
    if (!joint.vks) return false;
    let x = joint.x;
    let leng = peregon.joints[i + 1].x - x;

    // let brakeCurve = brakeCalc(x + leng + trainHalf, 1.1, leng);
    // drawVelocity(brakeCurve, -trainHalf).position.x = offsetX;

    let { _modes, _slopes, _radius } = conditions(peregon, x);
    let a = 1 / (3.6 * 3.6 * 2 * (1.1 - (_slopes / 100)));
    let b = 0.247;
    let c = -leng - 1.38;

    let D = b * b - 4 * a * c;
    if (D < 0) return false;
    let v = Math.ceil((-b + Math.sqrt(D)) / (2 * a));
    let l = b * v - 1.38;
    let s = v * v * a;

    return { v, l, s };
}