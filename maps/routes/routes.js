
mapboxgl.accessToken="pk.eyJ1IjoicGNrdGJvdCIsImEiOiJjaWptN2RoNWowMGFqdTRtNXU1eXJiamNvIn0.AutBu3LTlsHnqRGbRU4bmg";

// load a list of available styles as JSON
const availableStyles = [
  {
    "name": "Le Shine",
    "styleUrl": "mapbox://styles/pcktbot/cjkzjtf7z610y2rox0dbx9w9j"
  }, {
    "name": "North Star",
    "styleUrl":"mapbox://styles/pcktbot/cjkysny8406qw2snyunp5cjgw"
  }, {
    "name": "Terrain",
    "styleUrl": "mapbox://styles/pcktbot/cjk9sj6f317xf2snsljyoclup"
  }, {
    "name": "Outdoors",
    "styleUrl": "mapbox://styles/pcktbot/cjjd09alh7iuz2rp6i53akyxc"
  }, {
    "name": "Dark",
    "styleUrl":"mapbox://styles/pcktbot/cjkzjy43e52bo2rpjgn18f4ld"
  }
];
function addStyleChoices(availableStyles) {
  const select = document.getElementById('available-styles');
  let option;
  for (var i=0; i < availableStyles.length; i++) {
    option = document.createElement('option');
    option.value = availableStyles[i]['styleUrl'];
    option.innerText = availableStyles[i]['name'];
    select.appendChild(option);
  }
  // load new map style on change
  select.addEventListener('change', e => {
    // console.log(e.target.value);
    map.setStyle(e.target.value);
  });
}
addStyleChoices(availableStyles);

if (!mapboxgl.supported()) {
  alert('Your browser does not support Mapbox GL');
} else {
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pcktbot/cjkzjy43e52bo2rpjgn18f4ld',
    // style: 'mapbox://styles/pcktbot/cjjd09alh7iuz2rp6i53akyxc',
    // Bend center
    center: [ -121.33, 44.05 ],
    zoom: 9.3
    // Eugene center
    // center: [-123.091202, 44.053432],
    // zoom: 11.5
  });
}
// map.scrollZoom.disable();

// controls outside the map
var pitch = document.getElementById('pitch');
var pitcher = document.getElementById('pitch-box');
var bearing = document.getElementById('bearing');
var compass = document.getElementById('compass-bearing');
var zoom = document.getElementById('zoom');
var zoomIn = document.getElementById('zoom-in'), zoomOut = document.getElementById('zoom-out');
var mousePos = {
  xPos: document.getElementById('x-pos'),
  yPos: document.getElementById('y-pos'),
  latPos: document.getElementById('lat-pos'),
  lngPos: document.getElementById('lng-pos')
};
var geocoderContainer = document.getElementById('geocoder');
var hillShader = document.getElementById('hill-shading');

/**
 * PRE-LOAD MAP INIT
 */

// create map controls
var nav = new mapboxgl.NavigationControl();
var geo = new mapboxgl.GeolocateControl({
  positionOptions: { enableHighAccuracy: true },
  trackUserLocation: true,
  fitBoundOptions: { maxZoom: 16 }
});
// var scale = new mapboxgl.ScaleControl({
//   maxWidth: 180,
//   unit: 'imperial'
// });
var full = new mapboxgl.FullscreenControl();
var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken
});

// add map contorls to map canvas
map.addControl(nav, 'top-right');
map.addControl(geo, 'top-right');
// map.addControl(scale, 'bottom-right');
map.addControl(full, 'top-right');
geocoderContainer.appendChild(geocoder.onAdd(map));
// map.addControl(geocoder, 'top-left');

/** 
 * LOAD
 */

