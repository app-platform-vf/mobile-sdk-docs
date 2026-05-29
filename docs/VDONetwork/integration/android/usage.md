---
sidebar_position: 4
---

# Android Usage

## Sử dụng VDONetwork

VDONetwork cung cấp network layer cho các SDK khác. Thông thường không cần gọi trực tiếp — MiniApp SDK sẽ sử dụng VDONetwork nội bộ.

## Tính năng chính

| Tính năng           | Mô tả                                         |
| ------------------- | ---------------------------------------------- |
| HTTP Client         | Gửi/nhận HTTP requests (GET, POST, PUT, DELETE) |
| Request Interceptor | Middleware cho request/response pipeline        |
| Error Handling      | Xử lý lỗi network và retry logic              |
| Certificate Pinning | Bảo mật kết nối SSL/TLS                        |
