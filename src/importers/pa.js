const paRes = await fetch('/data/metrostroi_data/pa_gm_mustox_neocrimson_line_a.txt');
const pa = await paRes.json();
const paths = {}

for (const marker of pa.markers) {
    paths[marker.PAStationPath] = paths[marker.PAStationPath] || [];
    paths[marker.PAStationPath].push({
        TrackX: marker.TrackX,
        PAStationName: marker.PAStationName,
        Marker: marker
    })
}
for (const path of Object.values(paths)) {
    path.sort((a, b) => {
        return a.TrackX - b.TrackX;
    });
}

console.log(paths);