---
sidebar_position: 4
---

# Flutter Usage

## Mở MiniApp

```dart
import 'package:mini_app_plugin/mini_app_plugin.dart';
import 'package:mini_app_plugin/mini_app_callback.dart';

await MiniAppPlugin().openMiniApp(
  miniAppKey: '<MINI_APP_KEY>',
  initRequest: initRequest,
  params: {'debug': ['true']},
  themeConfig: MiniAppThemeConfig(
    toolbarMode: MiniAppToolbarMode.normal,
    headerTitle: 'Mini App',
  ),
  hostAppBridge: hostAppBridge,
  callback: callback,
);
```

### Tham số openMiniApp

| Tham số         | Kiểu                          | Bắt buộc | Mô tả                                    |
| --------------- | ----------------------------- | -------- | ---------------------------------------- |
| `miniAppKey`    | `String`                      | Có       | Key định danh MiniApp                    |
| `initRequest`   | `Map<String, dynamic>`        | Có       | Thông tin phiên và thiết bị              |
| `hostAppBridge` | `HostAppBridge`               | Có       | Cầu nối để MiniApp hỏi dữ liệu từ host   |
| `callback`      | `MiniAppCallback`             | Có       | Nhận sự kiện vòng đời                    |
| `params`        | `Map<String, List<String>>?`  |          | Tham số phụ chuyển tiếp cho MiniApp. Entry có value không phải `List<String>` bị bỏ qua |
| `themeConfig`   | `MiniAppThemeConfig?`         |          | Cấu hình giao diện header                |

> Dùng `callback.onInit` để biết MiniApp đã mở.
> Future chỉ hoàn tất ở nhánh lỗi, dưới dạng `PlatformException`.

---

## Tạo initRequest

`initRequest` chứa thông tin định danh thiết bị và phiên đăng nhập:

```dart
import 'dart:io';

final initRequest = {
  "data": {
    "external": {
      "generalInfo": {
        "msisdn": phoneNumber,        // số điện thoại đăng nhập
        "orderId": null,
        "billCode": null,
        "masterMerchantCode": null,
        "bankCode": null,
        "serviceCode": null,
        "extraData": null,
      },
      "serviceInfo": {}
    },
    "internal": {
      "deviceInfo": {
        "imei": deviceId,
        "platform": {
          "os": Platform.isAndroid ? "Android" : "Ios",
          "osVersion": osVersion,
        }
      },
      "session": {
        "auth": {
          "accessToken": accessToken,
        }
      }
    }
  },
  "eventStatus": {"errorCode": "SDK000"},
  "request_id": requestId,
  "event": "INIT",
  "sender": "MINIAPP_SDK"
};
```

### Các trường chính

| Trường                          | Mô tả                                                      |
| ------------------------------- | ---------------------------------------------------------- |
| `data.external.generalInfo`     | Thông tin nghiệp vụ do host app truyền vào                 |
| `data.external.serviceInfo`     | Thông tin dịch vụ bổ sung, để `{}` nếu không dùng          |
| `data.internal.deviceInfo`      | Định danh thiết bị và nền tảng                             |
| `data.internal.session`         | Token phiên. Để `null` nếu MiniApp không yêu cầu đăng nhập |
| `eventStatus.errorCode`         | `"SDK000"` cho luồng khởi tạo bình thường                  |
| `event`                         | `"INIT"`                                                   |
| `sender`                        | `"MINIAPP_SDK"`                                            |

---

## Mở MiniApp từ deep link

```dart
await MiniAppPlugin().openMiniAppFromDeepLink(
  link: '<DEEP_LINK>',
  initRequest: initRequest,
  hostAppBridge: hostAppBridge,
  callback: callback,
  params: null,
);
```

### Tham số openMiniAppFromDeepLink

