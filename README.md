# FaceMatrix

FaceMatrix is a next-generation facial recognition platform powered by deep learning and artificial intelligence. Designed for speed, accuracy, and security, FaceMatrix can identify and verify individuals in real time — whether for access control, attendance tracking, or identity verification. With a sleek interface and robust backend, FaceMatrix turns any camera into an intelligent recognition system you can trust.
FaceMatrix/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── face_utils.py
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── register.py
│   │       └── checkin.py
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── RegisterTeam.jsx
│   │   │   ├── GateScan.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── RegistrationPage.jsx
│   │   │   └── GatePage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── .env
└── README.md
# Face Ideathon – AI Event Check-in System

## Setup Instructions

### Backend (FastAPI)
1. `cd backend`
2. Create virtual env: `python -m venv venv`
3. Activate: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. Install: `pip install -r requirements.txt`
5. Run: `python run.py`
   - API will be at `http://localhost:8000`
   - Swagger docs: `http://localhost:8000/docs`

### Frontend (React + Vite)
1. `cd frontend`
2. `npm install`
3. `npm run dev`
   - App at `http://localhost:5173`

### Usage
1. **Register a team** – fill team name, idea, then capture faces for up to 5 members.
2. **Gate scan** – the same person looks at the camera → system matches face, grants access, and marks them checked in.
3. Duplicate scan will show "already checked in".

### Tech Stack
- Frontend: React, TailwindCSS, react-webcam, Axios
- Backend: FastAPI, SQLAlchemy, DeepFace (Facenet), OpenCV
- Database: SQLite (can be swapped to PostgreSQL)

### Demo Flow
- No QR/badge – pure facial recognition.
- Prevents ticket sharing.
- Real‑time team attendance tracking (extendable).