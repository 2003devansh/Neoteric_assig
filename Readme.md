# Mini CRM Application

A full-stack Mini CRM system built with:

- **Backend:** Node.js, Express, Prisma, PostgreSQL, JWT Authentication
- **Frontend:** React (Vite + TypeScript), Ant Design, Tailwind CSS

The application allows users to register, log in, and manage leads and tasks with a clean dashboard interface.

---

# 🚀 Features

## Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes (backend + frontend)

## Dashboard

- Total leads count
- Total tasks count
- Lead status breakdown (NEW, CONTACTED, CLOSED)

## Leads Management

- Create leads
- View all leads
- Update lead status
- Simple validation and UI

## Tasks Management

- Create tasks
- View tasks
- Deadline tracking

---

# 🏗️ Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt

### Frontend

- React (Vite)
- TypeScript
- Ant Design
- Tailwind CSS
- Fetch API

---

# 📂 Project Structure

```
project-root
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── middleware
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── prisma
│   │   └── schema.prisma
│   │
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── api
│   │   ├── utils
│   │   └── App.tsx
│
└── README.md
```

---

# ⚙️ Backend Setup

## 1. Navigate to backend

```
cd backend
```

## 2. Install dependencies

```
npm install
```

## 3. Create `.env` file

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
ACCESS_SECRET=your_secret_key
PORT=2000
```

---

## 4. Setup Prisma

```
npx prisma generate
npx prisma db push
```

---

## 5. Run backend server

```
npm run dev
```

Server runs at:

```
http://localhost:2000
```

---

# 🔐 Authentication Flow

1. User registers
2. User logs in
3. Backend returns JWT token
4. Token stored in localStorage
5. Token sent in headers:

```
Authorization: Bearer TOKEN
```

6. Middleware verifies token

---

# 📡 Backend API Routes

## Auth

```
POST /auth/register
POST /auth/login
```

---

## Leads (Protected)

```
GET    /leads
POST   /leads
PATCH  /leads/:id/status
DELETE /leads/:id
```

---

## Tasks (Protected)

```
GET    /tasks
POST   /tasks
DELETE /tasks/:id
```

---

## Dashboard (Protected)

```
GET /dashboard
```

---

# 💻 Frontend Setup

## 1. Navigate to frontend

```
cd frontend
```

## 2. Install dependencies

```
npm install
```

## 3. Run frontend

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔗 Frontend Routing

| Page                  | Route        |
| --------------------- | ------------ |
| Auth (Login/Register) | `/`          |
| Dashboard             | `/dashboard` |
| Leads                 | `/leads`     |
| Tasks                 | `/tasks`     |

---

# 🌐 API Integration

Frontend communicates with backend using `fetch`:

Example:

```
fetch("http://localhost:2000/dashboard", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
```

---

# ⚠️ Important Notes

- Ensure backend runs on **port 2000**
- Ensure `ACCESS_SECRET` is consistent across backend
- Always send JWT token in headers for protected routes
- If token is missing/invalid → user is redirected to login

---

# 🧪 Common Issues & Fixes

### 401 Unauthorized Error

- Check token exists in localStorage
- Ensure Authorization header is sent
- Ensure JWT secret is same in login and middleware

---

### Instant Logout After Login

- Backend secret mismatch
- Wrong backend port in frontend
- Missing Authorization header

---

### CORS Error

- Enable CORS in backend:

```
app.use(cors({ origin: "http://localhost:5173" }))
```

---

# 📌 Future Improvements

- Edit/Delete tasks and leads
- Better form validation
- Loading states and spinners
- Role-based authentication
- Charts for dashboard analytics

---

# 👨‍💻 Author

Developed as part of a **Software Engineering Assessment** By Devansh singh Email : faujdardevansh@gmail.com , Contact : +91-7456022432

---
