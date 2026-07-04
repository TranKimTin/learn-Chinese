import { useState } from "react";
import { LearningProvider } from "./context/LearningContext";
import { MobileFrame } from "./components/MobileFrame";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { LessonList } from "./components/LessonList";
import { PinyinChart } from "./components/PinyinChart";
import { FlashcardDeck } from "./components/FlashcardDeck";
import { StrokeWriter } from "./components/StrokeWriter";
import { MatchGame } from "./components/MatchGame";
import { Profile } from "./components/Profile";
import { QuizZone } from "./components/QuizZone";

function AppContent() {
  const [activeTab, setActiveTab] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(null);
  const [learnSubTab, setLearnSubTab] = useState("lessons"); // 'lessons' or 'pinyin'
  const [practiceSubTab, setPracticeSubTab] = useState("stroke"); // 'stroke' or 'match'

  // Renders the main view based on bottom tab and sub-tabs
  const renderActiveView = () => {
    switch (activeTab) {
      case "learn":
        return (
          <div className="fade-in">
            {/* Learn Screen Sub-tabs */}
            <div className="tab-selector" style={{ marginBottom: "20px" }}>
              <button
                className={`tab-btn ${learnSubTab === "lessons" ? "active" : ""}`}
                onClick={() => setLearnSubTab("lessons")}
              >
                Bài học 📚
              </button>
              <button
                className={`tab-btn ${learnSubTab === "pinyin" ? "active" : ""}`}
                onClick={() => setLearnSubTab("pinyin")}
              >
                Bảng Pinyin 🗣️
              </button>
            </div>
            
            {learnSubTab === "lessons" ? (
              <LessonList onStartLesson={(lesson) => setActiveLesson(lesson)} />
            ) : (
              <PinyinChart />
            )}
          </div>
        );
      case "vocab":
        return <FlashcardDeck />;
      case "practice":
        return (
          <div className="fade-in">
            {/* Practice Screen Sub-tabs */}
            <div className="tab-selector" style={{ marginBottom: "20px" }}>
              <button
                className={`tab-btn ${practiceSubTab === "stroke" ? "active" : ""}`}
                onClick={() => setPracticeSubTab("stroke")}
              >
                Tập viết ✍️
              </button>
              <button
                className={`tab-btn ${practiceSubTab === "match" ? "active" : ""}`}
                onClick={() => setPracticeSubTab("match")}
              >
                Ghép cặp 🧩
              </button>
            </div>
            
            {practiceSubTab === "stroke" ? (
              <StrokeWriter />
            ) : (
              <MatchGame />
            )}
          </div>
        );
      case "profile":
        return <Profile />;
      default:
        return <LessonList onStartLesson={(lesson) => setActiveLesson(lesson)} />;
    }
  };

  return (
    <MobileFrame>
      <div className="phone-screen">
        {/* If a quiz is active, overlay it on the screen */}
        {activeLesson ? (
          <QuizZone lesson={activeLesson} onClose={() => setActiveLesson(null)} />
        ) : (
          <>
            {/* Static App Header displaying Streak and XP */}
            <Header />
            
            {/* Scrollable content body */}
            <main className="main-scrollable">{renderActiveView()}</main>
            
            {/* Fixed Bottom Navigation Menu */}
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        )}
      </div>
    </MobileFrame>
  );
}

export default function App() {
  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  );
}
