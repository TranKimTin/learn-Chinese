# Quy tắc thiết kế tài nguyên hình ảnh (Assets Design Rules)

## 1. Ưu tiên Công nghệ Đồ họa
*   **Ưu tiên Đồ họa Vector SVG**: Đối với bất kỳ hình ảnh minh họa, biểu tượng hoặc nút bấm nào trong dự án, luôn ưu tiên thiết kế trực tiếp bằng code SVG (lưu dưới dạng `.svg` trong thư mục `/public/images/`) để đảm bảo hình ảnh sắc nét, dung lượng nhẹ, hiển thị tốt trên thiết bị di động và không tốn quota.
*   **Sử dụng công cụ tạo ảnh AI làm phương án phụ**: Chỉ sử dụng công cụ tạo ảnh AI (`generate_image`) khi hình vẽ quá phức tạp hoặc đặc thù (ví dụ: tranh vẽ phong cảnh, tranh chi tiết cao) không thể tối giản hóa thành code SVG.

## 2. Quy tắc phạm vi tài nguyên (Illustration Coverage)
*   **Từ vựng (Vocab) & Cụm từ (Phrase)**: Bắt buộc phải có hình ảnh minh họa SVG riêng cho mỗi từ/cụm từ để hỗ trợ học tập trực quan.
*   **Câu giao tiếp (Sentence)**: Không sử dụng ảnh minh họa tả thực cho cả câu để tránh gây bối rối cho người học. Giữ nguyên giao diện thuần chữ kèm phát âm hoặc chỉ hiển thị linh vật chung.

## 3. Quy tắc hiển thị hình ảnh minh họa (Hint Visibility Rules)
*   **Chế độ Học (Thẻ Flashcards)**:
    *   *Mặt trước (Tiếng Trung)*: **Không hiển thị ảnh minh họa** để buộc người học tự nhớ mặt chữ và cách phát âm.
    *   *Mặt sau (Tiếng Việt & Phiên âm)*: **Luôn luôn hiển thị ảnh minh họa trực tiếp** để củng cố ghi nhớ qua thị giác ngay khi vừa lật thẻ.
*   **Chế độ Luyện tập (Quizzes & Ôn tập nhanh)**:
    *   Ảnh minh họa đóng vai trò là gợi ý phụ nên sẽ **ẩn đi theo mặc định**.
    *   Hiển thị nút `👁️ Xem ảnh gợi ý` để người học tự mở khi cần trợ giúp. Tự động ẩn lại khi chuyển sang câu tiếp theo.
