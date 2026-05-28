---
sidebar_position: 1
---

# Android Integration Overview

## Giới thiệu

Mini App SDK cho Android cho phép tích hợp mini applications vào host app trên nền tảng Android.

## Requirements

| Requirement | Value |
| ----------- | ----- |
| Minimum SDK | 24    |
| Target SDK  | 35    |
| Compile SDK | 34    |
| Gradle      | 8.0+  |

## Capabilities

- Load và render mini app
- Mở mini app từ deeplink / QR code
- Quản lý lifecycle
- Xử lý callback giữa host app và mini app (user data, payment, session expiry, location)
- Intercept JS bridge messages

## Bắt đầu

1. [Installation](installation.md) — Cài đặt SDK và khởi tạo `SdkConfig`
2. [Configuration](configuration.md) — Cấu hình `HostAppBridge`, `MiniAppThemeConfig` và `InitRequest`
3. [Usage](usage.md) — Mở mini app và xử lý sự kiện
