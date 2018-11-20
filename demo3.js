var MAP, OVERLAY, CartoDB_PositronNoLabels, CartoDB_PositronOnlyLabels;
function init() {
    var MAP = L.map('map', {
        minZoom:1,
        maxZoom:8,
    }).setView([39.8283,-98.5795],4);
    
    // Define a style
    var routeStyle = {
        "color": "#000000",
        "weight": 3,
        "opacity": 0.5
    };
    
    function popUp(feature,layer) {
        layer.bindPopup(feature.properties.OrigDest);
    }
    
    //Fetch some data from a GeoJSON file
    $.getJSON("https://raw.githubusercontent.com/tsinn/truckroutes/master/routes.json", function(json) {
    
      var routesLayer = L.geoJson(json, {
        style:routeStyle,
        onEachFeature:popUp
      });
      var sliderControl = L.control.sliderControl({
        layer: routesLayer,
        timeAttribute: "vmt1",
        isEpoch: true,
        range: false
      });
      
      //Make sure to add the slider to the map ;-)
      MAP.addControl(sliderControl);
      //And initialize the slider
      sliderControl.startSlider();
    });

    CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(MAP);
    
    // the PixelFilter tilelayer
    OVERLAY = L.tileLayerPixelFilter('https://storage.googleapis.com/ee-layers/srtm/{z}/{x}/{y}', {
        tms: false, // I used gdal2tiles.py so these tiles use TMS numbering, not WMS-c numbering
        matchRGBA: null, // preserve whatever color was in the pixel previously
        missRGBA:  [ 255, 255, 255, 0 ], // fill non-matching pixels with solid white
    }).addTo(MAP);
    
    CartoDB_PositronOnlyLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
         subdomains: 'abcd',
         maxZoom: 19
     }).addTo(MAP);
}