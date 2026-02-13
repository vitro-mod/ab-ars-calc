function sections() {
    return peregon.signals.filter(el => !el.back).map(el => {
        if (el.back) return;
        let sections = {};
        sections.nm = (el.gmod?.name ?? el.name).replace('-', '');
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
        let nm = el.name.replaceAll('-', '');
        let name = 'sig' + nm;
        if (el.double && el.doubleL) name += '/';
        if (el.double && !el.doubleL) name += '//';
        if (el.lenses == 'x') return;
        signals[name] = {
            name: rtl((el.gmod?.name ?? el.name).replaceAll('-', '').toUpperCase()),
        };
        switch (el.lenses.replaceAll('-', '').replaceAll('M', '')) {
            case 'RYYGR':
            case 'RYYGRw':
                signals[name].def = '00000';
                signals[name].ro = '00001';
                signals[name].rr = '10001';
                signals[name].ry = '00101';
                signals[name].ya = '00100';
                signals[name].yo = '01000';
                signals[name].yg = '01010';
                signals[name].go = '00010';
                break;
            case 'RBYYGR':
            case 'RBYYGRw':
                signals[name].def = '000000';
                signals[name].ro =  '000001';
                signals[name].rr =  '100001';
                signals[name].ry =  '000101';
                signals[name].ya =  '000100';
                signals[name].yo =  '001000';
                signals[name].yg =  '001010';
                signals[name].go =  '000010';
                signals[name].bo =  '010000';
                break;
            case 'YYGR':
            case 'YYGRw':
            case 'YYGRZ':
                signals[name].def = '0000';
                signals[name].ro = '0001';
                signals[name].ry = '0101';
                signals[name].ya = '0100';
                signals[name].yo = '1000';
                signals[name].yg = '1010';
                signals[name].go = '0010';
                break;
            case 'BYYGRw':
                signals[name].def = '00000';
                signals[name].ro = '00001';
                signals[name].ry = '00101';
                signals[name].ya = '00100';
                signals[name].yo = '01000';
                signals[name].yg = '01010';
                signals[name].go = '00010';
                signals[name].bo = '10000';
                break;
            case 'ZYYGRZ':
                signals[name].def = '00000';
                signals[name].ro = '00001';
                signals[name].ry = '00101';
                signals[name].ya = '00100';
                signals[name].yo = '01000';
                signals[name].yg = '01010';
                signals[name].go = '00010';
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
                break
            case 'BYGR':
            case 'BYGRw':
                signals[name].def = '0000';
                signals[name].ro = '0001';
                signals[name].ry = '0101';
                signals[name].ya = '0100';
                signals[name].yo = '0100';
                signals[name].yg = '0110';
                signals[name].go = '0010';
                signals[name].bo = '1000';
                break;
            case 'RYGR':
            case 'RYGRw':
                signals[name].def = '0000';
                signals[name].ro = '0001';
                signals[name].rr = '1001';
                signals[name].ry = '0101';
                signals[name].ya = '0100';
                signals[name].yo = '0100';
                signals[name].yg = '0110';
                signals[name].go = '0010';
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
            case 'ZYGRZ':
            case 'ZYGRw':
                signals[name].def = '0000';
                signals[name].ro = '0001';
                signals[name].ry = '0101';
                signals[name].ya = '0010';
                signals[name].yo = '0100';
                signals[name].yg = '0110';
                signals[name].go = '0010';
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
            case 'BYWRw':
                signals[name].def = '0000';
                signals[name].ro = '0001';
                signals[name].ry = '0101';
                signals[name].wo = '0010';
                signals[name].bo = '1000';
                break;
            case 'BWR':
            case 'BWRw':
                signals[name].def = '000';
                signals[name].ro = '001';
                signals[name].wo = '010';
                signals[name].bo = '100';
                break;
            case 'RBWYYGR':
            case 'RBWYYGRw':
                signals[name].def = '000000';
                signals[name].ro = '000001';
                signals[name].ry = '0000101';
                signals[name].ya = '0000100';
                signals[name].yo = '0001000';
                signals[name].yg = '0001010';
                signals[name].go = '0000010';
                signals[name].wo = '0010000';
                signals[name].bo = '0100000';
                signals[name].rr = '1000001';
                break;
            case 'RBWyYGRYw':
                signals[name].def = '00000000';
                signals[name].ro = '00000010';
                signals[name].ry = '00001010';
                signals[name].ya = '00001000';
                signals[name].yo = '00001000';
                signals[name].yg = '00001100';
                signals[name].go = '00000100';
                signals[name].wo = '00100000';
                signals[name].bo = '01000000';
                signals[name].rr = '10000010';
                signals[name].yy = '00010001';
                signals[name].yfy = '00020001';
                break;
            case 'RZZYYGRZ':
                signals[name].def = '000000';
                signals[name].ro = '000001';
                signals[name].ry = '0000101';
                signals[name].ya = '0000100';
                signals[name].yo = '0001000';
                signals[name].yg = '0001010';
                signals[name].go = '0000010';
                signals[name].rr = '1000001';
                break;
            case 'RByWRY':
            case 'RByWRYw':
                signals[name].def = '000000';
                signals[name].ro = '000010';
                signals[name].wo = '000100';
                signals[name].bo = '010000';
                signals[name].rr = '100010';
                signals[name].yy = '001001';
                signals[name].yfy = '002001';
                break;
            case 'BWyYYR':
            case 'BWyYYRw':
                signals[name].def = '000000';
                signals[name].ro = '000001';
                signals[name].ry = '000101';
                signals[name].wo = '010000';
                signals[name].bo = '100000';
                signals[name].yy = '001010';
                signals[name].yfy = '002010';
                break;
            case 'ZR':
                signals[name].ro = '01';
                break;
            case 'Zr':
                signals[name].rf = '02';
                break;
            case 'Rw':
                signals[name].ro = '1';
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
        const st = signal.slice(0, 2);
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

function signalsCopy() {
    let resultText = ``;
    for (const [name, signal] of Object.entries(signals())) {
        resultText += `"${name}": ${JSON.stringify(signal)},\n`;
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
        const origName = rtl(el.gmod?.name ?? el.name);
        const x = station1X + el.x;
        if (i) {
            const ARSCode = arsCode(el);
            const ARSCodes = ARSCode === 'N' ? '1' : ARSCode;
            const Name = ('TC' + rtl(arr[i - 1].name)).toUpperCase();
            const ARSOnly = true;
            const LensesStr = '';
            const SignalType = 0;
            const Routes = [
                {
                    NextSignal: '*',
                    ARSCodes: ARSCodes,
                },
            ];

            result[origName] = { x, Routes, Name, ARSOnly, LensesStr, SignalType };
        }

        if (el.vksCalc && i) {
            result[origName + '_ray'] = {
                IsRay: true,
                x: x + el.vksCalc.l,
                Name: ('FS' + rtl(el.name)).toUpperCase(),
                AdjacentSignalName: ('TC' + rtl(arr[i - 1].name)).toUpperCase(),
                RequiredSpeed: el.vksCalc.v,
            }
        }

        if (el.left) {
            result[origName].Left = true;
        }

        if (el.bothDirections || el.back) {
            if (i && el.back) {
                // delete result[origName];
            }
            const isOdd = Number(el.name.replace(/\D/g, '')) % 2 === 1;
            result[origName + '_back'] = {
                x: x,
                Name: (`TC${rtl(el.name)}${isOdd ? 'CH' : 'N'}`).toUpperCase(),
                ARSOnly: true,
                LensesStr: '',
                SignalType: 0,
                Back: true,
                Left: !el.left,
            }
        }
    });

    peregon.signals.forEach((el, i, arr) => {
        if (!el.joint) return;
        const joint = rtl(el.joint);
        if (!result[joint]) return;
        if (el.lenses === 'x') return;

        const lenses = el.lenses.toUpperCase().replaceAll('Z', 'X').replaceAll('-', '');
        const redLense = lenses.lastIndexOf('R') + 1;

        if (el.back) {
            result[joint + '_back'] = {
                x: result[joint].x,
                Name: rtl(el.gmod?.name ?? el.name).replaceAll('-', '').toUpperCase(),
                ARSOnly: false,
                LensesStr: el.lenses.toUpperCase().replaceAll('Z', 'X'),
                SignalType: el.macht ? 1 : 0,
                Left: !el.left ? true : false,
                Back: true,
                Routes: [
                    {
                        NextSignal: '*',
                        Lights: redLense,
                    }
                ],
                NonAutoStop: !el.autostop,
            };

            if (el.gmod) {
                if (el.gmod.Routes && el.gmod.Routes[0]) {
                    Object.assign(el.gmod.Routes[0], result[joint + '_back'].Routes[0]);
                }
                Object.assign(result[joint + '_back'], el.gmod);
                if (el.gmod.name) {
                    result[joint + '_back'].SignalName = rtl(el.name).replaceAll('-', '').toUpperCase();
                    if (result[joint + '_back'].SignalName === 'DOP') {
                        result[joint + '_back'].Routes[0].Lights = '';
                    }
                }
            }

            if (el.autostop && el.shift && Math.abs(el.shift) > 0) {
                result[joint + '_back'].NonAutoStop = true;
                result[joint + '_back' + '_autostop'] = {
                    x: result[joint].x - el.shift,
                    Name: 'A' + result[joint + '_back'].Name,
                    SignalName: result[joint + '_back'].Name,
                    IsAutostop: true,
                    Back: true,
                }
            }

            return;
        }

        const hasYR = lenses[redLense - 3] === 'Y';

        result[joint].FrontArsName = result[joint].Name.slice(2);
        result[joint].Name = rtl(el.gmod?.name ?? el.name).replaceAll('-', '').toUpperCase();
        result[joint].ARSOnly = false;
        result[joint].LensesStr = el.lenses.toUpperCase().replaceAll('Z', 'X');
        result[joint].SignalType = el.macht ? (el.assembl ? 2 : 1) : (el.assembl ? 5 : 0);
        result[joint].Left = el.left ? true : false;
        result[joint].Double = el.double ? true : false;
        result[joint].DoubleL = el.doubleL ? true : false;
        if (el.double) {
            result[joint].Name += el.doubleL ? '/' : '//';
        }
        result[joint].Routes[0].Lights = ~lenses.indexOf('YGR') ? lightsCode(el) : (hasYR ? `${redLense}-${redLense}${redLense - 2}` : `${redLense}`);
        result[joint].NonAutoStop = !el.autostop;
        if (el.wall) {
            result[joint].Invisible = true;
        }

        if (el.gmod) {
            if (el.gmod.Routes && el.gmod.Routes[0]) {
                Object.assign(el.gmod.Routes[0], result[joint].Routes[0]);
            }
            Object.assign(result[joint], el.gmod);
            if (el.gmod.name) {
                result[joint].SignalName = rtl(el.name).replaceAll('-', '').toUpperCase();
            }
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

    peregon.signals.forEach((el, i, arr) => {
        if (!el.joint) return;
        const joint = rtl(el.joint);
        if (!result[joint]) return;
        if (!result[joint + '_ray']) return;
        console.log(result[joint]);
        result[joint + '_ray'].AdjacentSignalName = result[joint].Name;
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
