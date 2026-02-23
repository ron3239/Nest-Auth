# NestJS Authentication API

REST API для аутентификации и авторизации с использованием JWT токенов, PostgreSQL и Prisma ORM.

## Возможности

- Регистрация пользователей
- Вход по username/password
- JWT аутентификация (access token)
- Refresh token для обновления access token
- Защищённый endpoint для получения профиля пользователя
- Сессии с хранением refresh token в БД
- Brute-force защита (ограничение неудачных попыток входа)

## Технологии

- NestJS
- PostgreSQL (Neon)
- Prisma ORM
- JWT (@nestjs/jwt)
- Passport.js
- Bcrypt

## Установка

```bash
npm install
```

## Настройка

Создайте файл `.env` на основе `.env`:

```env
DATABASE_URL='postgresql://...'
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_TTL="2592000000"
BCRYPT_SALT_ROUNDS="10"
MAX_LOGIN_ATTEMPTS="5"
LOCKOUT_DURATION="15"
PORT="3000"
```

## Запуск

```bash
# Генерация Prisma клиента
npx prisma generate

# Development
npm run start:dev

# Production
npm run build
node dist/src/main.js
```

## API Endpoints

| Method | Endpoint         | Description                     | Auth |
| ------ | ---------------- | ------------------------------- | ---- |
| POST   | `/auth/register` | Регистрация нового пользователя | Нет  |
| POST   | `/auth/login`    | Вход, получение токенов         | Нет  |
| POST   | `/auth/logout`   | Выход (удаление сессии)         | Нет  |
| POST   | `/auth/refresh`  | Обновление access token         | Нет  |
| GET    | `/profile`       | Получить профиль пользователя   | Да   |

### Регистрация

```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Вход

```bash
POST /auth/login
Content-Type: application/json

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

### Обновление токенов

```bash
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "abc123..."
}
```

### Профиль

```bash
GET /profile
Authorization: Bearer <accessToken>
```

## Структура проекта

```
src/
├── auth/
│   ├── auth.controller.ts    # REST контроллер
│   ├── auth.service.ts       # Бизнес-логика
│   ├── auth.module.ts        # Модуль
│   ├── dto/                  # Data Transfer Objects
│   ├── guards/               # Guards
│   ├── strategies/           # Passport стратегии
│   ├── sessions/             # Управление сессиями
│   └── token/                # Работа с токенами
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── prisma/
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── profile/
│   └── profile.controller.ts
└── main.ts
```

## База данных

### Миграции

```bash
npx prisma migrate dev --name init
```

### Сгенерировать клиент

```bash
npx prisma generate
```

## Swagger документация

После запуска доступна по адресу: `http://localhost:3000/api`
