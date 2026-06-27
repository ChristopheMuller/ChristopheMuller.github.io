import React, { useRef, useEffect } from 'react';
import '../App.css';

/**
 * A faint, full-viewport Conway's Game of Life that drifts behind the whole
 * site. Rendered as a non-interactive overlay (pointer-events: none) so it is
 * visible over both the light and dark sections without ever blocking clicks.
 *
 * Easter egg: toggled on/off by clicking the "Christophe" logo 5 times (see App.js).
 */
const CELL = 14;          // px per cell
const FPS = 12;           // generations per second
const ALIVE_COLOR = 'rgba(120, 140, 160, 0.16)'; // mid-grey, reads on light & dark

function GameOfLifeBackground({ active }) {
  const canvasRef = useRef(null);
  const gridRef = useRef({ cols: 0, rows: 0, cells: null });
  const rafRef = useRef(null);
  const lastStepRef = useRef(0);

  // Seed the grid: random "soup" plus a few gliders so there's always motion.
  const seedGrid = (cols, rows) => {
    const cells = new Uint8Array(cols * rows);
    for (let i = 0; i < cells.length; i++) {
      cells[i] = Math.random() > 0.82 ? 1 : 0;
    }
    const glider = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    for (let g = 0; g < 5; g++) {
      const ox = Math.floor(Math.random() * (cols - 3));
      const oy = Math.floor(Math.random() * (rows - 3));
      glider.forEach(([dx, dy]) => {
        cells[(oy + dy) * cols + (ox + dx)] = 1;
      });
    }
    gridRef.current = { cols, rows, cells };
  };

  const buildGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedGrid(Math.ceil(w / CELL), Math.ceil(h / CELL));
  };

  // One Conway generation with toroidal (wrap-around) edges.
  const step = () => {
    const { cols, rows, cells } = gridRef.current;
    if (!cells) return;
    const next = new Uint8Array(cells.length);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let n = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = (x + dx + cols) % cols;
            const ny = (y + dy + rows) % rows;
            n += cells[ny * cols + nx];
          }
        }
        const alive = cells[y * cols + x];
        next[y * cols + x] = alive ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
      }
    }
    gridRef.current.cells = next;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { cols, rows, cells } = gridRef.current;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = ALIVE_COLOR;
    const r = (CELL - 3) / 2;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (cells[y * cols + x]) {
          ctx.beginPath();
          ctx.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  useEffect(() => {
    if (!active) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    buildGrid();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      // Respect motion preferences: paint one static generation, don't animate.
      draw();
      return;
    }

    const loop = (t) => {
      rafRef.current = requestAnimationFrame(loop);
      if (document.hidden) return; // pause in background tabs
      if (t - lastStepRef.current < 1000 / FPS) return;
      lastStepRef.current = t;
      step();
      draw();
    };
    rafRef.current = requestAnimationFrame(loop);

    const onResize = () => buildGrid();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // Effect intentionally re-runs only when the easter egg toggles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className={`gol-background ${active ? 'active' : ''}`}
      aria-hidden="true"
    />
  );
}

export default GameOfLifeBackground;
