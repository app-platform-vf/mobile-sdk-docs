---
sidebar_position: 4
---

# Android Usage

## Mở Mini App (Fragment)

Mở mini app dạng Fragment trong Activity hiện tại:

```kotlin
MiniAppSdk.getInstance().apply {
    hostAppBridge = MyHostAppBridge()
    openMiniApp(
        miniAppKey = "<mini-app-key>",
        initInfo = createInitRequest(),
        hostView = HostView(
            context = this@MyActivity,
            containerId = R.id.container
        ),
        parameter = mapOf("param1" to listOf("value1"))
    )
}
```

## Mở Mini App trong Activity mới

```kotlin
MiniAppSdk.getInstance().openMiniAppActivity(
    miniAppKey = "<mini-app-key>",
    initInfo = createInitRequest(),
    hostView = HostView(context = this),
    parameter = mapOf()
)
```

## Mở Mini App từ Deeplink / QR Code

```kotlin
// Mở trong Fragment:
MiniAppSdk.getInstance().openMiniAppFromDeepLink(
    initInfo = createInitRequest(),
    hostView = HostView(
        context = this,
        containerId = R.id.container
    ),
    qrContent = deepLinkUrl
)

// Mở trong Activity mới:
MiniAppSdk.getInstance().openMiniAppActivityFromDeepLink(
    initInfo = createInitRequest(),
    hostView = HostView(context = this),
    qrContent = deepLinkUrl
)
```

`qrContent` nhận: Adjust link, Adjust QR link, hoặc QR data link.

## Tạo InitRequest

`initRequest` chứa thông tin định danh device và session:

```kotlin
fun createInitRequest(): InitRequest {
    return InitRequest(
        requestId = System.currentTimeMillis().toString(),
        data = InitRequest.Data(
            external = InitRequest.Data.External(
                generalInfo = GeneralInfo(
                    msisdn = "xxxxxxxxxx", // sdt đăng nhập
                    orderId = null,
                    billCode = null,
                    masterMerchantCode = null,
                    bankCode = null,
                    serviceCode = null,
                    extraData = null
                ),
                serviceInfo = ServiceInfo()
            ),
            internal = InitRequest.Data.Internal(
                deviceInfo = DeviceInfo(
                    imei = "xxxxxxxx", // imei hoặc device id của host app
                    platform = DeviceInfo.Platform(
                        os = "android",
                        osVersion = Build.VERSION.RELEASE
                    )
                ),
                session = null
            )
        ),
        eventStatus = EventStatus.fromCode(ErrorCode.SDK000)
    )
}
```

Truyền `session = null` cho các flow không cần xác thực. Xem [cấu trúc đầy đủ của InitRequest](configuration.md#initrequest) để biết tất cả các trường và JSON schema.

## Lifecycle Events

Lắng nghe qua `HostAppBridge.observeLifecycle(miniAppKey, miniAppLifecycle)`. Xem [Configuration](configuration.md#miniapplifecycle) để biết cách implement.

| State                                  | Mô tả                                    |
| -------------------------------------- | ---------------------------------------- |
| `MiniAppLifecycle.Initialization`      | Mini app đang khởi tạo                   |
| `MiniAppLifecycle.RunningInForeground` | Mini app đang chạy ở foreground          |
| `MiniAppLifecycle.RunningInBackground` | Mini app chuyển sang background          |
| `MiniAppLifecycle.Error(msg)`          | Mini app gặp lỗi                         |
| `MiniAppLifecycle.Unloading`           | Mini app đang đóng                       |
