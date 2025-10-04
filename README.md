# 🎮 Circuit Puzzle Game Backend 🕹️

A **Node.js + TypeScript + Express + MongoDB** backend for the **Circuit Puzzle Game** — featuring clean modular architecture, JWT authentication, AI-powered hint generation, circuit validation, and a leaderboard system.

---

## 📖 Table of Contents

- [🧩 How the Application Works](#🧩-how-the-application-works)
- [🚀 Features](#🚀-features)
- [📂 Project Structure](#📂-project-structure)
- [🛠️ Tech Stack](#🛠️-tech-stack)
- [⚙️ Installation & Setup](#⚙️-installation--setup)
  - [1️⃣ Clone the repo](#1️⃣-clone-the-repo)
  - [2️⃣ Create a `.env` file and provide the values](#2️⃣-create-a-env-file-and-provide-the-values)
  - [3️⃣ Install and Run the server](#3️⃣-install-and-run-the-server)
- [🔗 API Endpoints](#🔗-api-endpoints)
  - [🔑 Authentication Module](#🔑-authentication-module)
  - [🎮 Circuit Module](#🎮-circuit-module)
  - [🏆 Leaderboard Module](#🏆-leaderboard-module)
- [💡 Configuration & Limits](#💡-configuration--limits)
  - [🔑 Authentication & JWT](#🔑-authentication--jwt)
  - [📝 Maximum Hints](#📝-maximum-hints)
  - [⏱️ Rate Limiting](#⏱️-rate-limiting)
  - [🛡️ Security Middlewares](#🛡️-security-middlewares)
  - [⚠️ Assumptions](#⚠️-assumptions)
- [📋 Requirements Implementation Status](#📋-requirements-implementation-status)

## 🧩 How the Application Works

The **Circuit Puzzle Game Backend** powers an interactive game where users solve circuit puzzles by designing and submitting circuits.

1. **User Authenticates** – Users register and log in to receive a JWT token.  
2. **Fetch Puzzles** – The client requests a list of available puzzles to solve.  
3. **Submit Solution** – Users upload their circuit as a JSON file for validation.  
4. **Validation & Feedback** – The backend checks the circuit rules (no short circuits, LED powered, resistor present) and responds with success or detailed error messages.  
5. **AI Hint Generation** – If the solution is invalid, users can request an AI-powered hint to guide them toward the correct solution.  
6. **Progress Tracking** – Successful submissions update the user's progress and score in the database.  
7. **Leaderboard** – Users can view the leaderboard to see top performers and their own rank.  

This flow ensures a **secure, interactive, and gamified learning experience** powered by a modular backend.


## 🚀 Features

- **TypeScript First** – Strongly typed, scalable codebase  
- **Modular Architecture** – Clear separation of concerns for easy maintainability  
- **Type Aliases (`@/`)** – Clean imports, no more ugly `../../../` paths  
- **Authentication** – JWT-based auth with refresh tokens  
- **MongoDB + Mongoose** – Flexible schema design for game data  
- **AI Integration** – Generate circuit hints using LLMs  
- **Leaderboard** – Store and rank players by score  
- **Validation** – Request payload validation with **Zod**  
- **File Uploads** – Support for JSON uploads using **Multer**  
- **Security** – Includes:
  - **Helmet** – Secure HTTP headers
  - **Rate Limiter** – Prevents brute force attacks (e.g., on login)
  - **CORS** – Configurable cross-origin requests
  - **HTTP Only Cookies** – Refresh token stored securely
- **Logging** – HTTP request logging via **Morgan**
- **Error Handling** – Centralized error handler with Zod validation support

---

## 📂 Project Structure

```bash
circuit-puzzle-backend/
├── src/
│   ├── app/
│   │   ├── modules/        # Feature modules (auth, circuits, leaderboard, user)
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.model.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── auth.service.ts
│   │   │   │   └── ...
│   │   │   ├── circuits/
│   │   │   │   ├── circuit.controller.ts
│   │   │   │   ├── circuit.model.ts
│   │   │   │   ├── circuit.routes.ts
│   │   │   │   └── circuit.service.ts
│   │   │   │   └── ...
│   │   │   └── leaderboard/
│   │   │   │   ├── leaderboard.controller.ts
│   │   │   │   ├── leaderboard.routes.ts
│   │   │   │   └── leaderboard.service.ts
│   │   │   │   └── ...
│   │   ├── middleware/      # Auth, error handling, validation
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   │   └── ...
│   │   └── routes/          # Route aggregator files
│   │       └── index.ts
│   ├── constants/           # App constants (status codes, enums, etc.)
│   │   └── index.ts
│   ├── interfaces/          # TypeScript interfaces / types
│   │   └── index.ts
│   ├── database/
│   │   └── connection.ts    # MongoDB connection setup
│   ├── app.ts               # Express app initialization
│   └── server.ts            # App bootstrap
├── .env
├── package.json
├── tsconfig.json
└── README.md
└── ...
```

## 🛠️ Tech Stack

- **Runtime:** Node.js + Express  
- **Language:** TypeScript  
- **Database:** MongoDB (Mongoose ODM)  
- **Validation:** Zod  
- **Auth:** JWT + Agron2 + Refresh Token  
- **Upload:** Multer  
- **AI:** Gemini LLM integration (for hints)
- **Test Endpoints:**  Jest
- **Security:** Helmet, MongoSanitize, CORS, Rate Limiter, Secure Cookies

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/RiyaadHossain/CirCuit-Puzzle-Game.git
cd circuit-puzzle-backend
```

### 2️⃣ Create a `.env` file and provide the values
```bash
# Logging
LOG_LEVEL = "info"

# Server
PORT = "5000"

# Database
MONGO_URI = "mongo_url"

# JWT Authentication
JWT_SECRET = "your_jwt_secret"
JWT_EXPIRATION = "give a time"
JWT_REFRESH_SECRET = "your_refresh_secret"
JWT_REFRESH_EXPIRATION = "give a time"

# Salt rounds for password hashing
SALT_ROUNDS = "give a time"

# Evnironment
NODE_ENV = "curr_env"

# Google GEMINI Credentials
GEMINI_MODEL = "gemini_model"
GOOGLE_GENAI_API_KEY  = "gemini_api_key"

# Maximum hints allowed per puzzle
MAX_HINTS  = "max hints"
```

### 3️⃣ Install and Run the server
```bash
npm install
npm run dev # to run in dev env
npm run build # to build the server code
npm test # to run jest test cases
npm start # to run the build file
```
> Server will start at http://localhost:5000

## 🔗 API Endpoints

All endpoints are prefixed with `/api/v1` |
🔒 Protected routes require `Authorization: Bearer <token>`

> Checkout the API collection with full req body and response in the `postman-api-collection.json`

---

### 🔑 Authentication Module  
Handles user registration, login, and secure session management.

- `POST /auth/register` – Register a new user  
- `POST /auth/login` – Login and receive JWT  
- `POST /auth/refresh-token` – Get a new access token using refresh token in cookie  

---

### 🎮 Circuit Module  
Manages puzzles, uploads user circuit solutions, and provides AI-generated hints.

- 🔒 `GET /circuits/puzzles` – Get all available puzzles  
- 🔒 `POST /circuits/upload` – Upload a circuit solution for validation  
- 🔒 `POST /circuits/hint` – Get AI-generated hint for an invalid circuit  

> **Note on File Uploads Routes:**  
> The backend server is deployed on **Vercel**, which is a serverless hosting platform.  
> Serverless environments **do not allow writing files to disk**, so the file upload routes (`/circuits/upload` and `/circuits/hint`) cannot fully function on the deployed server.  
> To properly test these endpoints, you should either:  
> 1. Run the server **locally**, or  
> 2. Deploy it to a **stateful server** where file writing is permitted.  
> 
> This ensures that JSON circuit uploads and AI hint generation work as intended.


---

### 🏆 Leaderboard Module  
Tracks user progress and displays top solvers on the leaderboard.

- 🔒 `GET /leaderboard` – Get top users sorted by solved puzzles  
- 🔒 `GET /leaderboard/progress` – Get current user’s progress and puzzle attempts  

---

## 💡 Configuration & Limits

### 🔑 Authentication & JWT

- The backend uses **JWT-based authentication** for securing protected routes.  
- **Access Token**:
  - Secret: `JWT_SECRET` from `.env`
  - Expiration: 2 days (`JWT_EXPIRATION`)
- **Refresh Token**:
  - Secret: `JWT_REFRESH_SECRET` from `.env`
  - Expiration: 30 days (`JWT_REFRESH_EXPIRATION`)
- Protected endpoints require `Authorization: Bearer <accessToken>` header.  
- Refresh tokens are stored in **HTTP-only cookies** for security.

### 📝 Maximum Hints

- Each user is limited to **5 AI-generated hints per puzzle** (`MAX_HINTS` in `.env`).  
- Once the limit is reached, further hint requests will return an error until the user completes or retries the puzzle.

### ⏱️ Rate Limiting

- **Login attempts** are rate-limited to prevent brute-force attacks.  
- Example configuration:
  - `max`: 5 attempts per 10 minutes per IP  
- Other endpoints have rate limiting applied as needed.

### 🛡️ Security Middlewares

- **Helmet**: Protects headers from common security vulnerabilities.  
- **CORS**: Configured to allow controlled access from frontend apps.  
- **HTTP-only Cookies**: Refresh tokens are stored securely to prevent XSS attacks.

### ⚠️ Assumptions

- Users must register before accessing puzzles.  
- All circuit submissions are **JSON files** validated using Zod.  
- JWT access token must be included in the `Authorization` header for protected routes.  
- AI hints are **rate-limited** per puzzle and cannot exceed the configured `MAX_HINTS`.


## 📋 Requirements Implementation Status

| Requirement | Implemented |
|-------------|------------|
| **Language:** TypeScript | ✅ |
| **Core Framework:** Node.js (v22+) with Express.js | ✅ |
| **Database:** MongoDB (via Mongoose) | ✅ |
| **Authentication:** JWT-based authentication | ✅ |
| **File Upload:** Multer for JSON uploads | ✅ |
| **AI Integration:** LLM (e.g., OpenAI / Gemini) for hints | ✅ Used Gemini |
| **Validation Logic:** Custom circuit JSON validation | ✅ |
| **Other Libraries:** jsonwebtoken, argon2, axios/node-fetch, zod | ✅ |
| **No Frontend & Include Postman:** APIs tested with Postman, response examples included | ✅ (Postman API collection provided with requests' response ) |
| **Environment:** Sensitive data in `.env` | ✅ |
| **Testing:** Basic unit tests with Jest (5-10 tests) | ✅ |
| **Documentation:** README with setup, endpoints, assumptions | ✅ |
| **Error Handling:** Proper error responses (400, 401, etc.) | ✅ (Centerilized Error Handler) |
| **Security Best Practices:** Secure file uploads, auth checks, rate limiting, Helmet headers | ✅ |
| **Correctness:** Validation logic accurate, APIs work as described | ✅ |
| **Code Quality:** Clean, modular, commented | ✅ Implemented Modular Architecture |
| **Efficiency:** Validation O(N) complexity for components/connections | ✅ |
| **Innovation:** Extras like rate limiting hints & advanced graph validation | ✅ Rate Limit, ❌ Just Implemented DFS for graph traversal |

