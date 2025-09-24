# 🎮 Circuit Puzzle Game Backend 🕹️

A **Node.js + TypeScript + Express + MongoDB** backend for the **Circuit Puzzle Game** — featuring clean modular architecture, JWT authentication, AI-powered hint generation, circuit validation, and a leaderboard system.

---

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
- **ESLint + Prettier** – Enforce code style and consistency  

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
│   │   │   └── leaderboard/
│   │   │       ├── leaderboard.controller.ts
│   │   │       ├── leaderboard.routes.ts
│   │   │       └── leaderboard.service.ts
│   │   ├── middleware/      # Auth, error handling, validation
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
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
```

## 🛠️ Tech Stack

- **Runtime:** Node.js + Express  
- **Language:** TypeScript  
- **Database:** MongoDB (Mongoose ODM)  
- **Validation:** Zod  
- **Auth:** JWT + Refresh Token  
- **Upload:** Multer  
- **AI:** OpenAI / LLM integration (for hints)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/circuit-puzzle-backend.git
cd circuit-puzzle-backend
```

# 🔗 API Endpoints

All endpoints are prefixed with `/api/v1`.

---

## 🔑 Authentication Module  
Handles user registration, login, and secure session management.

- `POST /auth/register` – Register a new user  
- `POST /auth/login` – Login and receive JWT  
- 🔒 Protected routes require `Authorization: Bearer <token>`

---

## 🎮 Circuit Module  
Manages puzzles, uploads user circuit solutions, and provides AI-generated hints.

- 🔒 `GET /circuits/puzzles` – Get all available puzzles  
- 🔒 `POST /circuits/upload` – Upload a circuit solution for validation  
- 🔒 `POST /circuits/hint` – Get AI-generated hint for an invalid circuit  

---

## 🏆 Leaderboard Module  
Tracks user progress and displays top solvers on the leaderboard.

- `GET /leaderboard` – Get top users sorted by solved puzzles  
- 🔒 `GET /progress` – Get current user’s progress and puzzle attempts  

---
