
mapboxgl.accessToken="pk.eyJ1IjoicGNrdGJvdCIsImEiOiJjaWptN2RoNWowMGFqdTRtNXU1eXJiamNvIn0.AutBu3LTlsHnqRGbRU4bmg";

if (!mapboxgl.supported()) {
  alert('Your browser does not support Mapbox GL');
} else {
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pcktbot/cjjd09alh7iuz2rp6i53akyxc',
    center: [-123.091202, 44.053432],
    zoom: 11.5
  });
}

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
var geocoderContainer = document.getElementById('geocoder');

// create map elements
var nav = new mapboxgl.NavigationControl();
var geo = new mapboxgl.GeolocateControl({
  positionOptions: { enableHighAccuracy: true },
  trackUserLocation: true,
  fitBoundOptions: { maxZoom: 16 }
});
var scale = new mapboxgl.ScaleControl({
  maxWidth: 180,
  unit: 'imperial'
});
var full = new mapboxgl.FullscreenControl();
var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken
});
// add map elements to map
map.addControl(nav, 'top-right');
map.addControl(geo, 'top-right');
map.addControl(scale, 'bottom-right');
map.addControl(full, 'top-right');
geocoderContainer.appendChild(geocoder.onAdd(map));
// map.addControl(geocoder, 'top-left');



/**
 * ANIMATE POINT ON LINE USING TURF
 */