// moved the map.on('load') callback into a named function so that it can be called independently.
function loadCallback() {

  // set itial values for external parts
  // pitch and bearing and animated element
  pitch.innerHTML = map.getPitch().toFixed(1);
  bearing.innerHTML = map.getBearing().toFixed(1);
  compass.style.transform = 'rotate(-' + map.getBearing().toFixed(4) + 'deg) translateZ(0) rotateX(' + map.getPitch() + 'deg)';
  
  loadMapCaptures(map);

  /**
   * EVENT LISTENERS FOR NON-MAP CANVAS ELEMENTS
   */
  // zoom buttons and value
  zoom.innerHTML = map.getZoom().toFixed(1);
  zoomIn.addEventListener('click', function(event) {
    event.preventDefault();
    var currentZoom = map.getZoom();
    map.setZoom(0.5 + currentZoom);
  });
  zoomOut.addEventListener('click', event => {
    event.preventDefault();
    var currentZoom = map.getZoom();
    map.setZoom(currentZoom - 0.5);
  });

  map.addSource('dem', {
    "type": "raster-dem",
    "url": "mapbox://mapbox.terrain-rgb"
  });
  hillShader.addEventListener('change', () => {
    if (hillShader.checked) {
    map.addLayer({
        "id": "hillshading",
        "source": "dem",
        "type": "hillshade"
    });
    } else {
      map.removeLayer("hillshading");
    }
  });

  // smaller data set in geojson file
  map.addSource('yesterday', {
    "type": "geojson",
    "data": "geo/2018-08-15.geojson"
  });
  map.addLayer({
    "id": "movements",
    "type": "line",
    "source": "yesterday",
    "layout": {},
    "paint": {
      "line-width": 2,
      "line-color": "#F51945"
    },
    "filter": ["==", "$type", "LineString"]
  });

  

  /**
  * INIT FLY-TO EVENTS
  */
  map.on('click', 'my-symbols', function(e) {
    map.flyTo({center: e.features[0].geometry.coordinates});
    console.log({center: e.features[0].geometry.coordinates});
    // data for popup on click
    var coordinates = e.features[0].geometry.coordinates.slice();
    var name = e.features[0].properties.name;
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(name)
      .addTo(map);
  });

  map.on('mouseenter', 'my-symbols', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'my-symbols', function () {
    map.getCanvas().style.cursor = '';
  });
}


function loadMapCaptures(map) {
  // source data for better images in popups
  map.addSource('myCaptures', {
    "type": "geojson",
    "data": "geo/map-captures.geojson"
  });
  map.loadImage('img/new.png', (err, img) => {
    if (err) throw err;
    map.addImage('star', img);
    map.addLayer({
      "id": "star-capture",
      "type": "symbol",
      "source": "myCaptures",
      "layout": {
        "icon-image": "star",
        "icon-size": 0.05
      },
      "filter": ["==", "$type", "Point"]
    });
  });
  map.on('click', 'star-capture', e => {
    map.flyTo({center: e.features[0].geometry.coordinates});
    var coordinates = e.features[0].geometry.coordinates.slice();
    var name = e.features[0].properties.name, description = e.features[0].properties.description, category = e.features[0].properties.Category, imgUrl = e.features[0].properties.url;
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML('<img class="popup-img" src="' + imgUrl + '"/><h1>' + name + '</h1><p>' + description + '</p><p>' + category + '</p>')
      .addTo(map)
      .className('popup-container');
  });
  map.on('mouseenter', 'star-capture', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'star-capture', function () {
    map.getCanvas().style.cursor = '';
  });
}
// handle map events
map.on('load', loadCallback);

/**
 * MOVE
 */

// events that happen when the camera is changed
map.on('move', function(){
  pitch.innerHTML = map.getPitch().toFixed(1);
  bearing.innerHTML = map.getBearing().toFixed(1);
  if (Math.sign(map.getBearing()) === 1) {
    compass.style.transform = 'rotate(-' + map.getBearing().toFixed(4) + 'deg) translateZ(0) rotateX(' + map.getPitch() + 'deg)';
  } else {
    compass.style.transform = 'rotate(' + Math.abs(map.getBearing().toFixed(4)) + 'deg) translateZ(0) rotateX(' + map.getPitch() + 'deg)';
  }
  zoom.innerHTML = map.getZoom().toFixed(1);
});


/**
 * MOUSEMOVE
 */

 map.on('mousemove', e => {
   mousePos.xPos.innerText = e.point.x.toFixed(0);
   mousePos.yPos.innerText = e.point.y.toFixed(0);
   mousePos.latPos.innerText = e.lngLat.lat.toFixed(2);
   mousePos.lngPos.innerText = e.lngLat.lng.toFixed(2);
  //  console.log(e.lngLat); 
 });

/**
 * CLICK
 */

map.on('click', e => {
  var clickLat = document.getElementById('click-lat-pos'), clickLng = document.getElementById('click-lng-pos');
  clickLat.innerText = e.lngLat.lat.toFixed(2);
  clickLng.innerText = e.lngLat.lng.toFixed(2);
});