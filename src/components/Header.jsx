import { useState, useEffect, useContext } from "react";
import { LearningContext } from "../context/LearningContext";

export const Header = () => {
  const { xp, streak } = useContext(LearningContext);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="app-header">
      <div className="logo-text">SinoLearn</div>
      <div className="header-stats">
        <div className="stat-badge streak" title="Streak ngày học liên tiếp">
          <span>🔥</span>
          <span>{streak}</span>
        </div>
        <div className="stat-badge xp" title="Kinh nghiệm tích lũy">
          <span>⭐</span>
          <span>{xp} XP</span>
        </div>
        <button
          className="fullscreen-btn"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
        >
          {isFullscreen ? "⊡" : "⛶"}
        </button>
      </div>
    </header>
  );
};
