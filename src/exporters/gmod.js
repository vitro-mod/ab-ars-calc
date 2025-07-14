function sections() {
    return peregon.signals.filter(el => !el.back).map(el => {
        if (el.back) return; 
        let sections = {};
        sections.nm = el.name.replace('-', '');
        sections.rc = 'rc' + el.joint;
        
        const jointI = Object.values(peregon.joints).findIndex(elem => elem.name == el.joint);
        if (peregon.joints[jointI - 1]) {
            sections.prev = 'rc' + peregon.joints[jointI - 1].name;
        }

        return sections;
    });

}

function signals() {
    let signals = {};
    peregon.signals.forEach(el => {
        let nm = el.name.replace('-', '');
        let name = 'sig' + nm;
        if (el.lenses == 'x') return;
        signals[name] = {
            name: nm
        };
        switch (el.lenses.replace('-', '')) {
            case 'YYGR':
            case 'YYGRw':
                signals[name].def = '0000';
                signals[name].ro = '0001';
                signals[name].ry = '0101';
                signals[name].ya = '0100';
                signals[name].yo = '1000';
                signals[name].yg = '1010';
                signals[name].go = '0010';
                break;
            case 'WYYGR':
            case 'WYYGRw':
                signals[name].def = '00000';
                signals[name].ro = '00001';
                signals[name].ry = '00101';
                signals[name].ya = '00100';
                signals[name].yo = '01000';
                signals[name].yg = '01010';
                signals[name].go = '00010';
                signals[name].wo = '10000';
                break;
            case 'YGR':
            case 'YGRw':
                signals[name].def = '000';
                signals[name].ro = '001';
                signals[name].ry = '101';
                signals[name].ya = '100';
                signals[name].yo = '100';
                signals[name].yg = '110';
                signals[name].go = '010';
                break;
            case 'WYGR':
            case 'WYGRw':
                signals[name].def = '0000';
                signals[name].ro = '0001';
                signals[name].ry = '0101';
                signals[name].ya = '0010';
                signals[name].yo = '0100';
                signals[name].yg = '0110';
                signals[name].go = '0010';
                signals[name].wo = '1000';
                break;
            case 'WyYYGRw':
                signals[name].def = '000000';
                signals[name].ro = '000001';
                signals[name].ry = '001001';
                signals[name].ya = '001000';
                signals[name].yo = '010000';
                signals[name].yg = '010010';
                signals[name].go = '000010';
                signals[name].wo = '100000';
                signals[name].yy = '010100';
                signals[name].yfy = '020100';
                break;
            case 'yYYYGRw':
            case 'YYYYGRw':
                signals[name].def = '000000';
                signals[name].ro = '000001';
                signals[name].ry = '001001';
                signals[name].ya = '001000';
                signals[name].yo = '010000';
                signals[name].yg = '010010';
                signals[name].go = '000010';
                signals[name].yy = '100100';
                signals[name].yfy = '200100';
                break;
        }
        if (el.lenses[el.lenses.length - 1] == 'w') {
            signals[name].ps = '';
        }
    });

    return signals;
}

function sectionsJson() {
    return JSON.stringify(sections());
}
function signalsJson() {
    return JSON.stringify(signals());
}
function sectionsCopy() {
    let resultText = ``;
    for (section of sections()) {
        const signal = rtl(section.nm.toUpperCase());
        const st = signal.slice(0,2);
        resultText += `gmod['${st}'].sections['${signal}'] = '${section.rc}';\n`
    }
    console.log(resultText);
    // navigator.clipboard.writeText(resultText);
}

function arsRcCopy() {
    let resultText = ``;
    for (section of sections()) {
        if (!section.prev) continue;
        const signal = rtl(section.nm.toUpperCase());
        const st = signal.slice(0, 2);
        resultText += `gmod['${st}'].arsRc['${section.prev}'] = '${signal}';\n`
    }
    console.log(resultText);
}