var route = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "name": "Lorane Hwy Run"
    },
    "geometry": {
      "coordinates": [
        [ -123.091202, 44.053432 ],
        [ -123.091203, 44.053227 ],
        [ -123.099332, 44.053239 ],
        [ -123.101012, 44.053334 ],
        [ -123.11251, 44.053255 ],
        [ -123.112524, 44.040339 ],
        [ -123.117741, 44.040418 ], 
        [ -123.117773, 44.023417 ], 
        [ -123.117115, 44.021932 ], 
        [ -123.117073, 44.021603 ], 
        [ -123.11724, 44.020851 ], 
        [ -123.117743, 44.020191 ], 
        [ -123.117827, 44.019975 ], 
        [ -123.117836, 44.017865 ],
        [ -123.118398, 44.017953 ],
        [ -123.12079, 44.017979 ],
        [ -123.123895, 44.017663 ],
        [ -123.124176, 44.017559 ],
        [ -123.124392, 44.017373 ],
        [ -123.124455, 44.017251 ],
        [ -123.124504, 44.015857 ],
        [ -123.124611, 44.015588 ],
        [ -123.124853, 44.015387 ],
        [ -123.124985, 44.015337 ],
        [ -123.127835, 44.015029 ],
        [ -123.128944, 44.015112 ],
        [ -123.129438, 44.015023 ],
        [ -123.129659, 44.014938 ],
        [ -123.132975, 44.01209 ],
        [ -123.133989, 44.010906 ],
        [ -123.134252, 44.010735 ],
        [ -123.136963, 44.009951 ],
        [ -123.139626, 44.009504 ],
        [ -123.139946, 44.009397 ],
        [ -123.14074, 44.008813 ],
        [ -123.141117, 44.008441 ],
        [ -123.142229, 44.007772 ],
        [ -123.142484, 44.007559 ],
        [ -123.143418, 44.005759 ],
        [ -123.144612, 44.004377 ],
        [ -123.144941, 44.004157 ],
        [ -123.145336, 44.004016 ],
        [ -123.146156, 44.003895 ],
        [ -123.146325, 44.003828 ],
        [ -123.146517, 44.003677 ],
        [ -123.147183, 44.002896 ],
        [ -123.147333, 44.002595 ],
        [ -123.147505, 44.000925 ],
        [ -123.147404, 44.000385 ],
        [ -123.147423, 44.000185 ],
        [ -123.147463, 44.000105 ],
        [ -123.147608, 43.999973 ],
        [ -123.148376, 43.999492 ],
        [ -123.149007, 43.998951 ],
        [ -123.15018, 43.998491 ],
        [ -123.150507, 43.998228 ],
        [ -123.151732, 43.996585 ],
        [ -123.152009, 43.9964 ],
        [ -123.154257, 43.995602 ],
        [ -123.154512, 43.995466 ],
        [ -123.158161, 43.992166 ],
        [ -123.159473, 43.991427 ],
        [ -123.159736, 43.991215 ],
        [ -123.159828, 43.991094 ],
        [ -123.159933, 43.990806 ],
        [ -123.159949, 43.989892 ],
        [ -123.160101, 43.989704 ],
        [ -123.160318, 43.989585 ],
        [ -123.160513, 43.989544 ],
        [ -123.161695, 43.989672 ],
        [ -123.175116, 43.989725 ],
        [ -123.176491, 43.989523 ],
        [ -123.177086, 43.989558 ],
        [ -123.177523, 43.989644 ],
        [ -123.177818, 43.988876 ],
        [ -123.17812, 43.985667 ],
        [ -123.178281, 43.985296 ],
        [ -123.178679, 43.984877 ],
        [ -123.179192, 43.984594 ],
        [ -123.181502, 43.983885 ],
        [ -123.18196, 43.983669 ],
        [ -123.183292, 43.982654 ],
        [ -123.183616, 43.982279 ],
        [ -123.185014, 43.979677 ],
        [ -123.18551, 43.979133 ],
        [ -123.185805, 43.9789 ],
        [ -123.186478, 43.978525 ],
        [ -123.186944, 43.978426 ],
        [ -123.187267, 43.978429 ],
        [ -123.189321, 43.978868 ],
        [ -123.196347, 43.978854 ],
        [ -123.196982, 43.978706 ],
        [ -123.197463, 43.978501 ],
        [ -123.197905, 43.978207 ],
        [ -123.198797, 43.977427 ],
        [ -123.199159, 43.977234 ],
        [ -123.200937, 43.976547 ],
        [ -123.203138, 43.976094 ],
        [ -123.203514, 43.975958 ],
        [ -123.205476, 43.974578 ],
        [ -123.205936, 43.974094 ],
        [ -123.206204, 43.973607 ],
        [ -123.207011, 43.971226 ],
        [ -123.207213, 43.970922 ],
        [ -123.20749, 43.970674 ],
        [ -123.208762, 43.969859 ],
        [ -123.209209, 43.969485 ],
        [ -123.211494, 43.966542 ],
        [ -123.211719, 43.964645 ],
        [ -123.211362, 43.962179 ],
        [ -123.209997, 43.958687 ],
        [ -123.209151, 43.953717 ],
        [ -123.207975, 43.950191 ],
        [ -123.207096, 43.94911 ],
        [ -123.206777, 43.948842 ],
        [ -123.206407, 43.948636 ],
        [ -123.205049, 43.948138 ],
        [ -123.204722, 43.947891 ],
        [ -123.204509, 43.947602 ],
        [ -123.204412, 43.94734 ],
        [ -123.204398, 43.947032 ],
        [ -123.204687, 43.946021 ],
        [ -123.204598, 43.944303 ],
        [ -123.204753, 43.943318 ],
        [ -123.204709, 43.943086 ],
        [ -123.20425, 43.942114 ],
        [ -123.204167, 43.941579 ],
        [ -123.204248, 43.941167 ],
        [ -123.20492, 43.940039 ],
        [ -123.205272, 43.939649 ],
        [ -123.20582, 43.939287 ],
        [ -123.206369, 43.93905 ],
        [ -123.206864, 43.938921 ],
        [ -123.207453, 43.938853 ],
        [ -123.212542, 43.938832 ],
        [ -123.217023, 43.939624 ],
        [ -123.217544, 43.939636 ],
        [ -123.218249, 43.939564 ],
        [ -123.219579, 43.939303 ],
        [ -123.220124, 43.939265 ],
        [ -123.222813, 43.939476 ],
        [ -123.226482, 43.939319 ],
        [ -123.22722, 43.939192 ],
        [ -123.227881, 43.938979 ],
        [ -123.228752, 43.938434 ],
        [ -123.230073, 43.937304 ],
        [ -123.232104, 43.936027 ],
        [ -123.232564, 43.935599 ],
        [ -123.232898, 43.93518 ],
        [ -123.233367, 43.934287 ],
        [ -123.238611, 43.918661 ],
        [ -123.241578, 43.913236 ],
        [ -123.241943, 43.912866 ],
        [ -123.242364, 43.912559 ],
        [ -123.245972, 43.910778 ],
        [ -123.246561, 43.910567 ],
        [ -123.247309, 43.910401 ],
        [ -123.248036, 43.910339 ],
        [ -123.249865, 43.910433 ],
        [ -123.25069, 43.910153 ],
        [ -123.250895, 43.910343 ],
        [ -123.254104, 43.911452 ],
        [ -123.254988, 43.911598 ],
        [ -123.257806, 43.911787 ],
        [ -123.25858, 43.911905 ],
        [ -123.260296, 43.912369 ],
        [ -123.260232, 43.912448 ],
        [ -123.260407, 43.912749 ],
        [ -123.260956, 43.913156 ],
        [ -123.261612, 43.913321 ],
        [ -123.26448, 43.914307 ],
        [ -123.264392, 43.91412 ],
        [ -123.264136, 43.913793 ],
        [ -123.263652, 43.91346 ],
        [ -123.263136, 43.91325 ],
        [ -123.25858, 43.911905 ],
        [ -123.257806, 43.911787 ],
        [ -123.254988, 43.911598 ],
        [ -123.254104, 43.911452 ],
        [ -123.250895, 43.910343 ],
        [ -123.25069, 43.910153 ],
        [ -123.249865, 43.910433 ],
        [ -123.248036, 43.910339 ],
        [ -123.247309, 43.910401 ],
        [ -123.246561, 43.910567 ],
        [ -123.245972, 43.910778 ],
        [ -123.242364, 43.912559 ],
        [ -123.241943, 43.912866 ],
        [ -123.241578, 43.913236 ],
        [ -123.238611, 43.918661 ],
        [ -123.233367, 43.934287 ],
        [ -123.232898, 43.93518 ],
        [ -123.232564, 43.935599 ],
        [ -123.232104, 43.936027 ],
        [ -123.230073, 43.937304 ],
        [ -123.228752, 43.938434 ],
        [ -123.227881, 43.938979 ],
        [ -123.22722, 43.939192 ],
        [ -123.226482, 43.939319 ],
        [ -123.222813, 43.939476 ],
        [ -123.220124, 43.939265 ],
        [ -123.219579, 43.939303 ],
        [ -123.218249, 43.939564 ],
        [ -123.217544, 43.939636 ],
        [ -123.217023, 43.939624 ],
        [ -123.212542, 43.938832 ],
        [ -123.207453, 43.938853 ],
        [ -123.206864, 43.938921 ],
        [ -123.206369, 43.93905 ],
        [ -123.20582, 43.939287 ],
        [ -123.205272, 43.939649 ],
        [ -123.20492, 43.940039 ],
        [ -123.204248, 43.941167 ],
        [ -123.204167, 43.941579 ],
        [ -123.20425, 43.942114 ],
        [ -123.204709, 43.943086 ],
        [ -123.204753, 43.943318 ],
        [ -123.204598, 43.944303 ],
        [ -123.204687, 43.946021 ],
        [ -123.204398, 43.947032 ],
        [ -123.204412, 43.94734 ],
        [ -123.204509, 43.947602 ],
        [ -123.204722, 43.947891 ],
        [ -123.205049, 43.948138 ],
        [ -123.206407, 43.948636 ],
        [ -123.206777, 43.948842 ],
        [ -123.207096, 43.94911 ],
        [ -123.207975, 43.950191 ],
        [ -123.209151, 43.953717 ],
        [ -123.209997, 43.958687 ],
        [ -123.211362, 43.962179 ],
        [ -123.211719, 43.964645 ],
        [ -123.211494, 43.966542 ],
        [ -123.209209, 43.969485 ],
        [ -123.208762, 43.969859 ],
        [ -123.20749, 43.970674 ],
        [ -123.207213, 43.970922 ],
        [ -123.207011, 43.971226 ],
        [ -123.206204, 43.973607 ],
        [ -123.205936, 43.974094 ],
        [ -123.205476, 43.974578 ],
        [ -123.203514, 43.975958 ],
        [ -123.203138, 43.976094 ],
        [ -123.200937, 43.976547 ],
        [ -123.199159, 43.977234 ],
        [ -123.198797, 43.977427 ],
        [ -123.197905, 43.978207 ],
        [ -123.197463, 43.978501 ],
        [ -123.196982, 43.978706 ],
        [ -123.196347, 43.978854 ],
        [ -123.18932, 43.978868 ],
        [ -123.187267, 43.978429 ],
        [ -123.186944, 43.978426 ],
        [ -123.186478, 43.978525 ],
        [ -123.185805, 43.9789 ],
        [ -123.18551, 43.979133 ],
        [ -123.185014, 43.979677 ],
        [ -123.183616, 43.982279 ],
        [ -123.183292, 43.982654 ],
        [ -123.18196, 43.983669 ],
        [ -123.181502, 43.983885 ],
        [ -123.179192, 43.984594 ],
        [ -123.178679, 43.984877 ],
        [ -123.178281, 43.985296 ],
        [ -123.17812, 43.985667 ],
        [ -123.177818, 43.988876 ],
        [ -123.177523, 43.989644 ],
        [ -123.177274, 43.990019 ],
        [ -123.175008, 43.992261 ],
        [ -123.17459, 43.992865 ],
        [ -123.173399, 43.996877 ],
        [ -123.169992, 44.002074 ],
        [ -123.169343, 44.004613 ],
        [ -123.169231, 44.005747 ],
        [ -123.169728, 44.016026 ],
        [ -123.168661, 44.021939 ],
        [ -123.168002, 44.023131 ],
        [ -123.167127, 44.026724 ],
        [ -123.166723, 44.027515 ],
        [ -123.164997, 44.029471 ],
        [ -123.164522, 44.030219 ],
        [ -123.162444, 44.03834 ],
        [ -123.162468, 44.051493 ],
        [ -123.162571, 44.051804 ],
        [ -123.163018, 44.052611 ],
        [ -123.163095, 44.053003 ],
        [ -123.16306, 44.069939 ],
        [ -123.154729, 44.069919 ],
        [ -123.153154, 44.070121 ],
        [ -123.142954, 44.070106 ],
        [ -123.141992, 44.069079 ],
        [ -123.141759, 44.068932 ],
        [ -123.139526, 44.066547 ],
        [ -123.13949, 44.066418 ],
        [ -123.138515, 44.065382 ],
        [ -123.138348, 44.065296 ],
        [ -123.138106, 44.065036 ],
        [ -123.138058, 44.064886 ],
        [ -123.127216, 44.053098 ],
        [ -123.126681, 44.052674 ],
        [ -123.12599, 44.052361 ],
        [ -123.12546, 44.052237 ],
        [ -123.105941, 44.052148 ],
        [ -123.105797, 44.05217 ],
        [ -123.089675, 44.052122 ],
        [ -123.089684, 44.0499 ],
        [ -123.088158, 44.049892 ],
        [ -123.08815, 44.050373 ]
      ],
      "type": "LineString"
    }
  }]
};
// first coordinate from route
var origin = [ -123.091202, 44.053432 ];
// last coordinate from route
var destination = [ -123.08815, 44.050373 ];

