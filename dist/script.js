function onClick() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // Handle iOS 13+ devices.
        DeviceMotionEvent.requestPermission()
            .then(function (state) {
            if (state === 'granted') {
                window.addEventListener('devicemotion', handleOrientation);
            }
            else {
                console.error('Request to access the orientation was rejected');
            }
        })
            .catch(console.error);
    }
    else {
        // Handle regular non iOS 13+ devices.
        window.addEventListener('devicemotion', handleOrientation);
    }
}



var update = function(id, value) {
  if (value) {
    value = Math.floor(value);
    var rotate = 'rotate' + id.toUpperCase() + '(' + (id === 'x' ? -value : value )+ 'deg)';
    
    id = '#' + id;
    $(id).html(value + '&deg;');
    
    id += '-icon';
    $(id).css('transform', rotate);
    $(id).css('-webkit-transform', rotate);
  }
}

if (window.DeviceOrientationEvent) {
	window.addEventListener('deviceorientation', function(e) {
    
    $('#frame').text((e.absolute ? 'Earth' : 'arbitrary') + ' coordinates frame');

    update('x', e.beta);
    update('y', e.gamma);
    update('z', e.alpha ? 360 - e.alpha : null);
  });
}
