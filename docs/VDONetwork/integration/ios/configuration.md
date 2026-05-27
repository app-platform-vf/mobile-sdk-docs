# iOS Configuration

## Cấu hình Network

VDONetwork SDK thường được cấu hình tự động khi khởi tạo VDOMiniApp SDK. Nếu sử dụng trực tiếp:

```swift
import VDONetwork

// VDONetwork sẽ được cấu hình tự động khi VDOMiniApp.initialize() được gọi
// Nếu dùng standalone, tham khảo API documentation
```

## Cấu hình HTTP request (Info.plist)

Mở file `Info.plist` dưới dạng Source Code, thêm vào trong thẻ `<dict>` đầu tiên:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

## Cập nhật SDK

Xem version mới nhất tại [Release Notes](../../releases/ios/index.md).

### Option 1: Tích hợp trực tiếp (XCFramework)

1. Download file zip version mới từ [Release Notes](../../releases/ios/index.md)
2. Giải nén và thay thế `VDONetwork.xcframework` cũ trong thư mục `Frameworks/`
3. Clean Build: **Product → Clean Build Folder** (⌘⇧K) → ⌘B

### Option 2: Tích hợp qua SPM

1. Cập nhật `url` và `checksum` trong `VDOFrameworks/Package.swift` theo version mới (xem [Release Notes](../../releases/ios/index.md))
2. Trong Xcode: **File → Packages → Reset Package Caches** → **Resolve Package Versions** → ⌘B

> Kiểm tra [Dependency Matrix](../../dependency-matrix.md) để xem version tương thích.
