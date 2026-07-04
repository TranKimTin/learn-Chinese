import React, { useContext } from "react";
import { LearningContext } from "../context/LearningContext";

export const Header = () => {
  const { xp, streak } = useContext(LearningContext);

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
      </div>
    </header>
  );
};
