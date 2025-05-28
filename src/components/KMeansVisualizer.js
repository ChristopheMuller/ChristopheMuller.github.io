import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

// Define colors for clusters
const COLORS = [
  '#E6B0AA', '#D7BDE2', '#A9CCE3', '#A3E4D7', '#A9DFBF',
  '#FCF3CF', '#F5CBA7', '#D5DBDB', '#CACFD2', '#85C1E9'
]; // More colors can be added if needed

const KMeansVisualizer = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [centroids, setCentroids] = useState([]);
  const [k, setK] = useState(3); // Default number of clusters
  const [running, setRunning] = useState(false); // Controls auto-stepping

  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 400;
  const POINT_RADIUS = 5;
  const CENTROID_RADIUS = 8;

  // --- K-Means Algorithm Logic ---

  // Calculate Euclidean distance between two points
  const distance = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  };

  // Initialize centroids randomly from existing points
  const initializeCentroids = () => {
    if (points.length < k) {
      alert("Not enough points to create " + k + " clusters! Please add more points.");
      return;
    }
    const shuffledPoints = [...points].sort(() => 0.5 - Math.random());
    // Ensure unique points are chosen as initial centroids if k > points.length / some_factor
    const initialCentroids = shuffledPoints.slice(0, k).map(p => ({ x: p.x, y: p.y }));
    setCentroids(initialCentroids);
    setRunning(false); // Stop auto-running on re-initialization
  };

  // Assign each point to the closest centroid
  const assignPointsToCentroids = (currentPoints, currentCentroids) => {
    return currentPoints.map(point => {
      let minDistance = Infinity;
      let clusterId = -1;

      currentCentroids.forEach((centroid, index) => {
        const d = distance(point, centroid);
        if (d < minDistance) {
          minDistance = d;
          clusterId = index;
        }
      });
      return { ...point, cluster: clusterId };
    });
  };

  // Update centroid positions based on assigned points
  const updateCentroids = (assignedPoints, numK) => {
    const newCentroids = Array(numK).fill(0).map(() => ({ x: 0, y: 0, count: 0 }));

    assignedPoints.forEach(point => {
      if (point.cluster !== -1) {
        newCentroids[point.cluster].x += point.x;
        newCentroids[point.cluster].y += point.y;
        newCentroids[point.cluster].count++;
      }
    });

    return newCentroids.map(c => {
      if (c.count > 0) {
        return { x: c.x / c.count, y: c.y / c.count };
      }
      // If a cluster becomes empty, re-randomize its centroid within the canvas
      return { x: Math.random() * CANVAS_WIDTH, y: Math.random() * CANVAS_HEIGHT };
    });
  };

  // Check for convergence
  const checkConvergence = (oldCentroids, newCentroids) => {
    if (!oldCentroids || oldCentroids.length === 0) return false;
    if (oldCentroids.length !== newCentroids.length) return false;

    return oldCentroids.every((oldC, i) =>
      distance(oldC, newCentroids[i]) < 1 // A small threshold for movement
    );
  };

  // Perform one step of the K-Means algorithm
  const stepKMeans = () => {
    if (points.length === 0 || centroids.length === 0) {
      alert("Please add points and initialize centroids first!");
      setRunning(false);
      return;
    }

    const assignedPoints = assignPointsToCentroids(points, centroids);
    const newCentroids = updateCentroids(assignedPoints, k);

    const converged = checkConvergence(centroids, newCentroids);

    setPoints(assignedPoints);
    setCentroids(newCentroids);

    if (converged) {
      setRunning(false); // Stop if converged
      console.log("K-Means Converged!");
    }
  };

  // Run K-Means until convergence
  const runFullKMeans = () => {
    if (points.length === 0 || centroids.length === 0) {
      alert("Please add points and initialize centroids first!");
      return;
    }
    setRunning(true);
  };

  const clearCanvas = () => {
    setPoints([]);
    setCentroids([]);
    setRunning(false);
  };

  // --- New Function: Add Random Points ---
  const addRandomPoints = (count = 30) => { // Default to 30 points
    const newPoints = Array.from({ length: count }).map(() => ({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      cluster: -1,
    }));
    setPoints(prevPoints => [...prevPoints, ...newPoints]);
    setRunning(false); // Stop any ongoing run
  };

  // --- Canvas Drawing Logic ---

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw points
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, POINT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = point.cluster !== -1 && point.cluster < COLORS.length
                        ? COLORS[point.cluster]
                        : '#34495e'; // Default color if no cluster or out of bounds
      ctx.fill();
      ctx.strokeStyle = '#2c3e50';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw centroids
    centroids.forEach((centroid, index) => {
      ctx.beginPath();
      ctx.arc(centroid.x, centroid.y, CENTROID_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = COLORS[index % COLORS.length]; // Centroid color matches cluster color
      ctx.fill();
      ctx.strokeStyle = '#FFF'; // White border for centroids
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.font = '12px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(index + 1, centroid.x, centroid.y); // Centroid number
    });
  }, [points, centroids]); // Redraw when points or centroids change

  // Handle auto-stepping if running
  useEffect(() => {
    let timer;
    if (running) {
      timer = setTimeout(() => {
        stepKMeans();
      }, 500); // Step every 500ms
    }
    return () => clearTimeout(timer); // Clean up on unmount or if running stops
  }, [running, points, centroids]); // Dependency on points/centroids to re-trigger step after state update

  // Add point on canvas click
  const handleCanvasClick = (event) => {
    if (running) return; // Don't add points while running

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPoints(prevPoints => [...prevPoints, { x, y, cluster: -1 }]); // -1 means unassigned
  };

  return (
    <section id="kmeans-visualizer" className="kmeans-visualizer-section">
      <h2>Interactive K-Means Clustering</h2>
      <p>Click on the canvas to add data points, or use the "Add Random Points" button. Then choose the number of clusters (K) and run the algorithm!</p>

      <div className="kmeans-controls">
        <label>
          Number of Clusters (K):
          <input
            type="number"
            value={k}
            onChange={(e) => setK(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max={points.length > 0 ? points.length : 10} // Max K is number of points
          />
        </label>
        <button onClick={() => addRandomPoints(30)}>Add Random Points</button> {/* NEW BUTTON */}
        <button onClick={initializeCentroids}>Initialize Centroids</button>
        <button onClick={stepKMeans} disabled={running}>Step</button>
        <button onClick={runFullKMeans} disabled={running}>Run Full</button>
        <button onClick={() => setRunning(false)} disabled={!running}>Pause</button>
        <button onClick={clearCanvas}>Clear All</button>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="kmeans-canvas"
        onClick={handleCanvasClick}
      ></canvas>

      <p className="cluster-info">
        Current Points: {points.length} | Current Centroids: {centroids.length}
      </p>
    </section>
  );
};

export default KMeansVisualizer;