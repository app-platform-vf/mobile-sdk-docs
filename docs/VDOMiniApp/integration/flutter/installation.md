---
sidebar_position: 2
---

# Flutter Installation

## Requirements

| Requirement          | Value                | Ghi chú                                      |
| -------------------- | -------------------- | -------------------------------------------- |
| Flutter SDK          | `>=3.3.0 <3.47.0`    | Xem giới hạn trên bên dưới                   |
| Dart SDK             | `>=2.18.4`           | Mã plugin không dùng tính năng Dart 3 nào    |
| Minimum iOS          | **13.0**             | Từ `s.platform` của podspec                  |
| Xcode                | 16.0+                |                                              |
| Android `minSdk`     | 24                   |                                              |
| Android `compileSdk` | 34+                  |                                              |
| Android Gradle Plugin| **8.1+**             | `compileSdk 34` cần AGP 8.1; AGP 7.x tối đa 33 |
| Java / Kotlin jvmTarget | 1.8               |                                              |

### Giới hạn trên của Flutter

> ⚠️ **Không dùng Flutter >= 3.47.0.** Từ bản đó Flutter tự đặt
> `ios.deployment_target = 15.0`, xung đột với `platform :ios, '13.0'` mà plugin và các
> pod native yêu cầu. `pod install` sẽ báo *"they required a higher minimum deployment target"*.

## Bước 1: Cấp quyền cho `dart pub`

> ⚠️ Liên hệ **team phát triển SDK** để được cấp username và password JFrog.

### 1.1. Tạo token truy cập JFrog từ dart pub

Gọi API token của Artifactory, xác thực bằng chính username/password của bạn:

```bash
curl -u "<USERNAME>:<PASSWORD>" \
  -X POST "https://mobile-data.viettelmoney.vn/artifactory/api/security/token" \
  -d "username=<USERNAME>" \
  -d "scope=member-of-groups:*" \
  -d "expires_in=31536000"
```

Kết quả trả về dạng JSON:

```json
{
  "access_token": "eyJ2ZXIiOiIyIiwidHlwIjoiSldUIiwi...",
  "expires_in": 31536000,
  "scope": "member-of-groups:*",
  "token_type": "Bearer"
}
```

Lấy giá trị `access_token`.

> `expires_in=31536000` là một năm.
> Đặt `0` để không có thời hạn expired.

### 1.2. Nhập token cho `dart pub`

```bash
dart pub token add https://mobile-data.viettelmoney.vn/artifactory/vdo-pub-packages
```

Lệnh hỏi token qua stdin — dán `access_token` ở bước 1.1 vào.
:::

---
## Bước 2: Export tài khoản JFrog

```bash
export JFROG_USERNAME="<YOUR_USERNAME>"
export JFROG_PASSWORD="<YOUR_PASSWORD>"
```
> ⚠️ Liên hệ **team phát triển SDK** để được cấp tài khoản. Thêm hai dòng trên vào
> `~/.zshrc` hoặc `~/.bashrc` để không phải khai lại mỗi phiên terminal.

---

## Bước 3: Khai báo dependency

Thêm vào `pubspec.yaml` của app:

```yaml
dependencies:
  mini_app_plugin:
    hosted: https://mobile-data.viettelmoney.vn/artifactory/vdo-pub-packages
    version: <version>
```

Sau đó chạy:

```bash
flutter pub get
```

---
## Bước 4: Cấu hình iOS

### 4.1. Khai báo pod trong Podfile

Các SDK native là **private podspec** nằm trong thư mục plugin, không có trên CocoaPods CDN, nên host app phải trỏ đường dẫn tới từng podspec.

Mở `ios/Podfile`, thêm hai hàm trợ giúp ngay trước `target 'Runner'`:

```ruby
def mini_app_plugin_ios_dir
  File.expand_path('.symlinks/plugins/mini_app_plugin/ios', __dir__)
end

def mini_app_private_pod_path(name)
  path = File.join(mini_app_plugin_ios_dir, 'PrivatePods', name)

  unless File.directory?(path)
    raise <<~MSG
      [MiniAppPlugin] Không tìm thấy private pod:
        #{path}

      Đường dẫn này được tạo bởi `flutter pub get`.
      Chạy lệnh đó trước, rồi `pod install` lại.
    MSG
  end

  path
end
```

Sau đó khai báo pod trong `target 'Runner'`.

#### Bản tiêu chuẩn

