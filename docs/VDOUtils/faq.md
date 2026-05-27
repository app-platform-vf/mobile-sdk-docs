# FAQ

## Câu hỏi phổ biến

### Q: VDOUtils SDK dùng để làm gì?

**A:** VDOUtils cung cấp các utilities dùng chung cho hệ SDK — bao gồm extensions, helpers, constants, data formatting và logging.

---

### Q: Tôi có cần import VDOUtils trực tiếp không?

**A:** Thông thường không cần. VDOUtils là dependency nội bộ, tự động được link khi add VDOFrameworks package. Chỉ cần `import VDOUtils` nếu sử dụng trực tiếp các utility functions.

---

### Q: VDOUtils có dependency nào không?

**A:** Không. VDOUtils là base SDK — không phụ thuộc vào SDK nội bộ nào khác. Các SDK như VDONetwork và VDOMiniApp phụ thuộc vào VDOUtils.

---

### Q: Minimum iOS version được hỗ trợ là bao nhiêu?

**A:** iOS 12.0.

---

### Q: Làm sao để cập nhật VDOUtils lên version mới?

**A:**
1. Download file `VDOFrameworks-<version>.zip` mới từ [Release Notes](releases/ios/)
2. Thay thế thư mục `VDOFrameworks/` trong project
3. Trong Xcode: **File → Packages → Reset Package Caches** → **Resolve Package Versions** → ⌘B

> ⚠️ VDOUtils là base SDK — khi cập nhật, cần đảm bảo VDONetwork và VDOMiniApp vẫn tương thích. Kiểm tra [Dependency Matrix](dependency-matrix.md).

---

### Q: Xcode báo lỗi khi resolve package, phải làm sao?

**A:** Xem [Troubleshooting](troubleshooting/common-issues.md) để biết cách xử lý các lỗi phổ biến.
