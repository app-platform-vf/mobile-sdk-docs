# Dependency Issues

## Các lỗi liên quan dependency

### SPM Package Resolution (iOS)

**Triệu chứng:** Xcode báo lỗi package resolution khi add VDOFrameworks package.

**Giải pháp:**
- Xoá `Package.resolved` và resolve lại
- Kiểm tra version range không conflict với các package khác
- Kiểm tra [Dependency Matrix](../dependency-matrix.md) để đảm bảo version tương thích

### Gradle Dependency Conflict (Android)

**Triệu chứng:** Build failed do conflict version giữa các dependency.

**Giải pháp:**
- Sử dụng `./gradlew dependencies` để kiểm tra dependency tree
- Force version nếu cần:

```gradle
configurations.all {
    resolutionStrategy {
        force 'com.example:network-sdk:1.0.6'
    }
}
```

### Version Mismatch

**Triệu chứng:** Runtime error do version VDONetwork không tương thích với VDOMiniApp.

**Giải pháp:**
- Kiểm tra [Dependency Matrix](../dependency-matrix.md)
- Đảm bảo tất cả SDK đều dùng version tương thích
- Download package mới nhất từ [Release Notes](../releases/ios/index.md)
