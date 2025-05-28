import React, { useState, useCallback, useRef, useEffect } from 'react';

function GameOfLife() {
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const [gridSize, setGridSize] = useState({ rows: 25, cols: 25 });
  const [speed, setSpeed] = useState(150); // milliseconds between updates
  const runningRef = useRef(running);
  const speedRef = useRef(speed);
  
  // Update refs when state changes
  useEffect(() => {
    runningRef.current = running;
    speedRef.current = speed;
  }, [running, speed]);

  // Initialize empty grid
  const initializeGrid = useCallback(() => {
    const rows = [];
    for (let i = 0; i < gridSize.rows; i++) {
      rows.push(Array.from(Array(gridSize.cols), () => 0));
    }
    setGrid(rows);
  }, [gridSize]);

  // Initialize grid on component mount
  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  // Create random grid
  const randomizeGrid = () => {
    const rows = [];
    for (let i = 0; i < gridSize.rows; i++) {
      rows.push(
        Array.from(Array(gridSize.cols), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }
    setGrid(rows);
  };

  // Clear grid
  const clearGrid = () => {
    initializeGrid();
  };

  // Toggle cell state
  const toggleCell = (i, j) => {
    const newGrid = [...grid];
    newGrid[i][j] = grid[i][j] ? 0 : 1;
    setGrid(newGrid);
  };

  // Run simulation
  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    // Apply Game of Life rules
    setGrid((g) => {
      const gridCopy = JSON.parse(JSON.stringify(g));

      for (let i = 0; i < gridSize.rows; i++) {
        for (let j = 0; j < gridSize.cols; j++) {
          let neighbors = 0;
          // Check all 8 neighbors
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (di === 0 && dj === 0) continue; // Skip self
              const ni = (i + di + gridSize.rows) % gridSize.rows; // Wrap around
              const nj = (j + dj + gridSize.cols) % gridSize.cols; // Wrap around
              neighbors += g[ni][nj];
            }
          }

          // Apply Conway's Game of Life rules
          if (g[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
            gridCopy[i][j] = 0; // Cell dies
          } else if (g[i][j] === 0 && neighbors === 3) {
            gridCopy[i][j] = 1; // Cell becomes alive
          }
        }
      }

      return gridCopy;
    });

    setTimeout(runSimulation, speedRef.current);
  }, [gridSize]);

  // Start/stop simulation
  const toggleRunning = () => {
    setRunning(!running);
    runningRef.current = !running;
    
    if (!running) {
      runSimulation();
    }
  };

  // Handle speed change
  const handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value);
    setSpeed(newSpeed);
  };

  // Preset patterns
  const applyPreset = (preset) => {
    // Clear the grid first
    const newGrid = Array.from({ length: gridSize.rows }, () => 
      Array.from({ length: gridSize.cols }, () => 0)
    );
    
    // Center position
    const centerRow = Math.floor(gridSize.rows / 2);
    const centerCol = Math.floor(gridSize.cols / 2);
    
    if (preset === 'glider') {
      // Glider pattern
      newGrid[centerRow-1][centerCol] = 1;
      newGrid[centerRow][centerCol+1] = 1;
      newGrid[centerRow+1][centerCol-1] = 1;
      newGrid[centerRow+1][centerCol] = 1;
      newGrid[centerRow+1][centerCol+1] = 1;
    } else if (preset === 'blinker') {
      // Blinker pattern
      newGrid[centerRow-1][centerCol] = 1;
      newGrid[centerRow][centerCol] = 1;
      newGrid[centerRow+1][centerCol] = 1;
    } else if (preset === 'pulsar') {
      // Pulsar pattern (simplified)
      const offsets = [-2, -1, 1, 2];
      for (const offset of offsets) {
        newGrid[centerRow + offset][centerCol - 3] = 1;
        newGrid[centerRow + offset][centerCol + 3] = 1;
        newGrid[centerRow - 3][centerCol + offset] = 1;
        newGrid[centerRow + 3][centerCol + offset] = 1;
      }
    }
    
    setGrid(newGrid);
  };

  return (
    <section id="game-of-life" className="game-of-life-section">
      <h2>Conway's Game of Life</h2>
      <p className="game-description">
        Play with this zero-player game invented by mathematician John Conway. 
        Click cells to toggle them, use the buttons to control the simulation, 
        or try one of the preset patterns!
      </p>
      
      <div className="game-controls">
        <button onClick={toggleRunning}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={clearGrid}>Clear</button>
        <button onClick={randomizeGrid}>Random</button>
        
        <div className="speed-control">
          <label>Speed: </label>
          <input
            type="range"
            min="50"
            max="500"
            step="50"
            value={speed}
            onChange={handleSpeedChange}
          />
          <span>{speed}ms</span>
        </div>
        
        <div className="presets">
          <button onClick={() => applyPreset('glider')}>Glider</button>
          <button onClick={() => applyPreset('blinker')}>Blinker</button>
          <button onClick={() => applyPreset('pulsar')}>Pulsar</button>
        </div>
      </div>
      
      <div 
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize.cols}, 20px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => toggleCell(i, j)}
              className={`cell ${grid[i][j] ? 'alive' : ''}`}
            />
          ))
        )}
      </div>
      
      <div className="game-rules">
        <h3>Rules:</h3>
        <ol>
          <li>Any live cell with fewer than two live neighbors dies (underpopulation)</li>
          <li>Any live cell with two or three live neighbors lives on</li>
          <li>Any live cell with more than three live neighbors dies (overpopulation)</li>
          <li>Any dead cell with exactly three live neighbors becomes a live cell (reproduction)</li>
        </ol>
      </div>
    </section>
  );
}

export default GameOfLife;
