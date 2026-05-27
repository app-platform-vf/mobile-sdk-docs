# Android Installation

## Gradle Dependency

Thêm repository vào `settings.gradle`:

```gradle
dependencyResolutionManagement {
    repositories {
        maven {
            url "https://your-jfrog-registry/android"
        }
    }
}
```

Thêm dependency vào `build.gradle`:

```gradle
dependencies {
    implementation 'com.example:network-sdk:1.0.0'
}
```

## Manual Integration

1. Download AAR từ JFrog
2. Thêm vào thư mục `libs/`
3. Thêm dependency trong `build.gradle`:

```gradle
dependencies {
    implementation files('libs/network-sdk.aar')
}
```
