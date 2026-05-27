# Android Usage

## Mở Mini App

```kotlin
private fun openMiniApp() {
    val miniAppKey = "<mini-app-key>"  // đăng ký trên AppCenter

    val initInfo = createInitRequest()

    val hostView = HostView(
        requireActivity(), R.id.nav_host_fragment,
        MiniAppHeaderConfig(enabled = false)  // MiniAppHeaderConfig không bắt buộc
    )

    with(MiniAppSdk.getInstance()) {
        this.hostAppBridge = hostAppBridge  // gán HostAppBridge đã khởi tạo
        val params = mapOf("param1" to listOf("1"), "param2" to listOf("2"))
        // Mở dạng Fragment trong Activity hiện tại:
        openMiniApp(miniAppKey, initInfo, hostView, parameter = params)
        // Hoặc mở trong Activity mới:
        // openMiniAppActivity(miniAppKey, initInfo, hostView, parameter = params)
    }
}
```

## Mở Mini App từ Deeplink / QR Code

```kotlin
with(MiniAppSdk.getInstance()) {
    openMiniAppFromLinkQR(initInfo, hostView, qrLink, params)
}
```

`qrLink` nhận: Adjust link, Adjust QR link, hoặc QR data link.

## Lifecycle Events

| Event | Mô tả |
| ----- | ----- |
| `MiniAppLifecycle.Started` | Mini app đã mở thành công |
| `MiniAppLifecycle.Stopped` | Mini app đã đóng |
| `MiniAppLifecycle.Resumed` | Mini app resume từ background |
| `MiniAppLifecycle.Paused` | Mini app chuyển sang background |

Lắng nghe qua `HostAppListener.observeLifecycle(miniAppId, miniAppLifecycle)`.
