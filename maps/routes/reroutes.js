/**
 * LOOKING FOR OPPORTUNITIES TO WRITE BETTER CODE
 * FUNCTIONS FOR COMMON TASKS LIKE EVENTLISTENERS
 * CLASSES
 */

mapboxgl.accessToken="pk.eyJ1IjoicGNrdGJvdCIsImEiOiJjaWptN2RoNWowMGFqdTRtNXU1eXJiamNvIn0.AutBu3LTlsHnqRGbRU4bmg";

let mapStyle = {
  container: 'map',
  style: 'mapbox://styles/pcktbot/cjkzjy43e52bo2rpjgn18f4ld',
  center: [],
  zoom: 10,
  pitch: 0,
  bearing: 0
}

if (!mapboxgl.supported()) {
  alert('Your browser does not support Mapbox GL');
} else {
  var map = new mapboxgl.Map({ mapStyle });
}

/**
 * DATA MANAGEMENT
 * MAP.ADDSOURCE THEN MAP.ADDLAYER
 */