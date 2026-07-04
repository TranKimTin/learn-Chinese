# SinoLearn - Ứng Dụng Học Tiếng Trung Cho Người Mới Bắt Đầu

SinoLearn là một ứng dụng web học tiếng Trung được thiết kế tối ưu hóa cho giao diện thiết bị di động (Mobile-first Web App). Dự án được thiết kế sinh động, trực quan giúp người học nhanh chóng tiếp cận tiếng Trung cơ bản.

## 🚀 Công Nghệ Sử Dụng
*   **Frontend**: React (Vite)
*   **CSS / Giao Diện**: Vanilla CSS (Hiệu ứng Glassmorphism, lật thẻ 3D, responsive điện thoại).
*   **Phát Âm (Text-to-Speech)**: Tích hợp API SpeechSynthesis có sẵn của trình duyệt.
*   **Âm Thanh Phản Hồi**: API AudioContext để tự tạo âm thanh trắc nghiệm (synthesized sound effects) mà không cần tải file ngoài.

---

## 🎨 Hướng Dẫn Thiết Kế Tài Nguyên Đồ Họa & Ảnh Gợi Ý

> [!IMPORTANT]
> **1. Quy tắc ưu tiên công nghệ vẽ**
> *   **Ưu tiên SVG**: Luôn luôn thiết kế ảnh biểu tượng minh họa dưới dạng vector SVG màu sắc (lưu tại `/public/images/`) giúp ứng dụng tải trang siêu nhẹ, hiển thị sắc nét trên điện thoại và không tốn quota tạo ảnh.
> *   **Sử dụng AI tạo ảnh làm phương án phụ**: Chỉ sử dụng công cụ tạo ảnh AI khi hình vẽ quá phức tạp (như phong cảnh, tranh vẽ nhiều chi tiết thực tế).

> [!IMPORTANT]
> **2. Quy tắc phạm vi ảnh gợi ý (Illustration Coverage)**
> *   **Từ vựng & Cụm từ**: 100% bắt buộc phải có ảnh minh họa SVG riêng biệt.
> *   **Mẫu câu dài**: Không thiết kế ảnh minh họa tả thực để tránh gây rối mắt cho người học. Giữ giao diện câu thuần chữ hoặc dùng ảnh linh vật chung.

> [!IMPORTANT]
> **3. Quy tắc ẩn/hiện ảnh gợi ý (Hint Visibility Rules)**
> *   **Phần Học (Thẻ Flashcards)**:
>     *   *Mặt trước (Tiếng Trung)*: **Không hiển thị ảnh minh họa** (ẩn hoàn toàn) để thử thách người học nhận diện mặt chữ Hán.
>     *   *Mặt sau (Tiếng Việt & Phiên âm)*: **Luôn luôn hiện ảnh trực tiếp** để củng cố ghi nhớ từ vựng.
> *   **Phần Luyện tập (Trắc nghiệm bài học & Ôn tập nhanh)**:
>     *   Hình ảnh minh họa đóng vai trò gợi ý nên **ẩn mặc định** dưới nút bấm `👁️ Xem ảnh gợi ý` để người học tự làm trước khi xem gợi ý.

---

## 📂 Cấu Trúc Dự Án
```
hoc_tieng_trung/
├── public/
│   ├── images/             # Nơi lưu trữ hình ảnh minh họa (.png, .svg)
│   └── svg_demo.html       # Trang trải nghiệm vẽ hình vector SVG
├── src/
│   ├── main.jsx            # Điểm khởi chạy React
│   ├── App.jsx             # Điều phối luồng và điều hướng màn hình
│   ├── index.css           # Toàn bộ mã styling, layout mô phỏng di động
│   ├── context/
│   │   └── LearningContext.jsx  # Quản lý Streak học tập, XP và localStorage
│   ├── data/
│   │   └── curriculum.js   # Từ điển Pinyin, bài học trắc nghiệm HSK1, Flashcards
│   └── components/         # Các mảnh cấu trúc giao diện chính của app
```

---

## 🛠️ Hướng Dẫn Chạy Dự Án

### Cài Đặt Ban Đầu
```bash
npm install
```

### Chạy Development Server
```bash
npm run dev
```
Truy cập ứng dụng tại địa chỉ mặc định: `http://localhost:5173/`

### Đóng Gói Production Build
```bash
npm run build
```
Mã nguồn sau khi tối ưu sẽ được xuất ra thư mục `dist/` để sẵn sàng triển khai.
