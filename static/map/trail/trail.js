
mapboxgl.accessToken="pk.eyJ1IjoicGNrdGJvdCIsImEiOiJjaWptN2RoNWowMGFqdTRtNXU1eXJiamNvIn0.AutBu3LTlsHnqRGbRU4bmg";

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/pcktbot/cjk9sj6f317xf2snsljyoclup',
  center: [-121.471779, 43.953483],
  zoom: 9.5,
  pitch: 10,
  bearing: 30
});

// controls outside the map
var pitch = document.getElementById('pitch');
var bearing = document.getElementById('bearing');
var zoom = document.getElementById('zoom');
var mousePos = {
  xPos: document.getElementById('x-pos'),
  yPos: document.getElementById('y-pos'),
  latPos: document.getElementById('lat-pos'),
  lngPos: document.getElementById('lng-pos')
};
var opacity = document.getElementById('opacity');
var opacityValue = document.getElementById('opacity-value');

// create map elements
var nav = new mapboxgl.NavigationControl();
var geo = new mapboxgl.GeolocateControl({
  positionOptions: { enableHighAccuracy: true },
  trackUserLocation: true,
  fitBoundOptions: { maxZoom: 16 }
});
var scale = new mapboxgl.ScaleControl({
  maxWidth: 80,
  unit: 'imperial'
});
var full = new mapboxgl.FullscreenControl();

// add map elements to map
map.addControl(nav, 'top-right');
map.addControl(geo, 'top-right');
map.addControl(scale, 'bottom-right');
map.addControl(full, 'top-right');


/** 
 * LOAD
*/

// handle map events
map.on('load', function() {
  // pass map control values outside the map
  pitch.innerHTML = map.getPitch().toFixed(1);
  bearing.innerHTML = map.getBearing().toFixed(1);
  zoom.innerHTML = map.getZoom().toFixed(1);
  // opacity.addEventListener('input', e => {
  //   map.setPaintProperty('my-lines', 'line-opacity', parseInt(e.target.value));
  //   opacityValue.textContent = e.target.value + '%';
  // });
  
  // add FeatureCollection from lcaol geojson
  map.addSource('my-routes', {
    "type": "geojson",
    "data": "./david-poi.geojson"
  });
  

  // work with map layers
  var layers = map.getStyle().layers;    
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      console.log(layers[i].id);
      var option = document.createElement('option');
      option.value = layers[i].id;
      option.textContent = layers[i].id;
      console.log(option);
      document.getElementById('layers-list').appendChild(option);
    }
  }



  // create layers by their Feature type
  map.addLayer({
    "id": "my-symbols",
    "type": "circle",
    "source": "my-routes",
    "paint": {
      "circle-radius": 6,
      "circle-color": "#050920"
    },
    "filter": ["==", "$type", "Point"]
  });

  // map.addLayer({
  //   "id": "my-lines",
  //   "type": "line",
  //   "source": "my-routes",
  //   "paint": {
  //     "line-width": 3,
  //     "line-color": "#050920"
  //   },
  //   "filter": ["==", "$type", "LineString"]
  // }, firstLineId);

});

var layersList = document.getElementById('layers-list');
var hideLayer = document.getElementById('hide-layer');
hideLayer.addEventListener('submit', event => {
  event.preventDefault();
  
})

/**
 * MOVE
 */

// events that happen when the camera is changed
map.on('move', function(){
  pitch.innerHTML = map.getPitch().toFixed(1);
  bearing.innerHTML = map.getBearing().toFixed(1);
  zoom.innerHTML = map.getZoom().toFixed(1);
});


/**
 * MOUSEMOVE
 */

 map.on('mousemove', e => {
   mousePos.xPos.innerText = e.point.x.toFixed(0);
   mousePos.yPos.innerText = e.point.y.toFixed(0);
   mousePos.latPos.innerText = e.lngLat.lng.toFixed(4);
   mousePos.lngPos.innerText = e.lngLat.lat.toFixed(4);
  //  console.log(e.lngLat); 
 });

// other UI elements
// VanillaTilt.init(document.querySelector('nav'), {
//   max: 15,
//   speed: 500
// });


// throttle the rerendering
(function() {
  var throttle = function(type, name, obj) {
      obj = obj || window;
      var running = false;
      var func = function() {
          if (running) { return; }
          running = true;
           requestAnimationFrame(function() {
              obj.dispatchEvent(new CustomEvent(name));
              running = false;
          });
      };
      obj.addEventListener(type, func);
  };
  throttle("resize", "optimizedResize");
})();

window.addEventListener("optimizedResize", function() { 
console.log('resize fired');
});