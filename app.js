// Paleta de colores pastel
const pastelColors = [
  '#A3BFFA', // azul pastel
  '#F7C8E0', // rosa pastel
  '#FDE2FF', // lila pastel
  '#B6E2D3', // verde agua
  '#FFF6B7', // amarillo pastel
  '#FFD6A5', // naranja pastel
];
let currentColor = pastelColors[0];

// Crear botones de la paleta
const paletteDiv = document.getElementById('palette');
pastelColors.forEach((color, idx) => {
  const btn = document.createElement('button');
  btn.className = 'color-btn' + (idx === 0 ? ' selected' : '');
  btn.style.background = color;
  btn.onclick = () => {
    currentColor = color;
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  };
  paletteDiv.appendChild(btn);
});

// Tone.js: sintetizador simple
const synth = new Tone.Synth({
  oscillator: { type: 'triangle' },
  envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.5 }
}).toDestination();

// p5.js sketch
let sketch = (p) => {
  p.setup = function() {
    let cnv = p.createCanvas(500, 350);
    cnv.parent('canvas-holder');
    p.background('#f7f6fd');
    p.strokeWeight(4);
  };
  p.draw = function() {
    if (p.mouseIsPressed && p.mouseX > 0 && p.mouseY > 0 && p.mouseX < p.width && p.mouseY < p.height) {
      p.stroke(currentColor);
      p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
      // Generar sonido según la posición Y
      let freq = p.map(p.mouseY, 0, p.height, 400, 100);
      synth.triggerAttackRelease(freq, '8n');
    }
  };
};
new p5(sketch);
