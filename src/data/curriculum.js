// Dữ liệu học tập đã được phân loại cho ứng dụng SinoLearn (Từ vựng, Cụm từ, Câu)

export const PINYIN_DATA = {
  initials: [
    { sound: "b", label: "b (pô)" },
    { sound: "p", label: "p (phô)" },
    { sound: "m", label: "m (mô)" },
    { sound: "f", label: "f (phô)" },
    { sound: "d", label: "d (tơ)" },
    { sound: "t", label: "t (thơ)" },
    { sound: "n", label: "n (nơ)" },
    { sound: "l", label: "l (lơ)" },
    { sound: "g", label: "g (cơ)" },
    { sound: "k", label: "k (khơ)" },
    { sound: "h", label: "h (hơ)" },
    { sound: "j", label: "j (chi)" },
    { sound: "q", label: "q (chi - bật hơi)" },
    { sound: "x", label: "x (xi)" },
    { sound: "zh", label: "zh (trư)" },
    { sound: "ch", label: "ch (sư - bật hơi)" },
    { sound: "sh", label: "sh (sư - uốn lưỡi)" },
    { sound: "r", label: "r (rư)" },
    { sound: "z", label: "z (chư)" },
    { sound: "c", label: "c (xư - bật hơi)" },
    { sound: "s", label: "s (xư)" },
    { sound: "y", label: "y (i)" },
    { sound: "w", label: "w (u)" }
  ],
  finals: [
    { sound: "a", label: "a (a)" },
    { sound: "o", label: "o (ô)" },
    { sound: "e", label: "e (ưa/ơ)" },
    { sound: "i", label: "i (i/ư)" },
    { sound: "u", label: "u (u)" },
    { sound: "ü", label: "ü (uy)" },
    { sound: "ai", label: "ai (ai)" },
    { sound: "ei", label: "ei (ây)" },
    { sound: "ui", label: "ui (uây)" },
    { sound: "ao", label: "ao (ao)" },
    { sound: "ou", label: "ou (âu)" },
    { sound: "iu", label: "iu (iêu)" },
    { sound: "ie", label: "ie (iê)" },
    { sound: "üe", label: "üe (uyê)" },
    { sound: "er", label: "er (ơ-r)" },
    { sound: "an", label: "an (an)" },
    { sound: "en", label: "en (ân)" },
    { sound: "in", label: "in (in)" },
    { sound: "un", label: "un (uân)" },
    { sound: "ün", label: "ün (uyn)" },
    { sound: "ang", label: "ang (ang)" },
    { sound: "eng", label: "eng (âng)" },
    { sound: "ing", label: "ing (inh)" },
    { sound: "ong", label: "ong (ung)" }
  ],
  combinations: [
    { hanzi: "妈", pinyin: "mā", meaning: "Mẹ" },
    { hanzi: "爸", pinyin: "bà", meaning: "Bố" },
    { hanzi: "你", pinyin: "nǐ", meaning: "Bạn" },
    { hanzi: "好", pinyin: "hǎo", meaning: "Tốt" },
    { hanzi: "我", pinyin: "wǒ", meaning: "Tôi" },
    { hanzi: "吃", pinyin: "chī", meaning: "Ăn" },
    { hanzi: "茶", pinyin: "chá", meaning: "Trà" },
    { hanzi: "国", pinyin: "guó", meaning: "Nước" },
    { hanzi: "中", pinyin: "zhōng", meaning: "Giữa" }
  ]
};

