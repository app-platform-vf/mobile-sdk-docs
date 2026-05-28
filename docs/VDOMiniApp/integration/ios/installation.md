---
sidebar_position: 2
---

# iOS Installation

## Requirements

| Requirement         | Value   |
| ------------------- | ------- |
| Minimum iOS         | 12.0    |
| Swift Tools Version | 5.0     |
| Xcode               | 16.0+   |

## Tài khoản JFrog (bắt buộc)

Để download SDK và sử dụng SPM binary targets, bạn cần có **tài khoản JFrog Artifactory**.

> ⚠️ Liên hệ **team phát triển SDK** để được cấp tài khoản (username + API token).

Sau khi có tài khoản, cấu hình `~/.netrc` để Xcode có thể tải xcframeworks:

```bash
cat >> ~/.netrc << 'EOF'
machine mobile-data.viettelmoney.vn
login <YOUR_USERNAME>
password <YOUR_API_TOKEN>
EOF

chmod 600 ~/.netrc
```

> `machine` phải là **hostname chính xác** — không có `https://`, không có `/artifactory`.

## Download SDK

Xem link download và checksum tại [Release Notes](../../releases/ios/index.md).

---

## Option 1: Tích hợp trực tiếp (XCFramework)

### Bước 1: Giải nén xcframeworks

Giải nén file zip, copy các `.xcframework` vào thư mục project (ví dụ `Frameworks/`):

```
YourApp/
├── YourApp.xcodeproj
├── YourApp/
└── Frameworks/
    ├── VDOMiniApp.xcframework
    ├── VDONetwork.xcframework
    └── VDOUtils.xcframework
```

### Bước 2: Add xcframeworks vào Xcode

1. Kéo thả các `.xcframework` vào Xcode **Project Navigator**
2. Chọn target → **General → Frameworks, Libraries, and Embedded Content**
3. Đảm bảo 3 xcframeworks đều có trong danh sách với setting **Embed & Sign**
4. Kiểm tra **Framework Search Paths** (Build Settings), thêm đường dẫn tới thư mục chứa framework nếu chưa có

---

## Option 2: Tích hợp qua SPM (Swift Package Manager)

### Bước 1: Tạo thư mục `VDOFrameworks` và file `Package.swift`

Tạo thư mục `VDOFrameworks/` trong root project, sau đó tạo file `Package.swift` với nội dung sau:

```swift
// swift-tools-version: 5.0
import PackageDescription

let package = Package(
    name: "VDOFrameworks",
    platforms: [.iOS(.v12)],
    products: [
        .library(name: "VDOMiniApp", targets: ["VDOMiniApp"]),
        .library(name: "VDONetwork", targets: ["VDONetwork"]),
        .library(name: "VDOUtils", targets: ["VDOUtils"]),
    ],
    targets: [
        .binaryTarget(
            name: "VDOMiniApp",
            url: "<DOWNLOAD_URL_VDOMiniApp>",
            checksum: "<CHECKSUM_VDOMiniApp>"
        ),
        .binaryTarget(
            name: "VDONetwork",
            url: "<DOWNLOAD_URL_VDONetwork>",
            checksum: "<CHECKSUM_VDONetwork>"
        ),
        .binaryTarget(
            name: "VDOUtils",
            url: "<DOWNLOAD_URL_VDOUtils>",
            checksum: "<CHECKSUM_VDOUtils>"
        ),
    ]
)
```

> Thay `<CHECKSUM_...>` và `<DOWNLOAD_URL_...>` bằng giá trị tương ứng trong [Release Notes](../../releases/ios/index.md).

### Bước 2: Cấu trúc project

```
YourApp/
├── YourApp.xcodeproj
├── YourApp/
└── VDOFrameworks/
    └── Package.swift      ← file vừa tạo ở bước 1
```

### Bước 3: Add package vào Xcode

```
File → Add Package Dependencies... (⌘⇧D)
→ Add Local... (góc dưới trái)
→ Chọn thư mục: VDOFrameworks
→ Tick các libraries:
   ☑ VDOMiniApp
   ☑ VDONetwork
   ☑ VDOUtils
→ Add Package
```

---

## Cấu hình project

### Cấu hình HTTP request (Info.plist)

Mở file `Info.plist` dưới dạng Source Code, thêm vào trong thẻ `<dict>` đầu tiên:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

### Tắt User Script Sandboxing

1. Chọn target → **Build Settings**
2. Search: `User Script Sandboxing`
3. Ở mục **Build Options**, chuyển **User Script Sandboxing** thành **No**

---

## Verify

```swift
import VDOMiniApp
```

Build project (⌘B) để xác nhận SDK đã tích hợp thành công.

---

## So sánh 2 phương thức

| Tiêu chí              | Tích hợp trực tiếp       | Tích hợp qua SPM          |
| ---------------------- | ------------------------ | -------------------------- |
| Setup                  | Kéo thả xcframework      | Tạo Package.swift          |
| Version management     | Thủ công                 | Sửa URL + checksum         |
| Cập nhật SDK           | Thay thế xcframework     | Sửa version trong Package.swift |
| Phù hợp cho           | Project đơn giản         | Project có dùng SPM        |
