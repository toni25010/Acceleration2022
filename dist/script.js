function onClick() {
    // feature detect
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', () => {});
          }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
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