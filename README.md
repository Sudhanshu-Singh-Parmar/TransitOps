# 🚛 TransitOps — Enterprise Transport & Fleet Management Platform

TransitOps is a state-of-the-art, premium transport operations platform designed for logistics coordinators, fleet safety officers, financial analysts, and drivers. The application features a dynamic, responsive client dashboard backed by an enterprise-grade REST API server to enforce strict Role-Based Access Control (RBAC), orchestrate live fleet registries, and coordinate trip dispatches.

---

## 🛠️ Technology Stack

### Frontend (Client-Side)
- **Framework**: React.js (Vite environment)
- **Styling**: Vanilla CSS (custom design variables, glassmorphic surfaces, dynamic mesh gradients, and pulsing Odoo-inspired themes).
- **Animations**: Framer Motion for smooth page transitions, sidebar shifts, and micro-interactions.
- **Routing**: React Router DOM (protected layout wrapper with role-based component gates).
- **HTTP Client**: Axios (configured with interceptors to inject JWT authentication tokens and handle automatic 401 session expirations).
- **Icons**: Lucide React for consistent vector dashboard styling.

### Backend (Server-Side)
- **Runtime Environment**: Node.js
- **Server Framework**: Express.js
- **Database Wrapper**: Mongoose (ODM for schema structures, data type enums, validations, and query filters).
- **Security & Auth**: JWT (JSON Web Tokens) for stateless token verification; BCryptJS for secure password hashing.
- **Middleware**: CORS (Cross-Origin Resource Sharing), standard Express JSON parsers, and custom Auth middleware.

### Database
- **Database**: MongoDB (supporting local installation and MongoDB Atlas cloud instances).

---

## 🎨 UI Design System & Aesthetics
- **Core Theme**: High-fidelity dark-mode interface utilizing a rich Odoo-inspired color palette (Odoo Purple `#875A7B` combined with Indigo Blue accents).
- **Visual Effects**: Pulsing background mesh glows (`pulse-glow-1` & `pulse-glow-2`) designed to give mobile, tablet, and desktop screens a premium, modern feel.
- **Micro-Animations**: Hover animations on action cards, slide-in sidebars for mobile viewports, and reactive button shimmers.
- **Responsive Layout**: Fluid grid alignments built from scratch, ensuring usability on small smartphone screens up to 4K desktop displays.

---

## 📂 Project Architecture

```text
TransitOps/
├── frontend/                     # React Single Page Application (SPA)
│   ├── public/                   # Static icons & vectors
│   ├── src/
│   │   ├── assets/               # Image/SVG illustrations
│   │   ├── components/
│   │   │   ├── cards/            # Reusable KPI and info cards
│   │   │   ├── layout/           # Sidebar, Topbar, MainLayout templates
│   │   │   ├── tables/           # Sortable, paginated DataTable component
│   │   │   └── ui/               # Base UI elements (Badge, Buttons, Modals)
│   │   ├── context/              # AuthContext (global state, user profiles, RBAC checks)
│   │   ├── pages/                # 13 Dedicated application views
│   │   ├── routes/               # App Router & Private Guard routes
│   │   ├── services/             # Axios API integration hooks
│   │   └── utils/                # Helpers, dummy seeds, and constants
│   └── package.json
│
├── backend/                      # REST API Server
│   ├── config/                   # Database connection helper
│   ├── middleware/               # Auth middleware (token parsing, role guards)
│   ├── models/                   # 8 Mongoose Schemas (User, Vehicle, Trip, etc.)
│   ├── routes/                   # REST routing controllers
│   ├── utils/                    # Data seeder scripts
│   └── server.js                 # App entry point
```

---

## 🔒 Role-Based Access Control (RBAC) Matrix

Access to views and actions (Create, Read, Update, Delete) are strictly checked against user roles in both the frontend routes and backend controller endpoints:

| Feature / Page | Fleet Manager | Driver | Safety Officer | Financial Analyst |
| :--- | :---: | :---: | :---: | :---: |
| **Dashboard** | View | View | View | View |
| **Vehicles Registry** | Full CRUD | View | View | View |
| **Driver Profiles** | Full CRUD | View | Full CRUD | View |
| **Trip Dispatch** | Full CRUD | View Assigned | View | View |
| **Maintenance Logs** | Full CRUD | - | View | View |
| **Fuel Logs** | Full CRUD | - | - | Full CRUD |
| **Expenses Tracker** | Full CRUD | - | - | Full CRUD |
| **Reports & Charts** | View | - | View | View |