// create starting point for symbol
var point = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": origin
    }
  }]
};
var lineDistance = turf.lineDistance(route.features[0], 'kilometers');
var steps = route.features[0].geometry.coordinates.length;
var counter = 0;

/** 
 * LOAD
 */

// handle map events
map.on('load', function() {
  // set itial values for external parts
  pitch.innerHTML = map.getPitch().toFixed(1);
  bearing.innerHTML = map.getBearing().toFixed(1);
  zoom.innerHTML = map.getZoom().toFixed(1);

  // for animated symbol
  map.addSource('animated-route', {
    "type": "geojson",
    "data": route
  });
  map.addSource('animated-point', {
    "type": "geojson",
    "data": point
  });
  // map.addLayer({
  //   "id": "animated-route",
  //   "source": "animated-route",
  //   "type": "line",
  //   "paint": {
  //     "line-width": 1,
  //     "line-color": "#5149CF"
  //   }
  // });
  map.addLayer({
    "id": "animated-point",
    "source": "animated-point",
    "type": "symbol",
    "layout": {
      "icon-image": "rocket-15",
      "icon-rotate": ["get", "bearing"],
      "icon-rotation-alignment": "map",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true
    }
  });
  function animate() {

    point.features[0].geometry.coordinates = route.features[0].geometry.coordinates[counter];  
    point.features[0].properties.bearing = turf.bearing(
      turf.point(route.features[0].geometry.coordinates[counter >= steps ? counter - 1 : counter]),
      turf.point(route.features[0].geometry.coordinates[counter >= steps ? counter : counter + 1])
    );
    map.getSource('animated-point').setData(point);
    if (counter < steps) {
      requestAnimationFrame(animate);
    }
    counter = counter + 1;
  }

  document.getElementById('animate').addEventListener('click', function(e) {
    e.preventDefault();
    point.features[0].geometry.coordinates = origin;
    map.getSource('animated-point').setData(point);
    counter = 0;
    animate(counter);
  });
  // end animation

  map.addSource('my-routes', {
    "type": "geojson",
    "data": "/routes/all.geojson"
  });
  // add all lines
  map.addLayer({
    "id": "my-line",
    "type": "line",
    "source": "my-routes",
    "layout": {},
    "paint": {
      "line-width": 2,
      "line-color": "#5149CF"
    },
    "filter": ["==", "$type", "LineString"]
  });
  // add all symbols
  map.addLayer({
    "id": "my-symbols",
    "type": "symbol",
    "source": "my-routes",
    "layout": {
      "icon-image": "rocket-15",
      "icon-allow-overlap": true
    },
    "filter": ["==", "$type", "Point"]
  });
  // add all polygons
  map.addLayer({
    "id": "shapes",
    "type": "fill",
    "source": "my-routes",
    "layout": {},
    "paint": {
      "fill-color": "#5149CF",
      "fill-opacity": 0.8
    },
    "filter": ["==", "$type", "Polygon"]
  });
  

  /**
  * INIT FLY-TO EVENTS
  */
  map.on('click', 'my-symbols', function(e) {
    map.flyTo({center: e.features[0].geometry.coordinates});
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
  // map.addLayer({
  //   "id": "my-lines",
  //   "type": "line",
  //   "source": "my-routes",
  //   "paint": {
  //     "line-width": 3,
  //     "line-color": "#861D2F"
  //   },
  //   "filter": ["==", "$type", "LineString"]
  // });
});

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
   mousePos.latPos.innerText = e.lngLat.lng.toFixed(2);
   mousePos.lngPos.innerText = e.lngLat.lat.toFixed(2);
  //  console.log(e.lngLat); 
 });




/**
 * BRICKLAYER STUFF
 */

var bricklayer = new Bricklayer(document.querySelector('.bricklayer'));