# Common Issues

## Tổng quan

| Lỗi | Nguyên nhân | Giải pháp |
|------|-------------|-----------|
| Module not found | SDK chưa được link đúng | Kiểm tra SPM package hoặc xcframework |
| Symbol conflict | Duplicate symbols với thư viện khác | Kiểm tra các dependency khác có dùng chung utility không |
| SPM resolve lỗi | Package cache hoặc checksum không khớp | Xoá cache và resolve lại |

## Chi tiết

### Module 'VDOUtils' not found

**Triệu chứng:** Xcode báo lỗi `No such module 'VDOUtils'`.

**Giải pháp:**
1. Kiểm tra VDOFrameworks package đã được add vào project
2. Kiểm tra `VDOUtils.xcframework` có trong thư mục `Frameworks/`
3. Clean Build: **Product → Clean Build Folder** (⌘⇧K) → ⌘B

### SPM không resolve được package

**Triệu chứng:** Xcode báo lỗi khi resolve VDOFrameworks package.

**Giải pháp:**
1. Đảm bảo thư mục `VDOFrameworks/` chứa file `Package.swift`
2. Xoá package cache và resolve lại:
   - **File → Packages → Reset Package Caches**
   - **File → Packages → Resolve Package Versions**
3. Build lại: ⌘B

### Version không tương thích

**Triệu chứng:** Runtime error hoặc build error khi cập nhật VDOUtils.

**Giải pháp:**
- VDOUtils là base SDK — khi cập nhật, VDONetwork và VDOMiniApp cũng cần version tương thích
- Kiểm tra [Dependency Matrix](../dependency-matrix.md)
- Download đúng bộ SDK package từ [Release Notes](../releases/ios/index.md)
