let startPoint1 = null;
let destPoint1 = null;
let restrictionPoint = null; 
let routeLayer1 = null;
let buffer = 100; 
let bufferCircle = null; 
let restrictionMarker = null; 

const trspURL= "http://127.0.0.1:5000/geojson-trsp"; 

function trsp(e) {
    
    if (routeLayer1 && map.hasLayer(routeLayer1)) {
        map.removeLayer(routeLayer1);
    }

    map.off('click', fromatob);
    map.off('click', isochrones);
    const coords = e.latlng;

    if (!restrictionPoint) {
        restrictionMarker = L.marker(coords).addTo(map)
        .bindPopup(`<b>Punkt restrykcji</b><br>
        <b>Współrzędne: </b>${coords.lng.toFixed(6)}, ${coords.lat.toFixed(6)}                
        <br><b>Promień restrykcji: </b>${buffer} metrów`)               
                  
    restrictionPoint = restrictionMarker.getLatLng();    
    
    restrictionMarker.on('dragend', function () {
        restrictionPoint = restrictionMarker.getLatLng();
        if (bufferCircle) bufferCircle.setLatLng(restrictionPoint);
        updateTRSP();
        });
        

    bufferCircle = L.circle([restrictionPoint.lat, restrictionPoint.lng], {
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.2,
            radius: buffer
        }).addTo(map);
        return;
    }    

    if (!startPoint1) {
        startPoint1 = L.marker(coords)
            .addTo(map)
            .bindPopup(`<b>Punkt początkowy</b><br><b>Współrzędne: </b>${coords.lng.toFixed(6)}, ${coords.lat.toFixed(6)}`)
        
        startPoint1.on('dragend', function () {
            updateTRSP();
        });
        return;
}

    if (!destPoint1) {
        destPoint1 = L.marker(coords).addTo(map)
         .bindPopup(`<b>Punkt końcowy</b><br><b>Współrzędne: </b>${coords.lng.toFixed(6)}, ${coords.lat.toFixed(6)}`)    
           
        destPoint1.on('dragend', function () {
            updateTRSP();
        });      
}
    if (!startPoint1 || !destPoint1 || !restrictionPoint) return;

    const params2 = {
        x1: startPoint1.getLatLng().lng,
        y1: startPoint1.getLatLng().lat,
        x2: destPoint1.getLatLng().lng,
        y2: destPoint1.getLatLng().lat,
        x3: restrictionPoint.lng,
        y3: restrictionPoint.lat,
        Buffer: buffer
    };

    const url = trspURL + "?" + new URLSearchParams(params2);

    if (routeLayer1) {
        map.removeLayer(routeLayer1);
    }

    fetch(url)
        .then(response => response.json())
        .then(geojsonData => {
            routeLayer1 = L.geoJSON(geojsonData, {
                style: {
                    color: "blue",
                    weight: 4,
                    opacity: 1
}}).addTo(map);
updateTRSP();
map.off('click', trsp);
})  
}

$(document).on('change', '#Przeszkoda', function() {
    if ($(this).is(':checked')) {
        map.on('click', trsp);
} 
    else {
        map.off('click', trsp);
}
});


$("a#trspp").click(function () {
    updateTRSP();
    if (!sidebar.isVisible()) {
        sidebar.show();
} 
});