---
sidebar_position: 4
---

# iOS Usage

## Sử dụng VDONetwork

VDONetwork cung cấp network layer cho các SDK khác. Thông thường không cần gọi trực tiếp — VDOMiniApp sẽ sử dụng VDONetwork nội bộ.

### Import

```swift
import VDONetwork
```

## Tính năng chính

| Tính năng           | Mô tả                                    |
| ------------------- | ----------------------------------------- |
| HTTP Client         | Gửi/nhận HTTP requests (GET, POST, PUT, DELETE) |
| Request Builder     | Tạo và cấu hình request với headers, params   |
| Response Handler    | Parse response JSON và xử lý lỗi              |
| Interceptor         | Middleware cho request/response pipeline        |
| Certificate Pinning | Bảo mật kết nối SSL/TLS                        |

## Lưu ý

- VDONetwork là **internal dependency** — các API có thể thay đổi giữa các version
- Nếu cần sử dụng network layer riêng, nên wrap VDONetwork để tránh breaking changes
- Kiểm tra [Dependency Matrix](../../dependency-matrix.md) khi cập nhật version

## Xử lý lỗi

Nếu gặp lỗi khi build hoặc runtime, xem [Troubleshooting](../../troubleshooting/common-issues.md).