export const LESSONS = [
  // --- LEVEL 1: TỪ VỰNG NỀN TẢNG ---
  {
    id: "vocab_basics",
    level: "vocab",
    title: "Đại từ nhân xưng cơ bản",
    icon: "👤",
    description: "Học các từ vựng chỉ người: Tôi, bạn, anh ấy, cô ấy",
    questions: [
      {
        id: "qv1_1",
        type: "select_meaning",
        prompt: "Từ '我' trong tiếng Trung nghĩa là gì?",
        target: "我",
        options: ["Bạn", "Tôi", "Anh ấy", "Cô ấy"],
        answer: "Tôi"
      },
      {
        id: "qv1_2",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của '你' (Bạn) là gì?",
        target: "nǐ",
        options: ["wǒ", "nǐ", "tā", "shì"],
        answer: "nǐ"
      },
      {
        id: "qv1_3",
        type: "select_meaning",
        prompt: "Từ '他' chỉ đối tượng nào?",
        target: "他",
        options: ["Tôi", "Bạn", "Anh ấy", "Cô ấy"],
        answer: "Anh ấy"
      },
      {
        id: "qv1_4",
        type: "select_meaning",
        prompt: "Từ '她' chỉ đối tượng nào?",
        target: "她",
        options: ["Tôi", "Bạn", "Anh ấy", "Cô ấy"],
        answer: "Cô ấy"
      },
      {
        id: "qv1_5",
        type: "build_sentence",
        prompt: "Sắp xếp từ chỉ: 'Tôi' và 'Bạn'",
        target: "Tôi Bạn",
        options: ["你", "我"],
        answer: ["我", "你"]
      }
    ]
  },
  {
    id: "vocab_numbers",
    level: "vocab",
    title: "Chữ số căn bản",
    icon: "🔢",
    description: "Học từ vựng về số đếm: Một, hai, ba, năm, mười",
    questions: [
      {
        id: "qv2_1",
        type: "select_meaning",
        prompt: "Từ '一' biểu thị số mấy?",
        target: "一",
        options: ["Số 1", "Số 2", "Số 3", "Số 5"],
        answer: "Số 1"
      },
      {
        id: "qv2_2",
        type: "select_meaning",
        prompt: "Số '三' trong tiếng Trung là số mấy?",
        target: "三",
        options: ["Số 1", "Số 2", "Số 3", "Số 10"],
        answer: "Số 3"
      },
      {
        id: "qv2_3",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của số 5 '五' là gì?",
        target: "wǔ",
        options: ["yī", "èr", "wǔ", "shí"],
        answer: "wǔ"
      },
      {
        id: "qv2_4",
        type: "select_meaning",
        prompt: "Từ '十' biểu thị số mấy?",
        target: "十",
        options: ["Số 2", "Số 5", "Số 10", "Số 1"],
        answer: "Số 10"
      },
      {
        id: "qv2_5",
        type: "build_sentence",
        prompt: "Dịch từ ghép: 'Mười hai' (Mười + Hai)",
        target: "Mười hai",
        options: ["二", "十"],
        answer: ["十", "二"]
      }
    ]
  },
  {
    id: "vocab_family",
    level: "vocab",
    title: "Gia đình yêu thương",
    icon: "👨‍👩‍👧‍👦",
    description: "Học từ vựng chỉ thành viên: Bố, mẹ, anh, chị, em",
    questions: [
      {
        id: "qv3_1",
        type: "select_meaning",
        prompt: "Từ '爸爸' có nghĩa là gì?",
        target: "爸爸",
        options: ["Bố", "Mẹ", "Anh trai", "Em trai"],
        answer: "Bố"
      },
      {
        id: "qv3_2",
        type: "select_meaning",
        prompt: "Từ '妈妈' có nghĩa là gì?",
        target: "妈妈",
        options: ["Bố", "Mẹ", "Chị gái", "Em gái"],
        answer: "Mẹ"
      },
      {
        id: "qv3_3",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của anh trai '哥哥' là gì?",
        target: "gēge",
        options: ["dìdi", "gēge", "māma", "bàba"],
        answer: "gēge"
      },
      {
        id: "qv3_4",
        type: "select_meaning",
        prompt: "Từ '妹妹' chỉ ai?",
        target: "妹妹",
        options: ["Chị gái", "Em gái", "Mẹ", "Bố"],
        answer: "Em gái"
      },
      {
        id: "qv3_5",
        type: "build_sentence",
        prompt: "Sắp xếp từ chỉ: 'Bố' và 'Mẹ'",
        target: "Bố Mẹ",
        options: ["妈妈", "爸爸"],
        answer: ["爸爸", "妈妈"]
      }
    ]
  },
  {
    id: "vocab_food",
    level: "vocab",
    title: "Đồ ăn & Thức uống",
    icon: "🍎",
    description: "Học từ vựng về ăn uống: Cơm, mì, trà, nước, táo, chuối",
    questions: [
      {
        id: "qv4_1",
        type: "select_meaning",
        prompt: "Từ '米饭' có nghĩa là gì?",
        target: "米饭",
        options: ["Mì", "Cơm", "Táo", "Bánh mì"],
        answer: "Cơm"
      },
      {
        id: "qv4_2",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của quả táo '苹果' là gì?",
        target: "píngguǒ",
        options: ["píngguǒ", "xiāngjiāo", "chá", "shuǐ"],
        answer: "píngguǒ"
      },
      {
        id: "qv4_3",
        type: "select_meaning",
        prompt: "Từ '咖啡' trong tiếng Trung nghĩa là gì?",
        target: "咖啡",
        options: ["Trà", "Nước", "Cà phê", "Sữa"],
        answer: "Cà phê"
      },
      {
        id: "qv4_4",
        type: "select_meaning",
        prompt: "Từ '面包' có nghĩa là gì?",
        target: "面包",
        options: ["Cơm", "Mì", "Bánh mì", "Táo"],
        answer: "Bánh mì"
      },
      {
        id: "qv4_5",
        type: "build_sentence",
        prompt: "Sắp xếp từ chỉ: 'Trà' và 'Cà phê'",
        target: "Trà Cà phê",
        options: ["咖啡", "茶"],
        answer: ["茶", "咖啡"]
      }
    ]
  },
  {
    id: "vocab_time",
    level: "vocab",
    title: "Thời gian & Ngày tháng",
    icon: "📅",
    description: "Học từ vựng chỉ thời gian: Hôm nay, ngày mai, sáng, tối",
    questions: [
      {
        id: "qv5_1",
        type: "select_meaning",
        prompt: "Từ '今天' có nghĩa là gì?",
        target: "今天",
        options: ["Hôm nay", "Ngày mai", "Hôm qua", "Buổi sáng"],
        answer: "Hôm nay"
      },
      {
        id: "qv5_2",
        type: "select_meaning",
        prompt: "Từ '明天' chỉ ngày nào?",
        target: "明天",
        options: ["Hôm nay", "Ngày mai", "Hôm qua", "Tuần sau"],
        answer: "Ngày mai"
      },
      {
        id: "qv5_3",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của buổi sáng '早上' là gì?",
        target: "zǎoshang",
        options: ["wǎnshang", "zǎoshang", "jīntiān", "míngtiān"],
        answer: "zǎoshang"
      },
      {
        id: "qv5_4",
        type: "select_meaning",
        prompt: "Từ '晚上' có nghĩa là gì?",
        target: "晚上",
        options: ["Buổi sáng", "Buổi trưa", "Buổi tối", "Nửa đêm"],
        answer: "Buổi tối"
      },
      {
        id: "qv5_5",
        type: "build_sentence",
        prompt: "Sắp xếp từ chỉ: 'Hôm nay' và 'Ngày mai'",
        target: "Hôm nay Ngày mai",
        options: ["明天", "今天"],
        answer: ["今天", "明天"]
      }
    ]
  },
  {
    id: "vocab_places",
    level: "vocab",
    title: "Địa điểm & Phương hướng",
    icon: "🏫",
    description: "Từ vựng về địa điểm: Nhà, trường học, bệnh viện, nhà ga",
    questions: [
      {
        id: "qv6_1",
        type: "select_meaning",
        prompt: "Từ '学校' có nghĩa là gì?",
        target: "学校",
        options: ["Nhà", "Trường học", "Cửa hàng", "Bệnh viện"],
        answer: "Trường học"
      },
      {
        id: "qv6_2",
        type: "select_meaning",
        prompt: "Từ '家' trong tiếng Trung nghĩa là gì?",
        target: "家",
        options: ["Nhà", "Trường học", "Cửa hàng", "Nhà ga"],
        answer: "Nhà"
      },
      {
        id: "qv6_3",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của cửa hàng '商店' là gì?",
        target: "shāngdiàn",
        options: ["xuéxiào", "shāngdiàn", "yīyuàn", "jīchǎng"],
        answer: "shāngdiàn"
      },
      {
        id: "qv6_4",
        type: "select_meaning",
        prompt: "Từ '医院' có nghĩa là gì?",
        target: "医院",
        options: ["Trường học", "Cửa hàng", "Bệnh viện", "Sân bay"],
        answer: "Bệnh viện"
      },
      {
        id: "qv6_5",
        type: "build_sentence",
        prompt: "Sắp xếp từ chỉ: 'Trường học' và 'Nhà'",
        target: "Trường học Nhà",
        options: ["家", "学校"],
        answer: ["学校", "家"]
      }
    ]
  },
  {
    id: "vocab_animals",
    level: "vocab",
    title: "Động vật đáng yêu",
    icon: "🐼",
    description: "Học từ vựng về động vật: Chó, mèo, chim, cá, gấu trúc",
    questions: [
      {
        id: "qv7_1",
        type: "select_meaning",
        prompt: "Từ '猫' có nghĩa là gì?",
        target: "猫",
        options: ["Chó", "Mèo", "Chim", "Cá"],
        answer: "Mèo"
      },
      {
        id: "qv7_2",
        type: "select_meaning",
        prompt: "Từ '狗' có nghĩa là gì?",
        target: "狗",
        options: ["Chó", "Mèo", "Chim", "Gấu trúc"],
        answer: "Chó"
      },
      {
        id: "qv7_3",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của gấu trúc '熊猫' là gì?",
        target: "xióngmāo",
        options: ["xióngmāo", "niǎo", "yú", "gǒu"],
        answer: "xióngmāo"
      },
      {
        id: "qv7_4",
        type: "select_meaning",
        prompt: "Từ '鱼' có nghĩa là gì?",
        target: "鱼",
        options: ["Chim", "Cá", "Mèo", "Chó"],
        answer: "Cá"
      },
      {
        id: "qv7_5",
        type: "build_sentence",
        prompt: "Sắp xếp từ chỉ: 'Mèo' và 'Chó'",
        target: "Mèo Chó",
        options: ["狗", "猫"],
        answer: ["猫", "狗"]
      }
    ]
  },

  // --- LEVEL 2: CỤM TỪ GIAO TIẾP ---
  {
    id: "phrase_greetings",
    level: "phrase",
    title: "Chào hỏi & Xã giao",
    icon: "👋",
    description: "Luyện các cụm từ chào hỏi, xin lỗi, cảm ơn thông dụng",
    questions: [
      {
        id: "qp1_1",
        type: "select_meaning",
        prompt: "Cụm từ '你好' dịch sang tiếng Việt nghĩa là gì?",
        target: "你好",
        options: ["Tạm biệt", "Cảm ơn", "Xin chào", "Xin lỗi"],
        answer: "Xin chào"
      },
      {
        id: "qp1_2",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của cụm từ '谢谢' là gì?",
        target: "xièxie",
        options: ["nǐ hǎo", "xièxie", "zàijiàn", "duìbuqǐ"],
        answer: "xièxie"
      },
      {
        id: "qp1_3",
        type: "select_meaning",
        prompt: "Cụm từ '对不起' dùng khi nào?",
        target: "对不起",
        options: ["Chào hỏi", "Cảm ơn", "Tạm biệt", "Xin lỗi"],
        answer: "Xin lỗi"
      },
      {
        id: "qp1_4",
        type: "select_meaning",
        prompt: "Cụm từ '没关系' có nghĩa là gì?",
        target: "没关系",
        options: ["Không sao", "Cảm ơn", "Xin chào", "Đừng khách sáo"],
        answer: "Không sao"
      },
      {
        id: "qp1_5",
        type: "build_sentence",
        prompt: "Sắp xếp câu đáp lại khi được cảm ơn: 'Đừng khách sáo'",
        target: "Đừng khách sáo",
        options: ["不", "客气"],
        answer: ["不", "客气"]
      }
    ]
  },
  {
    id: "phrase_self_intro",
    level: "phrase",
    title: "Giới thiệu bản thân",
    icon: "🪪",
    description: "Luyện cách tự giới thiệu: Tên gì, quốc tịch, tuổi tác",
    questions: [
      {
        id: "qp2_1",
        type: "select_meaning",
        prompt: "Cụm từ '我叫' có nghĩa là gì?",
        target: "我叫",
        options: ["Tôi tên là", "Tôi là", "Cảm ơn bạn", "Bạn tên gì"],
        answer: "Tôi tên là"
      },
      {
        id: "qp2_2",
        type: "select_meaning",
        prompt: "Cụm từ '越南人' chỉ người nước nào?",
        target: "越南人",
        options: ["Người Trung Quốc", "Người Việt Nam", "Người Mỹ", "Người Anh"],
        answer: "Người Việt Nam"
      },
      {
        id: "qp2_3",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của '很高兴认识你' là gì?",
        target: "Hěn gāoxìng rènshi nǐ.",
        options: ["Hěn gāoxìng rènshi nǐ.", "Nǐ jiào shénme míngzi?", "Wǒ shì Yuènán rén.", "Nǐ hǎo ma?"],
        answer: "Hěn gāoxìng rènshi nǐ."
      },
      {
        id: "qp2_4",
        type: "select_meaning",
        prompt: "Cụm từ '中国菜' có nghĩa là gì?",
        target: "中国菜",
        options: ["Người Trung Quốc", "Món ăn Trung Quốc", "Đất nước Trung Quốc", "Học tiếng Trung"],
        answer: "Món ăn Trung Quốc"
      },
      {
        id: "qp2_5",
        type: "build_sentence",
        prompt: "Sắp xếp câu: 'Tôi là người Việt Nam' (Tôi + Là + Người Việt Nam)",
        target: "Tôi là người Việt Nam.",
        options: ["是", "越南人", "我"],
        answer: ["我", "是", "越南人"]
      }
    ]
  },
  {
    id: "phrase_shopping",
    level: "phrase",
    title: "Mua sắm cơ bản",
    icon: "🛍️",
    description: "Các cụm từ hỏi giá, mặc cả: Bao nhiêu tiền, đắt quá...",
    questions: [
      {
        id: "qp3_1",
        type: "select_meaning",
        prompt: "Cụm từ '多少钱' có nghĩa là gì?",
        target: "多少钱",
        options: ["Mua cái gì", "Bao nhiêu tiền", "Rẻ một chút", "Đắt quá"],
        answer: "Bao nhiêu tiền"
      },
      {
        id: "qp3_2",
        type: "select_meaning",
        prompt: "Cụm từ '太贵了' dùng khi nào?",
        target: "太贵了",
        options: ["Khi đồ quá đắt", "Khi đồ rất rẻ", "Khi muốn trả tiền", "Khi muốn mua đồ"],
        answer: "Khi đồ quá đắt"
      },
      {
        id: "qp3_3",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của '便宜点' (Rẻ một chút) là gì?",
        target: "piányi diǎn",
        options: ["duōshao qián", "tài guì le", "piányi diǎn", "bu mǎi le"],
        answer: "piányi diǎn"
      },
      {
        id: "qp3_4",
        type: "select_meaning",
        prompt: "Từ '买' có nghĩa là gì?",
        target: "买",
        options: ["Mua", "Bán", "Xem", "Thử"],
        answer: "Mua"
      },
      {
        id: "qp3_5",
        type: "build_sentence",
        prompt: "Sắp xếp câu hỏi: 'Cái này bao nhiêu tiền?' (Cái này + Bao nhiêu + Tiền)",
        target: "Cái này bao nhiêu tiền?",
        options: ["这个", "多少", "钱"],
        answer: ["这个", "多少", "钱"]
      }
    ]
  },

  // --- LEVEL 3: MẪU CÂU GIAO TIẾP ---
  {
    id: "sentence_basics",
    level: "sentence",
    title: "Mẫu câu ăn uống đơn giản",
    icon: "🍜",
    description: "Luyện ghép và dịch các câu giao tiếp cơ bản khi ăn uống",
    questions: [
      {
        id: "qs1_1",
        type: "select_meaning",
        prompt: "Câu '我喝茶。' nghĩa là gì?",
        target: "我喝茶。",
        options: ["Tôi ăn cơm.", "Tôi uống nước.", "Tôi uống trà.", "Tôi ăn táo."],
        answer: "Tôi uống trà."
      },
      {
        id: "qs1_2",
        type: "select_meaning",
        prompt: "Câu '你吃什么？' dùng để hỏi điều gì?",
        target: "你吃什么？",
        options: ["Bạn tên gì?", "Bạn uống gì?", "Bạn ăn gì?", "Bạn khỏe không?"],
        answer: "Bạn ăn gì?"
      },
      {
        id: "qs1_3",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của câu '我吃苹果。' là gì?",
        target: "Wǒ chī píngguǒ.",
        options: ["Wǒ chī mǐfàn.", "Wǒ hē shuǐ.", "Wǒ chī píngguǒ.", "Wǒ hē chá."],
        answer: "Wǒ chī píngguǒ."
      },
      {
        id: "qs1_4",
        type: "build_sentence",
        prompt: "Sắp xếp câu: 'Tôi ăn cơm.' (Tôi + Ăn + Cơm)",
        target: "Tôi ăn cơm.",
        options: ["吃", "米饭", "我"],
        answer: ["我", "吃", "米饭"]
      },
      {
        id: "qs1_5",
        type: "build_sentence",
        prompt: "Sắp xếp câu hỏi: 'Bạn uống nước không?' (Bạn + Uống + Nước + Không)",
        target: "Bạn uống nước không?",
        options: ["吗", "喝", "你", "水"],
        answer: ["nǐ", "hē", "shuǐ", "ma"]
      }
    ]
  },
  {
    id: "sentence_daily",
    level: "sentence",
    title: "Mẫu câu đời sống",
    icon: "🏠",
    description: "Luyện ghép câu đi học, đi làm, hỏi thăm hằng ngày",
    questions: [
      {
        id: "qs2_1",
        type: "select_meaning",
        prompt: "Câu '我去学校。' dịch sang tiếng Việt nghĩa là gì?",
        target: "我去学校。",
        options: ["Tôi đi học (đến trường).", "Tôi về nhà.", "Tôi đi bệnh viện.", "Tôi đi cửa hàng."],
        answer: "Tôi đi học (đến trường)."
      },
      {
        id: "qs2_2",
        type: "select_sound",
        prompt: "Cách phát âm Pinyin của câu '我回家。' (Tôi về nhà) là gì?",
        target: "Wǒ huí jiā.",
        options: ["Wǒ qù xuéxiào.", "Wǒ huí jiā.", "Wǒ qù shāngdiàn.", "Wǒ qù yīyuàn."],
        answer: "Wǒ huí jiā."
      },
      {
        id: "qs2_3",
        type: "build_sentence",
        prompt: "Sắp xếp câu: 'Bạn đi đâu?' (Bạn + Đi + Đâu)",
        target: "Bạn đi đâu?",
        options: ["去", "你", "哪儿"],
        answer: ["你", "去", "哪儿"]
      },
      {
        id: "qs2_4",
        type: "build_sentence",
        prompt: "Sắp xếp câu: 'Tôi đi cửa hàng.' (Tôi + Đi + Cửa hàng)",
        target: "Tôi đi cửa hàng.",
        options: ["商店", "去", "我"],
        answer: ["我", "去", "商店"]
      },
      {
        id: "qs2_5",
        type: "select_meaning",
        prompt: "Câu '你叫什么名字？' nghĩa là gì?",
        target: "你叫什么名字？",
        options: ["Bạn khỏe không?", "Bạn ăn gì?", "Bạn tên là gì?", "Bạn đi đâu đấy?"],
        answer: "Bạn tên là gì?"
      }
    ]
  }
];

