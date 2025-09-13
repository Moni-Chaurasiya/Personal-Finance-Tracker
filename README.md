```markdown
# 💰 Personal Finance Tracker (MERN Stack)

A full-stack MERN application to track personal finances with CRUD functionality.  
This project contains both **frontend (React + Vite)** and **backend (Node.js + Express + MongoDB)** in a single repository.

---

## 📸 Preview

![App Screenshot](./screenshot.png)  
*(Replace `screenshot.png` with your actual screenshot file path)*

---

## 📂 Project Structure

```

.
├── backend   # Node.js + Express + MongoDB
├── frontend  # React (Vite)
└── README.md

````

---

## 🚀 Features
- Add, edit, delete, and list transactions  
- Fields: `title`, `amount` (+ / -), `date`, `category`  
- RESTful API with Express + MongoDB  
- React frontend with clean UI/UX  
- Real-time updates with state management  
- Bonus: Authentication-ready structure, localStorage, and charts (optional)  

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Axios, TailwindCSS (if used)  
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Deployment:** Render (Backend), Vercel (Frontend)  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
````

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGODB_URI=""
JWT_SECRET= my-super-secret-key
PORT=5000
```

Run locally:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run locally:

```bash
npm run dev
```

---

### 4️⃣ Deployment

#### Backend (Render)

* Deploy `backend/` on [Render](https://render.com/)
* Build Command: `npm install`
* Start Command: `npm start`
* Add environment variables in Render Dashboard

#### Frontend (Vercel)

* Deploy `frontend/` on [Vercel](https://vercel.com/)
* Build Command: `npm run build`
* Output Directory: `dist`
* Add environment variable in Vercel:

  ```env
  VITE_API_URL=https://your-backend.onrender.com/api
  ```

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | /transaction       | Get all transactions   |
| POST   | /transaction       | Add new transaction    |
| GET    | /transaction/\:id  | Get single transaction |
| PUT    | /transaction/\:id  | Update transaction     |
| DELETE | /transaction/\:id  | Delete transaction     |

---

## 🌐 Deployed Links

* **Frontend (Vercel):** [Live Demo](https://personal-finance-trackers-hazel.vercel.app/)



