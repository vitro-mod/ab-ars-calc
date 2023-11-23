let dist = 0;
let fullcurves = {};

lines.neocrimson[1].forEach((el, i) => {
    let curves = {};
    Object.entries(el.curves).forEach(curve => {
        curves[dist + Number(curve[0])] = curve[1]
    });

    dist += Number(el.trackLength);

    Object.assign(fullcurves, curves);
})

console.log(fullcurves);