# Các vấn đề thường gặp

## Build frontend trên Jenkins bị trắng màn hình 

-   Lý do: bị thiếu file trong thư mục frontend/build/
-   Cách khác phục:
    -   Build lại frontend: `npm run-script build`
    -   File .gitignore: `bỏ đi dòng **/build/**`
    -   Git add và commit
    -   Push và build lại Jenkins

## Trang NavManagement
-   Các trang mới được thêm vào bên Frontend do chưa được tạo trên Database nên cần phải tạo mới với `name` là tên trang và `role` do người config chọn



