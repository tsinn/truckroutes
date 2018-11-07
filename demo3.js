var MAP, OVERLAY;
function init() {
    var MAP = L.map('map', {
        minZoom:1,
        maxZoom:8,
    }).setView([39.8283,-98.5795],4);
    
    // Define a style
    var routeStyle = {
        "color": "#000000",
        "weight": 2,
        "opacity": 1
    };
    
    function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.OrigDestNa) {
    layer.bindPopup(feature.properties.OrigDestNa);
  }
}
    
    
    var routesLayer = new L.GeoJSON.AJAX("routes.json", {
        style:routeStyle,
        onEachFeature: onEachFeature,
        });       
    routesLayer.addTo(MAP);

    // the PixelFilter tilelayer
    OVERLAY = L.tileLayerPixelFilter('https://storage.googleapis.com/ee-layers/srtm/{z}/{x}/{y}', {
        tms: false, // I used gdal2tiles.py so these tiles use TMS numbering, not WMS-c numbering
        matchRGBA: null, // preserve whatever color was in the pixel previously
        missRGBA:  [ 255, 255, 255, 0 ], // fill non-matching pixels with solid white
    }).addTo(MAP);
}
