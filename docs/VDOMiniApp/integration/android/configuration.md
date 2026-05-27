# Android Configuration

## HostAppBridge

`HostAppBridge` cho phép mini app gọi ra Host App. Khởi tạo qua `HostAppBridgeImpl`:

```kotlin
val hostAppBridge = HostAppBridgeImpl(hostApp = object : HostAppListener {

    // Trả về thông tin user theo danh sách field yêu cầu từ web
    override fun getUserData(miniAppKey: String, dataName: List<String>): Map<String, Any?> {
        val result = hashMapOf<String, Any>()
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
        return result
    }

    override fun expiredSession(miniAppId: Int, data: Map<String, Any>) {}

    override fun observeLifecycle(miniAppId: Int, miniAppLifecycle: MiniAppLifecycle) {}

    override fun paymentStart(miniAppId: Int, request: String) {}

    override fun paymentEnd(miniAppId: Int, request: String) {}

    override fun paymentRequest(miniAppId: Int, data: Map<String, Any>) {}

    // Trả về true để consume message; false để SDK xử lý
    override fun intercept(
        message: String,
        miniAppCallbackDelegate: MiniAppBridgeExecutor
    ): Boolean = false
})
```

### HostAppListener methods

| Method | Mô tả |
| ------ | ----- |
| `getUserData` | Trả về thông tin user theo field được yêu cầu từ web |
| `expiredSession` | Callback khi session hết hạn |
| `observeLifecycle` | Callback khi lifecycle của mini app thay đổi |
| `paymentStart` | Callback khi bắt đầu luồng thanh toán |
| `paymentEnd` | Callback khi kết thúc luồng thanh toán |
| `paymentRequest` | Callback khi mini app gửi payment request |
| `intercept` | Intercept JS bridge message; trả về `true` để consume |

## HostView

`HostView` xác định activity/context và container chứa mini app:

```kotlin
HostView(
    context = this,              // Context (Activity hoặc Application)
    containerId = R.id.container, // View container ID
    miniAppHeaderConfig = null   // MiniAppThemeConfig tùy chọn
)
```

> **Lưu ý (từ 2.2.0):** Constructor nhận `context: Context` thay vì `activity: FragmentActivity`. Property `activity` vẫn tồn tại nhưng là nullable (`context as? FragmentActivity`). `miniAppHeaderConfig` có kiểu `MiniAppThemeConfig` thay vì `MiniAppHeaderConfig`.

## MiniAppConfig

`MiniAppConfig` chứa cấu hình cho một phiên mở mini app:

| Field | Type | Default | Mô tả |
| ----- | ---- | ------- | ----- |
| `initRequest` | `InitRequest` | — | Thông tin session và device |
| `networkInfo` | `NetworkInfo?` | `null` | Thông tin mạng |
| `themeConfig` | `MiniAppThemeConfig?` | `null` | Cấu hình giao diện app bar (thay `headerConfig` từ 2.2.0) |
| `containerId` | `Int` (`@IdRes`) | `-1` | Container view ID |
| `needParams` | `Boolean?` | `true` | Có yêu cầu init params hay không |

## MiniAppHeaderConfig

Cấu hình app bar phía trên màn hình mini app (không bắt buộc):

```kotlin
MiniAppHeaderConfig(
    enabled = false,                             // ẩn/hiện app bar
    title = "Mini App",                          // tiêu đề
    bgColor = resources.getColor(R.color.black), // màu nền
    fgColor = resources.getColor(R.color.white)  // màu chữ/icon
)
```

> **Lưu ý (từ 2.2.0):** `HostView` và `MiniAppConfig` sử dụng `MiniAppThemeConfig` thay cho `MiniAppHeaderConfig`. Xem [migration guide](../../migration/android/2.0.20-to-2.2.0.md) để biết thêm chi tiết.

## JS Bridge Events (MiniAppEvent)

Các event được mini app gửi qua JS bridge. Từ 2.2.0, các event sau được bổ sung:

| Event | Mô tả |
| ----- | ----- |
| `OPEN_EXTERNAL_LINK` | Mini app yêu cầu mở URL bên ngoài |
| `OPEN_MINI_APP` | Mini app yêu cầu mở một mini app khác |
| `MINI_APP_TOKEN` | Mini app yêu cầu lấy login token |
| `UPDATE_MINI_APP_THEME` | Mini app yêu cầu cập nhật màu toolbar |
| `EVENT_TRACKING` | Mini app gửi tracking event |

## InitRequest

`InitRequest` chứa thông tin session và device gửi khi khởi động mini app:

```kotlin
fun createInitRequest(
    auth: SignInResponse,
    account: Account,
    needSession: Boolean = true
): InitRequest {
    return InitRequest(
        requestId = Toolbox.orderId,
        data = InitRequest.Data(
            internal = InitRequest.Data.Internal(
                session = if (needSession) Session(
                    auth = auth.toAuth(),
                    accInfo = account?.toAccount()
                ) else null,
                deviceInfo = DeviceInfo(
                    imei = "<imei>",
                    platform = DeviceInfo.Platform(
                        os = "android",
                        osVersion = Build.VERSION.SDK_INT.toString()
                    )
                )
            ),
            external = InitRequest.Data.External(
                generalInfo = GeneralInfo(
                    msisdn = "<phone number>",
                    orderId = "<order id>"  // không bắt buộc
                )
            )
        ),
        eventStatus = EventStatus.fromCode(ErrorCode.SDK000)
    )
}
```

`data.internal.session` chứa access token, thông tin tài khoản và trạng thái 2FA. Truyền `needSession = false` cho các flow không cần xác thực.
