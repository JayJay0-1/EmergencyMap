var startPoint = null;
var destPoint = null;
var routeLayer = null;
var routeLength = null;

function fromatob(e) {
   
    map.off('click', trsp);
    map.off('click', isochrones);
    
    if (routeLayer && map.hasLayer(routeLayer)) {
        map.removeLayer(routeLayer);
    }

    if (!startPoint) {
        startPoint = L.marker(e.latlng,).addTo(map)
        .bindPopup("<b>Punkt początkowy</b><br><b>Współrzędne: </b>" + e.latlng.lng.toFixed(6) + ";" + e.latlng.lat.toFixed(6)+ 
        '<br>' + '<div class="d-grid gap-2 col-6 mx-auto">'+
        `<button type="button" class="btn btn-primary" onclick="moveToLocation([${e.latlng.lat}, ${e.latlng.lng}])">Przybliż do miejsca</button>`+
        '</div>');    
            
        startPoint.on('dragend', function () {
            updateFormatob();
        });
        return;
    }
    
     if (!destPoint) {
        destPoint = L.marker(e.latlng,).addTo(map)
         .bindPopup("<b>Punkt końcowy:</b><br><b>Współrzędne: </b>" + e.latlng.lng.toFixed(6) + ";" + e.latlng.lat.toFixed(6)+ 
         '<br>' +
        '<div class="d-grid gap-2 col-6 mx-auto">'+
        `<button type="button" class="btn btn-primary" onclick="moveToLocation([${e.latlng.lat}, ${e.latlng.lng}])">Przybliż do miejsca</button>`+
        '</div>'       
        );

        destPoint.on('dragend', function () {
            updateFormatob();
        });
    }

    
    if (!startPoint || !destPoint)  return;

    const params = {
        x1: startPoint.getLatLng().lng,
        y1: startPoint.getLatLng().lat,
        x2: destPoint.getLatLng().lng,
        y2: destPoint.getLatLng().lat
    };

        var gs_url = "http://127.0.0.1:5000/geojson-dijkstra";
        const url3 = gs_url + "?" + new URLSearchParams(params);

        fetch(url3)
            .then(response => response.json())
            .then(data => {
                routeLayer = L.geoJSON(data, { 
                    style: {
                        color: "blue",
                        weight: 4,
                        opacity: 0.8
                    },onEachFeature:function (feature) {
                        routeLength = feature.properties.dlugosc_km;   
            }
            }).addTo(map);
                updateFormatob();
                map.off('click', fromatob);
            })        
    }
   
$("a#trasaa").click(function () {
    updateFormatob();
    if (!sidebar.isVisible()) {
        sidebar.show();
} 
});
    
$(document).on('change', '#fromatob', function() {
if ($(this).is(':checked')) {
    map.on('click', fromatob);
} else {
    map.off('click', fromatob);
}
});