// Ikony 
var P_icon = L.icon({iconUrl:'/static/icons/poli.png', iconSize:[30,30]});
var H_icon = L.icon({iconUrl:'/static/icons/hosp.png', iconSize:[30,30]});
var A_icon = L.icon({iconUrl:'/static/icons/amb.png', iconSize:[30,30]});
var PSP_icon = L.icon({iconUrl:'/static/icons/PSP.png', iconSize:[30,30]});
var OSP_icon = L.icon({iconUrl:'/static/icons/OSP.png', iconSize:[30,30]});
var M_icon = L.icon({iconUrl:'/static/icons/military.png', iconSize:[30,30]});

var iconLayersControl = new L.Control.IconLayers(
[{
    title: 'Mapa', 
    layer: template1, 
    icon: '/static/icons/osm.png' },
{
    title: 'Satelita',
    layer: Satelite,
    icon: '/static/icons/sate.png'
}
], { 
    position: 'bottomleft',
    maxLayersInRow: 5
}
);

iconLayersControl.addTo(map);

var StyleHospital = new L.StripePattern({
    angle: 45,
    weight: 5, 
    spaceWeight: 2, 
    color: 'red', 
    opacity: 1,
})
StyleHospital.addTo(map);

var stripePatternM = new L.StripePattern({
    angle: 45, 
    weight: 2, 
    spaceWeight: 2, 
    color: 'green', 
    opacity: 1 
});
stripePatternM.addTo(map);

var stylestraz = new L.StripePattern({
    angle: 45, 
    weight: 2, 
    spaceWeight: 2, 
    color: 'orange', 
    opacity: 1 
});
stylestraz.addTo(map);

var stylepolice = new L.StripePattern({
    angle: 45, 
    weight: 2, 
    spaceWeight: 2, 
    color: 'blue', 
    opacity: 1 
});
stylepolice.addTo(map);

function PolyStyle(feature) {
    for (emergency in feature.properties.emergency)
        if (feature.properties.emergency === "military"){
            return {fillPattern: stripePatternM, color: 'green',weight: 2}
        }
        else if(feature.properties.emergency === "hospital" || feature.properties.emergency === "ambulance_station") {
            return {fillPattern: StyleHospital, color: 'DarkSalmon',weight: 2}     
        }
        else if(feature.properties.emergency === "police") {
            return {fillPattern: stylepolice, color: 'blue',weight: 2}   
        }
        else if(feature.properties.emergency === "straż pożarna") {
            return {fillPattern: stylestraz, color: 'red',weight: 2}  
        }
}

function popups(feature, layer) {
    layer.on('click', function () {
    updateInfo(feature, layer);
    })}

    
function moveLocation(latlng) {
    map.setView(latlng, 20);
}
        
$("#clear").off('click').on('click', function () {  
const layers = [
    { layer: startPoint, reset: () => startPoint = null },
    { layer: destPoint, reset: () => destPoint = null },
    { layer: routeLayer, reset: () => { routeLayer = null; routeLength = null; } },
    { layer: markers, reset: () => markers = [] },
    { layer: results, reset: () => results = [] },
    { layer: startPoint1, reset: () => startPoint1 = null },
    { layer: destPoint1, reset: () => destPoint1 = null },
    { layer: routeLayer1, reset: () => routeLayer1 = null },
    { layer: bufferCircle, reset: () => bufferCircle = null },
    { layer: restrictionMarker, reset: () => { restrictionMarker = null; restrictionPoint = null; } }
];        
layers.forEach(({ layer, reset }) => {
    if (layer) {
        if (Array.isArray(layer)) {
            layer.forEach(layer2 => map.hasLayer(layer2) && map.removeLayer(layer2));
        } else if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
        reset();
    }
});
});