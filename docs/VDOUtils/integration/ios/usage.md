# iOS Usage

## Sử dụng VDOUtils

VDOUtils cung cấp các utilities dùng chung. Thông thường không cần gọi trực tiếp — VDONetwork và VDOMiniApp sẽ sử dụng VDOUtils nội bộ.

### Import

```swift
import VDOUtils
```

## Tính năng chính

| Tính năng        | Mô tả                                        |
| ---------------- | --------------------------------------------- |
| Extensions       | Extensions cho Swift standard types (String, Date, etc.) |
| Helpers          | Utility functions dùng chung                  |
| Constants        | Các constants và configurations               |
| Data Formatting  | Format date, number, string                   |
| Logging          | Logging utilities cho debug và monitoring     |

## Lưu ý

- VDOUtils là **base SDK** — các API có thể thay đổi giữa các version
- VDOUtils không có internal dependency
- Khi cập nhật VDOUtils, kiểm tra [Dependency Matrix](../../dependency-matrix.md) vì VDONetwork và VDOMiniApp phụ thuộc vào nó

## Xử lý lỗi

Nếu gặp lỗi khi build hoặc runtime, xem [Troubleshooting](../../troubleshooting/common-issues.md).
