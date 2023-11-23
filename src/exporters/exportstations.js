let dist = 0;
let fullstations = {};

lines.neocrimson[1].forEach((el,i) => {

    fullstations[dist] = el.name;
    
    dist += Number(el.trackLength);
    
})