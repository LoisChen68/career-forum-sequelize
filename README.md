# career forum 職涯論壇 Backend sequelize

## 開始使用
需要具備 MySQL
- clone 專案
```
git clone https://github.com/LoisChen68/career-forum-sequelize.git
```
- 專案初始化
```
npm install
```
- 至 `./config/config.json` 設定你的資料庫資訊
```json
 "development": {
    "username": "username",
    "password": "password",
    "database": "career_forum_sequelize",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```
- 至 MySQL 新增資料庫 `career_forum_sequelize`
- 依據 `.env.example` 新增 `.env`
- 新增資料表
```
npm run migrate 
```
- 啟動伺服器
```
npm run dev
```
終端機看到此則訊息 `App is running on http://localhost:3000` 代表成功啟動
