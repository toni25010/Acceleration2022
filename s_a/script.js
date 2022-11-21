btn.onclick = function(e) {
  DeviceMotionEvent.requestPermission().then(response => {
    if (response == 'granted') {
      window.addEventListener('devicemotion', (e) => {
        /* разрешение получено */
    })
  }}).catch(console.error)
}

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;
  
  $('.absolute').html(absolute);
  $('.alpha').html(alpha.toFixed(3));
  $('.beta').html(beta.toFixed(3));
  $('.gamma').html(gamma.toFixed(3));
}

window.addEventListener("devicemotion", handleMotion, true);

function handleMotion(event) {
  var acceleration = event.acceleration;
  var interval = event.interval;
  $('.accelerationx').html(acceleration.x.toFixed(3));
  $('.accelerationy').html(acceleration.y.toFixed(3));
  $('.accelerationz').html(acceleration.z.toFixed(3));
  $('.interval').html(interval);
}