export const FLASHCARDS = [
  // --- TỪ VỰNG (VOCAB) ---
  // Đại từ nhân xưng
  {
    id: "fc_v1",
    type: "vocab",
    hanzi: "我",
    pinyin: "wǒ",
    meaning: "Tôi, tớ, tao",
    category: "Nhân xưng",
    emoji: "🙋‍♂️",
    example: "我是一个学生。",
    examplePinyin: "Wǒ shì yí gè xuésheng.",
    exampleMeaning: "Tôi là một học sinh."
  },
  {
    id: "fc_v2",
    type: "vocab",
    hanzi: "你",
    pinyin: "nǐ",
    meaning: "Bạn, cậu, anh, chị",
    category: "Nhân xưng",
    emoji: "🙋‍♀️",
    example: "你喜欢学中文 ma吗？",
    examplePinyin: "Nǐ xǐhuan xué Zhōngwén ma?",
    exampleMeaning: "Bạn thích học tiếng Trung không?"
  },
  {
    id: "fc_v3",
    type: "vocab",
    hanzi: "他",
    pinyin: "tā",
    meaning: "Anh ấy, ông ấy",
    category: "Nhân xưng",
    emoji: "👨",
    example: "他是我的中文老师。",
    examplePinyin: "Tā shì wǒ de Zhōngwén lǎoshī.",
    exampleMeaning: "Anh ấy là thầy giáo tiếng Trung của tôi."
  },
  {
    id: "fc_v4",
    type: "vocab",
    hanzi: "她",
    pinyin: "tā",
    meaning: "Cô ấy, bà ấy",
    category: "Nhân xưng",
    emoji: " woman👩",
    example: "她很喜欢唱歌。",
    examplePinyin: "Tā hěn xǐhuan chànggē.",
    exampleMeaning: "Cô ấy rất thích hát."
  },
  // Gia đình
  {
    id: "fc_v_f1",
    type: "vocab",
    hanzi: "爸爸",
    pinyin: "bàba",
    meaning: "Bố, cha",
    category: "Gia đình",
    emoji: "👨‍👦",
    example: "我爸爸是医生。",
    examplePinyin: "Wǒ bàba shì yīshēng.",
    exampleMeaning: "Bố tôi là bác sĩ."
  },
  {
    id: "fc_v_f2",
    type: "vocab",
    hanzi: "妈妈",
    pinyin: "māma",
    meaning: "Mẹ, u",
    category: "Gia đình",
    emoji: "👩‍👦",
    example: "我妈妈做菜很好吃。",
    examplePinyin: "Wǒ māma zuò cài hěn hǎochī.",
    exampleMeaning: "Mẹ tôi nấu ăn rất ngon."
  },
  {
    id: "fc_v_f3",
    type: "vocab",
    hanzi: "哥哥",
    pinyin: "gēge",
    meaning: "Anh trai",
    category: "Gia đình",
    emoji: "👦",
    example: "他是我哥哥。",
    examplePinyin: "Tā shì wǒ gēge.",
    exampleMeaning: "Anh ấy là anh trai tôi."
  },
  {
    id: "fc_v_f4",
    type: "vocab",
    hanzi: "姐姐",
    pinyin: "jiějie",
    meaning: "Chị gái",
    category: "Gia đình",
    emoji: "👧",
    example: "姐姐，你吃苹果 ma吗？",
    examplePinyin: "Jiějie, nǐ chī píngguǒ ma?",
    exampleMeaning: "Chị ơi, chị ăn táo không?"
  },
  {
    id: "fc_v_f5",
    type: "vocab",
    hanzi: "弟弟",
    pinyin: "dìdi",
    meaning: "Em trai",
    category: "Gia đình",
    emoji: "👶",
    example: "弟弟今年五岁了。",
    examplePinyin: "Dìdi jīnnián wǔ suì le.",
    exampleMeaning: "Em trai năm nay 5 tuổi rồi."
  },
  {
    id: "fc_v_f6",
    type: "vocab",
    hanzi: "妹妹",
    pinyin: "m妹妹",
    meaning: "Em gái",
    category: "Gia đình",
    emoji: "👶",
    example: "妹妹很可爱。",
    examplePinyin: "Mèimei hěn kě'ài.",
    exampleMeaning: "Em gái rất đáng yêu."
  },
  // Ăn uống
  {
    id: "fc_v5",
    type: "vocab",
    hanzi: "吃",
    pinyin: "chī",
    meaning: "Ăn",
    category: "Ăn uống",
    emoji: "😋",
    example: "你吃什么？",
    examplePinyin: "Nǐ chī shénme?",
    exampleMeaning: "Bạn ăn gì?"
  },
  {
    id: "fc_v6",
    type: "vocab",
    hanzi: "喝",
    pinyin: "hē",
    meaning: "Uống",
    category: "Ăn uống",
    emoji: "🥛",
    example: "我想喝茶。",
    examplePinyin: "Wǒ xiǎng hē chá.",
    exampleMeaning: "Tôi muốn uống trà."
  },
  {
    id: "fc_v7",
    type: "vocab",
    hanzi: "水",
    pinyin: "shuǐ",
    meaning: "Nước",
    category: "Ăn uống",
    emoji: "💧",
    example: "请喝水。",
    examplePinyin: "Qǐng hē shuǐ.",
    exampleMeaning: "Xin mời uống nước."
  },
  {
    id: "fc_v8",
    type: "vocab",
    hanzi: "茶",
    pinyin: "chá",
    meaning: "Trà",
    category: "Ăn uống",
    emoji: "🍵",
    example: "这是一杯好茶。",
    examplePinyin: "Zhè shì yì bēi hǎo chá.",
    exampleMeaning: "Đây là một ly trà ngon."
  },
  {
    id: "fc_v9",
    type: "vocab",
    hanzi: "苹果",
    pinyin: "píngguǒ",
    meaning: "Quả táo",
    category: "Ăn uống",
    emoji: "🍎",
    example: "我吃苹果。",
    examplePinyin: "Wǒ chī píngguǒ.",
    exampleMeaning: "Tôi ăn táo."
  },
  {
    id: "fc_v_fo1",
    type: "vocab",
    hanzi: "咖啡",
    pinyin: "kāfēi",
    meaning: "Cà phê",
    category: "Ăn uống",
    emoji: "☕",
    example: "我不喝咖啡。",
    examplePinyin: "Wǒ bù hē kāfēi.",
    exampleMeaning: "Tôi không uống cà phê."
  },
  {
    id: "fc_v_fo2",
    type: "vocab",
    hanzi: "面包",
    pinyin: "miànbāo",
    meaning: "Bánh mì",
    category: "Ăn uống",
    emoji: "🍞",
    example: "你吃面包 ma吗？",
    examplePinyin: "Nǐ chī miànbāo ma?",
    exampleMeaning: "Bạn ăn bánh mì không?"
  },
  {
    id: "fc_v10",
    type: "vocab",
    hanzi: "米饭",
    pinyin: "mǐfàn",
    meaning: "Cơm",
    category: "Ăn uống",
    emoji: "🍚",
    example: "大米饭很好吃。",
    examplePinyin: "Dà mǐfàn hěn hǎochī.",
    exampleMeaning: "Cơm trắng rất ngon."
  },
  // Địa điểm
  {
    id: "fc_v_pl1",
    type: "vocab",
    hanzi: "家",
    pinyin: "jiā",
    meaning: "Nhà, gia đình",
    category: "Địa điểm",
    emoji: "🏠",
    example: "这是我的家。",
    examplePinyin: "Zhè shì wǒ de jiā.",
    exampleMeaning: "Đây là nhà của tôi."
  },
  {
    id: "fc_v_pl2",
    type: "vocab",
    hanzi: "学校",
    pinyin: "xuéxiào",
    meaning: "Trường học",
    category: "Địa điểm",
    emoji: "🏫",
    example: "我们去学校。",
    examplePinyin: "Wǒmen qù xuéxiào.",
    exampleMeaning: "Chúng tôi đi học (đến trường)."
  },
  {
    id: "fc_v_pl3",
    type: "vocab",
    hanzi: "商店",
    pinyin: "shāngdiàn",
    meaning: "Cửa hàng",
    category: "Địa điểm",
    emoji: "🛒",
    example: "我去商店买苹果。",
    examplePinyin: "Wǒ qù shāngdiàn mǎi píngguǒ.",
    exampleMeaning: "Tôi đi cửa hàng mua táo."
  },
  {
    id: "fc_v_pl4",
    type: "vocab",
    hanzi: "医院",
    pinyin: "yīyuàn",
    meaning: "Bệnh viện",
    category: "Địa điểm",
    emoji: "🏥",
    example: "他在医院工作。",
    examplePinyin: "Tā zài yīyuàn gōngzuò.",
    exampleMeaning: "Anh ấy làm việc ở bệnh viện."
  },
  // Động vật
  {
    id: "fc_v_an1",
    type: "vocab",
    hanzi: "猫",
    pinyin: "māo",
    meaning: "Con mèo",
    category: "Động vật",
    emoji: "🐱",
    example: "我家有一只小猫。",
    examplePinyin: "Wǒ jiā yǒu yì zhī xiǎomāo.",
    exampleMeaning: "Nhà tôi có một con mèo nhỏ."
  },
  {
    id: "fc_v_an2",
    type: "vocab",
    hanzi: "狗",
    pinyin: "gǒu",
    meaning: "Con chó",
    category: "Động vật",
    emoji: "🐶",
    example: "那是一只大狗。",
    examplePinyin: "Nà shì yì zhī dà gǒu.",
    exampleMeaning: "Đó là một con chó lớn."
  },
  {
    id: "fc_v_an3",
    type: "vocab",
    hanzi: "熊猫",
    pinyin: "xióngmāo",
    meaning: "Gấu trúc",
    category: "Động vật",
    emoji: "🐼",
    example: "熊猫很可爱。",
    examplePinyin: "Xióngmāo hěn kě'ài.",
    exampleMeaning: "Gấu trúc rất đáng yêu."
  },

  // --- CỤM TỪ (PHRASE) ---
  // Chào hỏi xã giao
  {
    id: "fc_p1",
    type: "phrase",
    hanzi: "你好",
    pinyin: "nǐ hǎo",
    meaning: "Xin chào",
    category: "Giao tiếp",
    emoji: "👋",
    example: "你好！很高兴认识 ni你。",
    examplePinyin: "Nǐ hǎo! Hěn gāoxìng rènshi nǐ.",
    exampleMeaning: "Xin chào! Rất vui được quen biết bạn."
  },
  {
    id: "fc_p2",
    type: "phrase",
    hanzi: "谢谢",
    pinyin: "xièxie",
    meaning: "Cảm ơn",
    category: "Giao tiếp",
    emoji: "🙏",
    example: "谢谢你的茶。",
    examplePinyin: "Xièxie nǐ de chá.",
    exampleMeaning: "Cảm ơn ly trà của bạn."
  },
  {
    id: "fc_p3",
    type: "phrase",
    hanzi: "再见",
    pinyin: "zài jiàn",
    meaning: "Tạm biệt, hẹn gặp lại",
    category: "Giao tiếp",
    emoji: "👋",
    example: "老师，再见！",
    examplePinyin: "Lǎoshī, zàijiàn!",
    exampleMeaning: "Thầy cô, tạm biệt!"
  },
  {
    id: "fc_p4",
    type: "phrase",
    hanzi: "对不起",
    pinyin: "duìbuqǐ",
    meaning: "Xin lỗi",
    category: "Giao tiếp",
    emoji: "🙇‍♂️",
    example: "对不起, 我来晚了。",
    examplePinyin: "Duìbuqǐ, wǒ lái wǎn le.",
    exampleMeaning: "Xin lỗi, tôi đến muộn rồi."
  },
  {
    id: "fc_p5",
    type: "phrase",
    hanzi: "没关系",
    pinyin: "méi guānxi",
    meaning: "Không sao đâu, không ảnh hưởng",
    category: "Giao tiếp",
    emoji: "👌",
    example: "没关系，慢慢来。",
    examplePinyin: "Méi guānxi, mànmàn lái.",
    exampleMeaning: "Không sao đâu, cứ từ từ thôi."
  },
  {
    id: "fc_p6",
    type: "phrase",
    hanzi: "不客气",
    pinyin: "bú kèqi",
    meaning: "Đừng khách sáo, không có chi",
    category: "Giao tiếp",
    emoji: "🤗",
    example: "“谢谢你！” - “不客气！”",
    examplePinyin: "\"Xièxie nǐ!\" - \"Bú kèqi!\"",
    exampleMeaning: "\"Cảm ơn bạn!\" - \"Không có chi!\""
  },
  // Quốc tịch & Tự giới thiệu
  {
    id: "fc_p7",
    type: "phrase",
    hanzi: "越南人",
    pinyin: "Yuènán rén",
    meaning: "Người Việt Nam",
    category: "Quốc tịch",
    emoji: "🇻🇳",
    example: "我们都是越南人。",
    examplePinyin: "Wǒmen dōu shì Yuènán rén.",
    exampleMeaning: "Chúng tôi đều là người Việt Nam."
  },
  {
    id: "fc_p8",
    type: "phrase",
    hanzi: "中国菜",
    pinyin: "Zhōngguó cài",
    meaning: "Món ăn Trung Quốc",
    category: "Ẩm thực",
    emoji: "🥟",
    example: "中国菜很好吃。",
    examplePinyin: "Zhōngguó cài hěn hǎochī.",
    exampleMeaning: "Món ăn Trung Quốc rất ngon."
  },
  // Mua sắm
  {
    id: "fc_p_sh1",
    type: "phrase",
    hanzi: "多少钱",
    pinyin: "duōshao qián",
    meaning: "Bao nhiêu tiền",
    category: "Mua sắm",
    emoji: "💰",
    example: "这个苹果多少钱？",
    examplePinyin: "Zhè ge píngguǒ duōshao qián?",
    exampleMeaning: "Quả táo này bao nhiêu tiền?"
  },
  {
    id: "fc_p_sh2",
    type: "phrase",
    hanzi: "太贵了",
    pinyin: "tài guì le",
    meaning: "Đắt quá rồi",
    category: "Mua sắm",
    emoji: "💸",
    example: "三十块？太贵了！",
    examplePinyin: "Sānshí kuài? Tài guì le!",
    exampleMeaning: "Ba mươi tệ? Đắt quá!"
  },

  // --- CÂU GIAO TIẾP (SENTENCE) ---
  {
    id: "fc_s1",
    type: "sentence",
    hanzi: "你好吗？",
    pinyin: "Nǐ hǎo ma?",
    meaning: "Bạn khỏe không?",
    category: "Hỏi thăm",
    emoji: "❓",
    example: "爸爸，你好吗？",
    examplePinyin: "Bàba, nǐ hǎo ma?",
    exampleMeaning: "Bố ơi, bố khỏe không?"
  },
  {
    id: "fc_s2",
    type: "sentence",
    hanzi: "我很好。",
    pinyin: "Wǒ hěn hǎo.",
    meaning: "Tôi rất khỏe.",
    category: "Hỏi thăm",
    emoji: "😊",
    example: "谢谢你，我很好。",
    examplePinyin: "Xièxie nǐ, wǒ hěn hǎo.",
    exampleMeaning: "Cảm ơn bạn, tôi rất khỏe."
  },
  {
    id: "fc_s3",
    type: "sentence",
    hanzi: "你叫什么名字？",
    pinyin: "Nǐ jiào shénme míngzi?",
    meaning: "Bạn tên là gì?",
    category: "Giới thiệu",
    emoji: "❓",
    example: "请问，你叫什么名字？",
    examplePinyin: "Qǐngwèn, nǐ jiào shénme míngzi?",
    exampleMeaning: "Xin hỏi, bạn tên là gì?"
  },
  {
    id: "fc_s4",
    type: "sentence",
    hanzi: "我是越南人。",
    pinyin: "Wǒ shì Yuènán rén.",
    meaning: "Tôi là người Việt Nam.",
    category: "Giới thiệu",
    emoji: "🇻🇳",
    example: "我是越南人，不是中国人。",
    examplePinyin: "Wǒ shì Yuènán rén, bú shì Zhōngguó rén.",
    exampleMeaning: "Tôi là người Việt Nam, không phải người Trung Quốc."
  },
  {
    id: "fc_s5",
    type: "sentence",
    hanzi: "我吃米饭，你呢？",
    pinyin: "Wǒ chī mǐfàn, nǐ ne?",
    meaning: "Tôi ăn cơm, còn bạn thì sao?",
    category: "Ăn uống",
    emoji: "🍚",
    example: "我吃米饭，你呢？我想吃苹果。",
    examplePinyin: "Wǒ chī mǐfàn, nǐ ne? Wǒ xiǎng chī píngguǒ.",
    exampleMeaning: "Tôi ăn cơm, còn bạn? Tôi muốn ăn táo."
  },
  {
    id: "fc_s6",
    type: "sentence",
    hanzi: "很高兴认识 ni你。",
    pinyin: "Hěn gāoxìng rènshi nǐ.",
    meaning: "Rất vui được quen biết bạn.",
    category: "Giới thiệu",
    emoji: "🤝",
    example: "很高兴认识你，明天见！",
    examplePinyin: "Hěn gāoxìng rènshi nǐ, míngtiān jiàn!",
    exampleMeaning: "Rất vui được quen biết bạn, hẹn ngày mai gặp lại!"
  }
];

