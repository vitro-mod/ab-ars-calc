function sections() {
    return peregon.signals.filter(el => !el.back).map(el => {
        if (el.back) return; 
        let sections = {};
        sections.nm = el.name.replace('-', '');
        sections.rc = 'rc' + el.joint;
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

function arsCode(joint) {
    let result = '';

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

function rtl(gmodRc) {
    return gmodRc
        .replaceAll('а', 'a')
        .replaceAll('б', 'b')
        .replaceAll('в', 'v')
        .replaceAll('г', 'g')
        .replaceAll('д', 'd')
        .replaceAll('е', 'e')
        .replaceAll('ж', 'j')
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