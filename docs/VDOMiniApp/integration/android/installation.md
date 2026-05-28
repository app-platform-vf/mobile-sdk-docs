# Android Installation

## Requirements

| Requirement | Value |
| ----------- | ----- |
| Minimum SDK | 24    |
| Target SDK  | 34    |
| Compile SDK | 35    |
| Gradle      | 8.0+  |

## Add Maven Repository

Thêm repository vào `settings.gradle.kts`:

```kotlin
dependencyResolutionManagement {
    repositories {
        maven {
            url = uri("https://mobile-data.viettelmoney.vn/artifactory/gradle-viettelmoney")
        }
    }
}
```

## Add Dependency

Thêm dependency vào `app/build.gradle.kts`:

```kotlin
implementation("vn.viettelpay:miniappsdk:2.2.0-rc3")
```

Đảm bảo `compileSdk` đặt đúng trong module `build.gradle.kts`:

```kotlin
android {
    compileSdk = 35
}
```

## Initialize the SDK

Khởi tạo trong `Application.onCreate()`:

```kotlin
// App.kt
val sdkConfig = SdkConfig(
    hostAppApplicationName = getString(R.string.app_name),
    isLoadFromAsset = false,
    apiKey = "<your-api-key>",
    variant = BuildVariant.Uat,
    partnerKey = "<your-partner-key>",
    secretId = "<your-secret-id>",
)

MiniAppSdk.getInstance().init(applicationContext, sdkConfig)
```

### SdkConfig fields

| Field                    | Type           | Required | Mô tả                                    |
| ------------------------ | -------------- | -------- | ----------------------------------------- |
| `hostAppApplicationName` | String         | ✅        | Tên hiển thị của host app                |
| `isLoadFromAsset`        | Boolean        | ✅        | Load mini app từ assets hay network      |
| `apiKey`                 | String         | ✅        | Xác thực với AppCenter; cấp per-merchant  |
| `variant`                | BuildVariant   | ✅        | `Staging`, `Uat`, hoặc `Product`         |
| `partnerKey`             | String         | ✅        | Partner key, cấp khi đăng ký             |
| `secretId`               | String         | ✅        | Secret ID, cấp khi đăng ký               |
