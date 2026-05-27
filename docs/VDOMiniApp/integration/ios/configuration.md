# iOS Configuration

## Khởi tạo MiniAppSDK

Khởi tạo SDK khi mở ứng dụng, trong `AppDelegate`:

```swift
import VDOMiniApp

let hostAppBridge = HostAppBridge()

do {
    try VDOMiniAppSdk.shared.initialize(
        with: VDOSdkConfig(
            apiKey: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            partnerKey: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
            secretId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            environment: environment
        )
    )
    VDOMiniAppSdk.shared.setHostAppBridge(bridge: hostAppBridge)
} catch let error {
    debugPrint("Error when init SDK: \(error.localizedDescription)")
}
```

### Tham số VDOSdkConfig

| Tham số      | Kiểu    | Mô tả                                                        |
| ------------ | ------- | ------------------------------------------------------------- |
| `apiKey`     | String  | Được cung cấp khi đăng ký MiniApp trên App Center            |
| `partnerKey` | String  | Được cung cấp khi đăng ký MiniApp trên App Center            |
| `secretId`   | String  | Được cung cấp khi đăng ký MiniApp trên App Center            |
| `environment`| Enum    | Môi trường SDK: `.staging`, `.uat`, `.production`             |

## HostAppBridge

Tạo `HostAppBridge` để handler giao tiếp giữa MiniApp và HostApp:

```swift
class HostAppBridge: VDOHostAppBridge {

    init() { }

    func getUserData(miniAppKey: String, dataName: [String], completion: @escaping (_ userData: [String: Any]) -> Void) {
        var jsonObject = [String: Any]()
        if dataName.contains(VDOUserDataName.age.rawValue) {
            jsonObject[VDOUserDataName.age.rawValue] = 12
        }
        if dataName.contains(VDOUserDataName.avatar.rawValue) {
            jsonObject[VDOUserDataName.avatar.rawValue] = "an_image_link"
        }
        if dataName.contains(VDOUserDataName.phoneNumber.rawValue) {
            jsonObject[VDOUserDataName.phoneNumber.rawValue] = "0326598653"
        }
        if dataName.contains(VDOUserDataName.userName.rawValue) {
            jsonObject[VDOUserDataName.userName.rawValue] = "User Name"
        }
        if dataName.contains(VDOUserDataName.fullName.rawValue) {
            jsonObject[VDOUserDataName.fullName.rawValue] = "Full Name"
        }
        completion(jsonObject)
    }

    func intercept(miniAppKey: String, request: String) { }

    func expiredSession(miniAppKey: String, data: [String: Any]) { }

    func observeLifecycle(miniAppKey: String, type: VDOMiniAppLifecycleType) { }

    func onBackToHome(miniAppKey: String) { }
}
```

### Các method của VDOHostAppBridge

| Method              | Mô tả                                                    |
| ------------------- | --------------------------------------------------------- |
| `getUserData`       | Trả về thông tin user theo yêu cầu từ MiniApp            |
| `intercept`         | Xử lý request intercept từ MiniApp                       |
| `expiredSession`    | Được gọi khi session hết hạn                             |
| `observeLifecycle`  | Theo dõi lifecycle events của MiniApp                     |
| `onBackToHome`      | Được gọi khi user nhấn back về home                      |

## Cấu hình Theme (VDOMiniAppThemeConfig)

`VDOMiniAppThemeConfig` là model cấu hình giao diện header/toolbar của Mini App. Có thể truyền khi mở Mini App hoặc cập nhật tại runtime qua JS bridge.

```swift
let theme = VDOMiniAppThemeConfig(
    headerColor: "#1A73E8",
    headerTitle: "My MiniApp",
    textColor: "#FFFFFF",
    leftButton: .back,
    toolbarMode: .normal,
    hideIOSSafeAreaBottom: false,
    actionButtonThemeType: .dark,
    statusBarForeground: .light
)
```

### Tham số VDOMiniAppThemeConfig

| Tham số                | Kiểu                           | Mô tả                                                                              |
| ---------------------- | ------------------------------ | ----------------------------------------------------------------------------------- |
| `headerColor`          | `String?`                      | Màu nền toolbar, hex string (ví dụ `"#FF0000"`) hoặc tên màu (`"white"`, `"black"`) |
| `headerTitle`          | `String?`                      | Tiêu đề hiển thị trên toolbar                                                       |
| `textColor`            | `String?`                      | Màu chữ tiêu đề và các nút, hex string hoặc tên màu                                |
| `leftButton`           | `MiniAppLeftButton?`           | `.back` (hiện nút back) hoặc `.none` (ẩn nút back)                                 |
| `toolbarMode`          | `MiniAppToolbarMode?`          | `.normal`, `.hidden`, hoặc `.transparent` (xem bảng bên dưới)                      |
| `hideIOSSafeAreaBottom`| `Bool?`                        | Ẩn safe area inset phía dưới trên thiết bị iOS                                     |
| `actionButtonThemeType`| `MiniAppActionButtonThemeType?`| `.light` hoặc `.dark` — màu nền capsule chứa nút more/close                        |
| `statusBarForeground`  | `MiniAppStatusBarForeground?`  | `.light` (icon trắng) hoặc `.dark` (icon đen); `nil` = tự động theo headerColor    |

### MiniAppToolbarMode

| Giá trị       | Mô tả                                                                    |
| ------------- | ------------------------------------------------------------------------- |
| `.normal`     | Status bar và header bar hiển thị bình thường                            |
| `.hidden`     | Ẩn cả status bar và header bar, Mini App full screen                     |
| `.transparent`| Status bar và header bar trong suốt, nội dung Mini App hiển thị phía dưới |

> `MiniAppThemeConfig` là typealias của `VDOMiniAppThemeConfig`, được giữ lại để tương thích ngược.

## Cập nhật SDK

Xem version mới nhất tại [Release Notes](../../releases/ios/index.md).

### Option 1: Tích hợp trực tiếp (XCFramework)

1. Download file zip version mới từ [Release Notes](../../releases/ios/index.md)
2. Giải nén và thay thế các `.xcframework` cũ trong thư mục `Frameworks/`
3. Clean Build: **Product → Clean Build Folder** (⌘⇧K) → ⌘B

### Option 2: Tích hợp qua SPM

1. Cập nhật `url` và `checksum` trong `VDOFrameworks/Package.swift` theo version mới (xem [Release Notes](../../releases/ios/index.md))
2. Trong Xcode: **File → Packages → Reset Package Caches** → **Resolve Package Versions** → ⌘B

> Kiểm tra [Dependency Matrix](../../dependency-matrix.md) để xem version tương thích.
