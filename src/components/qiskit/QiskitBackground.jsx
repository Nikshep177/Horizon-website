import { useEffect, useRef } from 'react';
import useReducedMotion from '../../lib/use-reduced-motion';

const vars = {
  '--wire': [120, 200, 255],
  '--vec': [255, 180, 84],
  '--circuit': [58, 74, 122],
};

export default function QiskitBackground() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let W, H, DPR, cx, cy, R;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W / 2;
      cy = H * 0.56;
      R = Math.min(W, H) * 0.24;
    }
    window.addEventListener('resize', resize);
    resize();

    const TILT = 0.38;
    const rgb = (name, a) => `rgba(${vars[name].join(',')},${a})`;

    function rotateSpin(p, a) {
      const c = Math.cos(a);
      const s = Math.sin(a);
      return { x: p.x * c - p.y * s, y: p.x * s + p.y * c, z: p.z };
    }
    function applyTilt(p) {
      const c = Math.cos(TILT);
      const s = Math.sin(TILT);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    }
    function project(p) {
      const f = 3.2;
      const scale = f / (f - p.y);
      return { x: cx + p.x * R * scale, y: cy - p.z * R * scale, s: scale };
    }
    function sphPoint(theta, phi) {
      return {
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta),
      };
    }

    const meridians = [];
    for (let i = 0; i < 6; i++) {
      const phi = i * Math.PI / 6;
      const pts = [];
      for (let t = 0; t <= 64; t++) pts.push(sphPoint(t / 64 * Math.PI, phi));
      meridians.push(pts);
    }
    const parallels = [];
    for (let i = 1; i < 6; i++) {
      const theta = i * Math.PI / 6;
      const pts = [];
      for (let p = 0; p <= 64; p++) pts.push(sphPoint(theta, p / 64 * 2 * Math.PI));
      parallels.push({ theta, pts });
    }

    const wireCount = 6;
    const wires = Array.from({ length: wireCount }, (_, i) => ({
      y: (i + 0.5) / wireCount,
      offset: Math.random() * 400,
      gates: Array.from({ length: 5 }, () => Math.random()),
    }));

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.4 + 0.15,
    }));

    const trail = [];
    const TRAIL_MAX = 70;

    let t0 = performance.now();

    function draw(now) {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      ctx.save();
      ctx.strokeStyle = rgb('--circuit', 0.1);
      ctx.lineWidth = 1;
      wires.forEach(w => {
        const y = H * w.y;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
        w.gates.forEach(g => {
          const x = (((g * W) + t * 10 + w.offset) % (W + 80)) - 40;
          ctx.strokeStyle = rgb('--circuit', 0.16);
          ctx.strokeRect(x - 10, y - 10, 20, 20);
        });
      });
      ctx.restore();

      particles.forEach(p => {
        const alpha = 0.15 + 0.2 * Math.sin(t * p.speed + p.phase);
        ctx.fillStyle = `rgba(200,220,255,${Math.max(0, alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      const spin = t * 0.25;

      const drawLine = (pts, color) => {
        let avgDepth = 0;
        const projected = pts.map(p => {
          const rp = applyTilt(rotateSpin(p, spin));
          avgDepth += rp.y;
          return project(rp);
        });
        avgDepth /= pts.length;
        const alpha = 0.12 + 0.28 * ((avgDepth + 1) / 2);
        ctx.strokeStyle = color(alpha);
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        projected.forEach((sp, i) => {
          if (i === 0) ctx.moveTo(sp.x, sp.y);
          else ctx.lineTo(sp.x, sp.y);
        });
        ctx.stroke();
      };

      meridians.forEach(m => drawLine(m, a => rgb('--wire', a)));
      parallels.forEach(par => {
        const isEquator = Math.abs(par.theta - Math.PI / 2) < 0.05;
        drawLine(par.pts, a => isEquator ? rgb('--wire', a + 0.25) : rgb('--wire', a));
      });

      [{ theta: 0, label: '|0>' }, { theta: Math.PI, label: '|1>' }].forEach(pole => {
        const rp = applyTilt(rotateSpin(sphPoint(pole.theta, 0), spin));
        const sp = project(rp);
        ctx.fillStyle = 'rgba(232,236,250,0.55)';
        ctx.font = '13px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pole.label, sp.x, sp.y + (pole.theta === 0 ? -12 : 22));
      });

      const phi = t * 0.9;
      const theta = Math.PI / 2 - 1.0 * Math.sin(t * 0.35);
      const vec = sphPoint(theta, phi);
      const rv = applyTilt(rotateSpin(vec, spin));
      const tip = project(rv);
      const originR = applyTilt(rotateSpin({ x: 0, y: 0, z: 0 }, spin));
      const origin = project(originR);

      trail.push({ x: tip.x, y: tip.y });
      if (trail.length > TRAIL_MAX) trail.shift();

      trail.forEach((p, i) => {
        const a = (i / trail.length) * 0.5;
        ctx.fillStyle = rgb('--vec', a);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.save();
      ctx.shadowColor = rgb('--vec', 0.9);
      ctx.shadowBlur = 14;
      ctx.strokeStyle = rgb('--vec', 0.95);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(tip.x, tip.y);
      ctx.stroke();

      const ang = Math.atan2(tip.y - origin.y, tip.x - origin.x);
      ctx.beginPath();
      ctx.moveTo(tip.x, tip.y);
      ctx.lineTo(tip.x - 9 * Math.cos(ang - 0.4), tip.y - 9 * Math.sin(ang - 0.4));
      ctx.lineTo(tip.x - 9 * Math.cos(ang + 0.4), tip.y - 9 * Math.sin(ang + 0.4));
      ctx.closePath();
      ctx.fillStyle = rgb('--vec', 0.95);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = 'rgba(232,236,250,0.7)';
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, 2.4, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    }

    let animationFrameId;
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        display: prefersReducedMotion ? 'none' : 'block',
        zIndex: 0,
      }}
    />
  );
}
