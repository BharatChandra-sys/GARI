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

/* India flag decal, 3:2, upright when the rocket stands. Drawn in local units. */
const flag = (ctx, u, zCenter, mono) => {
  const w = 0.084;
  const h = 0.056;
  ctx.save();
  ctx.translate(u * W, yOf(zCenter));
  ctx.scale(KX, KY);
  if (mono) {
    ctx.fillStyle = mono;
    ctx.fillRect(-w / 2 - 0.003, -h / 2 - 0.003, w + 0.006, h + 0.006);
    ctx.restore();
    return;
  }
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

const SEAMS = [0.565, 0.075, -0.1, -0.35];
const R_LOWER = 0.132;
const KX_LOWER = W / (2 * Math.PI * R_LOWER);

// Seeded so the wear pattern is identical on every load.
const rng = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

/* Small stencil text, horizontal around the body, true proportions on the booster. */
const stencil = (ctx, text, u, z, color, size = 22) => {
  ctx.save();
  ctx.translate(u * W, yOf(z));
  ctx.scale(KX_LOWER / KY, 1);
  ctx.font = `600 ${size}px "JetBrains Mono", ui-monospace, monospace`;
  try { ctx.letterSpacing = '2px'; } catch { /* older canvas */ }
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, 0);
  ctx.restore();
};

/* Wear: soft shading at joints, exhaust soot climbing from the tail, faint handling grime. */
const weather = (ctx) => {
  const rand = rng(7);
  SEAMS.forEach((z) => {
    const g = ctx.createLinearGradient(0, yOf(z + 0.014), 0, yOf(z - 0.014));
    g.addColorStop(0, 'rgba(20, 24, 34, 0)');
    g.addColorStop(0.5, 'rgba(20, 24, 34, 0.16)');
    g.addColorStop(1, 'rgba(20, 24, 34, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, yOf(z + 0.014), W, yOf(z - 0.014) - yOf(z + 0.014));
  });

  const soot = ctx.createLinearGradient(0, yOf(-0.68), 0, yOf(-1.01));
  soot.addColorStop(0, 'rgba(26, 22, 20, 0)');
  soot.addColorStop(0.65, 'rgba(26, 22, 20, 0.16)');
  soot.addColorStop(1, 'rgba(18, 15, 13, 0.5)');
  ctx.fillStyle = soot;
  ctx.fillRect(0, yOf(-0.68), W, yOf(-1.01) - yOf(-0.68));

  for (let i = 0; i < 90; i += 1) {
    const x = rand() * W;
    const len = (0.06 + rand() * 0.22) * KY;
    const w = 1 + rand() * 4;
    const g = ctx.createLinearGradient(0, yOf(-1.01), 0, yOf(-1.01) - len);
    g.addColorStop(0, `rgba(20, 17, 15, ${0.1 + rand() * 0.15})`);
    g.addColorStop(1, 'rgba(20, 17, 15, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, yOf(-1.01) - len, w, len);
  }

  for (let i = 0; i < 2500; i += 1) {
    ctx.fillStyle = `rgba(40, 44, 56, ${0.015 + rand() * 0.04})`;
    const r = 0.5 + rand() * 1.6;
    ctx.fillRect(rand() * W, rand() * H, r, r);
  }
};

/*
  Garuda wing: two blade swooshes rising off the navy fin section, one bold
  livery graphic. Coordinates are (a, z): a = arc distance from the side's centre
  line (positive to the right as seen), z = position along the body.
*/
const SWEEPS = [
  { p0: [-0.06, -0.31], c: [0.11, 0.0], p1: [-0.03, 0.52], w: 0.07 },
  { p0: [0.02, -0.29], c: [0.13, -0.02], p1: [0.05, 0.36], w: 0.022 },
  { p0: [-0.09, -0.24], c: [0.035, 0.09], p1: [-0.065, 0.41], w: 0.008 },
];

const toXY = (u0, a, z) => [u0 * W + a * KX_LOWER, yOf(z)];

// Drawn at 1.6× spread and 2.6× weight: bold enough to read from across the page.
const SPREAD = 1.6;
const WEIGHT = 2.6;

const sweep = (ctx, u0, { p0, c, p1, w }) => {
  const N = 48;
  const left = [];
  const right = [];
  for (let i = 0; i <= N; i += 1) {
    const t = i / N;
    const mt = 1 - t;
    const a = SPREAD * (mt * mt * p0[0] + 2 * mt * t * c[0] + t * t * p1[0]);
    const z = mt * mt * p0[1] + 2 * mt * t * c[1] + t * t * p1[1];
    const da = SPREAD * (2 * mt * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]));
    const dz = 2 * mt * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1]);
    const len = Math.hypot(da, dz) || 1;
    // Blade profile: sharp at both ends, widest a third of the way up.
    const half = ((w * WEIGHT) / 2) * Math.pow(Math.sin(Math.PI * Math.pow(t, 0.75)), 0.9);
    left.push(toXY(u0, a - (dz / len) * half, z + (da / len) * half));
    right.push(toXY(u0, a + (dz / len) * half, z - (da / len) * half));
  }
  ctx.beginPath();
  left.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  right.reverse().forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.closePath();
  ctx.fill();
};

const garuda = (ctx, u0, color) => {
  ctx.fillStyle = color;
  SWEEPS.forEach((s) => sweep(ctx, u0, s));
};

