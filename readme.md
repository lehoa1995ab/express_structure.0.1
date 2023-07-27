## du an structure express js
## thu ven dev
1. npm i nodemon --save-dev
=>giup theo doi file va reload lai file khi co su thay doi 
## thu vien production
1. express:npm i express
=>tao ra server express
2.dotenv :npm i dotenv
=>doc file .env
3/ bộ thư viện babel npm i @babel/cli @babel/core @babel/preset-env @babel/node

=> kích hoạt chuyển đổi version ES cao thành ES phù hợp với môi trường.

=> Lưu ý:

+ phải có file .babelrc cùng cấp .env

+ phải cài đặt đủ @babel/cli @babel/core @babel/preset-env @babel/node

+ trong lệnh chạy dự án thêm: pro: thay node = babel-node
cd src => cd databases => cd prisma => npx prisma migrate dev