# 🚛 TransitOps

TransitOps is a premium, enterprise-grade Transport and Fleet Management Platform designed to streamline logistics operations, track metrics, manage drivers/vehicles, control expenses, and enforce role-based access control (RBAC).

Developed with a modern, dynamic UI and fully backed by a Node.js + Express and MongoDB service.

---

## 📁 Repository Structure

The project is structured into two main directories:
*   `/frontend` - React client built with Vite, Tailwind CSS, Vanilla CSS design tokens, and Framer Motion.
*   `/backend` - REST API server built with Node.js, Express, Mongoose schemas, and JWT authentication.

---

## 🚀 Getting Started

Follow these steps to set up and run the database, backend server, and frontend client on your local machine.

### Prerequisites
*   Node.js (v18+ recommended)
*   NPM
*   MongoDB (Local service or MongoDB Atlas cloud connection)

---

### Step 1: Database and Environment Configuration

#### 1. Backend Config
Navigate to the `backend/` folder and create a `.env` file:
```bash
cd backend
```
Create a `.env` file with these values (pre-configured with your MongoDB Atlas database):
```text
PORT=8000
MONGO_URI=mongodb+srv://sudoCoders:Sudo%4095Coders@cluster0.cvw5ubo.mongodb.net/transitops?appName=Cluster0
NODE_ENV=development
JWT_SECRET=qWERTyuiEDFGHjkcvbn
```

#### 2. Frontend Config
Navigate to the `frontend/` folder and create a `.env` file:
```bash
cd ../frontend
```
Create a `.env` file with this API endpoint pointer:
```text
VITE_API_URL=http://localhost:8000/api/v1
```

---

### Step 2: Set up and Start the Backend Server

Open a terminal and run the following:
```bash
cd backend
npm install
npm run seed     # Seeds mock users, vehicles, drivers, and trips in MongoDB
npm run dev      # Starts Express on http://localhost:8000
```

On success, you will see:
`TransitOps Backend Server running in development mode on port 8000`

---

### Step 3: Set up and Start the Frontend Client

Open a **new, separate terminal window** and run:
```bash
cd frontend
npm install
npm run dev      # Starts Vite client
```
Open **`http://localhost:5174`** (or the port shown in your terminal) in your browser.

---

## 🔑 Demo Access Accounts

For testing the Role-Based Access Control (RBAC), you can use the pre-seeded demo accounts or create your own using the new **Register** form.

| Role | Email | Password | Scope of Access |
| :--- | :--- | :--- | :--- |
| **Fleet Manager** | `ravi@transitops.in` | `fleet123` | Full access to fleet registry, trip dispatch, maintenance logs, and analytics. |
| **Driver** | `priya@transitops.in` | `driver123` | Access to active trips assigned to them and their driver statistics. |
| **Safety Officer** | `arjun@transitops.in` | `safety123` | Access to driver registries, compliance ratings, safety scores, and notifications. |
| **Financial Analyst** | `sneha@transitops.in` | `finance123` | Access to fuel efficiency logs, toll/trip expenses, and financial charts. |

---

## ✨ Features Checklist
- [x] **Universal Dashboard**: Dynamic KPIs (Fleet availability, utilization rate, active trips, active maintenance) tailored by user roles.
- [x] **Full Registries (CRUD)**: Create, edit, and delete vehicles and drivers with real-time status locks.
- [x] **Smart Trip Dispatch**: Form validations that prevent dispatching drivers or vehicles currently marked `On Trip` or `In Shop`.
- [x] **Interactive Analytics**: Monthly expense breakups, fuel logs, and CSV report export tables.
- [x] **Registration Flow**: Register new accounts directly linked to the live Mongo database.