| Tham số         | Kiểu                          | Bắt buộc | Mô tả                                  |
| --------------- | ----------------------------- | -------- | -------------------------------------- |
| `link`          | `String`                      | Có       | Deep link trỏ tới MiniApp              |
| `initRequest`   | `Map<String, dynamic>`        | Có       | Thông tin phiên và thiết bị            |
| `hostAppBridge` | `HostAppBridge`               | Có       | Cầu nối để MiniApp hỏi dữ liệu từ host |
| `callback`      | `MiniAppCallback`             | Có       | Nhận sự kiện vòng đời                  |
| `params`        | `Map<String, List<String>>?`  |          | Tham số phụ chuyển tiếp cho MiniApp |


---

## Xử lý sự kiện vòng đời

`MiniAppCallback` nhận sự kiện vòng đời của MiniApp. Cả 5 handler đều bắt buộc.

```dart
final callback = MiniAppCallback(
  onInit: (miniAppKey) {
    debugPrint('Đã khởi tạo: $miniAppKey');
  },
  onEnterForeground: (miniAppKey) {
    debugPrint('Trở lại foreground: $miniAppKey');
  },
  onResignActive: (miniAppKey) {
    debugPrint('Mất trạng thái active: $miniAppKey');
  },
  onError: (miniAppKey, error) {
    debugPrint('Lỗi: $miniAppKey — $error');
  },
  onUnloading: (miniAppKey) {
    debugPrint('Sắp đóng: $miniAppKey');
  },
);
```

### Các handler của MiniAppCallback

| Handler             | Chữ ký                          | Khi nào được gọi                     |
| ------------------- | ------------------------------- | ------------------------------------ |
| `onInit`            | `Function(String)`              | MiniApp khởi tạo xong                |
| `onEnterForeground` | `Function(String)`              | MiniApp trở lại foreground           |
| `onResignActive`    | `Function(String)`              | MiniApp mất trạng thái active        |
| `onError`           | `Function(String, String?)`     | Có lỗi xảy ra                        |
| `onUnloading`       | `Function(String)`              | MiniApp sắp bị gỡ khỏi bộ nhớ        |

---

## Ví dụ hoàn chỉnh

```dart
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:mini_app_plugin/mini_app_plugin.dart';
import 'package:mini_app_plugin/mini_app_callback.dart';

class MiniAppLauncher {
  Future<void> launch({
    required String miniAppKey,
    required String phoneNumber,
    required String accessToken,
    required String deviceId,
  }) async {
    // 1. Khởi tạo SDK — chỉ gọi một lần trong vòng đời app
    await MiniAppPlugin().init(
      env: MiniAppEnv.staging,
      apiKey: '<API_KEY>',
      partnerKey: '<PARTNER_KEY>',
      secretId: '<SECRET_ID>',
    );

    // 2. Dựng initRequest
    final initRequest = {
      "data": {
        "external": {
          "generalInfo": {"msisdn": phoneNumber},
          "serviceInfo": {}
        },
        "internal": {
          "deviceInfo": {
            "imei": deviceId,
            "platform": {
              "os": Platform.isAndroid ? "Android" : "Ios",
              "osVersion": "13",
            }
          },
          "session": {
            "auth": {"accessToken": accessToken}
          }
        }
      },
      "eventStatus": {"errorCode": "SDK000"},
      "request_id": DateTime.now().millisecondsSinceEpoch.toString(),
      "event": "INIT",
      "sender": "MINIAPP_SDK"
    };

    // 3. Mở MiniApp
    await MiniAppPlugin().openMiniApp(
      miniAppKey: miniAppKey,
      initRequest: initRequest,
      themeConfig: MiniAppThemeConfig(
        headerTitle: 'Mini App',
        toolbarMode: MiniAppToolbarMode.normal,
        leftButton: MiniAppLeftButton.back,
      ),
      hostAppBridge: HostAppBridge(
        getUserData: (dataName) async => {},
        getLocation: () async => MALocation(0, 0),
        expiredSession: (data) {},
        onBackToHome: () {},
        intercept: (request) {},
      ),
      callback: MiniAppCallback(
        onInit: (key) => debugPrint('init: $key'),
        onEnterForeground: (key) => debugPrint('foreground: $key'),
        onResignActive: (key) => debugPrint('resign: $key'),
        onError: (key, error) => debugPrint('error: $key — $error'),
        onUnloading: (key) => debugPrint('unload: $key'),
      ),
    );
  }
}
```

