# Architecture

## Kiến trúc tổng thể

```
Host App
   │
VDOFrameworks (SPM Package)
   ├── VDOMiniApp  ← SDK chính tích hợp mini apps
   ├── VDONetwork  ← Xử lý network
   └── VDOUtils    ← Utilities dùng chung
```

## SDK Components

| Component    | Mô tả                                |
| ------------ | ------------------------------------- |
| `VDOMiniApp` | SDK chính dùng để tích hợp mini apps  |
| `VDONetwork` | Xử lý network layer                  |
| `VDOUtils`   | Cung cấp utilities dùng chung        |

## Distribution

SDK được phân phối dưới dạng **Swift Package** (VDOFrameworks) chứa các XCFramework binary targets.

| Thông tin              | Giá trị |
| ---------------------- | ------- |
| Package name           | `VDOFrameworks` |
| Platform               | iOS 12+ |
| Swift Tools Version    | 5.0 |
