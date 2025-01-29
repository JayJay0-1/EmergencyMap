var sidebar = L.control.sidebar('sidebar', {
    position: 'left',
    closeButton: true,
});

map.addControl(sidebar);

function updateInfo(feature, layer) {
    sidebar.setContent(
        `<h1>Jednostka: ${choiceIcon(feature)}</h1>`+
        `<h4>  ${feature.properties.name} </h4>`+
        '<hr style="height: 10px; color: red; background-color: blue;" />'+
        `${choicePhoto(feature)}` +
        '<hr style="height: 10px; color: red; background-color: blue;" />'+
        `<h6><img src='/static/icons/addres.png' width="30" height="30"> ${feature.properties.addres}</h6><br>` +
        `<h6><img src='/static/icons/web.png' width="30" height="30"> 
        <a href="${feature.properties.website}" target="_blank">Przejdź do strony jednostki</a></h6>` +
        '<h6><b>Kontakt:</b></h6>' +
        `<h7><img src='/static/icons/phone.png' width="30" height="30">   ${feature.properties.phone}  </h7><br><br>` +
        `<h7><img src='/static/icons/mail.png' width="30" height="30">  ${feature.properties.email} </h7>` +
        '<hr style="height: 10px; color: red; background-color: blue;" />'+
        '<div class="d-grid gap-2 col-6 mx-auto">'+
            `<button type="button" class="btn btn-primary" onclick="moveLocation([${layer.getLatLng().lat}, ${layer.getLatLng().lng}])">Przybliż do miejsca</button>`+
            '</div>'+
            '<br>'       
    );
    if (!sidebar.isVisible()) {
        sidebar.show();
}
}

    
function updateIzochrones() {
    sidebar.setContent(
        `<h2>Dostępność służb <img src="/static/icons/stop.png" width="50" height="50"></h2>` +
        '<hr style="height: 10px; color: red; background-color: blue;" />'+ 
        '<h5><b>Wybierz czas w jakim służby będą dostępne: </b></h5>' + '<br>'+
        '<div class="input-group mb-3">'+
        '<input type="text" id="test" value="' + value + '" class="form-control" aria-describedby="button-addon2">'+
        '<button class="btn btn-outline-primary" type="button" id="set" >Ustaw [min]</button>'+
        '</div>'+
        '<br>'+
        '<hr style="height: 10px; color: red; background-color: blue;" />'+
        '<div class="d-grid gap-2 col-6 mx-auto">'+
        '<input type="checkbox" class="btn-check" id="isochrones" autocomplete="off" value="isochrones">'+ 
        '<label class="btn btn-outline-success" for="isochrones">Wybierz punkt</label>'
        +'</div>'         
    );

    $("#set").off('click').on('click', function() {
        value = $("#test").val(); 
    });
};

function choiceIcon(feature){
        if (feature.properties.emergency == 'fire_brigade')
            return '<img src="/static/icons/OSP.png" width="40" height="40">'

        if (feature.properties.emergency == 'police')
            return '<img src="/static/icons/police.png" width="40" height="40">'
        if (feature.properties.emergency == 'Hospital')
            return '<img src="/static/icons/hospital.png" width="40" height="40">'

        if (feature.properties.emergency == 'ambulance_station')
            return '<img src="/static/icons/ambulance.png" width="40" height="40">'

        if (feature.properties.emergency == 'military')
            return '<img src="/static/icons/military.png" width="40" height="40">'
}

function choicePhoto(feature) {
    const photos = 26;
    for (let id = 1; id <= photos; id++) {
        if (feature.properties.id == id) {
            return `<img src="/static/photo/${id}.png" style="max-width: 100%; height: auto; display: inline-block;">`;
}}}
    

function updateTRSP() {
    sidebar.setContent(`
        <h2>Trasa z barierą <img src="/static/icons/trspp.png" width="50" height="50"></h2>
        <hr style="height: 10px; color: red; background-color: blue;" />
        <h5><b>Wybierz trasę z ominięciem przeszkody</b></h5>
        <h6><b>Ustaw średnice punktu restrykcji [m]:</b></h6>
        <div class="input-group mb-3">
        <input type="text" id="test3" value="${buffer}" class="form-control" aria-describedby="button-addon2">
        <button class="btn btn-outline-primary" type="button" id="set2" >Ok</button>
        </div>`+
        '<h6><b>Punkt restrykcji:</b><br>'+ (restrictionPoint ? `Współrzędne: ${restrictionPoint.lng.toFixed(6)}, ${restrictionPoint.lat.toFixed(6)}`: 'Nie ustawiono') + 
        '</h6>'+
        '<h6><b>Punkt początkowy:</b><br>'+ (startPoint1 ? `Współrzędne: ${startPoint1.getLatLng().lng.toFixed(6)}, ${startPoint1.getLatLng().lat.toFixed(6)}`: 'Nie ustawiono') +
        '</h6>'+
        '<h6><b>Punkt końcowy:</b><br>' + (destPoint1 ? `Współrzędne: ${destPoint1.getLatLng().lng.toFixed(6)}, ${destPoint1.getLatLng().lat.toFixed(6)}`: 'Nie ustawiono')+
        '</h6>'+
        `<hr style="height: 10px; color: red; background-color: blue;" />
        <div class="d-grid gap-2 col-6 mx-auto">
        <input type="checkbox" class="btn-check" id="Przeszkoda" autocomplete="off" value="Przeszkoda">
        <label class="btn btn-outline-success" for="Przeszkoda">Wybierz</label>
        </div><br>`+
        `<div class="d-grid gap-2 col-6 mx-auto">`+
        `<button type="button" class="btn btn-primary" onclick="map.fitBounds(routeLayer1.getBounds());">Przybliż</button>`+
        '</div>'
);
    $("#set2").off('click').on('click', function () {
       buffer = $("#test3").val();
});
}

