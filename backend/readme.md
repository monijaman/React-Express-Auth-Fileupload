## Create Project

```js
npm init -y
npm install express sqlite3 sequelize dotenv bcrypt jsonwebtoken multer helmet cors
npm install --save-dev typescript @types/node @types/express ts-node-dev @types/jsonwebtoken @types/bcrypt @types/cors
```

## Typescript Configuration

## Structure

```js
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── fileController.ts
│   │
│   ├── models/
│   │   ├── index.ts
│   │   ├── userModel.ts
│   │   ├── fileModel.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── fileRoutes.ts
│   │
│   ├── config/
│   │   ├── db.ts
│   │
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │
│   ├── uploads/
│   │
│   ├── app.ts
├── .env
├── tsconfig.json
├── package.json
```

## Run the application

npm run dev

## new token add

npx sequelize-cli migration:generate --name add-token-to-users

# Migrate

npx sequelize-cli db:migrate

# Bcrypt for password verifications

npm install bcryptjs
npm install --save-dev @types/bcryptjs

for multer
npm install --save-dev @types/express @types/multer


## Typescript Debugging

npx tsc --traceResolution