/* Slim vertical wordmark low on the body, reading nose → tail. */
const wordmarkLow = (ctx, u0, color) => {
  ctx.save();
  const [x, y] = toXY(u0, 0, -0.6);
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 2);
  ctx.scale(1, KX_LOWER / KY);
  ctx.font = '700 70px Archivo, "Arial Black", Arial, sans-serif';
  try { ctx.fontStretch = 'expanded'; } catch { /* older canvas */ }
  try { ctx.letterSpacing = '14px'; } catch { /* older canvas */ }
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GARI', 0, 0);
  ctx.restore();
};

/* Small vertical stencil, reading nose → tail. */
const stencilV = (ctx, text, u0, a, z, color, size) => {
  ctx.save();
  const [x, y] = toXY(u0, a, z);
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 2);
  ctx.scale(1, KX_LOWER / KY);
  ctx.font = `500 ${size}px "JetBrains Mono", ui-monospace, monospace`;
  try { ctx.letterSpacing = '4px'; } catch { /* older canvas */ }
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, 0);
  ctx.restore();
};

const SIDES = [0.25, 0.75];
const markU = (u0, a) => u0 + (a * KX_LOWER) / W;

const paint = (ctx) => {
  ctx.fillStyle = C.white;
  ctx.fillRect(0, 0, W, H);

  SEAMS.forEach((z) => band(ctx, z + 0.002, z - 0.002, C.seam));

  // Navy base: the fin can and lower booster, so the white upper body has something to rise from.
  band(ctx, -0.33, -0.9, C.navy);
  band(ctx, 1.01, 0.93, '#c7cbd3'); // polished nose tip
  // Cobalt pinstripes at the two body joints.
  band(ctx, -0.322, -0.33, C.cobalt);
  band(ctx, 0.086, 0.078, C.cobalt);

  // Range-safety marking above the aft closure, all the way round.
  band(ctx, -0.862, -0.892, '#c8321e');
  for (let k = 0; k < 4; k += 1) stencil(ctx, 'WARNING · SOLID ROCKET MOTOR', 0.125 + k * 0.25, -0.877, '#ffffff', 15);
  band(ctx, -0.9, -1.01, C.graphite); // aft closure + nozzle

  SIDES.forEach((u0) => {
    garuda(ctx, u0, C.cobalt);
    wordmarkLow(ctx, u0, C.white);
    flag(ctx, markU(u0, 0.09), 0.52);
    stencilV(ctx, 'IN-SPACe · MRI · 2026', u0, 0.12, 0.27, C.navy, 15);
    stencil(ctx, 'GR-01', markU(u0, -0.104), -0.82, 'rgba(242, 244, 249, 0.8)', 16);
  });

  weather(ctx);
};

/* Roughness (green channel is read): satin paint, glossier vinyl graphics, dull soot. */
const paintRoughness = (ctx) => {
  const g = (v) => `rgb(${v}, ${v}, ${v})`;
  ctx.fillStyle = g(178);
  ctx.fillRect(0, 0, W, H);
  band(ctx, 1.01, 0.93, g(70));
  SIDES.forEach((u0) => {
    garuda(ctx, u0, g(118));
    wordmarkLow(ctx, u0, g(118));
    flag(ctx, markU(u0, 0.09), 0.52, g(105));
  });
  const s = ctx.createLinearGradient(0, yOf(-0.7), 0, yOf(-1.01));
  s.addColorStop(0, g(178));
  s.addColorStop(1, g(225));
  ctx.fillStyle = s;
  ctx.fillRect(0, yOf(-0.7), W, yOf(-1.01) - yOf(-0.7));
};

/* Fine grain for the bump map: orange-peel paint over woven fibreglass. */
const paintGrain = (ctx, w, h) => {
  const img = ctx.createImageData(w, h);
  const rand = rng(11);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 118 + rand() * 20;
    img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  ctx.globalAlpha = 0.5;
  ctx.filter = 'blur(1px)';
  ctx.drawImage(ctx.canvas, 0, 0);
  ctx.filter = 'none';
  ctx.globalAlpha = 1;
};

const canvasTex = (w, h, draw, srgb) => {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return { tex, ctx };
};

/* Metalness (blue channel is read): only the nose tip is bare metal. */
const paintMetal = (ctx, w, h) => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, w, ((1 - 0.93) / 2) * h);
};

export const makeLiveryMaps = () => {
  const albedo = canvasTex(W, H, paint, true);
  const metal = canvasTex(64, 512, paintMetal, false);
  const rough = canvasTex(W, H, paintRoughness, false);
  const grain = canvasTex(512, 1024, paintGrain, false);

  // Repaint once the brand faces are ready, so lettering is never in a fallback font.
  if (document.fonts && document.fonts.load) {
    Promise.all([document.fonts.load('800 108px Archivo'), document.fonts.load('600 22px "JetBrains Mono"')])
      .then(() => {
        paint(albedo.ctx);
        paintRoughness(rough.ctx);
        albedo.tex.needsUpdate = true;
        rough.tex.needsUpdate = true;
      })
      .catch(() => {});
  }
  return { map: albedo.tex, roughnessMap: rough.tex, bumpMap: grain.tex, metalnessMap: metal.tex };
};

/* Non-indexed copy of the mesh with cylindrical UVs. Fins sample the navy base band. */
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
        // Fins sample the navy base band (z ≈ -0.6).
        U[o] = 0.5;
        U[o + 1] = 0.2;
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
