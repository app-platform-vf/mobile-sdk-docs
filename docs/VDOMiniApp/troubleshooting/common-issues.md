# Common Issues

## Tổng quan

| Lỗi | Nguyên nhân | Giải pháp |
|------|-------------|-----------|
| SPM không resolve được | Package.swift lỗi hoặc file bị thiếu | Kiểm tra thư mục VDOFrameworks có đầy đủ |
| Build failed sau khi add package | Chưa link đúng library | Kiểm tra target → Build Phases → Link Binary |
| `no XCFramework found` | Zip giải nén sai cấu trúc | Giải nén lại từ file zip gốc |

## Chi tiết

### SPM không resolve được package

**Triệu chứng:** Xcode báo lỗi khi resolve VDOFrameworks package.

**Giải pháp:**
1. Đảm bảo thư mục `VDOFrameworks/` chứa file `Package.swift`
2. Xoá package cache và resolve lại:
   - **File → Packages → Reset Package Caches**
   - **File → Packages → Resolve Package Versions**
3. Build lại: ⌘B

### Build failed sau khi add package

**Triệu chứng:** Build báo lỗi `No such module 'VDOMiniApp'`.

**Giải pháp:**
1. Kiểm tra target → **General → Frameworks, Libraries, and Embedded Content** đã có VDOMiniApp, VDONetwork, VDOUtils
2. Nếu thiếu: nhấn **"+"** → tìm và add từng library
3. Build lại: ⌘B

### no XCFramework found

**Triệu chứng:** SPM resolve thành công nhưng báo không tìm thấy xcframework.

**Giải pháp:**
- Xoá thư mục `VDOFrameworks/` hiện tại
- Download lại file zip từ [Release Notes](../releases/ios/2.1.0.md)  
- Giải nén lại và đặt vào project

### SPM dùng cache cũ sau khi update SDK

**Triệu chứng:** Đã thay thế `VDOFrameworks/` bằng version mới nhưng Xcode vẫn dùng binary cũ.

**Giải pháp:**
1. **File → Packages → Reset Package Caches**
2. **File → Packages → Resolve Package Versions**
3. Clean build: **Product → Clean Build Folder** (⌘⇧K)
4. Build lại: ⌘B
