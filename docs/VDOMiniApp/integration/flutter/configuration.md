---
sidebar_position: 3
---

# Flutter Configuration

## Khởi tạo MiniAppPlugin

Gọi `init` một lần khi app khởi động, trước mọi lời gọi khác:

```dart
import 'package:mini_app_plugin/mini_app_plugin.dart';

await MiniAppPlugin().init(
  env: MiniAppEnv.staging,
  apiKey: '<API_KEY>',
  partnerKey: '<PARTNER_KEY>',
  secretId: '<SECRET_ID>',
);
```

### Tham số init

| Tham số      | Kiểu          | Mô tả                                                     |
| ------------ | ------------- | --------------------------------------------------------- |
| `env`        | `MiniAppEnv`  | Môi trường SDK. Mặc định `MiniAppEnv.staging`             |
| `apiKey`     | `String`      | Được cung cấp khi đăng ký MiniApp trên App Center         |
| `partnerKey` | `String`      | Được cung cấp khi đăng ký MiniApp trên App Center         |
| `secretId`   | `String`      | Được cung cấp khi đăng ký MiniApp trên App Center         |

### MiniAppEnv

| Giá trị   | Môi trường |
| --------- | ---------- |
| `staging` | Staging    |
| `uat`     | UAT        |
| `product` | Production |


### Gọi lại init

`init` là idempotent: lần gọi thứ hai trở đi trả về ngay, không gọi xuống native. Nhiều
lời gọi đồng thời cùng chờ chung một Future. Không cần tự quản lý cờ "đã khởi tạo".

Khi thất bại, `init` ném `Exception('MiniApp init failed: ...')` và **đặt lại trạng thái**,
nên có thể gọi lại để thử lần nữa.

```dart
try {
  await MiniAppPlugin().init(
    env: MiniAppEnv.staging,
    apiKey: '<API_KEY>',
    partnerKey: '<PARTNER_KEY>',
    secretId: '<SECRET_ID>',
  );
} catch (e) {
  debugPrint('Khởi tạo SDK thất bại: $e');
}
```

---

## HostAppBridge

`HostAppBridge` là cầu nối để Mini App yêu cầu dữ liệu từ host app. Cả 5 handler đều bắt buộc.

```dart
final hostAppBridge = HostAppBridge(
  getUserData: (List<String> dataName) async {
    return {
      'userName': 'Nguyen Van A',
      'phoneNumber': '09xxxxxxxx',
    };
  },

  getLocation: () async => MALocation(21.028511, 105.804817),

  expiredSession: (data) {
    // Điều hướng người dùng về màn hình đăng nhập
  },

  onBackToHome: () {
    // Người dùng nhấn back từ màn hình gốc của Mini App
  },

  intercept: (String request) {
    // Quan sát request mà Mini App phát ra
  },
);
```

### Các handler của HostAppBridge

| Handler          | Chữ ký                                | Mô tả                                          |
| ---------------- | ------------------------------------- | ---------------------------------------------- |
| `getUserData`    | `Future<Map> Function(List<String>)`  | Trả về các trường thông tin mà Mini App yêu cầu |
| `getLocation`    | `Future<MALocation> Function()`       | Toạ độ WGS-84 hiện tại của thiết bị            |
| `expiredSession` | `Function(dynamic)`                   | Được gọi khi phiên hết hạn                     |
| `onBackToHome`   | `Function`                            | Được gọi khi user nhấn back về home            |
| `intercept`      | `Function(String)`                    | Xử lý request intercept từ Mini App            |



### MALocation

```dart
MALocation(21.028511, 105.804817)   // (latitude, longitude)
```

| Thuộc tính  | Kiểu     | Mô tả     |
| ----------- | -------- | --------- |
| `latitude`  | `double` | Vĩ độ     |
| `longitude` | `double` | Kinh độ   |

---

## Cấu hình Theme (MiniAppThemeConfig)

`MiniAppThemeConfig` cấu hình header/toolbar của Mini App. Mọi tham số đều optional trừ
`toolbarMode` (có giá trị mặc định `normal`).

```dart
final theme = MiniAppThemeConfig(
  headerColor: 'WHITE',
  headerTitle: 'My MiniApp',
  textColor: 'BLACK',
  leftButton: MiniAppLeftButton.back,
  toolbarMode: MiniAppToolbarMode.normal,
  hideAndroidBottomNavigationBar: false,
  hideIOSSafeAreaBottom: false,
  actionButtonThemeType: MiniAppActionButtonThemeType.dark,
  statusBarForeground: MiniAppStatusBarForeground.dark,
);
```

