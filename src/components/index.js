TweenLite.defaultEase = Sine.easeInOut;
TweenLite.set("g", { y: window.innerHeight / 2 });

var svg = document.querySelector("#sound-wave");
var svg2 = document.querySelector("#sound-wave2");
svg2.style.display = 'none'

var wave = document.querySelector("#wave");

var width = 40;
var sinus = new CustomEase("sinus", "M0,0 C0.4,0 0.3,1 0.5,1 0.7,1 0.6,0 1,0");

var amplitude = 14;
var frequency = 10;
var segments = 100;
var interval = width / segments;

function handelSound() {
  if (svg2.style.display == 'none') {
    svg2.style.display = 'block'
    svg.style.display = 'none'
  }
  else {
    svg.style.display = 'block'
    svg2.style.display = 'none'
  }
}

for (var i = 0; i <= segments; i++) {

  var norm = 1 - i / segments;
  var point = wave.points.appendItem(svg.createSVGPoint());

  point.x = i * interval;
  point.y = amplitude / 2 * sinus.getRatio(norm);

  TweenMax.to(point, 0.2, { y: -point.y, repeat: -1, yoyo: true }).progress(norm * frequency);
}