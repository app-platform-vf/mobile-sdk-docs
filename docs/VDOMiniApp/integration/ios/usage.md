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
                msisdn: "xxxxxxxxxx",
                orderId: "xxxxxxxx",
                billCode: "xxxxxx",
                masterMerchantCode: "xxxxxx",
                bankCode: nil,
                serviceCode: nil,
                extraData: nil
            ),
            serviceInfo: [:]
        ),
        internalInfo: VDOInternalInfo(
            deviceInfo: VDODeviceInfo(
                imei: "xxxxxxxx",
                platform: VDOPlatform(os: "ios", osVersion: AppUtils.getOSVersion())
            ),
            session: needSession
                ? VDOSession(auth: loginResponse?.toAuth(), accInfo: userInfoResponse?.toAccInfo())
                : nil
        )
    ),
    eventStatus: VDOEventStatus.fromCode(VDOErrorCode.SDK000),
    requestId: "xxxxxxxxxxxxxx",
    event: "INIT",
    sender: MiniAppConst.sdkSender
)
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
