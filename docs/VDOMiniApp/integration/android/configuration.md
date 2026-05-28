# Android Configuration

## HostAppBridge

`HostAppBridge` cho phép mini app gọi ra host app. Tạo một class implement interface này và gán vào `MiniAppSdk.getInstance().hostAppBridge` trước khi mở mini app:

```kotlin
class MyHostAppBridge : HostAppBridge {

    override fun getUserData(
        miniAppKey: String,
        dataName: List<String>,
        resultHandler: (Map<String, Any?>) -> Unit
    ) {
        val result = mutableMapOf<String, Any?>()
        if (dataName.contains(UserDataName.UserName.dataName))
            result[UserDataName.UserName.dataName] = "<username>"
        if (dataName.contains(UserDataName.FullName.dataName))
            result[UserDataName.FullName.dataName] = "<full name>"
        if (dataName.contains(UserDataName.Age.dataName))
            result[UserDataName.Age.dataName] = 0
        if (dataName.contains(UserDataName.Avatar.dataName))
            result[UserDataName.Avatar.dataName] = "<avatar url>"
        if (dataName.contains(UserDataName.PhoneNumber.dataName))
            result[UserDataName.PhoneNumber.dataName] = "<phone number>"
        resultHandler(result)
    }

    override fun expiredSession(miniAppKey: String, data: Map<String, Any>) {}

    override fun observeLifecycle(miniAppKey: String, miniAppLifecycle: MiniAppLifecycle) {}

    override fun paymentStart(miniAppKey: String, request: String) {}

    override fun paymentEnd(miniAppKey: String, request: String) {}

    override fun paymentRequest(miniAppKey: String, data: Map<String, Any>) {}

    override fun intercept(miniAppKey: String, message: String) {}

    override fun onReturnHome(miniAppKey: String, data: String?) {}

    override fun getLocation(resultHandler: (MiniAppLocation?) -> Unit) {
        resultHandler(null) // cung cấp vị trí thiết bị nếu cần
    }

    override fun tearDown() {}
}
```

### Các method của HostAppBridge

| Method             | Mô tả                                                                             |
| ------------------ | --------------------------------------------------------------------------------- |
| `getUserData`      | Cung cấp thông tin user theo yêu cầu từ mini app; kết quả trả qua `resultHandler` |
| `expiredSession`   | Callback khi session hết hạn                                                      |
| `intercept`        | Intercept JS bridge message từ mini app                                           |
| `observeLifecycle` | Theo dõi lifecycle của mini app                                                   |
| `paymentRequest`   | Callback khi mini app gửi payment request                                         |
| `paymentStart`     | Callback khi bắt đầu luồng thanh toán                                             |
| `paymentEnd`       | Callback khi kết thúc luồng thanh toán                                            |
| `onReturnHome`     | Callback khi user nhấn về trang chủ                                               |
| `getLocation`      | Cung cấp vị trí thiết bị; kết quả trả qua `resultHandler`                        |
| `tearDown`         | Dọn dẹp tài nguyên khi SDK bị hủy                                                |

## HostView

`HostView` xác định context và container chứa mini app:

```kotlin
HostView(
    context = this,                   // Context (Activity hoặc Application)
    containerId = R.id.container,     // View container ID
    miniAppHeaderConfig = themeConfig // MiniAppThemeConfig tùy chọn
)
```

> `activity` là derived property nullable (`context as? FragmentActivity`) — không cần truyền trực tiếp.

## MiniAppConfig

`MiniAppConfig` chứa cấu hình cho một phiên mở mini app:

| Field         | Type                  | Default | Mô tả                             |
| ------------- | --------------------- | ------- | --------------------------------- |
| `initRequest` | `InitRequest?`        | `null`  | Thông tin session và device       |
| `networkInfo` | `NetworkInfo?`        | `null`  | Thông tin mạng                    |
| `themeConfig` | `MiniAppThemeConfig?` | `null`  | Cấu hình giao diện toolbar        |
| `containerId` | `Int` (`@IdRes`)      | `-1`    | Container view ID                 |
| `needParams`  | `Boolean?`            | `true`  | Có yêu cầu init params hay không |

## MiniAppThemeConfig

`MiniAppThemeConfig` cấu hình giao diện toolbar của mini app. Có thể truyền khi mở mini app hoặc cập nhật tại runtime qua JS bridge event `MiniAppEvent.UPDATE_MINI_APP_THEME`:

```kotlin
val themeConfig = MiniAppThemeConfig(
    headerColor = "#1A73E8",
    headerTitle = "My MiniApp",
    textColor = "#FFFFFF",
    leftButton = LeftButtonType.BACK,
    toolbarMode = ToolbarMode.NORMAL,
    hideAndroidBottomNavigationBar = true,
    actionButtonThemeType = ActionButtonThemeType.DARK,
    statusBarForeground = StatusBarForeground.LIGHT
)
```

### Tham số MiniAppThemeConfig