function arsCode(joint) {
    let result = '';

    if (!joint.arsCalc) return result;

    let clearNum = 0;
    let currentArs = 0;

    for (let i = 0; i < joint.arsCalc.length; i++) {
        if (joint.arsCalc[i].nextJointI - joint.arsCalc[i].jointI <= 0) continue;

        currentArs = joint.arsCalc[i];
        clearNum = currentArs.nextJointI - currentArs.jointI;

        const currentDigit = i > 0 ? (joint.arsCalc[i - 1].v / 10) : 0;

        result = result.padEnd(result.length > clearNum ? result.length + 1 : clearNum, currentDigit);
    }

    result = result.padEnd(clearNum + 1, currentArs.v / 10);

    return result;
}

function lightsCode(signal) {
    let lastIndicationI = 0;
    let lastIndication = 'r';
    signal.calc.sequence = [];
    const indications = signal.calc.indications;
    let firstIndication = null;
    for (const indication of Object.keys(indications)) {
        if (!firstIndication) {
            firstIndication = indication;
        }
        const indicationI = indications[indication].permitJointI;
        const I = indicationI - signal.calc.jointI + 1;
        for (let j = 0; j < I - lastIndicationI; j++) {
            if (j > 0 && lastIndication === 'r') {
                lastIndication = 'yr';
            }
            // signal.calc.sequence.push(firstIndication === indication && j < I - lastIndicationI - 1 ? (j === 0 ? 'r' : 'yr') : indication);
            signal.calc.sequence.push(lastIndication);
        }
        lastIndicationI = I;
        lastIndication = indication;
    }

    signal.calc.sequence.push(lastIndication);

    const ygrIndex = signal.lenses.replaceAll('-', '').toUpperCase().indexOf('YGR');

    if (!signal.noRY) {
        signal.calc.lightsArray = signal.calc.sequence.map((el) => {
            if (el === 'r') return `${ygrIndex + 3}`;
            if (el === 'yr') return `${ygrIndex + 1}${ygrIndex + 3}`;
            if (el === 'y') return `${ygrIndex}`;
            if (el === 'yg') return `${ygrIndex}${ygrIndex + 2}`;
            if (el === 'g') return `${ygrIndex + 2}`;
            return el;
        });
    } else {
        signal.calc.lightsArray = signal.calc.sequence.map((el) => {
            if (el === 'r') return `${ygrIndex + 3}`;
            if (el === 'yr') return `${ygrIndex + 3}`;
            if (el === 'y') return `${ygrIndex + 1}`;
            if (el === 'yg') return `${ygrIndex + 1}${ygrIndex + 2}`;
            if (el === 'g') return `${ygrIndex + 2}`;
        });
    }

    signal.calc.lights = signal.calc.lightsArray.join('-');

    return signal.calc.lights;
}

function trackPeregon() {
    const result = {};
    peregon.joints.forEach((el, i, arr) => {
        if (!i) return;
        const x = station1X + el.x;
        const ARSCode = arsCode(el);
        const ARSCodes = ARSCode === 'N' ? '1' : ARSCode;
        const origName = rtl(el.name);
        const Name = ('TC' + rtl(arr[i - 1].name)).toUpperCase();
        const ARSOnly = true;
        const LensesStr = '';
        const SignalType = 0;

        result[origName] = { x, ARSCodes, Name, ARSOnly, LensesStr, SignalType };
    });

    peregon.signals.forEach((el, i, arr) => {
        if (!el.joint) return;
        const joint = rtl(el.joint);
        if (!result[joint]) return;
        if (el.lenses === 'x') return;

        const lenses = el.lenses.replaceAll('Z', 'X').toUpperCase().replaceAll('-', '');
        const redLense = lenses.lastIndexOf('R') + 1;

        if (el.back) {
            result[joint + '_back'] = {
                x: result[joint].x,
                Name: rtl(el.name).replaceAll('-', '').toUpperCase(),
                ARSOnly: false,
                LensesStr: el.lenses.replaceAll('Z', 'X').toUpperCase(),
                SignalType: el.macht ? 1 : 0,
                Left: !el.left ? true : false,
                Back: true,
                Lights: redLense,
            };

            if (el.autostop && el.shift && Math.abs(el.shift) > 0) {
                result[joint + '_back'].NonAutoStop = true;
                result[joint + '_back' + '_autostop'] = {
                    x: result[joint].x - el.shift,
                    Name: 'A' + result[joint].Name,
                    SignalName: result[joint].Name,
                    IsAutostop: true,
                    Back: true,
                }
            }

            return;
        }

        const hasYR = lenses[redLense - 3] === 'Y';

        result[joint].FrontArsName = result[joint].Name.slice(2);
        result[joint].Name = rtl(el.name).replaceAll('-', '').toUpperCase();
        result[joint].ARSOnly = false;
        result[joint].LensesStr = el.lenses.replaceAll('Z', 'X').toUpperCase();
        result[joint].SignalType = el.macht ? 1 : 0;
        result[joint].Left = el.left ? true : false;
        result[joint].Lights = ~lenses.indexOf('YGR') ? lightsCode(el) : (hasYR ? `${redLense}-${redLense}${redLense - 2}` : `${redLense}`);
        result[joint].NonAutoStop = !el.autostop;
        if (el.wall) {
            result[joint].Invisible = true;
        }

        if (el.gmod) {
            Object.assign(result[joint], el.gmod);
        }

        if (el.autostop && el.shift && Math.abs(el.shift) > 0) {
            result[joint].NonAutoStop = true;
            result[joint + '_autostop'] = {
                x: result[joint].x - el.shift,
                Name: 'A' + result[joint].Name,
                SignalName: result[joint].Name,
                IsAutostop: true,
            }
        }
    });

    return result;
}

