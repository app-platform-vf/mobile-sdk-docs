---
sidebar_position: 3
---

# iOS Configuration

## Cấu hình

VDOUtils SDK không cần cấu hình riêng — nó cung cấp utilities được sử dụng nội bộ bởi các SDK khác.

```swift
import VDOUtils

// VDOUtils được sử dụng tự động bởi VDONetwork và VDOMiniApp
// Nếu dùng standalone, import trực tiếp
```

## Cập nhật SDK

Xem version mới nhất tại [Release Notes](../../releases/ios/index.md).

### Option 1: Tích hợp trực tiếp (XCFramework)

1. Download file zip version mới từ [Release Notes](../../releases/ios/index.md)
2. Giải nén và thay thế `VDOUtils.xcframework` cũ trong thư mục `Frameworks/`
3. Clean Build: **Product → Clean Build Folder** (⌘⇧K) → ⌘B

### Option 2: Tích hợp qua SPM

1. Cập nhật `url` và `checksum` trong `VDOFrameworks/Package.swift` theo version mới (xem [Release Notes](../../releases/ios/index.md))
2. Trong Xcode: **File → Packages → Reset Package Caches** → **Resolve Package Versions** → ⌘B

> ⚠️ VDOUtils là base SDK — khi cập nhật, kiểm tra [Dependency Matrix](../../dependency-matrix.md) để đảm bảo VDONetwork và VDOMiniApp vẫn tương thích.
