# Dependency Issues

## Các lỗi liên quan dependency

### VDOUtils không có internal dependency

VDOUtils là base SDK — nó không phụ thuộc vào SDK nội bộ nào khác. Tuy nhiên, các SDK khác phụ thuộc vào VDOUtils:

```
VDOMiniApp → VDONetwork → VDOUtils
```

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
        force 'com.example:utils-sdk:1.0.4'
    }
}
```

### Cập nhật VDOUtils ảnh hưởng SDK khác

**Triệu chứng:** Sau khi cập nhật VDOUtils, VDONetwork hoặc VDOMiniApp bị lỗi.

**Giải pháp:**
- VDOUtils là base SDK — khi cập nhật version, cần cập nhật đồng bộ tất cả SDK phụ thuộc
- Kiểm tra [Dependency Matrix](../dependency-matrix.md) để biết version tương thích
- Download đúng bộ SDK package từ [Release Notes](../releases/ios/index.md)
