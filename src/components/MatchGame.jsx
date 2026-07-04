import { useState, useEffect, useContext } from "react";
import { LearningContext } from "../context/LearningContext";
import { FLASHCARDS } from "../data/curriculum";

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
    } else if (type === "incorrect") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      osc.start();

      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === "complete") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();

      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // C6

      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.stop(ctx.currentTime + 0.65);
    }
  } catch (e) {
    console.warn("Audio Context not fully supported/blocked by browser policies", e);
  }
};

export const MatchGame = () => {
  const { completeMatchGame } = useContext(LearningContext);
  const [tiles, setTiles] = useState([]);
  const [selectedTileId, setSelectedTileId] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);

  // Initialize a new game
  const initGame = () => {
    // 1. Pick 6 random cards from FLASHCARDS
    const shuffledCards = [...FLASHCARDS].sort(() => Math.random() - 0.5);
    const selectedCards = shuffledCards.slice(0, 6);

    // 2. Generate 12 tiles (6 Hanzi, 6 Meaning)
    const newTiles = [];
    selectedCards.forEach((card) => {
      newTiles.push({
        id: `${card.id}_hanzi`,
        cardId: card.id,
        text: card.hanzi,
        type: "hanzi",
        status: "idle", // 'idle' | 'selected' | 'matched' | 'incorrect'
        pinyin: card.pinyin // save for speech pronunciation if wanted
      });
      newTiles.push({
        id: `${card.id}_meaning`,
        cardId: card.id,
        text: card.meaning.split(",")[0], // Use short name
        type: "meaning",
        status: "idle",
        pinyin: ""
      });
    });

    // 3. Shuffle tiles
    setTiles(newTiles.sort(() => Math.random() - 0.5));
    setSelectedTileId(null);
    setIsBusy(false);
    setGameWon(false);
    setMatchedCount(0);
  };

  useEffect(() => {
    setTimeout(() => {
      initGame();
    }, 0);
  }, []);

  const speakMandarin = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTileClick = (tile) => {
    if (isBusy || tile.status === "matched" || tile.id === selectedTileId) return;

    // Speak character if clicked
    if (tile.type === "hanzi") {
      speakMandarin(tile.text);
    }

    // Case 1: First tile selection
    if (selectedTileId === null) {
      setSelectedTileId(tile.id);
      setTiles((prev) =>
        prev.map((t) => (t.id === tile.id ? { ...t, status: "selected" } : t))
      );
      return;
    }

    // Case 2: Second tile selection
    const firstTile = tiles.find((t) => t.id === selectedTileId);
    const secondTile = tile;
    
    setIsBusy(true);
    
    // Check if match
    const isMatch =
      firstTile.cardId === secondTile.cardId && firstTile.type !== secondTile.type;

    if (isMatch) {
      playSoundEffect("correct");
      
      setTiles((prev) =>
        prev.map((t) =>
          t.id === firstTile.id || t.id === secondTile.id
            ? { ...t, status: "matched" }
            : t
        )
      );
      
      const newMatchedCount = matchedCount + 1;
      setMatchedCount(newMatchedCount);
      setSelectedTileId(null);
      setIsBusy(false);

      // Check win condition (6 pairs matched)
      if (newMatchedCount === 6) {
        setTimeout(() => {
          playSoundEffect("complete");
          completeMatchGame(15); // Award 15 XP
          setGameWon(true);
        }, 500);
      }
    } else {
      playSoundEffect("incorrect");
      
      // Mark as incorrect
      setTiles((prev) =>
        prev.map((t) =>
          t.id === firstTile.id || t.id === secondTile.id
            ? { ...t, status: "incorrect" }
            : t
        )
      );

      // Wait a moment, then reset to idle
      setTimeout(() => {
        setTiles((prev) =>
          prev.map((t) =>
            t.status === "incorrect" ? { ...t, status: "idle" } : t
          )
        );
        setSelectedTileId(null);
        setIsBusy(false);
      }, 800);
    }
  };

  return (
    <div className="match-game-container slide-in-up">
      {gameWon ? (
        <div className="glass-card win-screen" style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: "64px", marginBottom: "10px" }}>🏆</div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "8px", color: "var(--success)" }}>
            Hoàn Thành Ghép Cặp!
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px", fontSize: "14px" }}>
            Bạn đã ghép đúng tất cả từ vựng tiếng Trung và nghĩa tiếng Việt một cách xuất sắc!
          </p>
          
          <div className="xp-badge" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--success-light)", border: "1px solid var(--success)", padding: "8px 16px", borderRadius: "20px", color: "#10b981", fontWeight: "bold", fontSize: "16px", marginBottom: "30px" }}>
            <span>⭐</span>
            <span>+15 XP Kinh Nghiệm</span>
          </div>

          <button className="btn btn-primary" onClick={initGame} style={{ width: "100%", padding: "14px" }}>
            Chơi lượt mới 🎮
          </button>
        </div>
      ) : (
        <>
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Ghép Cặp Từ Vựng</h2>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Ghép chữ Hán và Nghĩa tiếng Việt tương ứng. Tiến độ: {matchedCount}/6 cặp
            </p>
          </div>

          {/* 3x4 Grid */}
          <div className="match-grid">
            {tiles.map((tile) => {
              const classes = `match-tile ${tile.status}`;
              return (
                <button
                  key={tile.id}
                  className={classes}
                  onClick={() => handleTileClick(tile)}
                  disabled={tile.status === "matched" || isBusy && tile.status !== "selected"}
                >
                  <div className="tile-content">
                    <span className="tile-text">{tile.text}</span>
                    {tile.type === "hanzi" && tile.status === "matched" && (
                      <span className="tile-pinyin">{tile.pinyin}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
            <button
              className="btn btn-secondary"
              onClick={initGame}
              style={{ flex: 1, padding: "10px", fontSize: "13px" }}
            >
              Tráo từ khác ⟲
            </button>
          </div>
        </>
      )}
    </div>
  );
};