| Tham số                          | Type                     | Mô tả                                                                                   |
| -------------------------------- | ------------------------ | --------------------------------------------------------------------------------------- |
| `headerColor`                    | `String?`                | Màu nền toolbar, hex string (ví dụ `"#FF0000"`) hoặc tên màu (`"white"`, `"black"`)   |
| `headerTitle`                    | `String?`                | Tiêu đề hiển thị trên toolbar                                                           |
| `textColor`                      | `String?`                | Màu chữ/icon trên toolbar, hex string hoặc `"WHITE"` / `"BLACK"`                       |
| `leftButton`                     | `LeftButtonType?`        | `BACK` (hiện nút back) hoặc `NONE` (ẩn nút back)                                      |
| `toolbarMode`                    | `ToolbarMode?`           | `NORMAL`, `HIDDEN`, hoặc `TRANSPARENT`                                                  |
| `hideAndroidBottomNavigationBar` | `Boolean?`               | Ẩn navigation bar phía dưới (mặc định `true`)                                          |
| `actionButtonThemeType`          | `ActionButtonThemeType?` | `LIGHT` hoặc `DARK` — màu nền capsule chứa nút more/close                              |
| `statusBarForeground`            | `StatusBarForeground?`   | `DARK` (icon đen) hoặc `LIGHT` (icon trắng); `null` = tự động theo `headerColor`      |

### ToolbarMode

| Giá trị       | Mô tả                                                          |
| ------------- | -------------------------------------------------------------- |
| `NORMAL`      | Status bar và header bar hiển thị bình thường                  |
| `HIDDEN`      | Ẩn header bar, mini app full screen                            |
| `TRANSPARENT` | Header bar trong suốt, nội dung mini app hiển thị phía dưới   |

## InitRequest

`InitRequest` chứa thông tin session và device gửi khi khởi động mini app:

```kotlin
val initRequest = InitRequest(
    requestId = "<unique-request-id>",
    data = InitRequest.Data(
        internal = InitRequest.Data.Internal(
            session = Session(
                auth = Auth(
                    accessToken = "<access-token>",
                    refreshToken = "<refresh-token>",
                    username = "<username>"
                ),
                accInfo = AccInfo(
                    accountId = "<account-id>",
                    phoneNumber = "<phone-number>",
                    displayName = "<display-name>"
                )
            ),
            deviceInfo = DeviceInfo(
                imei = "<imei-or-device-id>",
                platform = DeviceInfo.Platform(
                    os = "android",
                    osVersion = Build.VERSION.SDK_INT.toString()
                )
            )
        ),
        external = InitRequest.Data.External(
            generalInfo = GeneralInfo(
                msisdn = "<phone-number>",
                orderId = "<order-id>"  // tùy chọn
            )
        )
    ),
    eventStatus = EventStatus.fromCode(ErrorCode.SDK000)
)
```

Truyền `session = null` cho các flow không cần xác thực.

### Cấu trúc InitRequest JSON

```json
{
  "requestId": "string",
  "event": "INIT",
  "sender": "MINIAPP_SDK",
  "data": {
    "internal": {
      "session": {
        "auth": {
          "accessToken": "string",
          "refreshToken": "string",
          "username": "string",
          "userType": "string",
          "loginType": "string",
          "twofaChannelType": "string",
          "twofaChannelValue": "string"
        },
        "accInfo": {
          "accountId": "string",
          "username": "string",
          "phoneNumber": "string",
          "displayName": "string",
          "accountType": "string",
          "status": "string"
        }
      },
      "deviceInfo": {
        "platform": { "os": "string", "osVersion": "string" },
        "imei": "string"
      }
    },
    "external": {
      "generalInfo": {
        "msisdn": "string",
        "orderId": "string",
        "billCode": "string",
        "masterMerchantCode": "string",
        "merchantCode": "string",
        "totalAmount": "string",
        "serviceCode": "string",
        "bankCode": "string",
        "extraData": "string"
      },
      "serviceInfo": {
        "serviceId": "string",
        "serviceName": "string",
        "serviceType": "string",
        "serviceProviderCode": "string"
      }
    }
  },
  "eventStatus": {
    "errorCode": "string",
    "errorMessageVN": "string",
    "errorMessageEN": "string"
  }
}
```

## MiniAppLifecycle

`MiniAppLifecycle` là class hierarchy thể hiện trạng thái của mini app. Nhận qua `HostAppBridge.observeLifecycle()`:

```kotlin
override fun observeLifecycle(miniAppKey: String, miniAppLifecycle: MiniAppLifecycle) {
    when (miniAppLifecycle) {
        is MiniAppLifecycle.Initialization -> { /* mini app đang khởi tạo */ }
        is MiniAppLifecycle.RunningInForeground -> { /* mini app đang chạy ở foreground */ }
        is MiniAppLifecycle.RunningInBackground -> { /* mini app chuyển sang background */ }
        is MiniAppLifecycle.Error -> { Log.e("MiniApp", miniAppLifecycle.msg) }
        is MiniAppLifecycle.Unloading -> { /* mini app đang đóng */ }
    }
}
```

| State                 | Mô tả                                    |
| --------------------- | ---------------------------------------- |
| `Initialization`      | Mini app đang khởi tạo                   |
| `RunningInForeground` | Mini app đang chạy ở foreground          |
| `RunningInBackground` | Mini app chuyển sang background          |
| `Error(msg)`          | Mini app gặp lỗi; `msg` chứa mô tả lỗi  |
| `Unloading`           | Mini app đang đóng                       |
