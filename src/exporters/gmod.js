function sections() {
    
    return peregon.signals.map(el => {
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
        resultText += `gmod[''].sections['${section.nm}'] = '${section.rc}';\n`
    }
    console.log(resultText);
    // navigator.clipboard.writeText(resultText);
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