// RECEIPT!
// This is the file to edit. p5.js reference: https://p5js.org/reference/
import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1080, // 240–2000 px. Width is fixed by the printer.
  seed: 67,
};

// everything here is editable. play around or rm -rf and see what you come up with!
export function drawReceipt(p) {
  
  const { width: w, height: h } = p;
  const margin = 24;

const cx = w / 2;
const cy = 500;

// Stem
p.stroke(0);
p.strokeWeight(6);
p.line(cx, cy + 80, cx, cy + 280);

// Petals
p.noFill();
p.stroke(0);
p.strokeWeight(2);

for (let i = 0; i < 32; i++) {
  let a = (Math.PI *2) * i / 32;

  p.push();
  p.translate(cx, cy);
  p.rotate(a);

  // Petal extends outward
  p.ellipse(0, -90, 35, 110);

  p.pop();
}

// Center
p.fill(255);
p.stroke(0);
p.strokeWeight(3);
p.circle(cx, cy, 120);

// Seeds
p.fill(0);
p.noStroke();

for (let i = 0; i < 250; i++) {
  let r = Math.sqrt(p.random()) * 45;
  let a = p.random(Math.PI*2);

  let x = cx + Math.cos(a) * r;
  let y = cy + Math.sin(a) * r;

  p.circle(x, y, 2);
}
p.textAlign(p.CENTER);
p.textSize(50);
p.text("SUNFLOWER", w/2, 75);

p.textSize(25);
p.text("GENERATED RECEIPT ART", w/2, 105);

  dashedLine(p, margin, 930, w - margin, 930, 6, 5);

  const barcodeValue = "receipt.hackclub.com";
  drawBarcode(p, barcodeValue, w / 2, 960);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(10);
  p.text(barcodeValue, w / 2, 1024);
}

function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128",
    width: 1,
    height: 52,
    displayValue: false,
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000",
  });
  // Draw directly on p5's canvas: p.image expects a p5 image wrapper, while
  // JsBarcode returns a regular browser canvas.
  p.drawingContext.drawImage(barcodeCanvas, Math.floor(centerX - barcodeCanvas.width / 2), y);
}

function dashedLine(p, x1, y1, x2, y2, dash, gap) {
  p.stroke(0);
  p.strokeWeight(2);
  for (let x = x1; x < x2; x += dash + gap) {
    p.line(x, y1, Math.min(x + dash, x2), y2);
  }
}
