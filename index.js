//mapy
var map = L.map('map',{zoomControl: false }).setView([53.2731, 16.4585], 10);

var template1 =L.tileLayer('https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=74f36ec57d644e4c824d8eb06e53d4cf', {
  attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
  maxZoom: 20, id: 'osm-bright'}).addTo(map);

var Satelite=L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
    {id: 'mapbox/satellite-v9',
 accessToken: 
'pk.eyJ1Ijoicm9iZXJ0ayIsImEiOiJjaWs5Z3k1ejgwOTY4djltNDV5N2NjaWwzIn0.6Htqjxd5Knc5rZQ7vOpkNw',
maxZoom:20
 });

//warstwy
Border="http://localhost:5000/geojson-border";
    $.getJSON(Border,function(data){ 
	        var Border=L.geoJSON(data,{
            className: 'border',
	        style: {
		        "color": "black",
		        "weight": 3,
				'fillOpacity':0
	        }
});
Border.addTo(map);
});

Poly="http://localhost:5000/geojson-poly";
$.getJSON(Poly,function(data){ 
     L.geoJSON(data,{
        className: 'Poly',
        style: PolyStyle
    }).addTo(map);
})


// warstwy jednostek 	
url_J="http://localhost:5000/geojson-services";

var Military_Layer, FireOSP_Layer, Ambulance_Layer, Police_Layer, Hospital_Layer, Fire_Layer;


$.getJSON(url_J,function(data){ 
	Police_Layer=L.geoJSON(data,{
		filter: feature => feature.properties.emergency === "police",
		pointToLayer: (feature, latlng) => {
			return L.marker(latlng, { icon: P_icon });
		},
		onEachFeature: popups
});
Police_Layer.addTo(map);
updateWarstwy()
});


$.getJSON(url_J,function(data){ 
	Ambulance_Layer=L.geoJSON(data,{
		filter: feature => feature.properties.emergency === "ambulance_station",
		pointToLayer: (feature, latlng) => {
			return L.marker(latlng, { icon: A_icon });
		},
        onEachFeature: popups
});
Ambulance_Layer.addTo(map)
updateWarstwy();
});

$.getJSON(url_J,function(data){ 
	Hospital_Layer=L.geoJSON(data,{
	filter: feature => feature.properties.emergency === "Hospital",
	pointToLayer: (feature, latlng) => {
		return L.marker(latlng, { icon: H_icon });
	},
	onEachFeature: popups
});
Hospital_Layer.addTo(map);
updateWarstwy();
});


$.getJSON(url_J,function(data){ 
	FireOSP_Layer=L.geoJSON(data,{
		filter: feature => feature.properties.emergency === 'fire_brigade',
		pointToLayer: (feature, latlng) => {
			return L.marker(latlng, { icon: OSP_icon });
		},
		onEachFeature: popups
});
FireOSP_Layer.addTo(map);
updateWarstwy();
});


$.getJSON(url_J, function(data) {
    Military_Layer = L.geoJSON(data, {
        filter: feature => feature.properties.emergency === 'military',
        pointToLayer: (feature, latlng) => {
            return L.marker(latlng, { icon: M_icon });
        },
        onEachFeature: popups
});
    Military_Layer.addTo(map);
    updateWarstwy();
});





function updateWarstwy() {
    return {
        'wojsko': Military_Layer,
        'straz': FireOSP_Layer,
        'Karetka': Ambulance_Layer,
        'szpital': Hospital_Layer,
        'policja': Police_Layer,
        'PSP':Fire_Layer
    }} 


$(document).on('change', '#dropdown input[type="checkbox"]', 
function () {
        const layerId = $(this).val(); 
        const layersMap = updateWarstwy();
        const layer = layersMap[layerId];
        if (layer) {
            if (this.checked) {
                if (!map.hasLayer(layer)) {
                    map.addLayer(layer);
                }
            } else {
                if (map.hasLayer(layer)) {
                    map.removeLayer(layer);
}}
}}
);
        
   
$("a#Jednostki").click(function() {
    updateJednostki() ;
    if (!sidebar.isVisible()) {
        sidebar.show();
    }});

L.control.coordinates({position:"bottomright"}).addTo(map);
L.control.scale({position:"bottomright"}).addTo(map);