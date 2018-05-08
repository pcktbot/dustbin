  mapboxgl.accessToken = 'pk.eyJ1IjoicGNrdGJvdCIsImEiOiJjaWptN2RoNWowMGFqdTRtNXU1eXJiamNvIn0.AutBu3LTlsHnqRGbRU4bmg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pcktbot/cjg5q60h5ay0u2srysloy6ryc',
    center: [ -121.316722, 44.062191 ],
    pitch: 60,
    bearing: -30,
    zoom: 14.61,
    attributionControl: false
  });
//outside the map
var pitch = document.getElementById('pitch');
var bearing = document.getElementById('bearing');
var zoom = document.getElementById('zoom');

//inside the map
//addControl()
var nav = new mapboxgl.NavigationControl();
var geo = new mapboxgl.GeolocateControl({
  trackUserLocation: true,
  fitBoundsOptions: { maxZoom: 16 }
});
var att = new mapboxgl.AttributionControl();
var scale = new mapboxgl.ScaleControl({
  maxWidth: 80,
  unit: 'imperial'
});
var full = new mapboxgl.FullscreenControl();
map.addControl(nav, 'top-left');
map.addControl(geo, 'bottom-left');
map.addControl(att, 'top-right');
map.addControl(scale, 'top-left');
map.addControl(full, 'bottom-left');
//Popup()
// use this.addTo(map) to add popup to map
// Popup(options) where options = {} and
// map.on(action, layer.Feature.id, event)
var markerHeight = 50, markerRadius = 10, linearOffset = 25;
var popup = new mapboxgl.Popup({
  offset: {
    'top': [0,-75],
  },
  closeButton: false,
  closeOnClick: false,
  anchor: 'bottom' // chevron direction on popup, i.e. 'points down'
});

map.on('mouseenter', 'bend-points', function(e) {
  map.getCanvas().style.cursor = 'pointer';
  var coordinates = e.features[0].geometry.coordinates.slice();
  var description = e.features[0].properties.description;
  while (
    Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    popup.setLngLat(e.lngLat)
      .setHTML('<label class="top">Useful Info</label>')
      .addTo(map);
});
map.on('mouseleave', 'bend-points', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

map.on('load', function(){
  pitch.innerHTML = map.getPitch().toFixed(1);
  bearing.innerHTML = map.getBearing().toFixed(1);
  zoom.innerHTML = map.getZoom().toFixed(1);
});
map.on('move', function(){
  pitch.innerHTML = map.getPitch().toFixed(1);
  bearing.innerHTML = map.getBearing().toFixed(1);
  zoom.innerHTML = map.getZoom().toFixed(1);
});
