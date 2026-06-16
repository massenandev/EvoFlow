# 📱 EvoFlow — Open-Source Habit Tracker for iOS & Android

<!-- GitHub Visitor Counter -->
![Visitor Count](https://komarev.com/ghpvc/?username=evoflow-habits&label=Visitors&color=brightgreen&style=flat-square)

[![NestJS](https://img.shields.io/badge/NestJS-10.x-red?logo=nestjs)](https://nestjs.com/)
[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-50.x-black?logo=expo)](https://expo.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-green?logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/massenan/evoflow/pulls)

> 🎯 **Build lasting habits with EvoFlow — A beautiful, open-source habit tracker for iOS and Android. Track streaks, visualize progress, and achieve your goals.**

A comprehensive, **free and open-source** full-stack habit tracking application combining a **NestJS REST API** with a **React Native Expo mobile app**. Create personalized habits, track daily completions, celebrate streaks, review detailed history, and export printable progress reports. Includes email/password authentication, social login (Google/Apple), guest mode, dark theme support, and local push notifications.

### 🎯 Why Use EvoFlow?

| Feature | Details |
|---------|---------|
| 💰 **100% Free** | Open source — no subscriptions, no ads, no tracking |
| 🏗️ **Full-Stack** | Complete starter template for habit tracking apps |
| 📱 **Cross-Platform** | iOS and Android from one codebase with Expo |
| 🔐 **Authentication** | Email/password, Google, Apple social login + guest mode |
| 📊 **Powerful Analytics** | Streaks, completion history, weekly goals, progress reports |
| 🎨 **Beautiful UI** | Dark theme support, customizable habit colors, emojis |
| 📤 **PDF Export** | Generate printable habit trackers for offline use |
| 🔔 **Smart Reminders** | Local push notifications at custom times |
| 🏛️ **Clean Architecture** | DDD, domain-driven design, fully tested |
| ⚡ **Production-Ready** | Docker Compose, Prisma ORM, comprehensive error handling |

### ⚡ Quick Example

```bash
# Clone and setup
git clone https://github.com/massenan/evoflow.git
cd evoflow
pnpm install
docker compose up --build -d

# Start mobile app
pnpm dev:mobile

# API automatically available at http://localhost:3001
# Swagger docs at http://localhost:3001/docs
```

> 📖 **Full documentation:** See [Getting Started](#-getting-started) and [API Endpoints](#-api-endpoints) below

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Docker & Local Services](#-docker--local-services)
- [NPM Scripts & Commands](#-npm-scripts--commands)
- [Core User Flows](#-core-user-flows)
- [API Endpoints](#-api-endpoints)
- [Response Codes](#-response-codes)
- [Contributing](#-contributing)
- [License](#-license)
- [Support & Documentation](#-support--documentation)

---

## 🌟 Key Features

- 🏆 **Streak Tracking** — Automatic streak calculations with visual progress
- 📅 **Daily Completions** — Mark habits done/undone, configure multiple completions per day
- 📊 **Rich History** — View completion history and analyze your habits over time
- 🎨 **Customization** — Assign emojis, custom colors, and names to each habit
- 👥 **Authentication** — Email/password signup + Google/Apple social login
- 👤 **Guest Mode** — Start tracking immediately, upgrade to full account later
- 🔔 **Smart Reminders** — Schedule local push notifications at custom times
- 📤 **PDF Export** — Generate printable habit trackers for offline tracking
- 🌙 **Dark Theme** — Full dark mode support for comfortable viewing
- 📈 **Goal Tracking** — Set weekly completion goals and track progress
- 🔄 **Habit Management** — Create, edit, archive, and delete habits seamlessly
- 🗑️ **Account Control** — Reset password, delete account, manage all settings

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Monorepo** | [pnpm workspaces](https://pnpm.io/workspaces) | Package management & workspace management |
| **API** | [NestJS](https://nestjs.com/) | Production-ready Node.js framework |
| **Architecture** | [DDD](https://en.wikipedia.org/wiki/Domain-driven_design) | Domain-driven design, clean architecture |
| **ORM** | [Prisma](https://www.prisma.io/) | Type-safe database access |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Reliable relational database |
| **Mobile** | [React Native](https://reactnative.dev/) | Cross-platform mobile development |
| **Mobile Framework** | [Expo](https://expo.dev/) | Simplified React Native development |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type safety across all layers |
| **Testing** | [Vitest](https://vitest.dev/) | Fast unit testing framework |
| **API Docs** | [Swagger/OpenAPI 3.0](https://swagger.io/) | Interactive API documentation |
| **Containerization** | [Docker Compose](https://www.docker.com/) | Local development environment |
| **Authentication** | [JWT](https://jwt.io/) | Secure token-based auth |

---

## 📁 Project Structure

```
EvoFlow/
├── apps/
│   ├── api/                    # NestJS REST API
│   │   ├── src/
│   │   │   ├── application/    # Use cases & services
│   │   │   ├── domain/         # Business logic & entities
│   │   │   ├── infrastructure/ # Database & external services
│   │   │   └── presentation/   # Controllers & DTOs
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Database schema
│   │   │   └── migrations/     # Database migrations
│   │   ├── test/               # Unit tests
│   │   └── vitest.config.ts
│   │
│   └── mobile/                 # Expo React Native app
│       ├── src/
│       │   ├── application/    # Presenters & business logic
│       │   ├── domain/         # Types & interfaces
│       │   ├── infrastructure/ # API client, storage, services
│       │   └── presentation/   # Screens & components
│       ├── test/               # Component & integration tests
│       └── app.json            # Expo configuration
│
├── docker-compose.yml          # Local PostgreSQL + API
├── pnpm-workspace.yaml         # Monorepo configuration
└── package.json                # Root workspace config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher
- **Docker** & **Docker Compose** (for local database)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/massenan/evoflow.git
cd evoflow

# 2. Install dependencies
pnpm install

# 3. Start Docker services (PostgreSQL)
docker compose up --build -d

# 4. Run database migrations
pnpm --filter @evoflow/api exec prisma db push

# 5. Start the mobile app (opens in Expo)
pnpm dev:mobile

# 6. In a new terminal, start the API (optional if using Docker)
pnpm --filter @evoflow/api dev
```

### Verify Everything Works

```bash
# Check API health
curl http://localhost:3001/health

# View Swagger docs
open http://localhost:3001/docs

# Check Docker containers
docker compose ps
```

---

## 🔧 Environment Configuration

### Backend API Configuration

Create `apps/api/.env.local`:

```env
# Database
DATABASE_URL=postgresql://evoflow:evoflow@localhost:5433/evoflow
PRISMA_LOG_QUERIES=true

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server
NODE_ENV=development
PORT=3001

# API Docs
ENABLE_SWAGGER=true
```

### Mobile App Configuration

Create `apps/mobile/.env.local`:

```env
# API
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3001

# Google Sign-In (get from Firebase Console)
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=xxx.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=xxx.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=xxx.apps.googleusercontent.com

# Apple Sign-In (get from Apple Developer)
# Configure in Expo auth plugin settings
```

### Finding Your Local IP

```bash
# macOS
ipconfig getifaddr en0

# Linux
hostname -I | awk '{print $1}'

# Windows
ipconfig
```

---

## 🐳 Docker & Local Services

### Docker Compose Services

The `docker-compose.yml` spins up:

| Service | Port | Details |
|---------|------|---------|
| PostgreSQL | 5433 | Database for habits, users, completions |
| API | 3001 | NestJS server (auto-runs migrations) |

### Common Docker Commands

```bash
# Start services in background
docker compose up --build -d

# View logs
docker compose logs -f api
docker compose logs -f postgres

# Stop services
docker compose down

# Restart specific service
docker compose restart api

# Fresh start (remove volumes)
docker compose down -v && docker compose up --build -d
```

### Database Access

Connect to PostgreSQL directly:

```bash
# Using Docker
docker compose exec postgres psql -U evoflow -d evoflow

# Or use a GUI client (DBeaver, pgAdmin, etc.)
# Host: localhost:5433
# User: evoflow
# Password: evoflow
# Database: evoflow
```

---

## 📋 NPM Scripts & Commands

### Workspace Commands

```bash
# Install all dependencies
pnpm install

# Run tests (all apps)
pnpm test

# Test only backend
pnpm test:api

# Test only mobile
pnpm test:mobile

# Build backend
pnpm --filter @evoflow/api build

# Type check mobile
pnpm --filter @evoflow/mobile exec tsc --noEmit

# View Docker status
docker compose ps

# Lint code (add linting if configured)
pnpm lint
```

### Development

```bash
# Start mobile development (opens Expo)
pnpm dev:mobile

# Start API in dev mode (watch mode)
pnpm --filter @evoflow/api dev

# Both together (run from root)
pnpm dev
```

### Database Migrations

```bash
# Apply pending migrations
pnpm --filter @evoflow/api exec prisma db push

# Create new migration
pnpm --filter @evoflow/api exec prisma migrate dev --name your_migration_name

# View migrations
pnpm --filter @evoflow/api exec prisma migrate status

# Reset database (deletes all data)
pnpm --filter @evoflow/api exec prisma db push --force-reset
```

---

## 🎬 Core User Flows

### 1. Onboarding & Authentication

**Guest Mode:**
```
User opens app → Continue as Guest → App generates device ID → Habits stored locally
```

**Email/Password Signup:**
```
User taps Sign Up → Enters email + password → POST /auth/register → Receives JWT → Can access account habits
```

**Social Login (Google/Apple):**
```
User taps "Sign in with Google" → OAuth flow → POST /auth/google or /auth/apple → Receives JWT
```

**Guest → Account Migration:**
```
Logged-in user → Import Guest Habits → App loads habits by device ID → User adopts habits to account
```

### 2. Creating & Managing Habits

**Create Habit:**
```
Dashboard → "+ New Habit" → Fill form (name, emoji, color, goal, reminders) → POST /habits → Habit appears on dashboard
```

**Edit Habit:**
```
Tap habit → Edit screen → Update details → PATCH /habits/:id → Changes saved
```

**Archive/Delete:**
```
Long-press habit → Archive/Delete → DELETE /habits/:id → Removed from active list
```

### 3. Daily Tracking

**Mark Complete:**
```
Dashboard → Tap today's icon → POST /habits/:habitId/toggle → Completion recorded → Streak updated
```

**View Progress:**
```
Tap habit → History view → See calendar of completions → Streak badge displayed
```

### 4. Weekly Goals & Reports

**Set Goal:**
```
Habit settings → Set "Complete X times per week" → Goal persisted
```

**View Report:**
```
Report screen → Select date range → GET /habits/:id/history?from=&to= → Visualize completion pattern
```

### 5. PDF Export

**Generate & Share:**
```
Export screen → Select habits & date range → App generates PDF locally → Share via email/message
```

### 6. Reminders

**Schedule Notification:**
```
Habit settings → Add reminder time → Local notification scheduled → Fires at time via device OS
```

---

## 📖 API Endpoints

### 🏥 Health Check

```http
GET /health
```

No authentication required. Verify API is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-09T12:30:00.000Z",
  "version": "1.0.0"
}
```

---

### 🔑 Authentication Endpoints

#### Register

```http
POST /auth/register
Content-Type: application/json
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2026-02-09T12:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### Login

```http
POST /auth/login
Content-Type: application/json
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 👥 Habits Endpoints

> **All endpoints below require:** `Authorization: Bearer {accessToken}`

#### Get All Habits

```http
GET /habits?from=2026-02-01&to=2026-02-28&deviceId=device-uuid
Authorization: Bearer {accessToken}
```

**Query Params:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `from` | `string` | Start date (ISO 8601) |
| `to` | `string` | End date (ISO 8601) |
| `deviceId` | `string` | Optional device ID for guest habits |

**Response (200):**
```json
{
  "habits": [
    {
      "id": "habit-uuid",
      "name": "Morning Run",
      "emoji": "🏃",
      "color": "#FF6B6B",
      "userId": "user-uuid",
      "createdAt": "2026-02-01T08:00:00Z",
      "streak": 7,
      "weeklyGoal": 5,
      "completions": [
        { "date": "2026-02-08", "count": 1 },
        { "date": "2026-02-07", "count": 1 }
      ]
    }
  ]
}
```

---

#### Create Habit

```http
POST /habits
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Morning Meditation",
  "emoji": "🧘",
  "color": "#9B59B6",
  "completionsPerDay": 1,
  "weeklyGoal": 5,
  "reminders": [
    { "hour": 6, "minute": 30 }
  ]
}
```

**Response (201):**
```json
{
  "id": "habit-uuid",
  "name": "Morning Meditation",
  "emoji": "🧘",
  "color": "#9B59B6",
  "completionsPerDay": 1,
  "weeklyGoal": 5,
  "streak": 0,
  "createdAt": "2026-02-09T12:30:00Z"
}
```

---

#### Update Habit

```http
PATCH /habits/:habitId
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Evening Meditation",
  "color": "#3498DB"
}
```

**Response (200):** Updated habit object

---

#### Toggle Completion

```http
POST /habits/:habitId/toggle?date=2026-02-09
Authorization: Bearer {accessToken}
```

**Query Params:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `string` | Target date (ISO 8601) |

**Response (200):**
```json
{
  "habitId": "habit-uuid",
  "date": "2026-02-09",
  "completed": true,
  "streak": 8,
  "totalCompletions": 42
}
```

---

#### Get Habit History

```http
GET /habits/:habitId/history?from=2026-01-01&to=2026-02-09
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "habitId": "habit-uuid",
  "history": [
    { "date": "2026-02-09", "completed": true },
    { "date": "2026-02-08", "completed": true },
    { "date": "2026-02-07", "completed": false },
    { "date": "2026-02-06", "completed": true }
  ],
  "stats": {
    "totalDays": 40,
    "completedDays": 28,
    "completionRate": 0.70,
    "currentStreak": 8,
    "longestStreak": 12
  }
}
```

---

#### Delete Habit

```http
DELETE /habits/:habitId
Authorization: Bearer {accessToken}
```

**Response (204):** No content

---

## 📊 Response Codes

| Code | Status | Description |
|------|--------|-------------|
| `200` | ✅ OK | Request succeeded |
| `201` | ✅ Created | Resource created successfully |
| `204` | ✅ No Content | Deletion successful |
| `400` | ❌ Bad Request | Invalid parameters or validation error |
| `401` | 🔒 Unauthorized | Missing or invalid JWT token |
| `403` | 🚫 Forbidden | User not authorized to access resource |
| `404` | 🔍 Not Found | Resource doesn't exist |
| `409` | ⚠️ Conflict | Resource already exists (e.g., duplicate email) |
| `429` | ⏱️ Too Many Requests | Rate limit exceeded |
| `500` | 💥 Server Error | Internal server error |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Write tests for new features
- Run `pnpm test` before submitting PR
- Use conventional commit messages
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📚 Support & Documentation

- **Backend README:** [apps/api/README.md](apps/api/README.md)
- **Mobile README:** [apps/mobile/README.md](apps/mobile/README.md)
- **API Docs (Swagger):** `http://localhost:3001/docs`
- **Issues:** [GitHub Issues](https://github.com/massenan/evoflow/issues)
- **Discussions:** [GitHub Discussions](https://github.com/massenan/evoflow/discussions)

### Getting Help

- 💡 Check existing [issues](https://github.com/massenan/evoflow/issues) first
- 📝 See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup
- 🐛 Report bugs with reproduction steps
- 💬 Ask questions in Discussions

---

**Made with ❤️ by the EvoFlow community**
