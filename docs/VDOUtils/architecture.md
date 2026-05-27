# Architecture

## Vai trò trong hệ SDK

```
Host App
   │
VDOFrameworks (SPM Package)
   ├── VDOMiniApp  ← SDK chính tích hợp mini apps
   ├── VDONetwork  ← Xử lý network
   └── VDOUtils    ← Utilities dùng chung (SDK này)
```

VDOUtils là **base SDK** cung cấp các utilities dùng chung, được sử dụng bởi VDONetwork, VDOMiniApp và các SDK khác trong hệ thống. Đây là SDK **không có internal dependency** — nó là nền tảng mà các SDK khác phụ thuộc vào.

## Responsibilities

| Chức năng        | Mô tả                                        |
| ---------------- | --------------------------------------------- |
| Extensions       | Extensions cho Swift standard types           |
| Helpers          | Utility functions dùng chung                  |
| Constants        | Các constants và configurations               |
| Data Formatting  | Format date, number, string                   |
| Logging          | Logging utilities                             |

## Distribution

SDK được phân phối dưới dạng **Swift Package** (VDOFrameworks) chứa các XCFramework binary targets.

| Thông tin              | Giá trị       |
| ---------------------- | ------------- |
| Package name           | `VDOFrameworks` |
| Platform               | iOS 12+       |
| Swift Tools Version    | 5.0           |
| Internal Dependencies  | Không có      |
