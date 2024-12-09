var value = 5;
let markers = []
let results = []

function isochrones(e) {
    
    map.off('click', fromatob);
    map.off('click', trsp);
    var urlIZo = "http://127.0.0.1:5000/geojson-alphashape";
    
    const marker = new L.marker(e.latlng,) .addTo(map)
    .bindPopup(`<p><b>Współrzędne: </b> ${e.latlng.lng.toFixed(6)} ; ${e.latlng.lat.toFixed(6)} <br><p><b>Czas: </b> ${value} minut </p>`);
                            
    markers.push(marker);

    const x = e.latlng.lng.toFixed(3);
    const y = e.latlng.lat.toFixed(3);
    const url2 = urlIZo + "?x=" + x + "&y=" + y + "&dim=" + value;

    fetch(url2)
        .then(response => response.json())
        .then(geojsonData => {
            const result = L.geoJSON(geojsonData, {
                style: {
                    color: 'red',
                    weight: 2,
                    opacity: 0.8,
    }
}).addTo(map);
results.push(result)
map.off('click', isochrones);
$('#isochrones').prop('checked', false);
})}
       
$(document).on('change', '#isochrones', function() {
    if ($(this).is(':checked')) {
        map.on('click', isochrones);
    } else {
        map.off('click', isochrones);  
}});


$("a#izooo").click(function () {
    updateIzochrones();
    if (!sidebar.isVisible()) {
        sidebar.show();
}});
