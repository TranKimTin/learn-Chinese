import { createContext, useState, useEffect } from "react";

export const LearningContext = createContext();

export const LearningProvider = ({ children }) => {
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem("sinolearn_xp");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("sinolearn_streak");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lastLearnedDate, setLastLearnedDate] = useState(() => {
    return localStorage.getItem("sinolearn_last_date") || "";
  });

  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem("sinolearn_completed_lessons");
    return saved ? JSON.parse(saved) : [];
  });

  const [knownWords, setKnownWords] = useState(() => {
    const saved = localStorage.getItem("sinolearn_known_words");
    return saved ? JSON.parse(saved) : [];
  });

  // --- NEW STATES FOR ACHIEVEMENTS & QUESTS ---
  const [writtenChars, setWrittenChars] = useState(() => {
    const saved = localStorage.getItem("sinolearn_written_chars");
    return saved ? JSON.parse(saved) : [];
  });

  const [matchGamesCount, setMatchGamesCount] = useState(() => {
    const saved = localStorage.getItem("sinolearn_match_games_count");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [spokenWordsCount, setSpokenWordsCount] = useState(() => {
    const saved = localStorage.getItem("sinolearn_spoken_words_count");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("sinolearn_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // --- DAILY STATS ---
  const getTodayStr = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

  const [dailyStatsDate, setDailyStatsDate] = useState(() => {
    return localStorage.getItem("sinolearn_daily_date") || getTodayStr();
  });

  const [dailyXp, setDailyXp] = useState(() => {
    const savedDate = localStorage.getItem("sinolearn_daily_date");
    const today = getTodayStr();
    if (savedDate !== today) return 0;
    const saved = localStorage.getItem("sinolearn_daily_xp");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [dailyWrittenCount, setDailyWrittenCount] = useState(() => {
    const savedDate = localStorage.getItem("sinolearn_daily_date");
    const today = getTodayStr();
    if (savedDate !== today) return 0;
    const saved = localStorage.getItem("sinolearn_daily_written_count");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [dailyNewWordsCount, setDailyNewWordsCount] = useState(() => {
    const savedDate = localStorage.getItem("sinolearn_daily_date");
    const today = getTodayStr();
    if (savedDate !== today) return 0;
    const saved = localStorage.getItem("sinolearn_daily_new_words_count");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [dailyMatchCount, setDailyMatchCount] = useState(() => {
    const savedDate = localStorage.getItem("sinolearn_daily_date");
    const today = getTodayStr();
    if (savedDate !== today) return 0;
    const saved = localStorage.getItem("sinolearn_daily_match_count");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [dailySpeakCount, setDailySpeakCount] = useState(() => {
    const savedDate = localStorage.getItem("sinolearn_daily_date");
    const today = getTodayStr();
    if (savedDate !== today) return 0;
    const saved = localStorage.getItem("sinolearn_daily_speak_count");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [dailyQuestsCompleted, setDailyQuestsCompleted] = useState(() => {
    const savedDate = localStorage.getItem("sinolearn_daily_date");
    const today = getTodayStr();
    if (savedDate !== today) return [];
    const saved = localStorage.getItem("sinolearn_daily_quests_completed");
    return saved ? JSON.parse(saved) : [];
  });

  // --- SYNC TO LOCAL STORAGE ---
  useEffect(() => {
    localStorage.setItem("sinolearn_xp", xp);
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("sinolearn_streak", streak);
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("sinolearn_last_date", lastLearnedDate);
  }, [lastLearnedDate]);

  useEffect(() => {
    localStorage.setItem("sinolearn_completed_lessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem("sinolearn_known_words", JSON.stringify(knownWords));
  }, [knownWords]);

  useEffect(() => {
    localStorage.setItem("sinolearn_written_chars", JSON.stringify(writtenChars));
  }, [writtenChars]);

  useEffect(() => {
    localStorage.setItem("sinolearn_match_games_count", matchGamesCount);
  }, [matchGamesCount]);

  useEffect(() => {
    localStorage.setItem("sinolearn_spoken_words_count", spokenWordsCount);
  }, [spokenWordsCount]);

  useEffect(() => {
    localStorage.setItem("sinolearn_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("sinolearn_daily_date", dailyStatsDate);
  }, [dailyStatsDate]);

  useEffect(() => {
    localStorage.setItem("sinolearn_daily_xp", dailyXp);
  }, [dailyXp]);

  useEffect(() => {
    localStorage.setItem("sinolearn_daily_written_count", dailyWrittenCount);
  }, [dailyWrittenCount]);

  useEffect(() => {
    localStorage.setItem("sinolearn_daily_new_words_count", dailyNewWordsCount);
  }, [dailyNewWordsCount]);

  useEffect(() => {
    localStorage.setItem("sinolearn_daily_match_count", dailyMatchCount);
  }, [dailyMatchCount]);

  useEffect(() => {
    localStorage.setItem("sinolearn_daily_speak_count", dailySpeakCount);
  }, [dailySpeakCount]);

  useEffect(() => {
    localStorage.setItem("sinolearn_daily_quests_completed", JSON.stringify(dailyQuestsCompleted));
  }, [dailyQuestsCompleted]);

  // --- DAILY RESET CHECK ---
  useEffect(() => {
    const today = getTodayStr();
    if (dailyStatsDate !== today) {
      setTimeout(() => {
        setDailyStatsDate(today);
        setDailyXp(0);
        setDailyWrittenCount(0);
        setDailyNewWordsCount(0);
        setDailyMatchCount(0);
        setDailySpeakCount(0);
        setDailyQuestsCompleted([]);
      }, 0);
    }
  }, [dailyStatsDate]);

  // --- AUTOMATIC DAILY QUEST VERIFICATION ---
  useEffect(() => {
    let xpAwarded = 0;
    const completed = [...dailyQuestsCompleted];

    // Quest 1: XP ngày đạt 30+ (Thưởng +15 XP)
    if (dailyXp >= 30 && !completed.includes("quest_xp")) {
      completed.push("quest_xp");
      xpAwarded += 15;
    }
    // Quest 2: Viết ít nhất 2 chữ Hán hôm nay (Thưởng +10 XP)
    if (dailyWrittenCount >= 2 && !completed.includes("quest_write")) {
      completed.push("quest_write");
      xpAwarded += 10;
    }
    // Quest 3: Đánh dấu thuộc 3 từ vựng hôm nay (Thưởng +10 XP)
    if (dailyNewWordsCount >= 3 && !completed.includes("quest_new_words")) {
      completed.push("quest_new_words");
      xpAwarded += 10;
    }

    if (xpAwarded > 0) {
      setTimeout(() => {
        setDailyQuestsCompleted(completed);
        setXp((prev) => prev + xpAwarded);
      }, 0);
    }
  }, [dailyXp, dailyWrittenCount, dailyNewWordsCount, dailyQuestsCompleted]);

  // --- ACTION METHODS ---
  const addXp = (amount) => {
    setXp((prev) => prev + amount);
    setDailyXp((prev) => prev + amount);
  };

  const updateStreak = () => {
    const todayStr = getTodayStr();
    
    if (lastLearnedDate === todayStr) {
      return;
    }

    if (lastLearnedDate === "") {
      setStreak(1);
    } else {
      const today = new Date(todayStr);
      const lastDate = new Date(lastLearnedDate);
      const diffTime = Math.abs(today - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(1);
      }
    }
    setLastLearnedDate(todayStr);
  };

  const completeLesson = (lessonId, gainedXp = 20) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
    addXp(gainedXp);
    updateStreak();
  };

  const markWordAsKnown = (wordId) => {
    if (!knownWords.includes(wordId)) {
      setKnownWords((prev) => [...prev, wordId]);
      setDailyNewWordsCount((prev) => prev + 1);
      addXp(5); // +5 XP for marking as known
      updateStreak();
    }
  };

  const unmarkWordAsKnown = (wordId) => {
    setKnownWords((prev) => prev.filter((id) => id !== wordId));
  };

  const completeMatchGame = (gainedXp = 15) => {
    setMatchGamesCount((prev) => prev + 1);
    setDailyMatchCount((prev) => prev + 1);
    addXp(gainedXp);
    updateStreak();
  };

  const addWrittenChar = (char, gainedXp = 10) => {
    if (!writtenChars.includes(char)) {
      setWrittenChars((prev) => [...prev, char]);
    }
    setDailyWrittenCount((prev) => prev + 1);
    addXp(gainedXp);
    updateStreak();
  };

  const addSpokenWord = (gainedXp = 5) => {
    setSpokenWordsCount((prev) => prev + 1);
    setDailySpeakCount((prev) => prev + 1);
    addXp(gainedXp);
    updateStreak();
  };

  const resetProgress = () => {
    setXp(0);
    setStreak(0);
    setLastLearnedDate("");
    setCompletedLessons([]);
    setKnownWords([]);
    setWrittenChars([]);
    setMatchGamesCount(0);
    setSpokenWordsCount(0);
    setDailyStatsDate(getTodayStr());
    setDailyXp(0);
    setDailyWrittenCount(0);
    setDailyNewWordsCount(0);
    setDailyMatchCount(0);
    setDailySpeakCount(0);
    setDailyQuestsCompleted([]);
    setFavorites([]);

    localStorage.removeItem("sinolearn_xp");
    localStorage.removeItem("sinolearn_streak");
    localStorage.removeItem("sinolearn_last_date");
    localStorage.removeItem("sinolearn_completed_lessons");
    localStorage.removeItem("sinolearn_known_words");
    localStorage.removeItem("sinolearn_written_chars");
    localStorage.removeItem("sinolearn_match_games_count");
    localStorage.removeItem("sinolearn_spoken_words_count");
    localStorage.removeItem("sinolearn_daily_date");
    localStorage.removeItem("sinolearn_daily_xp");
    localStorage.removeItem("sinolearn_daily_written_count");
    localStorage.removeItem("sinolearn_daily_new_words_count");
    localStorage.removeItem("sinolearn_daily_match_count");
    localStorage.removeItem("sinolearn_daily_speak_count");
    localStorage.removeItem("sinolearn_daily_quests_completed");
    localStorage.removeItem("sinolearn_favorites");
  };

  const toggleFavorite = (cardId) => {
    setFavorites((prev) => {
      if (prev.includes(cardId)) {
        return prev.filter((id) => id !== cardId);
      } else {
        return [...prev, cardId];
      }
    });
  };

  const isFavorite = (cardId) => favorites.includes(cardId);

  return (
    <LearningContext.Provider
      value={{
        xp,
        streak,
        lastLearnedDate,
        completedLessons,
        knownWords,
        writtenChars,
        matchGamesCount,
        spokenWordsCount,
        dailyXp,
        dailyWrittenCount,
        dailyNewWordsCount,
        dailyMatchCount,
        dailySpeakCount,
        dailyQuestsCompleted,
        addXp,
        completeLesson,
        markWordAsKnown,
        unmarkWordAsKnown,
        completeMatchGame,
        addWrittenChar,
        addSpokenWord,
        resetProgress,
        favorites,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};
