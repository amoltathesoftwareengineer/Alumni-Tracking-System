# 🎓 Alumni Tracking System

A full-stack web application that helps alumni register, maintain professional profiles, and discover other alumni through a searchable directory.

## 🚀 Project Overview

The Alumni Tracking System provides a centralized platform for alumni networking. Users can create accounts, securely log in, update their professional information, and search for alumni by name, company, job title, degree, or location.

## ✨ Features

- 🔐 **User Authentication** — Registration and login with password hashing.
- 🛡️ **JWT Authentication** — Protected API endpoints using JSON Web Tokens.
- 👤 **Profile Management** — View and update personal and professional details.
- 🔎 **Alumni Directory** — Search alumni using multiple profile fields.
- 📱 **Responsive UI** — Interface designed for desktop and smaller screens.
- 🗄️ **Database Integration** — MongoDB storage through Mongoose.
- ⚙️ **REST API** — Express.js endpoints for authentication and alumni profiles.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Token (JWT) |
| Password Security | bcryptjs |
| Configuration | dotenv |
| Development | npm, Nodemon |

## 📂 Project Structure

```text
Alumni-Tracking-System/
├── client/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── style.css
├── server/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── middleware/
│       │   └── auth.js
│       ├── models/
│       │   └── User.js
│       ├── routes/
│       │   ├── auth.js
│       │   └── alumni.js
│       └── server.js
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- MongoDB running locally or a MongoDB Atlas database

### 1. Clone the Repository

```bash
git clone https://github.com/amoltathesoftwareengineer/Alumni-Tracking-System.git
cd Alumni-Tracking-System
```

### 2. Configure the Backend

```bash
cd server
npm install
```

Copy `.env.example` to `.env` and configure your environment variables:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/alumni_tracking
JWT_SECRET=replace_with_a_long_random_secret
```

Use your actual MongoDB connection string. Keep `.env` private and never commit secrets to GitHub.

Start the backend:

```bash
npm run dev
```

The API should be available at `http://localhost:5000` once the database connection succeeds.

### 3. Start the Frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/alumni` | Search the alumni directory |
| GET | `/api/alumni/me` | Retrieve the logged-in user's profile |
| PUT | `/api/alumni/me` | Update the logged-in user's profile |

Protected endpoints require a valid JWT in the `Authorization: Bearer <token>` header.

## 🔒 Security Notes

- Passwords are hashed before storage.
- JWT-protected routes require a valid token.
- Secrets and database credentials must be stored in environment variables.
- This project is intended as a portfolio and learning application. Review production security requirements before public deployment.

## 🧪 Testing Checklist

- [ ] Register a new user.
- [ ] Log in with valid credentials.
- [ ] Confirm invalid credentials are rejected.
- [ ] Update and reload a profile.
- [ ] Search the alumni directory.
- [ ] Confirm protected endpoints reject missing or invalid tokens.
- [ ] Verify `.env` and other secrets are not committed.

## 🔮 Potential Improvements

- Automated backend and frontend tests
- Role-based administrative workflows
- Pagination and improved directory filtering
- Password reset and email verification
- Deployment with production environment configuration
- CI/CD integration

## 👨‍💻 Author

**Amol Tathe**

- GitHub: [@amoltathesoftwareengineer](https://github.com/amoltathesoftwareengineer)
- LinkedIn: [Connect on LinkedIn](https://www.linkedin.com/in/amoltathesoftwareengineer/)

---

*Built to demonstrate full-stack development, REST API design, authentication, and database integration.*
