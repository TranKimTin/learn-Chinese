import React, { useState } from "react";
import { PINYIN_DATA } from "../data/curriculum";

export const PinyinChart = () => {
  const [activeSubTab, setActiveSubTab] = useState("initials");
  const [selectedWord, setSelectedWord] = useState(null);

  const speakMandarin = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = 0.75; // Slower speed for beginners
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt của bạn không hỗ trợ phát âm tự động.");
    }
  };

  const handleCombinationClick = (item) => {
    setSelectedWord(item);
    speakMandarin(item.hanzi);
  };

  const handleToneClick = (toneNum) => {
    if (!selectedWord) return;
    
    // Approximate tone pronunciations by attaching it to characters
    // Or speak the character itself. Let's make an utterance based on the character with tone
    let textToSpeak = selectedWord.hanzi;
    
    // We can also speak the Pinyin with tone if TTS supports Pinyin (some TTS support Pinyin if passed in specific ways, but character is most reliable)
    // To make it fun, let's map combinations to Hanyu tones
    const toneMap = {
      "妈": ["妈", "麻", "马", "骂"],
      "爸": ["八", "拔", "把", "爸"],
      "你": ["妮", "泥", "你", "逆"],
      "好": ["蒿", "毫", "好", "耗"],
      "我": ["窝", "无", "我", "卧"],
      "爱": ["哀", "挨", "矮", "爱"],
      "吃": ["吃", "迟", "齿", "斥"],
      "茶": ["差", "茶", "查", "察"],
      "国": ["郭", "国", "果", "过"],
      "中": ["中", "终", "肿", "众"]
    };

    if (toneMap[selectedWord.hanzi]) {
      textToSpeak = toneMap[selectedWord.hanzi][toneNum - 1];
    }
    
    speakMandarin(textToSpeak);
  };

  return (
    <div className="pinyin-container slide-in-up">
      <div className="pinyin-intro">
        <h2>Bảng Phiên Âm Pinyin</h2>
        <p>Bấm vào từng chữ để nghe phát âm tiếng Trung chuẩn. Đối với phần ghép từ, bạn có thể luyện nghe 4 thanh điệu.</p>
      </div>

      <div className="tab-selector">
        <button
          className={`tab-btn ${activeSubTab === "initials" ? "active" : ""}`}
          onClick={() => {
            setActiveSubTab("initials");
            setSelectedWord(null);
          }}
        >
          Thanh mẫu (Initials)
        </button>
        <button
          className={`tab-btn ${activeSubTab === "finals" ? "active" : ""}`}
          onClick={() => {
            setActiveSubTab("finals");
            setSelectedWord(null);
          }}
        >
          Vận mẫu (Finals)
        </button>
        <button
          className={`tab-btn ${activeSubTab === "combinations" ? "active" : ""}`}
          onClick={() => setActiveSubTab("combinations")}
        >
          Ghép vần
        </button>
      </div>

      {activeSubTab === "initials" && (
        <div className="pinyin-grid">
          {PINYIN_DATA.initials.map((item) => (
            <button
              key={item.sound}
              className="glass-card clickable pinyin-card"
              onClick={() => speakMandarin(item.sound + "a")} // Combine with 'a' for natural initial sound
            >
              <span className="sound">{item.sound}</span>
              <span className="ipa">{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {activeSubTab === "finals" && (
        <div className="pinyin-grid">
          {PINYIN_DATA.finals.map((item) => (
            <button
              key={item.sound}
              className="glass-card clickable pinyin-card"
              onClick={() => speakMandarin(item.sound)}
            >
              <span className="sound">{item.sound}</span>
              <span className="ipa">{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {activeSubTab === "combinations" && (
        <div>
          <div className="pinyin-grid" style={{ marginBottom: "20px" }}>
            {PINYIN_DATA.combinations.map((item) => (
              <button
                key={item.hanzi}
                className={`glass-card clickable pinyin-card ${selectedWord?.hanzi === item.hanzi ? "selected" : ""}`}
                onClick={() => handleCombinationClick(item)}
                style={{
                  borderColor: selectedWord?.hanzi === item.hanzi ? "var(--primary)" : "var(--glass-border)",
                  background: selectedWord?.hanzi === item.hanzi ? "var(--primary-light)" : "var(--glass-bg)"
                }}
              >
                <span className="sound" style={{ fontSize: "24px" }}>{item.hanzi}</span>
                <span className="ipa" style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>
                  {item.pinyin}
                </span>
                <span className="ipa" style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                  {item.meaning}
                </span>
              </button>
            ))}
          </div>

          {selectedWord && (
            <div className="tones-container fade-in">
              <h3 style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px", textAlign: "center" }}>
                Luyện nghe 4 thanh điệu của từ: <span style={{ color: "white", fontSize: "18px" }}>{selectedWord.hanzi} ({selectedWord.pinyin})</span>
              </h3>
              <div className="tones-grid">
                <button className="tone-btn" onClick={() => handleToneClick(1)}>
                  <span>¯</span>
                  <span>Thanh 1 (Ngang)</span>
                </button>
                <button className="tone-btn" onClick={() => handleToneClick(2)}>
                  <span>´</span>
                  <span>Thanh 2 (Sắc)</span>
                </button>
                <button className="tone-btn" onClick={() => handleToneClick(3)}>
                  <span>ˇ</span>
                  <span>Thanh 3 (Hỏi)</span>
                </button>
                <button className="tone-btn" onClick={() => handleToneClick(4)}>
                  <span>`</span>
                  <span>Thanh 4 (Nặng)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
