# iOS Integration Overview

## Giới thiệu

Mini App SDK cho phép tích hợp mini applications vào host app trên nền tảng iOS.

## SDK Components

| SDK          | Mô tả                       |
| ------------ | ---------------------------- |
| `VDOMiniApp` | SDK chính tích hợp mini apps |
| `VDONetwork` | Xử lý network layer         |
| `VDOUtils`   | Utilities dùng chung         |

> Thông thường chỉ cần `import VDOMiniApp`. `VDONetwork` và `VDOUtils` là dependencies nội bộ, tự động được link.

## Bắt đầu

1. [Installation](installation.md) — Requirements, tài khoản JFrog, download và cài đặt SDK
2. [Configuration](configuration.md) — Version hiện tại và cách cập nhật SDK
3. [Usage](usage.md) — Sử dụng SDK trong project