```ruby
target 'Runner' do
  use_frameworks!
  use_modular_headers!

  flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))

  pod 'VDOUtils',   :podspec => mini_app_private_pod_path('VDOUtils')
  pod 'VDONetwork', :podspec => mini_app_private_pod_path('VDONetwork')
  pod 'VDOMiniApp', :podspec => mini_app_private_pod_path('VDOMiniApp')
end
```

#### Bản có eKYC

```ruby
target 'Runner' do
  use_frameworks!
  use_modular_headers!

  flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))

  # SDK Mini App
  pod 'VDOUtils',                :podspec => mini_app_private_pod_path('VDOUtils')
  pod 'VDONetwork',              :podspec => mini_app_private_pod_path('VDONetwork')
  pod 'VDOMiniApp',              :podspec => mini_app_private_pod_path('VDOMiniApp')

  # Luồng eKYC
  pod 'VDOEkycService',          :podspec => mini_app_private_pod_path('VDOEkycService')
  pod 'VDOMiniAppEkycConnector', :podspec => mini_app_private_pod_path('VDOMiniAppEkycConnector')
  pod 'NFC',                     :podspec => mini_app_private_pod_path('NFC')
  pod 'eKYC',                    :podspec => mini_app_private_pod_path('eKYC')
end
```

### 4.2. Deployment target

Đặt nền iOS ở **dòng đầu** `ios/Podfile`, khớp với `s.platform` của plugin:

```ruby
platform :ios, '13.0'
```

Ngoài ra `eKYC.xcframework` được biên dịch cho iOS 12.0, nên `CryptoSwift` phải giữ 12.0.
Thêm `post_install` vào cuối `ios/Podfile`:

```ruby
post_install do |installer|
  installer.pods_project.targets.each do |target|
    flutter_additional_ios_build_settings(target)
    target.build_configurations.each do |config|
      if target.name == 'CryptoSwift'
        config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0'
      else
        config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'
      end
    end
  end
end
```

### 4.3. Permissions: chỉ bản có eKYC

Thêm vào `ios/Runner/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>Ứng dụng cần quyền truy cập camera để chụp giấy tờ và xác thực khuôn mặt</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Ứng dụng cần quyền truy cập thư viện ảnh để chọn ảnh giấy tờ</string>

<key>NSPhotoLibraryAddUsageDescription</key>
<string>Ứng dụng cần quyền lưu ảnh vào thư viện</string>

<key>NSMicrophoneUsageDescription</key>
<string>Ứng dụng cần quyền truy cập microphone để quay video xác thực</string>

<key>NFCReaderUsageDescription</key>
<string>Ứng dụng cần quyền sử dụng NFC để đọc chip trên giấy tờ tuỳ thân</string>
```

### 4.4. Entitlement NFC: chỉ bản có eKYC

Trong Xcode: chọn target **Runner** → **Signing & Capabilities** → **+ Capability** → **Near Field Communication Tag Reading**.

Xcode tạo file `Runner.entitlements` với nội dung:

```xml
<key>com.apple.developer.nfc.readersession.formats</key>
<array>
    <string>NDEF</string>
    <string>TAG</string>
</array>
```

### 4.5. Cài đặt pod

```bash
cd ios
pod install
```

Mỗi pod được xác minh bằng `sha256` khi tải. Nếu báo lỗi checksum, xem [Troubleshooting](../../troubleshooting/dependency-issues.md).

---

## Bước 5: Cấu hình Android

### 5.1. Build config

Trong `android/app/build.gradle`:

```gradle
android {
    compileSdk 34

    defaultConfig {
        minSdk 24
        targetSdk 34
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

### 5.2. Repository

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url "https://jitpack.io" }
        maven { url "https://plugins.gradle.org/m2/" }
    }
}
```

### 5.3. Permissions

Trong `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
```

Bản có eKYC cần thêm:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.NFC" />

<uses-feature android:name="android.hardware.camera" android:required="true" />
<uses-feature android:name="android.hardware.nfc" android:required="false" />
```

> `android.hardware.nfc` để `required="false"` để app vẫn cài được trên máy không có NFC. Kiểm tra khả năng đọc chip tại runtime thay vì chặn cài đặt.

---

## Verify

```dart
import 'package:mini_app_plugin/mini_app_plugin.dart';
```

Build để xác nhận SDK đã tích hợp thành công:

```bash
flutter pub get
cd ios && pod install && cd ..
flutter build ios --no-codesign
flutter build apk --debug
```

