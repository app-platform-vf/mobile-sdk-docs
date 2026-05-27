# Dependency Matrix

Mapping version giữa VDOUtils và các SDK sử dụng nó.

## iOS

VDOUtils **không có internal dependency**. Nó là base SDK được các SDK khác phụ thuộc vào:

| VDOUtils | Được sử dụng bởi VDONetwork | Được sử dụng bởi VDOMiniApp |
| -------- | --------------------------- | --------------------------- |
| 1.0.4    | 1.0.6                       | 2.1.0                       |

## Lưu ý

- VDOUtils là SDK nền tảng — khi cập nhật version, cần kiểm tra tương thích với tất cả SDK phụ thuộc
- File này hữu ích cho debugging, rollback, và release management
