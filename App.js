import React, { useState, useEffect } from 'react';

// V1.5.1 CORE ANALYTICS CONFIG
const ALPHA_STABILITY_MS = 500; 
const WEBER_TARGET = 0.70;

const ChromaKApp = () => {
  const [yaw, setYaw] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('ALIGNING'); 
  const [confidence, setConfidence] = useState(0);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // AGENT 1: THE SENTRY (Pose & Stability Tracking)
  useEffect(() => {
    let timer;
    if (Math.abs(yaw) < 5) {
      setStatus('CAPTURING');
      setErrorMsg('');
      timer = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(timer);
            runAnalyst();
            return 100;
          }
          return p + 10;
        });
      }, 50);
    } else {
      setProgress(0);
      setStatus('ALIGNING');
    }
    return () => clearInterval(timer);
  }, [yaw]);

  // AGENT 2: THE ANALYST (Hardware-Level Physics & Arbiter)
  const runAnalyst = () => {
    setStatus('ANALYZING');
    
    setTimeout(() => {
      const mockScleraB = 6; 
      const mockL = 45; 
      
      // CRITICAL-001: Multiplicative Kill-Switch Logic
      const poseMultiplier = Math.abs(yaw) < 5 ? 1.0 : 0.0;
      const lightScore = 0.45; 
      const anchorScore = mockScleraB < 8 ? 0.25 : 0.15;
      const distScore = 0.30; 

      const finalConf = poseMultiplier * (lightScore + anchorScore + distScore);

      if (finalConf >= 0.75) {
        setConfidence(finalConf);
        setResult(mockL > 60 ? "Clear Winter" : "Deep Autumn");
        setStatus('RESULT');
      } else {
        setErrorMsg("LOW CONFIDENCE: Check lighting & stay centered.");
        setStatus('ALIGNING');
        setProgress(0);
      }
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '20px' }}>
        <h1 style={{ color: '#3b82f6', fontSize: '22px', letterSpacing: '1px', margin: 0 }}>CHROMA-K</h1>
        <p style={{ opacity: 0.5, fontSize: '10px', marginTop: '4px' }}>VERSION 1.5.1 | TESTFLIGHT READY</p>
      </header>

      <div style={{ position: 'relative', width: '260px', height: '260px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg style={{ position: 'absolute', transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
          <circle cx="130" cy="130" r="120" stroke="#1e293b" strokeWidth="6" fill="none" />
          <circle cx="130" cy="130" r="120" stroke={status === 'CAPTURING' ? '#60a5fa' : '#3b82f6'} strokeWidth="8" fill="none" strokeDasharray="754" strokeDashoffset={754 - (754 * progress) / 100} style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
        </svg>
        
        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#60a5fa', marginBottom: '4px' }}>{status}</p>
          <p style={{ fontSize: '36px', fontWeight: '800', margin: 0 }}>{yaw}°</p>
        </div>
      </div>

      <div style={{ marginTop: '50px', backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px' }}>
        <p style={{ fontSize: '13px', marginBottom: '12px', opacity: 0.8 }}>Simulate Hardware Pose (Yaw):</p>
        <input type="range" min="-15" max="15" value={yaw} onChange={(e) => setYaw(parseInt(e.target.value))} style={{ width: '100%', height: '6px', borderRadius: '3px', accentColor: '#3b82f6' }} />
        {errorMsg && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '12px', textAlign: 'center' }}>{errorMsg}</p>}
      </div>

      {status === 'RESULT' && (
        <div style={{ marginTop: '30px', padding: '24px', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.3)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', margin: '0 0 8px 0' }}>{result}</h2>
          <p style={{ fontSize: '13px', color: '#4ade80' }}>Confidence Score: {(confidence * 100).toFixed(0)}%</p>
          <button onClick={() => {setStatus('ALIGNING'); setProgress(0);}} style={{ marginTop: '20px', width: '100%', padding: '16px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', fontSize: '15px' }}>RE-SCAN</button>
        </div>
      )}
    </div>
  );
};

export default ChromaKApp;