function rtl(gmodRc) {
    return gmodRc
        .replaceAll('а', 'a')
        .replaceAll('б', 'b')
        .replaceAll('в', 'v')
        .replaceAll('г', 'g')
        .replaceAll('д', 'd')
        .replaceAll('е', 'e')
        .replaceAll('ж', ';')
        .replaceAll('з', 'z')
        .replaceAll('и', 'i')
        .replaceAll('к', 'k')
        .replaceAll('л', 'l')
        .replaceAll('м', 'm')
        .replaceAll('н', 'n')
        .replaceAll('о', 'o')
        .replaceAll('п', 'p')
        .replaceAll('р', 'r')
        .replaceAll('с', 's')
        .replaceAll('т', 't')
        .replaceAll('у', 'u')
        .replaceAll('ф', 'f')
        .replaceAll('х', 'h')
        .replaceAll('ц', 'c')
        .replaceAll('ч', 'x')
        .replaceAll('А', 'A')
        .replaceAll('Б', 'B')
        .replaceAll('В', 'V')
        .replaceAll('Г', 'G')
        .replaceAll('Д', 'D')
        .replaceAll('Е', 'E')
        .replaceAll('Ж', 'J')
        .replaceAll('З', 'Z')
        .replaceAll('И', 'I')
        .replaceAll('К', 'K')
        .replaceAll('Л', 'L')
        .replaceAll('М', 'M')
        .replaceAll('Н', 'N')
        .replaceAll('О', 'O')
        .replaceAll('П', 'P')
        .replaceAll('Р', 'R')
        .replaceAll('С', 'S')
        .replaceAll('Т', 'T')
        .replaceAll('У', 'U')
        .replaceAll('Ф', 'F')
        .replaceAll('Х', 'H')
        .replaceAll('Ц', 'C')
        .replaceAll('Ч', 'X');
}


// document.querySelectorAll('.joint').forEach(el => {
//     el.addEventListener('click', function (e) {
//         console.log('joint');
//         this.style.opacity = '0.5';
//         let target = this;
//         setTimeout(() => {
//             target.style.opacity = '1';
//         }, 200);
//         sectionsCopy();
//     });
// });

function exportTrackSignals(track) {
    const TIMEOUT = 250;

    const query = Object.fromEntries(document.location.search.slice(1).split('&').map(el => el.split('=')));
    const line = query.line;
    const map = query.import;

    if (!line || !lines[line]) {
        console.error('No line specified in "line" query field');
        return;
    }

    if (!map) {
        console.error('No map specified in "import" query field');
        return;
    }

    const count = lines[line][track].length;
    const result = {};

    function exportPeregonSignals(i) {
        setTimeout(() => {
            const a = new App();
            a.init(line, track, i, map).then(() => {
                Object.assign(result, trackPeregon());
            })
        }, i * TIMEOUT);
    }

    for (let i = 0; i < count - 1; i++) {
        exportPeregonSignals(i);
    }

    setTimeout(() => {
        console.log(JSON.stringify(result));
        downloadJSON(result, `signals-${line}-${track}.json`);
    }, count * TIMEOUT);
}

function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