### Tham số MiniAppThemeConfig

| Tham số                          | Kiểu                            | Nền tảng đọc | Mô tả                                            |
| -------------------------------- | ------------------------------- | ------------ | ------------------------------------------------ |
| `headerColor`                    | `String?`                       | iOS, Android | Màu nền header                                   |
| `headerTitle`                    | `String?`                       | iOS, Android | Tiêu đề hiển thị trên header                     |
| `textColor`                      | `String?`                       | iOS, Android | Màu chữ header                                   |
| `leftButton`                     | `MiniAppLeftButton?`            | iOS, Android | `back` hiện nút quay lại, `none` ẩn đi           |
| `toolbarMode`                    | `MiniAppToolbarMode`            | iOS, Android | Chế độ hiển thị header. Mặc định `normal`        |
| `hideAndroidBottomNavigationBar` | `bool?`                         | **Android**  | Ẩn thanh điều hướng dưới                         |
| `hideIOSSafeAreaBottom`          | `bool?`                         | **iOS**      | Ẩn safe area inset phía dưới                     |
| `actionButtonThemeType`          | `MiniAppActionButtonThemeType?` | iOS, Android | Màu nền capsule chứa nút more/close              |
| `statusBarForeground`            | `MiniAppStatusBarForeground?`   | iOS, Android | Màu icon status bar                              |

Hai tham số đánh đậm chỉ được một nền tảng đọc; nền tảng còn lại bỏ qua hoàn toàn, không báo lỗi.

### Mặc định khác nhau giữa hai nền tảng

Khi không truyền một tham số, hai nền tảng xử lý khác nhau. iOS để `nil` và nhường SDK
native quyết định; Android tự điền giá trị cụ thể:

| Tham số                 | Bỏ trống trên iOS | Bỏ trống trên Android |
| ----------------------- | ----------------- | --------------------- |
| `headerColor`           | `nil`             | `"WHITE"`             |
| `textColor`             | `nil`             | `"BLACK"`             |
| `leftButton`            | `nil`             | `BACK`                |
| `actionButtonThemeType` | `nil`             | `DARK`                |
| `statusBarForeground`   | `nil`             | `DARK`                |

> Muốn giao diện giống nhau trên cả hai nền tảng thì **truyền đủ 5 tham số trên**, đừng
> dựa vào mặc định.

### Về headerColor và textColor

Cả hai nền tảng đều nhận chuỗi thô và chuyển thẳng xuống SDK native — không phải enum.

Giá trị an toàn trên cả hai là `"WHITE"` và `"BLACK"`, viết hoa, vì đó chính là dạng mà
Android dùng làm mặc định. SDK iOS thuần còn chấp nhận mã hex (ví dụ `"#1A73E8"`), nhưng
hành vi của SDK Android với mã hex chưa được kiểm chứng.

### Không có statusBarMode

SDK iOS thuần có `statusBarMode` để điều khiển status bar tách rời khỏi header. Bản Flutter
**không expose tham số này** — plugin không gửi nó xuống cả iOS lẫn Android. Status bar đi
theo `toolbarMode`.

### Giá trị enum

Các enum được chuyển xuống native dưới dạng **chuỗi viết hoa** (`MiniAppLeftButton.back`
thành `"BACK"`). Việc này đã khớp sẵn với cả hai nền tảng, không cần xử lý gì thêm.

#### MiniAppToolbarMode

| Giá trị       | Mô tả                                           |
| ------------- | ----------------------------------------------- |
| `normal`      | Header hiển thị bình thường với màu theme       |
| `hidden`      | Ẩn header, Mini App extend lên đỉnh màn hình    |
| `transparent` | Header overlay trong suốt phía trên web content |

#### MiniAppLeftButton

| Giá trị | Mô tả             |
| ------- | ----------------- |
| `back`  | Hiện nút quay lại |
| `none`  | Ẩn nút quay lại   |

#### MiniAppActionButtonThemeType

| Giá trị | Mô tả            |
| ------- | ---------------- |
| `light` | Capsule nền sáng |
| `dark`  | Capsule nền tối  |

#### MiniAppStatusBarForeground

| Giá trị | Mô tả                     |
| ------- | ------------------------- |
| `light` | Icon status bar màu trắng |
| `dark`  | Icon status bar màu đen   |
