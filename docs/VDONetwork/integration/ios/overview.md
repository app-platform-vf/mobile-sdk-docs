# iOS Integration Overview

## Giới thiệu

VDONetwork SDK xử lý toàn bộ network layer cho hệ SDK trên nền tảng iOS.

## Vai trò

| SDK          | Mô tả                       |
| ------------ | ---------------------------- |
| `VDONetwork` | Xử lý network layer (SDK này) |
| `VDOUtils`   | Utilities dùng chung (dependency) |

> VDONetwork thường được sử dụng gián tiếp thông qua `VDOMiniApp`. Nếu cần sử dụng trực tiếp, `import VDONetwork`.

## Bắt đầu

1. [Installation](installation.md) — Requirements, tài khoản JFrog, download và cài đặt SDK
2. [Configuration](configuration.md) — Cấu hình network và cách cập nhật SDK
3. [Usage](usage.md) — Sử dụng SDK trong project
