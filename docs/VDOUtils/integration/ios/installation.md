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

## Tích hợp qua SPM (Swift Package Manager)

VDOUtils được phân phối như một phần của package **VDOFrameworks**. Xem hướng dẫn chi tiết tại [VDOMiniApp Installation](../../../VDOMiniApp/integration/ios/installation.md).

Trong `Package.swift`, VDOUtils là một binary target:

```swift
.binaryTarget(
    name: "VDOUtils",
    url: "<DOWNLOAD_URL_VDOUtils>",
    checksum: "<CHECKSUM_VDOUtils>"
)
```

> Thay `<CHECKSUM_...>` và `<DOWNLOAD_URL_...>` bằng giá trị tương ứng trong [Release Notes](../../releases/ios/index.md).

---

## Verify

```swift
import VDOUtils
```

Build project (⌘B) để xác nhận SDK đã tích hợp thành công.
