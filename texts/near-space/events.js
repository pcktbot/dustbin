// $(document).ready(function() {
    var layers = [],
    objects = [],
    world = document.getElementById( 'world' ),
    viewport = document.getElementById( 'viewport' ),
    worldXAngle = 0,
    worldYAngle = 0,
    p = 1000,
    d = 0;
    viewport.style.webkitPerspective = p;
    viewport.style.MozPerspective = p;
    viewport.style.oPerspective = p;
    generate();
    window.addEventListener( 'mousemove', function( e ) {
        worldYAngle = -( .5 - ( e.clientX / window.innerWidth ) ) * 2;
        worldXAngle = ( .5 - ( e.clientY / window.innerHeight ) ) * 2;
        updateView();
    });
// });

function updateView() {
    world.style.transform = 'translateZ( ' + d + 'px ) \
        rotateX( ' + worldXAngle + 'deg) \
        rotateY( ' + worldYAngle + 'deg)';
}

function generate() {
    objects = [];
    layers = [];
    if ( world.hasChildNodes() ) {
        while ( world.childNodes.length >= 1 ) {
            world.removeChild( world.firstChild );
        }
    }
    for( var j = 0; j < 5; j++ ) {
        objects.push( createCloud() );
    }
}

function createCloud() {
    var div = document.createElement( 'div'  );
    div.className = 'cloudBase';
    var x = 256 - ( Math.random() * 512 );
    var y = 256 - ( Math.random() * 512 );
    var z = 256 - ( Math.random() * 512 );
    var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px )';
    div.style.webkitTransform = t;
    div.style.MozTransform = t;
    div.style.oTransform = t;
    world.appendChild( div );
    for( var j = 0; j < 15 + Math.round( Math.random() * 20 ); j++ ) {
        var cloud = document.createElement( 'img' );
        cloud.style.opacity = 0;
        var r = Math.random();
        var src = 'cloud.png';
        ( function( img ) { img.addEventListener( 'load', function() {
            img.style.opacity = .8;
        })})( cloud );
        cloud.setAttribute( 'src', src );
        cloud.className = 'cloudLayer';
        var x = 256 - ( Math.random() * 512 );
        var y = 256 - ( Math.random() * 512 );
        var z = 100 - ( Math.random() * 200 );
        var a = Math.random() * 360;
        var s = .25 + Math.random();
        x *= .2; y *= .2;
        cloud.data = {
            x: x,
            y: y,
            z: z,
            a: a,
            s: s,
            speed: .1 * Math.random()
        };
        var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ( ' + a + 'deg ) scale( ' + s + ' )';
        cloud.style.webkitTransform = t;
        cloud.style.MozTransform = t;
        cloud.style.oTransform = t;
        div.appendChild( cloud );
        layers.push( cloud );
    }
    return div;
}

function update () {
  for( var j = 0; j < layers.length; j++ ) {
    var layer = layers[ j ];
    layer.data.a += layer.data.speed;
    var t = 'translateX( ' + layer.data.x + 'px ) \
      translateY( ' + layer.data.y + 'px ) \
      translateZ( ' + layer.data.z + 'px ) \
      rotateY( ' + ( - worldYAngle ) + 'deg ) \
      rotateX( ' + ( - worldXAngle ) + 'deg ) \
      scale( ' + layer.data.s + ')';
    layer.style.transform = t;
  }
  requestAnimationFrame( update );
}