function updateJednostki(){
    sidebar.setContent(`
        <h2>Warstwy    <img src="/static/icons/layerr.png" width="50" height="50"></h2> 
        <hr style="height: 10px; color: red; background-color: blue;" />
        <br><br> 
        <ul id="dropdown">
    <li>
        <div class="d-flex justify-content-between align-items-center">
            <img src="/static/icons/amb.png" width="40" height="40" style="margin-left:2px;" class="me-2">
            <div class="d-flex align-items-center" style="flex-grow: 1; justify-content: space-between;">
                <label class="form-check-label" for="Karetka" style="font-size:130%; margin-right: 10px;">
                    <b>Stacje Pogotowia Ratunkowego</b>
                </label>
                <input class="form-check-input" type="checkbox" id="Karetka" value="Karetka" checked style="transform: scale(1.5);">
            </div>
        </div>
    </li>
    <br>
    <li>
        <div class="d-flex justify-content-between align-items-center">
            <img src="/static/icons/hosp.png" width="40" height="40" style="margin-left:2px;" class="me-2">
            <div class="d-flex align-items-center" style="flex-grow: 1; justify-content: space-between;">
                <label class="form-check-label" for="szpital" style="font-size:130%; margin-right: 10px;">
                    <b>Szpital</b>
                </label>
                <input class="form-check-input" type="checkbox" id="szpital" value="szpital" checked style="transform: scale(1.5);">
            </div>
        </div>
    </li>
    <br>
    <li>
        <div class="d-flex justify-content-between align-items-center">
            <img src="/static/icons/military.png" width="40" height="40" style="margin-left:2px;" class="me-2">
            <div class="d-flex align-items-center" style="flex-grow: 1; justify-content: space-between;">
                <label class="form-check-label" for="wojsko" style="font-size:130%; margin-right: 10px;">
                    <b>Obiekty Wojskowe</b>
                </label>
                <input class="form-check-input" type="checkbox" id="wojsko" value="wojsko" checked style="transform: scale(1.5);">
            </div>
        </div>
    </li>
    <br>
    <li>
        <div class="d-flex justify-content-between align-items-center">
            <img src="/static/icons/OSP.png" width="40" height="40" style="margin-left:2px;" class="me-2">
            <div class="d-flex align-items-center" style="flex-grow: 1; justify-content: space-between;">
                <label class="form-check-label" for="straz" style="font-size:130%; margin-right: 10px;">
                    <b>Straż Pożarna</b>
                </label>
                <input class="form-check-input" type="checkbox" id="straz" value="straz" checked style="transform: scale(1.5);">
            </div>
        </div>
    </li>
    <br>
    <li>
        <div class="d-flex justify-content-between align-items-center">
            <img src="/static/icons/poli.png" width="40" height="40" style="margin-left:2px;" class="me-2">
            <div class="d-flex align-items-center" style="flex-grow: 1; justify-content: space-between;">
                <label class="form-check-label" for="straz" style="font-size:130%; margin-right: 10px;">
                    <b>Policja</b>
                </label>
                <input class="form-check-input" type="checkbox" id="policja" value="policja" checked style="transform: scale(1.5);">
            </div>
        </div>
    </li>
    <br>
</ul>`)
};

function updateFormatob() {
        sidebar.setContent(
            `<h1>Nawiguj <img src="/static/icons/navv.png" width="50" height="50"></h1>`+
            '<hr style="height: 10px; color: red; background-color: blue;" />'+
            '<h5><b>Wyznacz najszybszą trasę: </b></h5>'+'<br>'+'<br>'+
            '<h6><b>Punkt początkowy:</b>' + '<br>'+
            (startPoint ? `Współrzędne: ${startPoint.getLatLng().lng.toFixed(6)}, ${startPoint.getLatLng().lat.toFixed(6)}` : 'Nie ustawiono') +
            '</h6>' +
            '<h6><b>Punkt końcowy:</b>' +'<br>'+
            (destPoint ? `Współrzędne: ${destPoint.getLatLng().lng.toFixed(6)}, ${destPoint.getLatLng().lat.toFixed(6)}` : 'Nie ustawiono') +
            '</h6>' +
            '<h6><b>Długość trasy: </b>' +'<br>'+ (routeLength ? routeLength + ' km' : 'Nie obliczono') + '</h6>'+'<br>'+
             '<hr style="height: 10px; color: red; background-color: blue;" />'+
             '<div class="d-grid gap-2 col-6 mx-auto">'+
            '<input type="checkbox" class="btn-check" id="fromatob" autocomplete="off" value="fromatob">'+
            '<label class="btn btn-outline-success" for="fromatob">Wybierz</label>'
            +'</div>'+
            '<br>'+
            '<div class="d-grid gap-2 col-6 mx-auto">'+
            `<button type="button" class="btn btn-primary" onclick="map.fitBounds(routeLayer.getBounds());">Przybliż</button>`+
            '</div>'
            
               
        );
    }