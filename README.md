# 🚨 Emergency FIR System

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D4.0-brightgreen?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

> **A modern, full-stack emergency management platform for FIRs, donations, hospitals, and police stations.**

---

## 🌟 Overview

**Emergency FIR System** is a robust web application designed to streamline emergency response, donation management, and institutional registrations (hospitals & police stations). It empowers users to:

- Submit and track **FIRs** (First Information Reports)
- Request and manage **blood/organ donations**
- Register and manage **hospitals** and **police stations**
- Send **emergency SMS notifications** (Twilio integration)
- Securely authenticate and protect user data (Clerk)

---

## 🖼️ Screenshots

> _Add your screenshots here_

| Home | Donation | Dashboard |
|------|----------|-----------|
| ![Home](docs/screenshots/home.png) | ![Donation](docs/screenshots/donation.png) | ![Dashboard](docs/screenshots/dashboard.png) |

---

## 🏗️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Clerk (Auth)
- **Backend:** Node.js, Express, MongoDB (Mongoose), EJS, Twilio
- **Other:** JWT, Morgan, CORS, dotenv

---

## 📦 Project Structure

```
emergency-app/
  backend/      # Node.js/Express API
    src/
      models/   # Mongoose models (Donation, Hospital, Police, FIR)
      routes/   # Express routes (API endpoints)
      controller/ # Business logic
      services/ # Data loading/search
      views/    # EJS templates (SMS)
  frontend/     # React app (Vite + Tailwind)
    src/
      pages/    # Main pages (Home, Dashboard, Donation, etc.)
      components/ # Shared UI components
      auth/     # Clerk authentication
```

---

## 🚀 Features

### 👤 User
- Register/login (Clerk)
- Submit blood/organ donation requests
- Track donation status via dashboard
- Submit FIRs (First Information Reports)
- Emergency SMS sending (Twilio)

### 🏥 Hospital
- Register/login as a hospital
- View and manage donation requests
- Accept/reject donation requests

### 🚓 Police Station
- Register/login as a police station
- (Extendable for FIR management)

### 🩸 Donation
- Blood and organ donation requests
- Hospital search and selection
- Status tracking (pending/accepted/rejected)

### 📱 Emergency SMS
- Send SMS via Twilio from web form

---

## ⚙️ Setup & Installation

### 1. **Clone the repository**
```bash
git clone https://github.com/yourusername/emergency-app.git
cd emergency-app
```

### 2. **Backend Setup**
```bash
cd backend
npm install
# Create a .env file with the following:
# MONGO_URI=your_mongodb_uri
# TWILIO_ACCOUNT_SID=your_twilio_sid
# TWILIO_AUTH_TOKEN=your_twilio_token
# TWILIO_PHONE_NUMBER=your_twilio_number
# HOSPITAL_SECRET_KEY=your_hospital_jwt_secret
# POLICE_SECRET_KEY=your_police_jwt_secret
npm run dev # or nodemon server.js
```

### 3. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

---

## 🔑 Authentication
- User authentication is handled via [Clerk](https://clerk.com/)
- Hospital/Police have separate registration/login flows
- Protected routes for dashboard, donation, etc.

---

## 📚 API Overview

### Donation
- `POST /api/donations` — Create donation request
- `GET /api/donations` — List all donation requests (admin)
- `GET /api/donations/mine?userId=...` — User's donation requests
- `PUT /api/donations/:id/status` — Update donation status (admin)
- `PUT /api/donations/:id/confirm` — User confirms hospital response

### Hospital
- `POST /api/hospital/register` — Register hospital
- `POST /api/hospital/login` — Hospital login
- `GET /api/hospital/all` — List all hospitals

### Police
- `POST /api/police/register` — Register police station
- `POST /api/police/login` — Police login

### FIR
- `POST /api/fir` — Create FIR request
- `GET /api/fir` — List all FIRs

### Hospital Search
- `GET /api/hospital/search?name=...` — Search hospitals by name

### SMS
- `GET /` — SMS form (EJS)
- `POST /send-sms` — Send SMS via Twilio

---

## 🛡️ Security & Best Practices
- Passwords hashed with bcrypt
- JWT for hospital/police sessions
- CORS enabled for frontend-backend communication
- Environment variables for secrets

---

## 🤝 Contributing

1. Fork the repo & clone locally
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your fork (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements
- [Clerk](https://clerk.com/) for authentication
- [Twilio](https://www.twilio.com/) for SMS
- [Vite](https://vitejs.dev/) for frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [MongoDB](https://www.mongodb.com/) for database

---

> _Built with ❤️ for emergency response and community support._ 