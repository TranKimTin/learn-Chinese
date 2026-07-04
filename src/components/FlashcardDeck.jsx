import { useState, useEffect, useContext } from "react";
import { FLASHCARDS } from "../data/curriculum";
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
    console.warn("AudioContext block/error", e);
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
  if (t.includes("nǐ") || t.includes("bạn") || t.includes("cậu")) return "/images/you.svg";
  if (t.includes("他") || t.includes("anh ấy") || t.includes("ông ấy")) return "/images/he.svg";
  if (t.includes("她") || t.includes("cô ấy") || t.includes("bà ấy")) return "/images/she.svg";
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

export const FlashcardDeck = () => {
  const { markWordAsKnown, addXp, addSpokenWord, favorites, toggleFavorite, isFavorite } = useContext(LearningContext);
  const [activeType, setActiveType] = useState("all"); // 'all', 'vocab', 'phrase', 'sentence'
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [cards, setCards] = useState([]);
  const [showQuizHint, setShowQuizHint] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakFeedback, setSpeakFeedback] = useState("");
  const [speakSuccess, setSpeakSuccess] = useState(false);
  
  // Tab/Mode States
  const [studyMode, setStudyMode] = useState("flashcard"); // 'flashcard', 'quiz'

  // Flashcards States
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [xpGainedCard, setXpGainedCard] = useState(0);

  // Dynamic Quiz States
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizCurrentIdx, setQuizCurrentIdx] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState(null);
  const [quizHasChecked, setQuizHasChecked] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizIsFinished, setQuizIsFinished] = useState(false);

  // Compute dynamic categories based on activeType
  const filteredForCategories =
    activeType === "favorites"
      ? FLASHCARDS.filter((c) => favorites.includes(c.id))
      : (activeType === "all"
        ? FLASHCARDS
        : FLASHCARDS.filter((c) => c.type === activeType));
  
  const categories = ["Tất cả", ...new Set(filteredForCategories.map((c) => c.category))];

  // Load cards based on type and category
  useEffect(() => {
    let filtered = FLASHCARDS;
    
    if (activeType === "favorites") {
      filtered = filtered.filter((c) => favorites.includes(c.id));
    } else if (activeType !== "all") {
      filtered = filtered.filter((c) => c.type === activeType);
    }
    
    if (selectedCategory !== "Tất cả") {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }
    
    // Shuffle
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setTimeout(() => {
      setCards(shuffled);
      setCurrentIdx(0);
      setIsFlipped(false);
      setIsFinished(false);
      setXpGainedCard(0);
      setSpeakFeedback("");
      setSpeakSuccess(false);
      setIsListening(false);
      
      // Reset Quiz
      setQuizIsFinished(false);
      setQuizQuestions([]);
      setQuizCurrentIdx(0);
    }, 0);
  }, [activeType, selectedCategory, favorites]);

  // Reset quiz hint when question index changes
  useEffect(() => {
    setTimeout(() => {
      setShowQuizHint(false);
    }, 0);
  }, [quizCurrentIdx]);

  const speakMandarin = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = 0.75;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Quiz Generation Helper
  const generateQuiz = (sourceCards) => {
    // Take up to 5 cards
    const targetCards = sourceCards.slice(0, 5);
    
    return targetCards.map((card, idx) => {
      // Pick question type randomly: 
      // 0: Hanzi to Meaning, 1: Meaning to Hanzi, 2: Hanzi to Pinyin
      const qType = Math.floor(Math.random() * 3);
      
      let prompt;
      let target;
      let answer;
      let optField;
      
      if (qType === 0) {
        prompt = card.type === "sentence" ? "Câu này nghĩa là gì?" : (card.type === "phrase" ? "Cụm từ này nghĩa là gì?" : "Từ này nghĩa là gì?");
        target = card.hanzi;
        answer = card.meaning;
        optField = "meaning";
      } else if (qType === 1) {
        prompt = "Chọn chữ Hán phù hợp với nghĩa:";
        target = card.meaning;
        answer = card.hanzi;
        optField = "hanzi";
      } else {
        prompt = "Phiên âm đúng của chữ này là:";
        target = card.hanzi;
        answer = card.pinyin;
        optField = "pinyin";
      }
      
      // Pull incorrect options from global FLASHCARDS pool to ensure variety
      const pool = FLASHCARDS.filter((c) => c.id !== card.id).map((c) => c[optField]);
      const uniquePool = [...new Set(pool)];
      const incorrectOptions = [...uniquePool].sort(() => Math.random() - 0.5).slice(0, 3);
      
      // Shuffle combined options
      const options = [answer, ...incorrectOptions].sort(() => Math.random() - 0.5);
      
      return {
        id: `gq_${idx}`,
        prompt,
        target,
        answer,
        options,
        hanzi: card.hanzi,
        cardType: card.type
      };
    });
  };

  // Auto-speak Hanzi when flashcard is flipped to back
  useEffect(() => {
    if (studyMode === "flashcard" && isFlipped && cards[currentIdx]) {
      speakMandarin(cards[currentIdx].hanzi);
    }
  }, [isFlipped, studyMode, cards, currentIdx]);

  // Generate Quiz when switching to quiz mode
  useEffect(() => {
    if (studyMode === "quiz" && cards.length >= 2) {
      const generated = generateQuiz(cards);
      setTimeout(() => {
        setQuizQuestions(generated);
        setQuizCurrentIdx(0);
        setQuizSelectedOption(null);
        setQuizHasChecked(false);
        setQuizScore(0);
        setQuizIsFinished(false);
      }, 0);
    }
  }, [studyMode, cards]);

  // Speech helper for quiz target
  useEffect(() => {
    if (studyMode === "quiz" && quizQuestions[quizCurrentIdx] && !quizIsFinished) {
      const q = quizQuestions[quizCurrentIdx];
      // Speak if target or answer contains Chinese characters
      const isChinese = /[\u4e00-\u9fa5]/.test(q.target);
      if (isChinese) {
        speakMandarin(q.target);
      }
    }
  }, [quizCurrentIdx, quizQuestions, studyMode, quizIsFinished]);

  // --- Flashcard Actions ---
  const handleSpeakCheck = (targetHanzi) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeakFeedback("Trình duyệt không hỗ trợ micro");
      setSpeakSuccess(false);
      return;
    }

    if (isListening) return;

    setIsListening(true);
    setSpeakFeedback("Đang lắng nghe... Hãy nói to rõ 🎙️");
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
          setSpeakFeedback("Không nhận dạng được giọng nói. Hãy thử lại!");
        } else if (e.error === "not-allowed") {
          setSpeakFeedback("Cần cấp quyền truy cập micro.");
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
      setSpeakFeedback("Lỗi kết nối micro.");
      setSpeakSuccess(false);
      setIsListening(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setSpeakFeedback("");
    setSpeakSuccess(false);
    setIsListening(false);
  };

  const handleNextCard = (markKnown) => {
    if (markKnown && cards[currentIdx]) {
      markWordAsKnown(cards[currentIdx].id);
      setXpGainedCard((prev) => prev + 5);
    }

    setIsFlipped(false);
    setSpeakFeedback("");
    setSpeakSuccess(false);
    setIsListening(false);
    
    setTimeout(() => {
      if (currentIdx + 1 < cards.length) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 150);
  };

  const handleRestartCards = () => {
    let filtered = FLASHCARDS;
    if (activeType !== "all") filtered = filtered.filter((c) => c.type === activeType);
    if (selectedCategory !== "Tất cả") filtered = filtered.filter((c) => c.category === selectedCategory);
    setCards([...filtered].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setIsFlipped(false);
    setIsFinished(false);
    setXpGainedCard(0);
  };

  // --- Quiz Actions ---
  const handleSelectQuizOption = (opt) => {
    if (quizHasChecked) return;
    setQuizSelectedOption(opt);
  };

  const handleCheckQuizAnswer = () => {
    if (quizHasChecked) return;
    
    const q = quizQuestions[quizCurrentIdx];
    const correct = quizSelectedOption === q.answer;
    
    setQuizIsCorrect(correct);
    setQuizHasChecked(true);
    
    if (correct) {
      playSoundEffect("correct");
      setQuizScore((prev) => prev + 1);
    } else {
      playSoundEffect("incorrect");
    }
  };

  const handleContinueQuiz = () => {
    if (quizCurrentIdx + 1 < quizQuestions.length) {
      setQuizCurrentIdx((prev) => prev + 1);
      setQuizSelectedOption(null);
      setQuizHasChecked(false);
    } else {
      // Finished
      setQuizIsFinished(true);
      playSoundEffect("complete");
      // Add XP: 2 XP per correct answer
      const earned = quizScore * 2;
      if (earned > 0) {
        addXp(earned);
      }
    }
  };

  const handleRestartQuiz = () => {
    const generated = generateQuiz(cards);
    setQuizQuestions(generated);
    setQuizCurrentIdx(0);
    setQuizSelectedOption(null);
    setQuizHasChecked(false);
    setQuizScore(0);
    setQuizIsFinished(false);
  };

  const handleTypeChange = (typeVal) => {
    setActiveType(typeVal);
    setSelectedCategory("Tất cả");
  };

  const currentCard = cards[currentIdx];

  const getTypeLabel = (t) => {
    if (t === "vocab") return "Từ vựng";
    if (t === "phrase") return "Cụm từ";
    if (t === "sentence") return "Câu";
    return "";
  };

  return (
    <div className="flashcards-container slide-in-up">
      {/* 1. STUDY MODE SELECTOR (Flashcard vs Quiz) */}
      {!isFinished && !quizIsFinished && (
        <div className="tab-selector" style={{ width: "100%", background: "rgba(0,0,0,0.15)", padding: "3px" }}>
          <button
            className={`tab-btn ${studyMode === "flashcard" ? "active" : ""}`}
            onClick={() => setStudyMode("flashcard")}
            style={{ fontSize: "13px" }}
          >
            📇 Thẻ ghi nhớ
          </button>
          <button
            className={`tab-btn ${studyMode === "quiz" ? "active" : ""}`}
            onClick={() => setStudyMode("quiz")}
            style={{ fontSize: "13px" }}
          >
            📝 Trắc nghiệm nhanh
          </button>
        </div>
      )}

      {/* 2. TYPE FILTER TABS */}
      {!isFinished && !quizIsFinished && (
        <div className="tab-selector" style={{ width: "100%", marginBottom: "5px", display: "flex", flexWrap: "wrap", gap: "4px" }}>
          <button className={`tab-btn ${activeType === "all" ? "active" : ""}`} onClick={() => handleTypeChange("all")} style={{ fontSize: "10px", padding: "6px 4px", flex: "1" }}>
            Tất cả
          </button>
          <button className={`tab-btn ${activeType === "vocab" ? "active" : ""}`} onClick={() => handleTypeChange("vocab")} style={{ fontSize: "10px", padding: "6px 4px", flex: "1" }}>
            Từ vựng
          </button>
          <button className={`tab-btn ${activeType === "phrase" ? "active" : ""}`} onClick={() => handleTypeChange("phrase")} style={{ fontSize: "10px", padding: "6px 4px", flex: "1" }}>
            Cụm từ
          </button>
          <button className={`tab-btn ${activeType === "sentence" ? "active" : ""}`} onClick={() => handleTypeChange("sentence")} style={{ fontSize: "10px", padding: "6px 4px", flex: "1" }}>
            Mẫu câu
          </button>
          <button className={`tab-btn ${activeType === "favorites" ? "active" : ""}`} onClick={() => handleTypeChange("favorites")} style={{ fontSize: "10px", padding: "6px 4px", flex: "1.2", display: "flex", alignItems: "center", justifyContent: "center", gap: "2px" }}>
            ❤️ Yêu thích ({favorites.length})
          </button>
        </div>
      )}

      {/* 3. CATEGORY SELECTOR */}
      {!isFinished && !quizIsFinished && categories.length > 1 && (
        <div className="deck-selector">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "white",
              borderRadius: "var(--border-radius-sm)",
              fontWeight: "600",
              fontSize: "13px",
              outline: "none"
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} style={{ background: "#0f172a" }}>
                Chủ đề: {cat}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 4. RENDER FLASHCARD MODE */}
      {studyMode === "flashcard" && (
        <>
          {isFinished ? (
            <div className="glass-card success-screen" style={{ width: "100%", padding: "30px 20px" }}>
              <div className="success-badge">🎉</div>
              <h2>Hoàn Thành Bộ Thẻ!</h2>
              <p>Bạn đã xem qua toàn bộ {cards.length} thẻ học.</p>
              {xpGainedCard > 0 && <div className="xp-gain">+{xpGainedCard} XP Thẻ Mới</div>}
              <button className="btn btn-primary" style={{ marginTop: "20px" }} onClick={handleRestartCards}>
                Học lại bộ này
              </button>
            </div>
          ) : cards.length === 0 ? (
            <div className="glass-card success-screen" style={{ width: "100%", padding: "30px 20px" }}>
              <div className="success-badge" style={{ fontSize: "36px", marginBottom: "8px" }}>❤️</div>
              <h2>Yêu thích trống</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.4", margin: "10px 0" }}>
                {activeType === "favorites"
                  ? "Bạn chưa có từ vựng yêu thích nào. Hãy nhấn biểu tượng ❤️ khi học thẻ hoặc luyện tập để thêm từ vào danh sách này!"
                  : "Không có thẻ học nào phù hợp với bộ lọc."}
              </p>
              <button className="btn btn-secondary" onClick={() => handleTypeChange("all")}>Xem tất cả</button>
            </div>
          ) : (
            <>
              <div className="card-counter">Thẻ {currentIdx + 1} / {cards.length}</div>
              
              <div className={`card-scene ${isFlipped ? "is-flipped" : ""}`} onClick={handleFlip}>
                <div className="flashcard-inner">
                  {/* Front */}
                  <div className="card-face card-front">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                      <span className="card-category" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)" }}>
                        {getTypeLabel(currentCard.type)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(currentCard.id);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "20px",
                          cursor: "pointer",
                          color: isFavorite(currentCard.id) ? "#ef4444" : "rgba(255,255,255,0.3)",
                          transition: "color 0.2s"
                        }}
                        title={isFavorite(currentCard.id) ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                      >
                        {isFavorite(currentCard.id) ? "❤️" : "🤍"}
                      </button>
                      <span className="card-category">{currentCard.category}</span>
                    </div>
                    <div className="card-character" style={{ fontSize: currentCard.type === "sentence" ? "30px" : "60px", lineHeight: "1.3" }}>
                      {currentCard.hanzi}
                    </div>
                    <div className="card-tip">Chạm để lật và nghe phát âm 👆</div>
                  </div>
                  
                  {/* Back */}
                  <div className="card-face card-back">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                      <span className="card-category" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)" }}>
                        {getTypeLabel(currentCard.type)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(currentCard.id);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "20px",
                          cursor: "pointer",
                          color: isFavorite(currentCard.id) ? "#ef4444" : "rgba(255,255,255,0.3)",
                          transition: "color 0.2s"
                        }}
                        title={isFavorite(currentCard.id) ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                      >
                        {isFavorite(currentCard.id) ? "❤️" : "🤍"}
                      </button>
                      <span className="card-category">{currentCard.category}</span>
                    </div>
                    <div className="card-pronunciation" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      {getCardImage(currentCard) && (
                        <img
                          src={getCardImage(currentCard)}
                          alt={currentCard.meaning}
                          style={{
                            width: "75px",
                            height: "75px",
                            objectFit: "contain",
                            borderRadius: "12px",
                            border: "1px solid var(--glass-border)",
                            background: "rgba(255, 255, 255, 0.03)",
                            padding: "4px",
                            marginBottom: "4px"
                          }}
                        />
                      )}
                      <div className="card-pinyin-text" style={{ fontSize: currentCard.type === "sentence" ? "20px" : "28px" }}>
                        {currentCard.pinyin}
                      </div>
                      <div className="card-meaning-text" style={{ fontSize: currentCard.type === "sentence" ? "16px" : "20px" }}>
                        {currentCard.meaning}
                      </div>
                    </div>
                    <div className="card-example-box" style={{ padding: "10px", margin: "10px 0" }}>
                      <div className="card-example-title">Ví dụ</div>
                      <div className="card-example-cn" style={{ fontSize: "14px" }}>{currentCard.example}</div>
                      <div className="card-example-pinyin" style={{ fontSize: "12px" }}>{currentCard.examplePinyin}</div>
                      <div className="card-example-vn" style={{ fontSize: "12px" }}>{currentCard.exampleMeaning}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "10px", width: "100%" }}>
                      <button
                        className="sound-icon-btn"
                        style={{ width: "42px", height: "42px", display: "flex", justifyContent: "center", alignItems: "center" }}
                        onClick={(e) => { e.stopPropagation(); speakMandarin(currentCard.hanzi); }}
                        title="Nghe phát âm"
                      >
                        🔊
                      </button>
                      <button
                        className={`sound-icon-btn mic-btn ${isListening ? "listening" : ""}`}
                        style={{ 
                          width: "42px", 
                          height: "42px", 
                          display: "flex", 
                          justifyContent: "center", 
                          alignItems: "center"
                        }}
                        onClick={(e) => { e.stopPropagation(); handleSpeakCheck(currentCard.hanzi); }}
                        title="Luyện nói qua Micro"
                      >
                        🎙️
                      </button>
                    </div>
                    
                    {speakFeedback && (
                      <div className={`speak-feedback ${speakSuccess ? "success" : "error"}`} style={{
                        marginTop: "10px",
                        fontSize: "12px",
                        fontWeight: "600",
                        textAlign: "center",
                        color: speakSuccess ? "var(--success)" : "var(--error)"
                      }}>
                        {speakFeedback}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="card-actions-bar">
                <button className="swipe-btn swipe-btn-again" onClick={() => handleNextCard(false)}>✕ Học lại</button>
                <button className="swipe-btn swipe-btn-known" onClick={() => handleNextCard(true)}>✓ Đã thuộc</button>
              </div>
            </>
          )}
        </>
      )}

      {/* 5. RENDER QUIZ MODE */}
      {studyMode === "quiz" && (
        <>
          {cards.length < 2 ? (
            <div className="glass-card success-screen" style={{ width: "100%", padding: "40px 20px" }}>
              <p style={{ color: "var(--text-secondary)", textAlign: "center" }}>
                Cần có ít nhất 2 từ phù hợp với bộ lọc đang chọn để khởi tạo trắc nghiệm.
              </p>
              <button className="btn btn-secondary" style={{ marginTop: "15px" }} onClick={() => handleTypeChange("all")}>
                Xem tất cả từ vựng
              </button>
            </div>
          ) : quizIsFinished ? (
            <div className="glass-card success-screen" style={{ width: "100%", padding: "30px 20px" }}>
              <div className="success-badge">🎯</div>
              <h2>Hoàn Thành Ôn Tập!</h2>
              <p>Bạn đã hoàn thành bài trắc nghiệm nhanh.</p>
              <div style={{ fontSize: "18px", fontWeight: "700", margin: "10px 0" }}>
                Kết quả: <span style={{ color: "var(--success)" }}>{quizScore}</span> / {quizQuestions.length} câu đúng
              </div>
              {quizScore > 0 && <div className="xp-gain">+{quizScore * 2} XP Ôn Tập</div>}
              
              <div style={{ display: "flex", gap: "10px", width: "100%", marginTop: "20px" }}>
                <button className="btn btn-secondary" onClick={() => setStudyMode("flashcard")} style={{ padding: "12px" }}>
                  Học thẻ nhớ
                </button>
                <button className="btn btn-primary" onClick={handleRestartQuiz} style={{ padding: "12px" }}>
                  Làm lại quiz
                </button>
              </div>
            </div>
          ) : quizQuestions.length === 0 ? (
            <div className="main-scrollable">Đang tải câu hỏi trắc nghiệm...</div>
          ) : (
            <div style={{ width: "100%" }}>
              {/* Quiz Progress indicator */}
              <div className="card-counter" style={{ marginBottom: "15px" }}>
                Câu hỏi {quizCurrentIdx + 1} / {quizQuestions.length}
              </div>

              {/* Quiz card panel */}
              <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px", minHeight: "340px", justifyContent: "space-between" }}>
                
                <div>
                  <div style={{ fontSize: "14px", color: "var(--text-secondary)", textAlign: "center", marginBottom: "8px" }}>
                    {quizQuestions[quizCurrentIdx].prompt}
                  </div>
                  
                  {/* Dynamic image hint */}
                  {(() => {
                    const q = quizQuestions[quizCurrentIdx];
                    if (q && q.cardType === "sentence") return null;
                    const quizImg = getIllustrationForText(q.target) || 
                                    getIllustrationForText(q.answer);
                    if (!quizImg) return null;
                    return (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "10px" }}>
                        {showQuizHint ? (
                          <img
                            src={quizImg}
                            alt="Gợi ý ôn tập"
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
                  
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                    <div className="quiz-target" style={{ fontSize: "36px", margin: "6px 0", cursor: "pointer" }} onClick={() => speakMandarin(quizQuestions[quizCurrentIdx].hanzi)}>
                      {quizQuestions[quizCurrentIdx].target}
                      {/* Speak sound button if it's Chinese */}
                      {/[\u4e00-\u9fa5]/.test(quizQuestions[quizCurrentIdx].target) && (
                        <span style={{ fontSize: "16px", marginLeft: "8px", verticalAlign: "middle" }}>🔊</span>
                      )}
                    </div>
                    {(() => {
                      const associatedCard = FLASHCARDS.find(c => c.hanzi === quizQuestions[quizCurrentIdx].hanzi || c.hanzi === quizQuestions[quizCurrentIdx].target);
                      if (!associatedCard) return null;
                      return (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(associatedCard.id);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            fontSize: "22px",
                            cursor: "pointer",
                            padding: "4px",
                            color: isFavorite(associatedCard.id) ? "#ef4444" : "rgba(255,255,255,0.3)",
                            transition: "color 0.2s"
                          }}
                          title={isFavorite(associatedCard.id) ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                        >
                          {isFavorite(associatedCard.id) ? "❤️" : "🤍"}
                        </button>
                      );
                    })()}
                  </div>
                </div>

                {/* Multiple choice options */}
                <div className="options-list" style={{ width: "100%" }}>
                  {quizQuestions[quizCurrentIdx].options.map((opt) => {
                    const isSelected = quizSelectedOption === opt;
                    const isCorrectOpt = opt === quizQuestions[quizCurrentIdx].answer;
                    
                    let btnStyle = {
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "var(--border-radius-sm)",
                      border: "1px solid var(--glass-border)",
                      background: "rgba(255,255,255,0.02)",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.15s"
                    };

                    if (isSelected) {
                      btnStyle.borderColor = "var(--primary)";
                      btnStyle.background = "var(--primary-light)";
                    }

                    if (quizHasChecked) {
                      if (isCorrectOpt) {
                        btnStyle.borderColor = "var(--success)";
                        btnStyle.background = "var(--success-light)";
                      } else if (isSelected) {
                        btnStyle.borderColor = "var(--error)";
                        btnStyle.background = "var(--error-light)";
                      }
                    }

                    return (
                      <button
                        key={opt}
                        style={btnStyle}
                        onClick={() => handleSelectQuizOption(opt)}
                        disabled={quizHasChecked}
                      >
                        <span>{opt}</span>
                        {quizHasChecked && isCorrectOpt && <span>✓</span>}
                        {quizHasChecked && isSelected && !isCorrectOpt && <span>✗</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Confirm/Continue Button */}
                <div style={{ marginTop: "10px" }}>
                  {quizHasChecked ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: quizIsCorrect ? "var(--success)" : "var(--error)", textAlign: "center" }}>
                        {quizIsCorrect ? "Chính xác! 🥳" : `Chưa đúng. Đáp án là: ${quizQuestions[quizCurrentIdx].answer}`}
                      </div>
                      <button className="btn btn-primary" onClick={handleContinueQuiz} style={{ padding: "12px" }}>
                        Tiếp tục
                      </button>
                    </div>
                  ) : (
                    <button
                      className={`btn ${quizSelectedOption ? "btn-primary" : "btn-secondary"}`}
                      disabled={!quizSelectedOption}
                      onClick={handleCheckQuizAnswer}
                      style={{ padding: "12px" }}
                    >
                      Kiểm tra
                    </button>
                  )}
                </div>

              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
