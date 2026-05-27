# FAQ

## Câu hỏi phổ biến

### Q: Minimum iOS version được hỗ trợ là bao nhiêu?

**A:** iOS 12.0.

---

### Q: Làm sao để cài đặt SDK?

**A:** Download file `VDOFrameworks-<version>.zip`, giải nén, và add vào Xcode qua SPM. Xem chi tiết tại [iOS Installation](integration/ios/installation.md).

---

### Q: Làm sao để biết version SDK nào tương thích với nhau?

**A:** Kiểm tra [Dependency Matrix](dependency-matrix.md) để xem mapping version giữa các SDK.

---

### Q: Làm sao để cập nhật SDK lên version mới?

**A:**
1. Download file `VDOFrameworks-<version>.zip` mới từ [Release Notes](releases/ios/)
2. Thay thế thư mục `VDOFrameworks/` trong project
3. Trong Xcode: **File → Packages → Reset Package Caches** → **Resolve Package Versions** → ⌘B

---

### Q: Tôi chỉ cần import VDOMiniApp hay cần import cả VDONetwork, VDOUtils?

**A:** Thông thường chỉ cần `import VDOMiniApp`. VDONetwork và VDOUtils là dependencies nội bộ, tự động được link khi add package.

---

### Q: Xcode báo lỗi khi resolve package, phải làm sao?

**A:** Xem [Troubleshooting](troubleshooting/common-issues.md) để biết cách xử lý các lỗi phổ biến.

---

### Q: Làm sao để report bug?

**A:** Liên hệ team SDK qua kênh internal communication hoặc tạo issue trên repository.
