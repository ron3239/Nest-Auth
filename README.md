# NestJS Authentication API

[![NestJS](https://img.shields.io/badge/NestJS-11+-black?style=flat&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)

REST API для аутентификации и авторизации с использованием JWT токенов, PostgreSQL и Prisma ORM.

## Особенности

- Регистрация и вход пользователей
- JWT аутентификация (access token)
- Refresh token для обновления токенов
- Защищённый endpoint профиля
- Сессии с хранением в БД
- Brute-force защита
- Swagger документация

## Структура проекта

```
└── 📁src
    └── 📁auth
        ├── auth.controller.ts
        ├── auth.service.ts
        ├── auth.module.ts
        ├── 📁dto
        ├── 📁guards
        ├── 📁strategies
        ├── 📁sessions
        └── 📁token
    └── 📁users
    └── 📁prisma
    └── 📁profile
    └── main.ts
```

## Установка

1. Установить зависимости:

```bash
npm install
```

2. Настроить окружение:

```bash
# Создать .env на основе .env
DATABASE_URL='postgresql://...'
JWT_SECRET="your-secret-key"
```

3. Сгенерировать Prisma клиент:

```bash
npx prisma generate
```

4. Запустить миграции:

```bash
npx prisma migrate dev --name init
```

5. Запустить проект:

```bash
npm run start:dev
```

## Конфигурация

Обязательные переменные окружения (`.env`):

```ini
DATABASE_URL='postgresql://user:pass@host:5432/db'
JWT_SECRET="super-secret-key"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_TTL="2592000000"
BCRYPT_SALT_ROUNDS="10"
PORT="3000"
```

## API Endpoints

| Method | Endpoint         | Description          | Auth |
| ------ | ---------------- | -------------------- | ---- |
| POST   | `/auth/register` | Регистрация          | Нет  |
| POST   | `/auth/login`    | Вход                 | Нет  |
| POST   | `/auth/logout`   | Выход                | Нет  |
| POST   | `/auth/refresh`  | Обновить токены      | Нет  |
| GET    | `/profile`       | Профиль пользователя | Да   |

### Примеры запросов

#### Регистрация

```bash
POST /auth/register
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Вход

```bash
POST /auth/login
{
  "username": "username",
  "password": "password123"
}
```

Ответ:

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username"
  },
  "tokens": {
    "accessToken": "eyJhbG...",
    "refreshToken": "abc123...",
    "expiresIn": "15m"
  }
}
```

#### Обновление токенов

```bash
POST /auth/refresh
{
  "refreshToken": "abc123..."
}
```

#### Профиль

```bash
GET /profile
Authorization: Bearer <accessToken>
```

## Основные технологии

- Backend:
  ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs)
  ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript)
  ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql)
- ORM:
  ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma)
- Аутентификация:
  ![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens)
  ![Passport](https://img.shields.io/badge/-Passport-34E27A?logo=passport)

## Swagger

Документация доступна по адресу: `http://localhost:3000/api`

## Лицензия

MIT License.
