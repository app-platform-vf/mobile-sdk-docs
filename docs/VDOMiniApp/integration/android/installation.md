# Android Installation

## Requirements

- Gradle 8.0+
- minSdk 24
- compileSdk 35 / targetSdk 34

## Add Dependency

Thêm dependency vào `app/build.gradle.kts`:

```kotlin
implementation("vn.viettelpay:miniappsdk:2.2.0-rc3")
```

## Initialize the SDK

Khởi tạo trong `Application.onCreate()`:

```kotlin
// App.kt
val sdkConfig = SdkConfig(
    hostAppApplicationName = getString(R.string.app_name),
    isLoadFromAsset = false,
    apiKey = "<your-api-key>",       // cung cấp khi đăng ký trên AppCenter
    variant = BuildVariant.Uat,      // môi trường để lấy thông tin mini app
    partnerKey = "<your-partner-key>",  // cung cấp khi đăng ký
    secretId = "<your-secret-id>",       // cung cấp khi đăng ký
)

val miniAppSdk = MiniAppSdk.getInstance()
miniAppSdk.init(this.applicationContext, sdkConfig)
```

### SdkConfig fields

| Field                   | Type           | Required | Description |
| ----------------------- | -------------- | -------- | ----------- |
| `hostAppApplicationName`| String         | ✅        | Tên hiển thị của host app |
| `isLoadFromAsset`       | Boolean        | ✅        | Load mini app từ assets hay network |
| `apiKey`                | String         | ✅        | Xác thực với AppCenter; cấp per-merchant |
| `variant`               | BuildVariant   | ✅        | `Uat` hoặc `Production` |
| `partnerKey`            | String         | ✅        | Partner key, cấp khi đăng ký |
| `secretId`              | String         | ✅        | Secret ID, cấp khi đăng ký |
