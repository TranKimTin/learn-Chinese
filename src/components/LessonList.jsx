import React, { useContext } from "react";
import { LESSONS } from "../data/curriculum";
import { LearningContext } from "../context/LearningContext";

const LEVEL_HEADERS = {
  vocab: {
    title: "Cấp độ 1: Từ vựng nền tảng",
    desc: "Làm quen với các từ đơn, đại từ nhân xưng và chữ số cơ bản."
  },
  phrase: {
    title: "Cấp độ 2: Cụm từ giao tiếp",
    desc: "Luyện nghe nói các cụm từ xã giao thông dụng nhất hàng ngày."
  },
  sentence: {
    title: "Cấp độ 3: Mẫu câu hoàn chỉnh",
    desc: "Học cách ghép và dịch các câu giao tiếp đầy đủ ngữ pháp chủ vị."
  }
};

export const LessonList = ({ onStartLesson }) => {
  const { completedLessons } = useContext(LearningContext);
  const levels = ["vocab", "phrase", "sentence"];

  return (
    <div className="lesson-list-container slide-in-up">
      <div style={{ marginBottom: "15px" }}>
        <h2>Lộ trình học tiếng Trung</h2>
        <p>Chọn bài học để bắt đầu tích lũy XP và hoàn thành lộ trình học tập của bạn.</p>
      </div>

      {levels.map((lvl) => {
        const levelLessons = LESSONS.filter((lesson) => lesson.level === lvl);
        if (levelLessons.length === 0) return null;
        
        const headerInfo = LEVEL_HEADERS[lvl];

        return (
          <div key={lvl} style={{ marginBottom: "28px" }}>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "var(--primary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px"
              }}
            >
              {headerInfo.title}
            </h3>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
              {headerInfo.desc}
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {levelLessons.map((lesson) => {
                const isCompleted = completedLessons.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    className="glass-card clickable lesson-card"
                    onClick={() => onStartLesson(lesson)}
                  >
                    <div className="lesson-icon">{lesson.icon}</div>
                    <div className="lesson-info">
                      <h3>{lesson.title}</h3>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                        {lesson.description}
                      </p>
                    </div>
                    {isCompleted ? (
                      <span className="lesson-badge">Đã thuộc ✓</span>
                    ) : (
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.05)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--glass-border)"
                        }}
                      >
                        Học
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
