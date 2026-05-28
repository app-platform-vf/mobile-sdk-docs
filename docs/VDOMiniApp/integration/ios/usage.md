# iOS Usage

## Mở MiniApp

Tại ViewController muốn mở MiniApp:

```swift
import VDOMiniApp

VDOMiniAppSdk.shared.openMiniApp(
    from: self,
    miniAppKey: miniAppKey,
    initRequest: initRequest,
    navigationBarConfig: navigationBarConfig,
    parameter: additionalParams,
    needToShowLoading: false,
    launchConfig: miniAppLaunchConfig
) { result in
    // Handle VDOLaunchResult
}
```

### Tham số openMiniApp

| Tham số               | Kiểu                    | Mô tả                                         |
| --------------------- | ----------------------- | ---------------------------------------------- |
| `from`                | UIViewController        | ViewController hiện tại                        |
| `miniAppKey`          | String                  | Key định danh MiniApp                          |
| `initRequest`         | VDOInitRequest          | Thông tin khởi tạo (device, session...)        |
| `navigationBarConfig` | NavigationBarConfig?    | Cấu hình navigation bar                        |
| `parameter`           | [String: Any]?          | Tham số bổ sung                                |
| `needToShowLoading`   | Bool                    | Hiển thị loading khi mở MiniApp                |
| `launchConfig`        | MiniAppLaunchConfig?    | Cấu hình launch                                |
| `completion`          | (VDOLaunchResult) -> Void | Callback kết quả launch                      |

## Tạo InitRequest

`initRequest` chứa thông tin định danh device và session:

```swift
let initRequest = VDOInitRequest(
  data: VDODataSection(
      external: VDOExternalData(
          generalInfo: VDOGeneralInfo(
              msisdn: "xxxxxxxxxx", // sdt đăng nhập
              orderId: nil,
              billCode: nil,
              masterMerchantCode: nil,
              bankCode: nil,
              serviceCode: nil,
              extraData: nil
          ),
          serviceInfo: [:]
      ),
      internalInfo: VDOInternalInfo(
          deviceInfo: VDODeviceInfo(
              imei: "xxxxxxxx", // imei or device id of host app
              platform: VDOPlatform(os: "ios", osVersion: AppUtils.getOSVersion())
          ),
          session: nil
      )
  ),
  eventStatus: VDOEventStatus.fromCode(VDOErrorCode.SDK000),
  requestId: String(Int(Date().timeIntervalSince1970 * 1000)),
  event: "INIT",
  sender: "MINIAPP_SDK"
)
// Helper function to getOSVersion
class AppUtils {
    static func getOSVersion() -> String {
        let osVersion = ProcessInfo.processInfo.operatingSystemVersion
        return "iOS \(osVersion.majorVersion).\(osVersion.minorVersion).\(osVersion.patchVersion)"
    }
}
```

### Cấu trúc InitRequest JSON

```json
{
  "request_id": "string",
  "data": {
    "internal": {
      "session": {
        "auth": {
          "accessToken": "string",
          "refreshToken": "string",
          "username": "string"
        },
        "accInfo": {
          "accountId": "string",
          "phoneNumber": "string",
          "displayName": "string"
        }
      },
      "deviceInfo": {
        "platform": { "os": "string", "osVersion": "string" },
        "imei": "string",
        "deviceId": "string",
        "hostAppName": "string",
        "hostAppVersion": "string"
      }
    },
    "external": {
      "generalInfo": {
        "environment": "string",
        "sdkVersion": "string",
        "msisdn": "string",
        "orderId": "string",
        "billCode": "string",
        "masterMerchantCode": "string"
      },
      "serviceInfo": {
        "serviceId": "string",
        "serviceName": "string"
      }
    }
  },
  "eventStatus": "string"
}
```

## Xử lý lỗi

Nếu gặp lỗi khi build hoặc runtime, xem [Troubleshooting](../../troubleshooting/common-issues.md).
