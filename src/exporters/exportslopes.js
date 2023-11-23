let dist = 0;
let fullslopes = {};

lines.neocrimson[1].forEach((el, i) => {
    let slopes = {};
    Object.entries(el.slopes).forEach(curve => {
        slopes[dist + Number(curve[0])] = curve[1]
    });

    dist += Number(el.trackLength);

    Object.assign(fullslopes, slopes);
})