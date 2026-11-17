import * as THREE from 'three';

/*
  GARI livery, painted onto the CDR mesh without touching the CAD export.

  The mesh is a body of revolution along local +z (nose at z = +1, tail at z = -1,
  quantised units). We replace its palette UVs with a cylindrical unwrap:
    u = angle around the axis, v = position along it.
  The canvas below is therefore a flat "skin" of the rocket, nose at the top,
  seen from the front at u = 0.25 (and the back at u = 0.75).
*/

const W = 1024;
const H = 2048;

// Radii from the model (local units): upper body 0.107, booster 0.132, fins reach 0.38.
const R_UPPER = 0.107;
const FIN_R = 0.16;

// Pixels per local unit: along the axis, and around the upper body.
const KY = H / 2;
const KX = W / (2 * Math.PI * R_UPPER);

const C = {
  white: '#f2f4f9',
  navy: '#0b1640',
  cobalt: '#2b5bff',
  graphite: '#262b36',
  seam: '#c9cfdd',
  saffron: '#ff9933',
  green: '#138808',
  chakra: '#0a2a8a',
};

const yOf = (z) => ((1 - z) / 2) * H;
const band = (ctx, zTop, zBottom, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, yOf(zTop), W, yOf(zBottom) - yOf(zTop));
};

/* Wordmark reads nose → tail, so it is upright when the rocket lies nose-left. */
const wordmark = (ctx, u, zCenter) => {
  ctx.save();
  ctx.translate(u * W, yOf(zCenter));
  ctx.rotate(Math.PI / 2);
  ctx.scale(1, KX / KY);
  ctx.font = '800 108px Archivo, "Arial Black", Arial, sans-serif';
  try { ctx.fontStretch = 'expanded'; } catch { /* older canvas */ }
  try { ctx.letterSpacing = '10px'; } catch { /* older canvas */ }
  ctx.fillStyle = C.navy;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GARI', 0, 4);
  ctx.restore();
};

/* India flag decal, 3:2, upright when the rocket stands. Drawn in local units. */
const flag = (ctx, u, zCenter) => {
  const w = 0.084;
  const h = 0.056;
  ctx.save();
  ctx.translate(u * W, yOf(zCenter));
  ctx.scale(KX, KY);
  // White sticker margin.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-w / 2 - 0.003, -h / 2 - 0.003, w + 0.006, h + 0.006);
  ctx.fillStyle = C.saffron;
  ctx.fillRect(-w / 2, -h / 2, w, h / 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-w / 2, -h / 6, w, h / 3);
  ctx.fillStyle = C.green;
  ctx.fillRect(-w / 2, h / 6, w, h / 3);
  // Ashoka Chakra: rim, hub, 24 spokes.
  const r = h / 6 * 0.86;
  ctx.strokeStyle = C.chakra;
  ctx.fillStyle = C.chakra;
  ctx.lineWidth = r * 0.14;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = r * 0.06;
  for (let i = 0; i < 24; i += 1) {
    const a = (i / 24) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

/* Roll pattern: alternating quadrants so cameras can read the rocket's spin. */
const rollPattern = (ctx, zTop, zMid, zBottom) => {
  for (let q = 0; q < 4; q += 1) {
    const x0 = ((q / 4 + 0.125) % 1) * W;
    const fill = (zA, zB, on) => {
      if (!on) return;
      ctx.fillStyle = C.navy;
      const y0 = yOf(zA);
      const hh = yOf(zB) - y0;
      ctx.fillRect(x0, y0, W / 4, hh);
      if (x0 + W / 4 > W) ctx.fillRect(x0 - W, y0, W / 4, hh);
    };
    fill(zTop, zMid, q % 2 === 1);
    fill(zMid, zBottom, q % 2 === 0);
  }
};

const paint = (ctx) => {
  ctx.fillStyle = C.white;
  ctx.fillRect(0, 0, W, H);

  // Panel seams at the section joints.
  [0.565, 0.075, -0.1, -0.35].forEach((z) => band(ctx, z + 0.002, z - 0.002, C.seam));

  band(ctx, 1.01, 0.6, C.navy); // nose cone
  band(ctx, 0.585, 0.57, C.cobalt); // pinstripe under the shoulder
  band(ctx, 0.075, -0.1, C.cobalt); // interstage collar
  rollPattern(ctx, -0.13, -0.215, -0.3);
  band(ctx, -0.9, -1.01, C.graphite); // aft closure + nozzle

  [0.25, 0.75].forEach((u) => {
    flag(ctx, u, 0.51);
    wordmark(ctx, u, 0.27);
  });
};

export const makeLiveryTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  paint(ctx);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 8;

  // Repaint once the brand face is ready, so the wordmark is never in the fallback font.
  if (document.fonts && document.fonts.load) {
    document.fonts.load('800 108px Archivo').then(() => {
      paint(ctx);
      tex.needsUpdate = true;
    }).catch(() => {});
  }
  return tex;
};

/* Non-indexed copy of the mesh with cylindrical UVs. Fins sample the navy nose swatch. */
export const paintGeometry = (src) => {
  const pos = src.attributes.position;
  const nor = src.attributes.normal;
  const idx = src.index;
  const count = idx ? idx.count : pos.count;
  const at = (i) => (idx ? idx.getX(i) : i);

  const P = new Float32Array(count * 3);
  const N = new Float32Array(count * 3);
  const U = new Float32Array(count * 2);
  const us = [0, 0, 0];

  for (let t = 0; t < count; t += 3) {
    let fin = false;
    for (let k = 0; k < 3; k += 1) {
      const i = at(t + k);
      const o = (t + k) * 3;
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      P[o] = x; P[o + 1] = y; P[o + 2] = z;
      if (nor) { N[o] = nor.getX(i); N[o + 1] = nor.getY(i); N[o + 2] = nor.getZ(i); }
      if (Math.hypot(x, y) > FIN_R) fin = true;
      us[k] = Math.atan2(y, x) / (Math.PI * 2) + 0.5;
      U[(t + k) * 2 + 1] = (z + 1) / 2;
    }
    const max = Math.max(us[0], us[1], us[2]);
    for (let k = 0; k < 3; k += 1) {
      const o = (t + k) * 2;
      if (fin) {
        U[o] = 0.5;
        U[o + 1] = 0.99;
      } else {
        // Triangles straddling the seam would smear the whole texture row; unwrap them.
        U[o] = max - us[k] > 0.5 ? us[k] + 1 : us[k];
      }
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(P, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(U, 2));
  if (nor) g.setAttribute('normal', new THREE.BufferAttribute(N, 3));
  else g.computeVertexNormals();
  g.computeBoundingBox();
  g.computeBoundingSphere();
  return g;
};
