# 🚗 Carpark Rate Finder

A full-stack web application that allows users to search for **carpark rates in Singapore** based on filters such as **night parking availability**, **carpark name**, and **region**.

NOTE: A .env containing the URL to our publicly hosted PostgreSQL database on Supabase along with the API key is required for the data to be retrieved. However, it is NOT committed in this repo.

---

## 📌 Features
- **Night Parking Filter** – Toggle to show only carparks that offer night parking.
- **Search by Name** – Quickly find a carpark by its name.
- **Search by Region** – Filter results based on region.
- **Dynamic Accordion Results** – Displays:
  - Carpark name  
  - Region  
  - Weekday rates  
  - Weekend rates  
- **Empty State Handling** – Shows a “no results” message if no matches are found.

---

## ⚙️ Installation & Setup

Follow these steps to get the project running locally.

### 1 Install Dependencies
Run the following command in the project root to install **both backend and frontend dependencies**:
```bash
npm run install-all
```

### 2 Start the frontend
```
ng serve --open
```

### 3 Start the backend
```
cd backend
node server.js
```

---
## 🛠 Tech Stack
Frontend:
Angular 2+
Angular Material (UI components)

Backend:
Node.js
Express.js

Database: 
PostgreSQL (Supabase) - Hosted on cloud

---
## 🛠 File Structure
```
./carpark-app/
├── backend/            # Node.js + Express backend API
│   ├── server.js       # Backend entry point
│   ├── routes/         # API route definitions
│   ├── controllers/    # Routing & SQL logic
│   ├── package.json    # Backend Dependencies
│   └── .env            # Environment variables (not committed)
│
├── src/                # Angular frontend
│
└── package.json        # Frontend dependencies
```

## 👥 Contributors
Seth Yap, Kyla Sim, Ryan Teoh, Charlotte Lee



