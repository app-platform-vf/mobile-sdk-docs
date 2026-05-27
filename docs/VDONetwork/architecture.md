# Architecture

## Vai trò trong hệ SDK

```
Host App
   │
VDOFrameworks (SPM Package)
   ├── VDOMiniApp  ← SDK chính tích hợp mini apps
   ├── VDONetwork  ← Xử lý network (SDK này)
   └── VDOUtils    ← Utilities dùng chung
```

VDONetwork là **core SDK** xử lý toàn bộ network layer, được sử dụng bởi VDOMiniApp và các SDK khác trong hệ thống.

## Responsibilities

| Chức năng           | Mô tả                                    |
| ------------------- | ----------------------------------------- |
| HTTP Client         | Gửi/nhận HTTP requests                    |
| Request Builder     | Tạo và cấu hình request                   |
| Response Handler    | Parse response và xử lý lỗi              |
| Interceptor         | Middleware cho request/response pipeline  |
| Certificate Pinning | Bảo mật kết nối SSL/TLS                  |

## Distribution

SDK được phân phối dưới dạng **Swift Package** (VDOFrameworks) chứa các XCFramework binary targets.

| Thông tin              | Giá trị       |
| ---------------------- | ------------- |
| Package name           | `VDOFrameworks` |
| Platform               | iOS 12+       |
| Swift Tools Version    | 5.0           |
