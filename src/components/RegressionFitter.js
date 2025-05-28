import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../App.css';

const RegressionFitter = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]); // Points will be initialized in useEffect
  const [coefficients, setCoefficients] = useState(null); // [b0, b1, b2, ...]
  const polynomialDegree = 2; // Fixed to polynomial degree 2

  const POINT_RADIUS = 5;
  const POINT_COLOR = '#34495e';
  const LINE_COLOR = '#bdc3c7'; // Light grey for a subtle line

  // --- Matrix Math Helpers (for Polynomial Regression) ---
  const multiplyMatrices = (m1, m2) => {
    const result = Array(m1.length).fill(0).map(() => Array(m2[0].length).fill(0));
    for (let i = 0; i < m1.length; i++) {
      for (let j = 0; j < m2[0].length; j++) {
        for (let k = 0; k < m1[0].length; k++) {
          result[i][j] += m1[i][k] * m2[k][j];
        }
      }
    }
    return result;
  };

  const transposeMatrix = (m) => {
    return Array(m[0].length).fill(0).map((_, i) => Array(m.length).fill(0).map((__, j) => m[j][i]));
  };

  // Helper for 3x3 matrix inverse (needed for polynomialDegree = 2)
  const inverseMatrix3x3 = (m) => {
    const det = m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) -
                m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) +
                m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]);

    if (det === 0) return null; // Singular matrix, no inverse

    const invDet = 1 / det;

    const adj = [
      [ (m[1][1] * m[2][2] - m[2][1] * m[1][2]), -(m[0][1] * m[2][2] - m[2][1] * m[0][2]),  (m[0][1] * m[1][2] - m[1][1] * m[0][2]) ],
      [ -(m[1][0] * m[2][2] - m[2][0] * m[1][2]),  (m[0][0] * m[2][2] - m[2][0] * m[0][2]), -(m[0][0] * m[1][2] - m[1][0] * m[0][2]) ],
      [  (m[1][0] * m[2][1] - m[2][0] * m[1][1]), -(m[0][0] * m[2][1] - m[2][0] * m[0][1]),  (m[0][0] * m[1][1] - m[1][0] * m[0][1]) ]
    ];

    return adj.map(row => row.map(val => val * invDet));
  };

  // --- Regression Logic (Fixed for Polynomial Degree 2) ---
  const calculatePolynomialRegression = useCallback((dataPoints) => {
    const degree = 2; // Fixed to degree 2

    if (dataPoints.length < degree + 1) { // Need at least 3 points for quadratic
      setCoefficients(null);
      return;
    }

    // Build the Design Matrix (X)
    const X = dataPoints.map(p => {
      const row = [];
      for (let i = 0; i <= degree; i++) {
        row.push(Math.pow(p.x, i));
      }
      return row;
    });

    // Build the y vector
    const y = dataPoints.map(p => [p.y]);

    const XT = transposeMatrix(X);
    const XT_X = multiplyMatrices(XT, X);
    const XT_y = multiplyMatrices(XT, y);

    const XT_X_inv = inverseMatrix3x3(XT_X); // Always use 3x3 inverse for degree 2

    if (!XT_X_inv) {
        setCoefficients(null);
        return;
    }

    const beta = multiplyMatrices(XT_X_inv, XT_y);
    setCoefficients(beta.flat()); // Flatten the [ [b0], [b1], ... ] to [b0, b1, ...]
  }, []); // Empty dependency array because helpers are stable and degree is fixed

  // Evaluate the polynomial at a given x
  const evaluatePolynomial = (x, coeffs) => {
    if (!coeffs) return 0;
    let y = 0;
    for (let i = 0; i < coeffs.length; i++) {
      y += coeffs[i] * Math.pow(x, i);
    }
    return y;
  };

  // --- Canvas Drawing Logic ---
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const { clientWidth, clientHeight } = canvas;

    canvas.width = clientWidth * dpr;
    canvas.height = clientHeight * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, clientWidth, clientHeight);

    // Draw points
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, POINT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = POINT_COLOR;
      ctx.fill();
      ctx.strokeStyle = '#2c3e50';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw regression line if calculated
    if (coefficients) {
      ctx.beginPath();
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1.5;

      ctx.moveTo(0, evaluatePolynomial(0, coefficients));
      for (let x = 0; x <= clientWidth; x += 1) {
        const y = evaluatePolynomial(x, coefficients);
        if (y >= -1000 && y <= clientHeight + 1000) {
            ctx.lineTo(x, y);
        } else {
            ctx.moveTo(x, y);
        }
      }
      ctx.stroke();
    }
  }, [points, coefficients]); // Dependencies: points and coefficients

  // Effect to initialize points on mount
  useEffect(() => {
    // Define your list of initial points here
    const initialPoints = [
      { x: 100, y: 105 },
      { x: 110, y: 20 },
      { x: 125, y: 120 },
      { x: 170, y: 160 },
      { x: 160, y: 162 },
      { x: 350, y: 300 },
      { x: 380, y: 275 },
      { x: 850, y: 120 },
      { x: 900, y: 100 },
    ];
    setPoints(initialPoints);
  }, []); // Empty dependency array means it runs only once on mount

  // Main effect to re-draw and re-calculate on state changes (points or coeffs)
  useEffect(() => {
    drawCanvas();
    calculatePolynomialRegression(points);
  }, [points, drawCanvas, calculatePolynomialRegression]);

  // Add point on canvas click
  const handleCanvasClick = (event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPoints(prevPoints => [...prevPoints, { x, y }]);
  };

  // Handle canvas resize (re-draws but doesn't re-generate initial points)
  useEffect(() => {
    const handleResize = () => {
      drawCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawCanvas]);


  return (
    <section id="regression-fitter" className="regression-fitter-section">
      <div className="canvas-wrapper">
          <canvas
              ref={canvasRef}
              className="regression-canvas"
              onClick={handleCanvasClick}
          ></canvas>
      </div>
    </section>
  );
};

export default RegressionFitter;