---

## 📦 Detailed Feature Modules

### 1. Unified Dashboard
- Real-time aggregation cards showcasing key metrics (active vehicles, trip dispatch counts, compliance ratings, fuel spending).
- Auto-adjusted welcome messages based on logged-in user profile names.
- Role-specific KPI metrics shown dynamically depending on permissions.

### 2. Fleet Registry (Vehicles & Drivers)
- Comprehensive tables tracking fleet status (`Available`, `On Trip`, `In Shop`, `Retired`).
- Driver registration module tracking driver license metrics, expiry dates, safety scores, and heavy/light vehicle license categories.

### 3. Smart Trip Dispatcher
- Dispatches active cargo trips with automatic business rule validations.
- **State Coupling**: Dispatching a trip automatically updates both the linked vehicle and the driver status to `On Trip` in MongoDB.
- Completing a trip frees up both the driver and vehicle to `Available`, increments the driver's trip count, and adds the trip mileage to the vehicle's odometer.

### 4. Maintenance Scheduler
- Tracks repair logs, costs, vendor workshops, and next scheduled service mileage.
- **Shop Locking**: Any vehicle marked `In Shop` under maintenance is automatically filtered out and blocked from trip dispatches.

### 5. Fuel & Expense Trackers
- Logs fuel top-ups, fuel efficiency ratings (km/litre), total fueling costs, and toll/repair expenditures.
- Dynamically shows data charts highlighting monthly expense trends.

---

## 🌐 API Endpoint Specifications

### Authentication
- `POST /api/v1/auth/register` — Registers a new user.
- `POST /api/v1/auth/login` — Returns user profile details and signed JWT.
- `POST /api/v1/auth/logout` — Ends active session.

### Fleet Operations
- `GET /api/v1/vehicles` — Returns all vehicles (supports status/region filters).
- `POST /api/v1/vehicles` — Creates a new vehicle record (Fleet Manager only).
- `PUT /api/v1/vehicles/:id` — Modifies vehicle details.
- `DELETE /api/v1/vehicles/:id` — Deletes vehicle from registry.

### Driver Operations
- `GET /api/v1/drivers` — Returns list of active drivers.
- `POST /api/v1/drivers` — Adds a driver (Safety Officer / Manager only).

### Trip Dispatch
- `GET /api/v1/trips` — Lists all trips.
- `POST /api/v1/trips` — Dispatches/Creates a new trip.
- `PATCH /api/v1/trips/:id/status` — Updates status (`Draft` ➔ `Dispatched` ➔ `Completed`).

### Finance & Maintenance
- `GET /api/v1/fuel` — Returns fuel efficiency logs.
- `POST /api/v1/expenses` — Log a new toll, repair, or administrative cost.
- `GET /api/v1/maintenance` — Lists fleet maintenance logs.

---

## 🚀 Setting Up the Application

### 1. Database Connection Configuration
Navigate to the `backend/` directory:
```bash
cd backend
```
Create a file named `.env` and configure your credentials:
```text
PORT=8000
MONGO_URI=mongodb+srv://sudoCoders:Sudo%4095Coders@cluster0.cvw5ubo.mongodb.net/transitops?appName=Cluster0
NODE_ENV=development
JWT_SECRET=qWERTyuiEDFGHjkcvbn
```

### 2. Frontend Configuration
Navigate to the `frontend/` directory:
```bash
cd ../frontend
```
Create a `.env` file pointing to your server API:
```text
VITE_API_URL=http://localhost:8000/api/v1
```

### 3. Run Commands

#### Start Database & Backend:
```bash
cd backend
npm install
npm run seed       # Seeds demo drivers, vehicles, and users with hashed passwords
npm run dev        # Starts server on http://localhost:8000
```

#### Start Frontend:
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev        # Launches development server on http://localhost:5174
```

---

## 🔑 Demo Account Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **Fleet Manager** | `ravi@transitops.in` | `fleet123` |
| **Driver** | `priya@transitops.in` | `driver123` |
| **Safety Officer** | `arjun@transitops.in` | `safety123` |
| **Financial Analyst** | `sneha@transitops.in` | `finance123` |