export const CHARACTERS_TO_WRITE = [
  {
    char: "一",
    pinyin: "yī",
    meaning: "Một",
    strokes: [
      { from: { x: 50, y: 150 }, to: { x: 250, y: 150 } }
    ]
  },
  {
    char: "二",
    pinyin: "èr",
    meaning: "Hai",
    strokes: [
      { from: { x: 80, y: 110 }, to: { x: 220, y: 110 } },
      { from: { x: 50, y: 190 }, to: { x: 250, y: 190 } }
    ]
  },
  {
    char: "三",
    pinyin: "sān",
    meaning: "Ba",
    strokes: [
      { from: { x: 80, y: 90 }, to: { x: 220, y: 90 } },
      { from: { x: 100, y: 150 }, to: { x: 200, y: 150 } },
      { from: { x: 50, y: 210 }, to: { x: 250, y: 210 } }
    ]
  },
  {
    char: "人",
    pinyin: "rén",
    meaning: "Người",
    strokes: [
      { from: { x: 150, y: 60 }, to: { x: 70, y: 240 } },
      { from: { x: 140, y: 120 }, to: { x: 230, y: 240 } }
    ]
  },
  {
    char: "大",
    pinyin: "dà",
    meaning: "To lớn",
    strokes: [
      { from: { x: 60, y: 120 }, to: { x: 240, y: 120 } },
      { from: { x: 150, y: 50 }, to: { x: 70, y: 250 } },
      { from: { x: 140, y: 120 }, to: { x: 230, y: 250 } }
    ]
  },
  {
    char: "口",
    pinyin: "kǒu",
    meaning: "Miệng",
    strokes: [
      { from: { x: 80, y: 80 }, to: { x: 80, y: 220 } },
      { from: { x: 80, y: 80 }, to: { x: 220, y: 80 } },
      { from: { x: 220, y: 80 }, to: { x: 220, y: 220 } },
      { from: { x: 80, y: 220 }, to: { x: 220, y: 220 } }
    ]
  },
  {
    char: "日",
    pinyin: "rì",
    meaning: "Mặt trời / Ngày",
    strokes: [
      { from: { x: 100, y: 80 }, to: { x: 100, y: 220 } },
      { from: { x: 100, y: 80 }, to: { x: 200, y: 80 } },
      { from: { x: 200, y: 80 }, to: { x: 200, y: 220 } },
      { from: { x: 100, y: 150 }, to: { x: 200, y: 150 } },
      { from: { x: 100, y: 220 }, to: { x: 200, y: 220 } }
    ]
  },
  {
    char: "月",
    pinyin: "yuè",
    meaning: "Mặt trăng / Tháng",
    strokes: [
      { from: { x: 110, y: 70 }, to: { x: 110, y: 230 } },
      { from: { x: 110, y: 70 }, to: { x: 190, y: 70 } },
      { from: { x: 190, y: 70 }, to: { x: 190, y: 230 } },
      { from: { x: 110, y: 125 }, to: { x: 190, y: 125 } },
      { from: { x: 110, y: 175 }, to: { x: 190, y: 175 } }
    ]
  },
  {
    char: "山",
    pinyin: "shān",
    meaning: "Núi",
    strokes: [
      { from: { x: 150, y: 80 }, to: { x: 150, y: 220 } },
      { from: { x: 90, y: 130 }, to: { x: 90, y: 220 } },
      { from: { x: 90, y: 220 }, to: { x: 210, y: 220 } },
      { from: { x: 210, y: 130 }, to: { x: 210, y: 220 } }
    ]
  },
  {
    char: "水",
    pinyin: "shuǐ",
    meaning: "Nước",
    strokes: [
      { from: { x: 150, y: 70 }, to: { x: 150, y: 230 } },
      { from: { x: 90, y: 120 }, to: { x: 150, y: 120 } },
      { from: { x: 150, y: 120 }, to: { x: 90, y: 180 } },
      { from: { x: 210, y: 100 }, to: { x: 150, y: 140 } },
      { from: { x: 150, y: 140 }, to: { x: 220, y: 220 } }
    ]
  },
  {
    char: "火",
    pinyin: "huǒ",
    meaning: "Lửa",
    strokes: [
      { from: { x: 90, y: 120 }, to: { x: 110, y: 140 } },
      { from: { x: 210, y: 120 }, to: { x: 190, y: 140 } },
      { from: { x: 150, y: 70 }, to: { x: 90, y: 230 } },
      { from: { x: 140, y: 120 }, to: { x: 210, y: 230 } }
    ]
  },
  {
    char: "木",
    pinyin: "mù",
    meaning: "Gỗ / Cây",
    strokes: [
      { from: { x: 60, y: 120 }, to: { x: 240, y: 120 } },
      { from: { x: 150, y: 60 }, to: { x: 150, y: 240 } },
      { from: { x: 150, y: 120 }, to: { x: 80, y: 220 } },
      { from: { x: 150, y: 120 }, to: { x: 220, y: 220 } }
    ]
  }
];
