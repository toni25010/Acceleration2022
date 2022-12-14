//https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation


// **********************************************
accelCanvas(canvas0)

function accelCanvas(el) {
  //set up canvas
  el.onclick = null; //stops the function from running on button click
  var canvas = el
  var ctx = canvas.getContext("2d");
  var scale = 4;
  var box = {
    x: 30,
    c1: '#3a3', // green
    c2: '#47a', // blue
    c3: '#f02', //cherry red
  }
  ctx.fillStyle = "#ffffff";
  canvas.width = window.innerWidth - 30;
  canvas.height = 200;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.font = "15px Arial";
  ctx.lineJoin = 'round';
  ctx.setTransform(1, 0, 0, 1, 0.5, 0.5); //hack to stop antialiasing

  ctx.fillStyle = "#222";
  ctx.fillText("20", box.x - 5, canvas.height / 2 - 20 * scale);
  ctx.fillText("10", box.x - 5, canvas.height / 2 - 10 * scale);
  ctx.fillText("0", box.x - 5, canvas.height / 2);
  ctx.fillText("-10", box.x - 5, canvas.height / 2 + 10 * scale);
  ctx.fillText("-20", box.x - 5, canvas.height / 2 + 20 * scale);

  var data = [];
  for (var i = 0; i < canvas.width - box.x - 10; i++) {
    data.push({
      x: 0,
      y: 0,
      z: 0
    });
  }
  
/* function mass(x, y, Vx, Vy) { //constructor function that determines how masses work
        this.x = x;
        this.y = y;
        this.Vx = Vx;
        this.Vy = Vy;
        this.t = 0;
        this.move = function(Ax,Ay,i) {
            this.Vx += Ax*i
            this.x += this.Vx*i
        };
        this.output = function(Ax) {
          ctx.fillStyle = '#000';
          //ctx.fillText("this.x", 20, 20);
          ctx.fillText("x = "+this.x.toFixed(3), canvas.width-20, canvas.height-20);
          ctx.fillText("Vx= "+this.Vx.toFixed(3), canvas.width-20, canvas.height-40);      
          ctx.fillText("Ax= "+Ax.toFixed(3), canvas.width-20, canvas.height-60);
        };
  }
  var body
  body = new mass(0,0,0,0); */
  
  window.addEventListener('deviceorientation', handleOrientation);
  function handleOrientation(event) {
    var y = event.gamma; // In degree in the range [-90,90]
    var x = event.beta; // In degree in the range [-180,180]
    var z = event.alpha; //Cardinal directions
    var absolute = event.absolute;
    document.getElementById("gamma").innerHTML = y.toFixed(1);
    document.getElementById("beta").innerHTML = x.toFixed(1);
    document.getElementById("alpha").innerHTML = z.toFixed(1);
    document.getElementById("absolute").innerHTML = absolute;
  }
  
  function handleMotionEvent(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
    document.getElementById("x").innerHTML = x.toFixed(1);
    document.getElementById("y").innerHTML = y.toFixed(1);
    document.getElementById("z").innerHTML = z.toFixed(1);

    var xnoG = event.acceleration.x;
    var ynoG = event.acceleration.y;
    var znoG = event.acceleration.z;
    document.getElementById("xnog").innerHTML = xnoG.toFixed(1);
    document.getElementById("ynog").innerHTML = ynoG.toFixed(1);
    document.getElementById("znog").innerHTML = znoG.toFixed(1);

    var a = event.rotationRate.alpha;
    var b = event.rotationRate.beta;
    var g = event.rotationRate.gamma;
    document.getElementById("rx").innerHTML = a.toFixed(2);
    document.getElementById("ry").innerHTML = b.toFixed(2);
    document.getElementById("rz").innerHTML = g.toFixed(2);

    var i = event.interval;
    document.getElementById("i").innerHTML = i;
    
    //canvas
    data.shift();
    data.push({
      x: x,
      y: y,
      z: z
    });
    var len = data.length - 1
    ctx.clearRect(box.x - 1, -1, canvas.width, canvas.height);
    
    // body.move(xnoG, ynoG, i/1000);
    // body.output(xnoG);  
    
    ctx.lineWidth = 1;

    ctx.fillStyle = box.c1;
    ctx.beginPath();
    ctx.arc(len + box.x, canvas.height / 2 - data[len].x * scale, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = box.c1;
    ctx.beginPath();
    for (var i = 0; i < len; i++) {
      ctx.lineTo(i + box.x, canvas.height / 2 - data[i].x * scale);
    }
    ctx.stroke();

    ctx.fillStyle = box.c2;
    ctx.beginPath();
    ctx.arc(len + box.x, canvas.height / 2 - data[len].y * scale, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = box.c2;
    ctx.beginPath();
    for (var i = 0; i < len; i++) {
      ctx.lineTo(i + box.x, canvas.height / 2 - data[i].y * scale);
    }
    ctx.stroke();

    ctx.fillStyle = box.c3;
    ctx.beginPath();
    ctx.arc(len + box.x, canvas.height / 2 - data[len].z * scale, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = box.c3;
    ctx.beginPath();
    for (var i = 0; i < len; i++) {
      ctx.lineTo(i + box.x, canvas.height / 2 - data[i].z * scale);
    }
    ctx.stroke();

    //line markers
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "#999";
    ctx.beginPath();
    ctx.moveTo(box.x, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width, canvas.height / 2 + 10 * scale);
    ctx.lineTo(box.x, canvas.height / 2 + 10 * scale);
    ctx.moveTo(canvas.width, canvas.height / 2 + 20 * scale);
    ctx.lineTo(box.x, canvas.height / 2 + 20 * scale);
    ctx.moveTo(canvas.width, canvas.height / 2 - 10 * scale);
    ctx.lineTo(box.x, canvas.height / 2 - 10 * scale);
    ctx.moveTo(canvas.width, canvas.height / 2 - 20 * scale);
    ctx.lineTo(box.x, canvas.height / 2 - 20 * scale);
    ctx.stroke();

  }
  window.addEventListener("devicemotion", handleMotionEvent, true);
}