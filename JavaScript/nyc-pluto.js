// python -m http.server | localhost: 800

// ZIP CODE OUTLINES
// THEN ZOOM IN TO DETAIL

// ceate map with starting coordinates
var map = L.map("map", {
    center: [40.7831, -73.9712],
    simplifyFactor: 0.5,
    precision: 0.5,
    zoom: 13
});


// zip codes
// link to zipcode data
var link2 = "zip2.geojson";

// outline by zipcode
d3.json(link2, function (data) {
    L.geoJson(data, {
        // Style each feature (in this case a neighborhood)
        style: function (feature) {
            return {
                color: "white",
                // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                //fillColor: chooseColor(feature.properties.borough),
                fillOpacity: 0,
                weight: 1
            };
        },
        // on each feature
        onEachFeature: function (feature, layer) {
            // set mouse events to change map styling
            layer.on({
                // event listener
                mouseover: function (event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 1
                    });
                },
                // another function, mouse no longer over it
                mouseout: function (event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0
                    });
                },
                // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
                click: function (event) {
                    map.fitBounds(event.target.getBounds());
                }
            });
            // pop-up: postalCode / borough
            layer.bindPopup("<h3>" + feature.properties.postalCode + "</h3> <hr> <h5>" + feature.properties.borough + "</h5>");
        }
    }).addTo(map);
});


// link GeoJSON data
var link = "man-limit-pluto.geojson";
//var link = "https://dl.dropbox.com/s/26vgv7iekolrttu/man-limit-pluto-topo.json?dl=0";


// yearbuilt
function colorRamp(value_type, value) {

    if (value_type === "yearbuilt") {

        if (value >= 0 && value < 1600){
            return  "#FFFFFF";
        }
        else if (value >= 1600 && value < 1700){
            return "#ffecb3";
        }  
        else if (value >= 1700 && value < 1800){
            return "#ffd740";
        }
        else if (value >= 1800 && value < 1850){
            return "#ffab00";
        }
        else if (value >= 1850 && value < 1900){
            return "#ff6d00";
        }
        else if (value >= 1900 && value < 1925){
            return "#ff8a80";
        }
        else if (value >= 1925 && value < 1950){
            return "#d50000";
        }
        else if (value >= 1950 && value < 1975){
            return "#ff4081";
        }
        else if (value >= 1975 && value < 2000){
            return "#f50057";
        }
        else if (value >= 2000 && value < 2025){
            return "#ad1457";
        }
        else {
            return "#FFFFFF";
        }
    };

    // numfloors
    if (value_type === "numfloors") {
        
        if (value === 0){
            return  "#ffffff";
        }
        else if (value >= 1 && value < 5){
            return "#00bfa5";
        }  
        else if (value >= 5 && value < 10){
            return "#00bfa5";
        }  
        else if (value >= 10 && value < 20){
            return "#00e5ff";
        }
        else if (value >= 20 && value < 30){
            return "#00b0ff";
        }
        else if (value >= 30 && value < 40){
            return "#304ffe";
        }
        else if (value >= 40 && value < 50){
            return "#6200ea";
        }
        else if (value >= 50 && value < 60){
            return "#aa00ff";
        }
        else if (value >= 60 && value < 300){
            return "#e404fb";
        }
        else {
            return "#FFFFFF";
        }
    };

    // landusew
    if (value_type === "landuse") {
        
        if (value == 1){ // one & two family buildings
            return  "#FFDD80";
        }
        else if (value == 2){ // multi-family walk-up buildings
            return "#FF9100";
        }  
        else if (value == 3){ // multi-family elevator buildings
            return "#BF360C";
        }
        else if (value == 4){ // mixed residential & commercial buildings
            return "#FF5252";
        }
        else if (value == 5){ // commercial & office buildings
            return "#C51162";
        }
        else if (value == 6){ // industrial & manufacturing
            return "#7B1FA2";
        }
        else if (value == 7){ // transportation & utility
            return "#BA68C8";
        }
        else if (value == 8){ // public facilities & instutions
            return "#0D47A1";
        }
        else if (value == 9){ // open space & outdoor recreation
            return "#00BFA5";
        }
        else if (value == 10){ // parking facilities
            return "#607D8B";
        }
        else if (value == 11){ // vacant land
            return "#263238";
        }
        else { //other
            return "#eceff1";
        }
    };
}

function chooseColor(value_type) {

    d3.json(link, function(response) {

        // grab GeoJSON data
        d3.json(link, function(data) {
            // creating a GeoJSON layer with the retrieved data
            // value of style property needs to be an anonymous function
            L.geoJson(data, {
            style: function(feature) {
                return {
                color: "white",
                // find this in our JSON
                fillColor: colorRamp(value_type, feature.properties[value_type]),
                fillOpacity: 1,
                weight: .5
                };
            }
            }).addTo(map);
        });

    })
}
chooseColor("yearbuilt");


/*
OLD COLORS
 // landuse
    if (value_type === "landuse") {
        
        if (value == 1){ // one & two family buildings
            return  "#ffe57f";
        }
        else if (value == 2){ // multi-family walk-up buildings
            return "#ff9100";
        }  
        else if (value == 3){ // multi-family elevator buildings
            return "#bf360c";
        }
        else if (value == 4){ // mixed residential & commercial buildings
            return "#ff5252";
        }
        else if (value == 5){ // commercial & office buildings
            return "#c51162";
        }
        else if (value == 6){ // industrial & manufacturing
            return "#7b1fa2";
        }
        else if (value == 7){ // transportation & utility
            return "#ba68c8";
        }
        else if (value == 8){ // public facilities & instutions
            return "#0d47a1";
        }
        else if (value == 9){ // open space & outdoor recreation
            return "#00bfa5";
        }
        else if (value == 10){ // parking facilities
            return "#607d8b";
        }
        else if (value == 11){ // vacant land
            return "#263238";
        }
        else { //other
            return "#eceff1";
        }
    };
}
*/