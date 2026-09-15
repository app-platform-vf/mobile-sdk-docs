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
>
> Muốn nâng lên Flutter 3.47+ thì phải nâng đồng thời `s.platform` trong podspec, Podfile
> của mọi host app, và thống nhất lại nền iOS tối thiểu cho toàn bộ sản phẩm.

Plugin ghim `3.38.10` trong `.fvmrc` — khớp với bản Flutter trên agent CI. Host app không bắt buộc dùng đúng bản đó, nhưng phải
nằm trong khoảng trên.

### Đã kiểm chứng trên các bản

| Flutter     | Dart    | Kết quả                          |
| ----------- | ------- | -------------------------------- |
| 3.19.6      | 3.3.4   | ✅ resolve + biên dịch sạch      |
| 3.38.4      | 3.10.3  | ✅ resolve + biên dịch sạch      |
| **3.38.10** | 3.10.x  | ✅ **bản plugin ghim**           |
| 3.44.9      | 3.12.2  | ✅ resolve + biên dịch sạch      |
| 3.47.2      | 3.13.2  | ⚠️ Dart sạch, nhưng phá nền iOS  |

## Tài khoản JFrog (bắt buộc)

Bạn cần **username + API token** của JFrog Artifactory.

> ⚠️ Liên hệ **team phát triển SDK** để được cấp tài khoản.

Khai báo bằng biến môi trường:

```bash
export JFROG_USERNAME="<YOUR_USERNAME>"
export JFROG_PASSWORD="<YOUR_API_TOKEN>"
```

---

## Bước 1: Khai báo dependency

Thêm vào `pubspec.yaml` của app.

### Bản tiêu chuẩn

```yaml
dependencies:
  mini_app_plugin:
    git:
      url: <URL_REPO_PLUGIN>
      ref: develop
```

### Bản có eKYC

```yaml
dependencies:
  mini_app_plugin:
    git:
      url: <URL_REPO_PLUGIN>
      ref: ekyc
```

Sau đó chạy:

```bash
flutter pub get
```

---

## Bước 2: Cấu hình iOS

### 2.1. Khai báo pod trong Podfile

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

### 2.2. Deployment target

Đặt nền iOS ở **dòng đầu** `ios/Podfile`, khớp với `s.platform` của plugin:

```ruby
platform :ios, '13.0'
```

> ⚠️ Đây là nơi Flutter >= 3.47.0 gây hỏng: bản đó ghi đè thành 15.0 và `pod install` báo
> *"they required a higher minimum deployment target"*. Nếu gặp lỗi này, kiểm tra phiên bản
> Flutter trước khi sửa con số trong Podfile.

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

### 2.3. Permissions: chỉ bản có eKYC

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

### 2.4. Entitlement NFC: chỉ bản có eKYC

Trong Xcode: chọn target **Runner** → **Signing & Capabilities** → **+ Capability** → **Near Field Communication Tag Reading**.

Xcode tạo file `Runner.entitlements` với nội dung:

```xml
<key>com.apple.developer.nfc.readersession.formats</key>
<array>
    <string>NDEF</string>
    <string>TAG</string>
</array>
```

### 2.5. Cài đặt pod

```bash
cd ios
pod install
```

Mỗi pod được xác minh bằng `sha256` khi tải. Nếu báo lỗi checksum, xem [Troubleshooting](../../troubleshooting/dependency-issues.md).

---

## Bước 3: Cấu hình Android

### 3.1. Build config

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

### 3.2. Repository

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

### 3.3. Permissions

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

