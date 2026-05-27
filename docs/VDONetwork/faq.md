# FAQ

## Câu hỏi phổ biến

### Q: VDONetwork SDK dùng để làm gì?

**A:** VDONetwork xử lý toàn bộ network layer cho hệ SDK — bao gồm HTTP requests, response handling, interceptors và certificate pinning.

---

### Q: Tôi có cần import VDONetwork trực tiếp không?

**A:** Thông thường không cần. VDONetwork là dependency nội bộ, tự động được link khi add VDOFrameworks package. Chỉ cần `import VDONetwork` nếu sử dụng trực tiếp các API network.

---

### Q: Minimum iOS version được hỗ trợ là bao nhiêu?

**A:** iOS 12.0.

---

### Q: Làm sao để biết version VDONetwork nào tương thích với VDOMiniApp?

**A:** Kiểm tra [Dependency Matrix](dependency-matrix.md) để xem mapping version giữa các SDK.

---

### Q: Làm sao để cập nhật VDONetwork lên version mới?

**A:**
1. Download file `VDOFrameworks-<version>.zip` mới từ [Release Notes](releases/ios/)
2. Thay thế thư mục `VDOFrameworks/` trong project
3. Trong Xcode: **File → Packages → Reset Package Caches** → **Resolve Package Versions** → ⌘B

---

### Q: Xcode báo lỗi khi resolve package, phải làm sao?

**A:** Xem [Troubleshooting](troubleshooting/common-issues.md) để biết cách xử lý các lỗi phổ biến.

---

### Q: Làm sao để report bug?

**A:** Liên hệ team SDK qua kênh internal communication hoặc tạo issue trên repository.
