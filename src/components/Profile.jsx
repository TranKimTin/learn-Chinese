import { useContext, useState } from "react";
import { LearningContext } from "../context/LearningContext";
import { FLASHCARDS } from "../data/curriculum";

export const Profile = () => {
  const {
    xp,
    streak,
    completedLessons,
    knownWords,
    writtenChars,
    matchGamesCount,
    spokenWordsCount,
    dailyXp,
    dailyWrittenCount,
    dailyNewWordsCount,
    dailyQuestsCompleted,
    resetProgress
  } = useContext(LearningContext);

  const [profileFilter, setProfileFilter] = useState("all"); // 'all', 'vocab', 'phrase', 'sentence'

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ tiến trình học tập? Hành động này không thể hoàn tác.")) {
      resetProgress();
    }
  };

  const speakMandarin = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Find word details for the words the user has learned
  const learnedWordsDetails = FLASHCARDS.filter((card) => knownWords.includes(card.id));
  
  // Calculate breakdown counts
  const vocabCount = learnedWordsDetails.filter((w) => w.type === "vocab").length;
  const phraseCount = learnedWordsDetails.filter((w) => w.type === "phrase").length;
  const sentenceCount = learnedWordsDetails.filter((w) => w.type === "sentence").length;

  const filteredLearned =
    profileFilter === "all"
      ? learnedWordsDetails
      : learnedWordsDetails.filter((w) => w.type === profileFilter);

  // List of achievements dynamically calculated
  const achievements = [
    {
      id: "ach_first_lesson",
      title: "🎓 Khởi Đầu Mới",
      description: "Hoàn thành bài học đầu tiên",
      isUnlocked: completedLessons.length >= 1,
      progressText: `${completedLessons.length >= 1 ? 1 : 0} / 1`,
      progressPercent: completedLessons.length >= 1 ? 100 : 0
    },
    {
      id: "ach_xp_hunter",
      title: "🚀 Chiến Thần XP",
      description: "Đạt tổng cộng 200 XP tích lũy",
      isUnlocked: xp >= 200,
      progressText: `${Math.min(xp, 200)} / 200 XP`,
      progressPercent: Math.min((xp / 200) * 100, 100)
    },
    {
      id: "ach_streak",
      title: "🔥 Bản Lĩnh Streak",
      description: "Học tập liên tục 3 ngày",
      isUnlocked: streak >= 3,
      progressText: `${Math.min(streak, 3)} / 3 ngày`,
      progressPercent: Math.min((streak / 3) * 100, 100)
    },
    {
      id: "ach_write_master",
      title: "✍️ Nét Vẽ Phượng Múa",
      description: "Tập viết thành công 5 chữ Hán",
      isUnlocked: writtenChars.length >= 5,
      progressText: `${Math.min(writtenChars.length, 5)} / 5 chữ`,
      progressPercent: Math.min((writtenChars.length / 5) * 100, 100)
    },
    {
      id: "ach_match_master",
      title: "🧩 Bậc Thầy Ghép Cặp",
      description: "Hoàn thành game ghép cặp 5 lần",
      isUnlocked: matchGamesCount >= 5,
      progressText: `${Math.min(matchGamesCount, 5)} / 5 lần`,
      progressPercent: Math.min((matchGamesCount / 5) * 100, 100)
    },
    {
      id: "ach_speak_master",
      title: "🎙️ Phát Âm Chuẩn Xứ",
      description: "Phát âm chuẩn 5 từ bằng micro",
      isUnlocked: spokenWordsCount >= 5,
      progressText: `${Math.min(spokenWordsCount, 5)} / 5 từ`,
      progressPercent: Math.min((spokenWordsCount / 5) * 100, 100)
    }
  ];

  return (
    <div className="profile-container slide-in-up">
      {/* Header Profile Row */}
      <div className="profile-avatar-row">
        <div className="avatar">🐼</div>
        <div className="profile-name">
          <h2>Gấu Trúc Nhỏ</h2>
          <p>Học viên Tiếng Trung Sơ Cấp</p>
        </div>
      </div>

      {/* Grid of Statistics */}
      <div className="profile-stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-val streak">🔥 {streak}</div>
          <div className="stat-lbl">Streak hiện tại</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-val xp">⭐ {xp}</div>
          <div className="stat-lbl">Kinh nghiệm XP</div>
        </div>
        <div className="glass-card stat-card" style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", justifyContent: "space-around", padding: "6px 0" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--primary)" }}>{vocabCount}</div>
              <div style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Từ vựng</div>
            </div>
            <div style={{ height: "30px", width: "1px", background: "var(--glass-border)", alignSelf: "center" }}></div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--warning)" }}>{phraseCount}</div>
              <div style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Cụm từ</div>
            </div>
            <div style={{ height: "30px", width: "1px", background: "var(--glass-border)", alignSelf: "center" }}></div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--success)" }}>{sentenceCount}</div>
              <div style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Mẫu câu</div>
            </div>
          </div>
          <div className="stat-lbl" style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "6px", marginTop: "4px" }}>
            Phân loại từ vựng đã thuộc
          </div>
        </div>
      </div>

      {/* --- DAILY QUESTS SECTION --- */}
      <div className="glass-card" style={{ padding: "18px", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "12px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Nhiệm vụ hôm nay 📅</span>
          <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: "normal" }}>Làm mới mỗi ngày</span>
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Quest 1 */}
          <div className={`quest-item ${dailyQuestsCompleted.includes("quest_xp") ? "completed" : ""}`} style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--glass-border)",
            borderRadius: "12px",
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            transition: "all 0.3s ease"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <span style={{ fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                ⭐ Tích lũy 30 XP ngày {dailyQuestsCompleted.includes("quest_xp") && "✅"}
              </span>
              <span style={{ color: "var(--text-secondary)", fontSize: "12px" }}>{Math.min(dailyXp, 30)}/30 XP (+15 XP)</span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                background: "var(--primary)",
                width: `${Math.min((dailyXp / 30) * 100, 100)}%`,
                transition: "width 0.5s ease"
              }} />
            </div>
          </div>

          {/* Quest 2 */}
          <div className={`quest-item ${dailyQuestsCompleted.includes("quest_write") ? "completed" : ""}`} style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--glass-border)",
            borderRadius: "12px",
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            transition: "all 0.3s ease"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <span style={{ fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                ✍️ Luyện viết 2 chữ Hán {dailyQuestsCompleted.includes("quest_write") && "✅"}
              </span>
              <span style={{ color: "var(--text-secondary)", fontSize: "12px" }}>{Math.min(dailyWrittenCount, 2)}/2 chữ (+10 XP)</span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                background: "var(--success)",
                width: `${Math.min((dailyWrittenCount / 2) * 100, 100)}%`,
                transition: "width 0.5s ease"
              }} />
            </div>
          </div>

          {/* Quest 3 */}
          <div className={`quest-item ${dailyQuestsCompleted.includes("quest_new_words") ? "completed" : ""}`} style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--glass-border)",
            borderRadius: "12px",
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            transition: "all 0.3s ease"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <span style={{ fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                📚 Ghi nhớ 3 từ mới {dailyQuestsCompleted.includes("quest_new_words") && "✅"}
              </span>
              <span style={{ color: "var(--text-secondary)", fontSize: "12px" }}>{Math.min(dailyNewWordsCount, 3)}/3 từ (+10 XP)</span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                background: "var(--warning)",
                width: `${Math.min((dailyNewWordsCount / 3) * 100, 100)}%`,
                transition: "width 0.5s ease"
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* --- ACHIEVEMENTS SECTION --- */}
      <div className="glass-card" style={{ padding: "18px", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "12px", color: "white" }}>
          Huy hiệu thành tích 🏆
        </h3>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          maxHeight: "260px",
          overflowY: "auto",
          paddingRight: "4px"
        }}>
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`ach-card ${ach.isUnlocked ? "unlocked" : "locked"}`}
              style={{
                background: ach.isUnlocked ? "rgba(99, 102, 241, 0.08)" : "rgba(255, 255, 255, 0.01)",
                border: ach.isUnlocked ? "1px solid rgba(99, 102, 241, 0.25)" : "1px solid var(--glass-border)",
                borderRadius: "14px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                opacity: ach.isUnlocked ? 1 : 0.6,
                transition: "all 0.3s ease"
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: "700", color: ach.isUnlocked ? "white" : "var(--text-secondary)" }}>
                {ach.title}
              </div>
              <div style={{ fontSize: "9px", color: "var(--text-muted)", lineHeight: "1.2", height: "22px" }}>
                {ach.description}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8px", color: "var(--text-secondary)", marginTop: "4px" }}>
                <span>Tiến độ:</span>
                <span>{ach.progressText}</span>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.03)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  background: ach.isUnlocked ? "var(--primary)" : "var(--text-muted)",
                  width: `${ach.progressPercent}%`
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learned words dictionary */}
      <div className="glass-card" style={{ padding: "18px", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "12px", color: "white" }}>
          Sổ tay từ vựng học tập ({learnedWordsDetails.length} từ)
        </h3>

        {/* Small filter sub-tabs inside profile */}
        <div className="tab-selector" style={{ marginBottom: "12px", padding: "2px" }}>
          <button
            className={`tab-btn ${profileFilter === "all" ? "active" : ""}`}
            onClick={() => setProfileFilter("all")}
            style={{ fontSize: "11px", padding: "6px" }}
          >
            Tất cả
          </button>
          <button
            className={`tab-btn ${profileFilter === "vocab" ? "active" : ""}`}
            onClick={() => setProfileFilter("vocab")}
            style={{ fontSize: "11px", padding: "6px" }}
          >
            Từ ({vocabCount})
          </button>
          <button
            className={`tab-btn ${profileFilter === "phrase" ? "active" : ""}`}
            onClick={() => setProfileFilter("phrase")}
            style={{ fontSize: "11px", padding: "6px" }}
          >
            Cụm ({phraseCount})
          </button>
          <button
            className={`tab-btn ${profileFilter === "sentence" ? "active" : ""}`}
            onClick={() => setProfileFilter("sentence")}
            style={{ fontSize: "11px", padding: "6px" }}
          >
            Câu ({sentenceCount})
          </button>
        </div>
        
        {filteredLearned.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "18px 0", fontSize: "13px" }}>
            Không có từ nào thuộc nhóm này. Hãy tích lũy thêm bài học nhé!
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              maxHeight: "180px",
              overflowY: "auto",
              paddingRight: "4px"
            }}
          >
            {filteredLearned.map((word) => (
              <button
                key={word.id}
                onClick={() => speakMandarin(word.hanzi)}
                style={{
                  background: "rgba(99, 102, 241, 0.08)",
                  border: "1px solid rgba(99, 102, 241, 0.18)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "16px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "background 0.2s"
                }}
                title="Bấm để nghe phát âm"
              >
                <span>{word.hanzi}</span>
                <span style={{ fontSize: "9px", color: "var(--text-secondary)", fontWeight: "normal" }}>
                  ({word.pinyin})
                </span>
                <span>🔊</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reset Progress Button */}
      <div className="profile-settings">
        <button
          className="btn"
          onClick={handleReset}
          style={{
            background: "rgba(239, 68, 68, 0.05)",
            border: "1px solid rgba(239, 68, 68, 0.15)",
            color: "var(--error)",
            padding: "10px",
            fontSize: "13px"
          }}
        >
          Đặt lại toàn bộ tiến trình ⟲
        </button>
      </div>
    </div>
  );
};
