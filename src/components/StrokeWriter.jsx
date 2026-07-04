import { useState, useEffect, useRef, useContext } from "react";
import { CHARACTERS_TO_WRITE } from "../data/curriculum";
import { LearningContext } from "../context/LearningContext";

// Synthesizer sound effects
const playSoundEffect = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "correct") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch (e) {
    console.warn("Audio Context block/error", e);
  }
};

export const StrokeWriter = () => {
  const { addWrittenChar } = useContext(LearningContext);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [writeFeedback, setWriteFeedback] = useState("");
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const currentChar = CHARACTERS_TO_WRITE[currentCharIdx];

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;
    
    // Clear canvas drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Set up canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // We set size to 300x300
    canvas.width = 300;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#818cf8"; // Bright indigo brush
    ctx.lineWidth = 8;
    contextRef.current = ctx;

    clearCanvas();
    setWriteFeedback("");
  }, [currentCharIdx]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    const ctx = contextRef.current;
    if (ctx) {
      ctx.closePath();
    }
  };

  const speakCharacter = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentChar.char);
      utterance.lang = "zh-CN";
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Play animation drawing coordinates in red
  const animateStrokeOrder = async () => {
    clearCanvas();
    const ctx = contextRef.current;
    if (!ctx) return;

    const originalStrokeStyle = ctx.strokeStyle;
    const originalLineWidth = ctx.lineWidth;

    ctx.strokeStyle = "#ef4444"; // Red for guide stroke
    ctx.lineWidth = 10;

    for (let i = 0; i < currentChar.strokes.length; i++) {
      const stroke = currentChar.strokes[i];
      
      // We animate drawing the line from 'from' to 'to'
      await new Promise((resolve) => {
        let pct = 0;
        const steps = 15;
        const drawStep = () => {
          pct += 1 / steps;
          const currentX = stroke.from.x + (stroke.to.x - stroke.from.x) * pct;
          const currentY = stroke.from.y + (stroke.to.y - stroke.from.y) * pct;
          
          ctx.beginPath();
          ctx.moveTo(stroke.from.x, stroke.from.y);
          ctx.lineTo(currentX, currentY);
          ctx.stroke();
          ctx.closePath();

          if (pct < 1) {
            requestAnimationFrame(drawStep);
          } else {
            resolve();
          }
        };
        drawStep();
      });

      // Pause briefly between strokes
      await new Promise((r) => setTimeout(r, 250));
    }

    // Reset styles
    ctx.strokeStyle = originalStrokeStyle;
    ctx.lineWidth = originalLineWidth;
  };

  const handleFinishCharacter = () => {
    addWrittenChar(currentChar.char, 10); // Award 10 XP
    setWriteFeedback("Tuyệt vời! Đã ghi nhận (+10 XP) 🎉");
    playSoundEffect("correct");
    setTimeout(() => {
      setWriteFeedback("");
      clearCanvas();
      if (currentCharIdx + 1 < CHARACTERS_TO_WRITE.length) {
        setCurrentCharIdx((prev) => prev + 1);
      }
    }, 1200);
  };

  const handlePrev = () => {
    if (currentCharIdx > 0) {
      setCurrentCharIdx((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentCharIdx + 1 < CHARACTERS_TO_WRITE.length) {
      setCurrentCharIdx((prev) => prev + 1);
    }
  };

  return (
    <div className="stroke-container slide-in-up">
      <div style={{ textAlign: "center", marginBottom: "5px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Tập Viết Chữ Hán</h2>
        <p style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
          Luyện vẽ chữ Hán theo đúng thứ tự nét để nhớ mặt chữ lâu hơn.
        </p>
      </div>

      {/* Character Selector Carousel */}
      <div className="char-carousel" style={{ margin: "10px 0" }}>
        <button className="arrow-btn" onClick={handlePrev} disabled={currentCharIdx === 0}>
          ◀
        </button>
        
        <div className="carousel-info">
          <h3 style={{ fontSize: "24px" }}>{currentChar.char}</h3>
          <p style={{ fontWeight: "600", color: "var(--primary)", fontSize: "14px" }}>{currentChar.pinyin}</p>
          <p style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Nghĩa: {currentChar.meaning}</p>
        </div>

        <button
          className="arrow-btn"
          onClick={handleNext}
          disabled={currentCharIdx === CHARACTERS_TO_WRITE.length - 1}
        >
          ▶
        </button>
      </div>

      {/* Canvas Area with grid background */}
      <div className="canvas-area" style={{ margin: "0 auto 12px" }}>
        {/* Guidelines Grid Overlay */}
        <svg className="grid-background" width="300" height="300">
          <line x1="0" y1="150" x2="300" y2="150" className="grid-line" />
          <line x1="150" y1="0" x2="150" y2="300" className="grid-line" />
          <line x1="0" y1="0" x2="300" y2="300" className="grid-line" />
          <line x1="300" y1="0" x2="0" y2="300" className="grid-line" />
        </svg>

        {/* Faded background character */}
        <div className="canvas-background-text">{currentChar.char}</div>

        {/* Interactive Drawing Canvas */}
        <canvas
          ref={canvasRef}
          className="drawing-canvas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>

      {writeFeedback && (
        <div style={{
          textAlign: "center",
          fontSize: "12px",
          color: "var(--success)",
          fontWeight: "600",
          marginBottom: "10px"
        }}>
          {writeFeedback}
        </div>
      )}

      {/* Tools */}
      <div className="stroke-tools" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        <button className="btn btn-secondary" onClick={clearCanvas} style={{ padding: "8px", fontSize: "12px" }}>
          Viết lại ⟲
        </button>
        <button className="btn btn-secondary" onClick={speakCharacter} style={{ padding: "8px", fontSize: "12px" }}>
          Phát âm 🔊
        </button>
        <button className="btn btn-secondary" onClick={animateStrokeOrder} style={{ padding: "8px", fontSize: "12px" }}>
          Nét vẽ mẫu ✏️
        </button>
        <button className="btn btn-primary" onClick={handleFinishCharacter} style={{ padding: "8px", fontSize: "12px" }}>
          Hoàn thành ✅
        </button>
      </div>
    </div>
  );
};
