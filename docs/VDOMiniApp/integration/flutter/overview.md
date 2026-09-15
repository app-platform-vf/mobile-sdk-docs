---
sidebar_position: 1
---

# Flutter Integration Overview

## Giới thiệu

Mini App SDK cho phép tích hợp mini applications vào host app Flutter.

## Hai bản plugin

Plugin có hai bản.

| | Bản tiêu chuẩn | Bản có eKYC |
| ------------------------ | -------------- | ----------- |
| Version plugin           | `2.1.0`        | `2.2.0`     |
| Quyền camera / thư viện ảnh | Không       | **Bắt buộc** |
| Quyền NFC + entitlement  | Không          | **Bắt buộc** |

## SDK Components

### Bản tiêu chuẩn

| SDK          | Mô tả                        |
| ------------ | ---------------------------- |
| `VDOMiniApp` | SDK chính tích hợp mini apps |
| `VDONetwork` | Xử lý network layer          |
| `VDOUtils`   | Utilities dùng chung         |

### Bản có eKYC — bổ sung

| SDK                       | Mô tả                                          |
| ------------------------- | ---------------------------------------------- |
| `VDOEkycService`          | Dịch vụ định danh điện tử                      |
| `VDOMiniAppEkycConnector` | Cầu nối giữa Mini App và luồng eKYC            |
| `eKYC`                    | Binary nhận diện giấy tờ và khuôn mặt          |
| `NFC`                     | Đọc chip theo chuẩn ICAO trên giấy tờ tuỳ thân |


## Yêu cầu

| Hạng mục              | Giá trị            |
| --------------------- | ------------------ |
| Flutter SDK           | `>=3.3.0 <3.47.0`  |
| Dart SDK              | `>=2.18.4`         |
| Minimum iOS           | **13.0**           |
| Xcode                 | 16.0+              |
| Android `minSdk`      | 24                 |
| Android `compileSdk`  | 34+                |
| Android Gradle Plugin | **8.1+**           |

> ⚠️ **Không dùng Flutter >= 3.47.0**: bản đó tự đặt `ios.deployment_target = 15.0`, phá
> `platform :ios, '13.0'` mà plugin yêu cầu. Chi tiết ở [Installation](installation.md).

## Bắt đầu

1. [Installation](installation.md) - Tài khoản JFrog, khai báo dependency, cấu hình iOS và Android
2. [Configuration](configuration.md) - Khởi tạo SDK, HostAppBridge, cấu hình giao diện
3. [Usage](usage.md) - Mở Mini App, deep link, xử lý sự kiện vòng đời
