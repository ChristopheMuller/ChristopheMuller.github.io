import React, { useState, useEffect } from 'react';
import '../App.css';

function ImputationPaper() {
    const [activeTab, setActiveTab] = useState('real');
    const [dataPoints, setDataPoints] = useState([]);
    const [imputationType, setImputationType] = useState('none');
    const [recData, setRecData] = useState('mixed');
    const [recScenario, setRecScenario] = useState('real');
    const [metrics, setMetrics] = useState({ rmse: null, energy: null });

    // Initialize data on load
    useEffect(() => {
        generateData();
    }, []);

    // 1. Calculate RMSE (Root Mean Squared Error)
    const calculateEnergyDistance = (dataA, dataB) => {
        const n = dataA.length;
        if (n === 0) return 0;

        let termXY = 0;
        let termXX = 0;
        let termYY = 0;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const distXY = Math.hypot(dataA[i].x - dataB[j].x, dataA[i].y - dataB[j].y);
                const distXX = Math.hypot(dataA[i].x - dataA[j].x, dataA[i].y - dataA[j].y);
                const distYY = Math.hypot(dataB[i].x - dataB[j].x, dataB[i].y - dataB[j].y);

                termXY += distXY;
                termXX += distXX;
                termYY += distYY;
            }
        }

        const avgXY = termXY / (n * n);
        const avgXX = termXX / (n * n);
        const avgYY = termYY / (n * n);

        const result = (2 * avgXY) - avgXX - avgYY;

        return Math.max(0, Math.sqrt(Math.max(0, result)));
    };

    const calculateRMSE = (points) => {
        if (points.length === 0) return 0;

        const sumSquaredError = points.reduce((acc, p) => {
            const diff = p.originalY - p.y;
            return acc + (diff * diff);
        }, 0);

        return Math.sqrt(sumSquaredError / points.length);
    };
    useEffect(() => {
        if (imputationType === 'none') {
            setMetrics({ rmse: null, energy: null });
            return;
        }

        const missingPoints = dataPoints.filter(p => p.type === 'missing');

        const rmse = calculateRMSE(missingPoints);

        const originalJointDist = dataPoints.map(p => ({ x: p.x, y: p.originalY }));
        const imputedJointDist = dataPoints.map(p => ({ x: p.x, y: p.y }));

        const realEnergy = calculateEnergyDistance(originalJointDist, imputedJointDist);

        setMetrics({
            rmse: rmse.toFixed(2),
            energy: realEnergy.toFixed(3)
        });

    }, [dataPoints, imputationType]);

    const generateData = () => {
        const points = [];
        // Generate data based on y = x + noise
        for (let i = 0; i < 200; i++) {
            const x = (Math.random() * 10) - 5;
            // True noise (variance) in the data
            const trueNoise = (Math.random() * 2.5) - 1.25;
            const y = x + trueNoise;

            let type = 'observed';
            // Create MCAR gaps (Missing Completely At Random)
            // We create a gap in the middle and some random scatter
            if (x > -1 && x < 1) {
                if (Math.random() > 0.3) type = 'missing';
            } else {
                if (Math.random() > 0.85) type = 'missing';
            }

            points.push({ x, y, type, originalY: y });
        }
        setDataPoints(points);
        setImputationType('none');
    };

    const applyImputation = (type) => {
        setImputationType(type);
        const newPoints = dataPoints.map(p => {
            if (p.type === 'observed') return p;

            let imputedY;
            if (type === 'regression') {
                // Regression imputation predicts the conditional mean (y = x)
                // It is deterministic for a given dataset, so RMSE will be constant.
                imputedY = p.x;
            } else if (type === 'gaussian') {
                // Gaussian adds random noise back to preserve distribution
                // This is stochastic, so values will change slightly on re-runs (as expected)
                const addedNoise = (Math.random() * 2.5) - 1.25;
                imputedY = p.x + addedNoise;
            }
            return { ...p, y: imputedY };
        });
        setDataPoints(newPoints);
    };

    const getRecommendation = () => {
        if (recScenario === 'real') return 'mice_rf';
        if (recData === 'numeric') return 'mice_cart';
        return 'mice_cart';
    };

    // --- Visualization Helpers ---
    const renderPlot = () => {
        const width = 400;
        const height = 300;
        // Simple linear scaling for SVG
        const scaleX = (x) => (x + 6) * (width / 12);
        const scaleY = (y) => height - ((y + 6) * (height / 12));

        return (
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="scatter-plot">
                {/* Axes */}
                <line x1="20" y1={height - 20} x2={width} y2={height - 20} stroke="#cbd5e1" strokeWidth="2" />
                <line x1="20" y1="0" x2="20" y2={height - 20} stroke="#cbd5e1" strokeWidth="2" />

                {/* Regression Line (Visual Guide for Mean) */}
                <line x1={scaleX(-5)} y1={scaleY(-5)} x2={scaleX(5)} y2={scaleY(5)} stroke="#94a3b8" strokeDasharray="5,5" opacity="0.5" />

                {dataPoints.map((p, i) => {
                    const isMissing = p.type === 'missing';
                    // If missing and not yet imputed, don't show
                    if (isMissing && imputationType === 'none') return null;

                    return (
                        <circle
                            key={i}
                            cx={scaleX(p.x)}
                            cy={scaleY(p.y)}
                            r={isMissing ? 4 : 2.5}
                            className={isMissing ? "dot-anim" : ""}
                            fill={isMissing ? "#f59e0b" : "#3b82f6"} // Amber for imputed, Blue for observed
                            opacity={isMissing ? 0.9 : 0.6}
                        />
                    );
                })}
            </svg>
        );
    };

    // --- Data for Rankings (Based on the Paper Results) ---
    const rankingData = {
        real: [
            { rank: 1, name: 'mice_rf', score: 100, label: 'Best Overall', desc: 'Random Forest handles complex, unknown dependencies best.' },
            { rank: 2, name: 'mice_midastouch', score: 92, label: 'Runner Up', desc: 'Predictive Mean Matching with distance-based probability.' },
            { rank: 3, name: 'mice_pmm', score: 82, label: 'Standard', desc: 'The classic approach remains competitive.' },
        ],
        numerical: [
            { rank: 1, name: 'mice_cart', score: 100, label: 'Dominant', desc: 'CART excels in purely numerical artificial settings.' },
            { rank: 2, name: 'aregImpute', score: 95, label: 'Excellent', desc: 'Very close performance to MICE.' },
            { rank: 3, name: 'mice_rf', score: 90, label: 'Strong', desc: 'Consistent performer.' }
        ],
        mixed: [
            { rank: 1, name: 'mice_cart', score: 100, label: 'Top Tier', desc: 'Handles categorical splits effectively.' },
            { rank: 2, name: 'mice_pmm', score: 82, label: 'Standard', desc: 'The classic approach remains competitive.' },
            { rank: 3, name: 'mice_mixed', score: 85, label: 'Solid', desc: 'Good, but computationally heavier.' }
        ]
    };

    return (
        <div className="paper-interactive-container">

            {/* HERO SECTION */}
            <section className="paper-hero">
                <div className="badge">arXiv:2511.04833v1 [stat.CO]</div>
                <h1>Do We Need <span className="highlight">Dozens of Methods</span> for Imputation?</h1>
                <p className="authors">K. Grzesiak, C. Muller, J. Josse, J. Näf (2025)</p>
                <div className="hero-actions">
                    <a href="#simulator" className="action-btn primary">Interactive Paradox</a>
                    <a href="#results" className="action-btn secondary">Benchmark Results</a>
                </div>
            </section>

            {/* SIMULATOR SECTION */}
            <section id="simulator" className="simulator-section">
                <div className="section-header">
                    <span className="section-number">01</span>
                    <h2>The Paradox: Imputation is Not Prediction</h2>
                </div>

                <div className="simulator-content">
                    <div className="simulator-text">
                        <p className="lead-text">
                            Many benchmarks use <strong>RMSE</strong> (Root Mean Squared Error) to evaluate imputation.
                            This creates a dangerous incentive to predict the <em>mean</em> rather than restore the <em>distribution</em>.
                        </p>

                        <div className="controls-container">
                            <div className="control-group">
                                <label>1. Data Generation</label>
                                <button className="btn-reset" onClick={generateData}>Generate New Dataset</button>
                            </div>
                            <div className="control-group">
                                <label>2. Imputation Method</label>
                                <div className="btn-row">
                                    <button
                                        className={`btn-impute ${imputationType === 'regression' ? 'active' : ''}`}
                                        onClick={() => applyImputation('regression')}
                                    >
                                        Regression (Mean)
                                    </button>
                                    <button
                                        className={`btn-impute ${imputationType === 'gaussian' ? 'active' : ''}`}
                                        onClick={() => applyImputation('gaussian')}
                                    >
                                        Gaussian (Stochastic)
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="metrics-display">
                            {/* RMSE METRIC */}
                            <div className={`metric ${metrics.rmse && parseFloat(metrics.rmse) < 0.5 ? 'highlight-good' : ''}`}>
                                <span className="label">Pointwise Error (RMSE)</span>
                                <span className="value">{metrics.rmse ? metrics.rmse : '---'}</span>
                                <span className="sub">
                                    {imputationType === 'regression' ? "Artificially Low (Biased)" : "Realistic Error"}
                                </span>
                            </div>
                            {/* ENERGY METRIC */}
                            <div className={`metric ${metrics.energy && metrics.energy < 0.2 ? 'highlight-good' : ''}`}>
                                <span className="label">Distribution Error (Energy)</span>
                                <span className="value">{metrics.energy ? metrics.energy : '---'}</span>
                                <span className="sub">
                                    {imputationType === 'gaussian' ? "Low (Good Match)" : imputationType === 'regression' ? "High (Distorted)" : ""}
                                </span>
                            </div>
                        </div>
                        <p className="caption-text">
                            <strong>Insight:</strong> Regression imputation minimizes RMSE by predicting the mean (y=x),
                            but it collapses the noise, destroying the data's geometry.
                        </p>
                    </div>

                    <div className="simulator-viz">
                        <div className="viz-legend">
                            <div className="legend-item"><span className="dot obs"></span> Observed</div>
                            <div className="legend-item"><span className="dot imp"></span> Imputed</div>
                        </div>
                        <div className="viz-canvas">
                            {renderPlot()}
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS SUMMARY */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>73</h3>
                        <p>Algorithms Tested</p>
                        <small>From simple Mean to GAIN & MIWAE</small>
                    </div>
                    <div className="stat-card">
                        <h3>24</h3>
                        <p>Datasets</p>
                        <small>Numerical & Mixed types, up to 54k rows</small>
                    </div>
                    <div className="stat-card">
                        <h3>Energy</h3>
                        <p>Primary Metric</p>
                        <small>Proper scoring rule for distributions</small>
                    </div>
                </div>
            </section>

            {/* RESULTS / LEADERBOARD */}
            <section id="results" className="results-section">
                <div className="section-header center">
                    <span className="section-number">02</span>
                    <h2>Benchmark Results</h2>
                </div>
                <p className="subtitle">
                    We systematically evaluated methods on both artificial (MCAR/MAR) and real-world missingness.
                    Iterative statistical methods consistently outperformed deep learning approaches.
                </p>

                <div className="tabs">
                    <button className={activeTab === 'real' ? 'active' : ''} onClick={() => setActiveTab('real')}>Real Missingness</button>
                    <button className={activeTab === 'numerical' ? 'active' : ''} onClick={() => setActiveTab('numerical')}>Artificial (Numerical)</button>
                    <button className={activeTab === 'mixed' ? 'active' : ''} onClick={() => setActiveTab('mixed')}>Artificial (Mixed)</button>
                </div>

                <div className="ranking-list">
                    {rankingData[activeTab].map((item, index) => (
                        <div key={index} className={`ranking-item ${item.isLow ? 'low-performer' : ''}`}>
                            <div className="rank-col">
                                <span className="rank-num">#{item.rank}</span>
                            </div>
                            <div className="info-col">
                                <div className="method-name">
                                    {item.name}
                                    {item.label && <span className="method-badge">{item.label}</span>}
                                </div>
                                <div className="method-desc">{item.desc}</div>
                            </div>
                            <div className="viz-col">
                                <div className="bar-bg">
                                    <div
                                        className="bar-fill"
                                        style={{ width: `${item.score}%`, backgroundColor: item.isLow ? '#94a3b8' : '#10b981' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* RECOMMENDATION ENGINE */}


        </div>
    );
}

export default ImputationPaper;