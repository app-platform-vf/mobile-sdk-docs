# Common Issues

## Tổng quan

| Lỗi | Nguyên nhân | Giải pháp |
|------|-------------|-----------|
| Network request failed | Sai base URL hoặc không có internet | Kiểm tra cấu hình URL và kết nối mạng |
| SSL Pinning error | Certificate không khớp | Kiểm tra certificate pinning config |
| Timeout error | Server không phản hồi | Tăng timeout hoặc kiểm tra server |

## Chi tiết

### Network request failed

**Triệu chứng:** Tất cả network requests đều fail.

**Giải pháp:**
1. Kiểm tra kết nối internet
2. Kiểm tra base URL đã cấu hình đúng
3. Kiểm tra `NSAppTransportSecurity` trong Info.plist (iOS)
4. Xem logs để biết chi tiết lỗi

### SSL Pinning error

**Triệu chứng:** Request fail với lỗi SSL/TLS.

**Giải pháp:**
- Kiểm tra certificate có còn hạn không
- Đảm bảo certificate pinning config đúng với server
- Thử tắt pinning trong môi trường development

### SPM không resolve được package

**Triệu chứng:** Xcode báo lỗi khi resolve VDOFrameworks package.

**Giải pháp:**
1. Đảm bảo thư mục `VDOFrameworks/` chứa file `Package.swift`
2. Xoá package cache và resolve lại:
   - **File → Packages → Reset Package Caches**
   - **File → Packages → Resolve Package Versions**
3. Build lại: ⌘B
