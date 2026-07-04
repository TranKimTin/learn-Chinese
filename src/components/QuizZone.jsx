import { useState, useEffect, useContext } from "react";
import { LearningContext } from "../context/LearningContext";
import { FLASHCARDS } from "../data/curriculum";

// Synthesizer sounds for premium feedback
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

const getCardImage = (card) => {
  if (!card) return null;
  if (card.image) return card.image;
  if (card.emoji) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="46" fill="rgba(99, 102, 241, 0.08)" stroke="rgba(99, 102, 241, 0.3)" stroke-width="2" />
        <text x="50" y="66" font-size="44" text-anchor="middle" font-family="system-ui">${card.emoji}</text>
      </svg>
    `.trim();
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
  return null;
};

const getIllustrationForText = (text) => {
  if (!text) return null;
  
  // 1. Search in FLASHCARDS pool first
  const match = FLASHCARDS.find(
    (c) => c.hanzi === text || c.meaning.toLowerCase().split(",").map(m => m.trim()).includes(text.toLowerCase())
  );
  if (match) {
    return getCardImage(match);
  }

  const t = text.toLowerCase();
  // Fallbacks
  if (t.includes("我") || t.includes("tôi") || t.includes("tớ")) return "/images/me.svg";
  if (t.includes("你") || t.includes("bạn") || t.includes("cậu")) return "/images/you.svg";
  if (t.includes("he") || t.includes("anh ấy") || t.includes("ông ấy")) return "/images/he.svg";
  if (t.includes("she") || t.includes("cô ấy") || t.includes("bà ấy")) return "/images/she.svg";
  if (t.includes("吃") || t.includes("ăn")) return "/images/eat.svg";
  if (t.includes("喝") || t.includes("uống")) return "/images/drink.svg";
  if (t.includes("苹果") || t.includes("táo")) return "/images/apple.png";
  if (t.includes("茶") || t.includes("trà")) return "/images/tea.png";
  if (t.includes("水") || t.includes("nước")) return "/images/water.png";
  if (t.includes("米饭") || t.includes("cơm")) return "/images/rice.png";
  if (t.includes("你好") || t.includes("xin chào")) return "/images/hello.svg";
  if (t.includes("谢谢") || t.includes("cảm ơn")) return "/images/thanks.svg";
  if (t.includes("再见") || t.includes("tạm biệt")) return "/images/goodbye.svg";
  if (t.includes("对不起") || t.includes("xin lỗi")) return "/images/sorry.svg";
  if (t.includes("没关系") || t.includes("không sao")) return "/images/ok.svg";
  if (t.includes("不客气") || t.includes("khách sáo") || t.includes("không có chi")) return "/images/welcome.svg";
  if (t.includes("vietnam") || t.includes("việt nam") || t.includes("越南人")) return "/images/vietnam.svg";
  if (t.includes("trung quốc") || t.includes("china") || t.includes("中国菜")) return "/images/china_food.svg";
  return null;
};

export const QuizZone = ({ lesson, onClose }) => {
  const { completeLesson, addSpokenWord, toggleFavorite, isFavorite } = useContext(LearningContext);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [speakFeedback, setSpeakFeedback] = useState("");
  const [speakSuccess, setSpeakSuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedWords, setSelectedWords] = useState([]); // For build_sentence
  const [wordPool, setWordPool] = useState([]); // For build_sentence
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showQuizHint, setShowQuizHint] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const questions = lesson.questions;
  const currentQuestion = questions[currentIdx];

  // Initialize Word Pool for Sentence Builder
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === "build_sentence") {
      // Shuffle options to create the pool
      setSelectedWords([]);
      setWordPool(currentQuestion.options.map((w, index) => ({ id: index, word: w, used: false })));
    }
    setSelectedOption(null);
    setHasChecked(false);
    setIsCorrect(false);
  }, [currentIdx, lesson]);

  const speakMandarin = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Trigger speech auto for target word if available
  useEffect(() => {
    if (currentQuestion && !isFinished) {
      // Speak target character if it's Chinese
      const isChinese = /[\u4e00-\u9fa5]/.test(currentQuestion.target);
      if (isChinese) {
        speakMandarin(currentQuestion.target);
      }
    }
  }, [currentIdx, isFinished]);

  // Reset quiz hint and speak feedback when question index changes
  useEffect(() => {
    setShowQuizHint(false);
    setSpeakFeedback("");
    setSpeakSuccess(false);
    setIsListening(false);
  }, [currentIdx]);

  // Handle option click (Multiple Choice)
  const handleSelectOption = (opt) => {
    if (hasChecked) return;
    setSelectedOption(opt);
  };

  // Handle word tile click (Sentence Builder)
  const handleWordPoolClick = (poolItem) => {
    if (hasChecked) return;
    setWordPool((prev) =>
      prev.map((item) => (item.id === poolItem.id ? { ...item, used: true } : item))
    );
    setSelectedWords((prev) => [...prev, poolItem]);
  };

  const handleSelectedWordClick = (wordItem) => {
    if (hasChecked) return;
    setSelectedWords((prev) => prev.filter((item) => item.id !== wordItem.id));
    setWordPool((prev) =>
      prev.map((item) => (item.id === wordItem.id ? { ...item, used: false } : item))
    );
  };

  // Check Answer
  const handleCheck = () => {
    if (hasChecked) return;

    let correct = false;

    if (currentQuestion.type === "build_sentence") {
      const builtSentence = selectedWords.map((item) => item.word);
      const answerSentence = currentQuestion.answer;
      
      // Check if arrays are equal
      correct =
        builtSentence.length === answerSentence.length &&
        builtSentence.every((w, i) => w === answerSentence[i]);
    } else {
      correct = selectedOption === currentQuestion.answer;
    }

    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      playSoundEffect("correct");
    } else {
      playSoundEffect("incorrect");
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 500);
    }
  };

  // Next Question
  const handleContinue = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
      playSoundEffect("complete");
      completeLesson(lesson.id, 20); // Award 20 XP
    }
  };

  // Progress Bar
  const progressPercent = ((currentIdx) / questions.length) * 100;

  if (isFinished) {
    return (
      <div className="quiz-wrapper fade-in">
        <div className="success-screen">
          <div className="success-badge">🏆</div>
          <h1>Bài Học Hoàn Thành!</h1>
          <p>Chúc mừng! Bạn đã hoàn thành xuất sắc bài học: "{lesson.title}".</p>
          <div className="xp-gain">+20 XP Tích Lũy</div>
          <button className="btn btn-primary" style={{ marginTop: "30px" }} onClick={onClose}>
            Tiếp tục lộ trình
          </button>
        </div>
      </div>
    );
  }

  // Determine if check button should be disabled
  const canCheck =
    currentQuestion.type === "build_sentence"
      ? selectedWords.length > 0
      : selectedOption !== null;

  const handleSpeakCheck = (targetHanzi) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeakFeedback("Trình duyệt không hỗ trợ micro");
      setSpeakSuccess(false);
      return;
    }

    if (isListening) return;

    setIsListening(true);
    setSpeakFeedback("Đang lắng nghe... 🎙️");
    setSpeakSuccess(false);

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "zh-CN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const cleanTarget = targetHanzi.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'？。，！、；：“”\s]/g, "").toLowerCase();
        const cleanSpoken = transcript.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'？。，！、；：“”\s]/g, "").toLowerCase();

        if (cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
          setSpeakFeedback(`Chính xác! Bạn nói: "${transcript}" (+2 XP) 🎉`);
          setSpeakSuccess(true);
          playSoundEffect("correct");
          addSpokenWord(2);
        } else {
          setSpeakFeedback(`Chưa đúng (Bạn nói: "${transcript}") 🎙️`);
          setSpeakSuccess(false);
          playSoundEffect("incorrect");
        }
        setIsListening(false);
      };

      recognition.onerror = (e) => {
        console.error(e);
        if (e.error === "no-speech") {
          setSpeakFeedback("Không nghe thấy. Hãy thử lại!");
        } else if (e.error === "not-allowed") {
          setSpeakFeedback("Chưa cấp quyền micro.");
        } else {
          setSpeakFeedback(`Lỗi: ${e.error}`);
        }
        setSpeakSuccess(false);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setSpeakFeedback("Lỗi micro.");
      setSpeakSuccess(false);
      setIsListening(false);
    }
  };

  return (
    <div className={`quiz-wrapper fade-in ${shakeCard ? "shake-animation" : ""}`}>
      {/* Quiz Header */}
      <div className="quiz-header">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "500" }}>
          {currentIdx + 1}/{questions.length}
        </span>
      </div>

      {/* Quiz Body */}
      <div className="quiz-body">
        <div className="quiz-prompt">{currentQuestion.prompt}</div>

        {/* Dynamic image hint */}
        {(() => {
          if (lesson && lesson.level === "sentence") return null;
          const quizImg = getIllustrationForText(currentQuestion.target) || 
                          getIllustrationForText(currentQuestion.answer);
          if (!quizImg) return null;
          return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "10px" }}>
              {showQuizHint ? (
                <img
                  src={quizImg}
                  alt="Gợi ý hình ảnh"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    borderRadius: "12px",
                    border: "1px solid var(--glass-border)",
                    background: "rgba(255,255,255,0.03)",
                    padding: "4px"
                  }}
                />
              ) : (
                <button
                  className="btn-secondary"
                  onClick={() => setShowQuizHint(true)}
                  style={{
                    padding: "6px 14px",
                    fontSize: "12px",
                    borderRadius: "12px",
                    width: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  👁️ Xem ảnh gợi ý
                </button>
              )}
              {showQuizHint && (
                <button
                  onClick={() => setShowQuizHint(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    fontSize: "11px",
                    marginTop: "4px",
                    cursor: "pointer",
                    textDecoration: "underline"
                  }}
                >
                  Ẩn gợi ý
                </button>
              )}
            </div>
          );
        })()}

        <div className="quiz-target">
          {currentQuestion.target}
          
          <div style={{ display: "inline-flex", gap: "8px", marginLeft: "10px", alignItems: "center" }}>
            {(() => {
              const associatedCard = FLASHCARDS.find(c => c.hanzi === currentQuestion.hanzi || c.hanzi === currentQuestion.target);
              if (!associatedCard) return null;
              return (
                <button
                  onClick={() => toggleFavorite(associatedCard.id)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: isFavorite(associatedCard.id) ? "#ef4444" : "rgba(255,255,255,0.3)",
                    transition: "color 0.2s"
                  }}
                  title={isFavorite(associatedCard.id) ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                >
                  {isFavorite(associatedCard.id) ? "❤️" : "🤍"}
                </button>
              );
            })()}
            {/[\u4e00-\u9fa5]/.test(currentQuestion.target) && (
              <>
                <button className="sound-icon-btn" onClick={() => speakMandarin(currentQuestion.target)} title="Nghe phát âm">
                  🔊
                </button>
                <button
                  className={`sound-icon-btn mic-btn ${isListening ? "listening" : ""}`}
                  onClick={() => handleSpeakCheck(currentQuestion.target)}
                  title="Luyện nói qua Micro"
                >
                  🎙️
                </button>
              </>
            )}
          </div>
        </div>

        {speakFeedback && (
          <div className={`speak-feedback ${speakSuccess ? "success" : "error"}`} style={{
            fontSize: "12px",
            fontWeight: "600",
            textAlign: "center",
            marginTop: "-8px",
            marginBottom: "10px",
            color: speakSuccess ? "var(--success)" : "var(--error)"
          }}>
            {speakFeedback}
          </div>
        )}

        {/* Render question based on type */}
        {currentQuestion.type === "build_sentence" ? (
          <div>
            {/* Built Area */}
            <div className="sentence-builder-area">
              {selectedWords.map((item) => (
                <div
                  key={item.id}
                  className="word-tile"
                  onClick={() => handleSelectedWordClick(item)}
                >
                  {item.word}
                </div>
              ))}
            </div>

            {/* Word Pool */}
            <div className="word-pool">
              {wordPool.map((item) => (
                <button
                  key={item.id}
                  className={`word-tile pool-item ${item.used ? "used" : ""}`}
                  onClick={() => handleWordPoolClick(item)}
                  disabled={item.used}
                >
                  {item.word}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Multiple Choice Options */
          <div className="options-list">
            {currentQuestion.options.map((opt) => {
              let classes = "option-card glass-card";
              if (selectedOption === opt) classes += " selected";
              if (hasChecked) {
                if (opt === currentQuestion.answer) {
                  classes += " correct";
                } else if (selectedOption === opt) {
                  classes += " incorrect";
                }
              }

              return (
                <button
                  key={opt}
                  className={classes}
                  onClick={() => handleSelectOption(opt)}
                  disabled={hasChecked}
                >
                  <span>{opt}</span>
                  {hasChecked && opt === currentQuestion.answer && <span>✓</span>}
                  {hasChecked && selectedOption === opt && opt !== currentQuestion.answer && (
                    <span>✗</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quiz Footer & Feedback */}
      <div className="quiz-footer">
        {hasChecked ? (
          <div className={`feedback-bar ${isCorrect ? "correct" : "incorrect"}`}>
            <span className="feedback-title">
              {isCorrect ? "Chính xác! Cực tốt 🥳" : "Chưa đúng rồi 🥹"}
            </span>
            {!isCorrect && (
              <span className="feedback-desc">
                Đáp án đúng là:{" "}
                <strong>
                  {Array.isArray(currentQuestion.answer)
                    ? currentQuestion.answer.join(" ")
                    : currentQuestion.answer}
                </strong>
              </span>
            )}
            <button className="btn btn-primary" style={{ marginTop: "10px" }} onClick={handleContinue}>
              Tiếp tục
            </button>
          </div>
        ) : (
          <button
            className={`btn ${canCheck ? "btn-primary" : "btn-secondary"}`}
            disabled={!canCheck}
            onClick={handleCheck}
          >
            Kiểm tra
          </button>
        )}
      </div>
    </div>
  );
};
