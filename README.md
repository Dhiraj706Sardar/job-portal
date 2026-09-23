# 💼 Full-Stack MERN Job Portal

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)](https://github.com/Dhiraj706Sardar/job-portal)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2B%20Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-orange?style=for-the-badge)](#license)

A modern, production-ready **Full-Stack Job Portal** application built using **MongoDB, Express.js, React.js (Vite), and Node.js**. It bridges the gap between aspiring candidates and hiring companies with role-based authentication, real-time job application workflows, resume uploads via Cloudinary, and administrative dashboards.

---

## 📑 Table of Contents

- [Features](#-features)
  - [Candidate / Job Seeker Features](#-candidate--job-seeker-features)
  - [Recruiter / Employer Features](#-recruiter--employer-features)
  - [Security & Authentication](#-security--authentication)
  - [Mock Data Generation](#-automated-data-seeding)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [API Endpoints Reference](#-api-endpoints-reference)
  - [User Routes](#user-routes-apiv1user)
  - [Company Routes](#company-routes-apiv1company)
  - [Job Routes](#job-routes-apiv1job)
  - [Application Routes](#application-routes-apiv1application)
- [Environment Variables](#-environment-variables)
- [Installation & Getting Started](#-installation--getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. Seed Database (Optional)](#4-database-seeding-optional)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Features

### 👨‍🎓 Candidate / Job Seeker Features
- **Hero & Landing Experience**: Interactive category carousels, latest job cards, and keyword search.
- **Job Discovery & Filtering**: Search and filter jobs by location, industry/technology, salary range, and job type (Full-time, Part-time, Remote, Internship).
- **Job Details View**: Detailed view of job specifications, requirements, salary (LPA), experience level, and company profile.
- **One-Click Application**: Apply directly for listed openings with instant feedback and duplicate application prevention.
- **Profile Management**: Update contact details, bio, skills, profile picture, and upload a PDF resume.
- **Application History**: Track applied jobs with live status indicators (`Pending`, `Accepted`, `Rejected`).

### 🏢 Recruiter / Employer Features
- **Role-Based Protected Access**: Exclusive recruiter dashboard guarded by authentication middleware.
- **Company Management**: Register company profiles, set descriptions, website URLs, locations, and upload logos.
- **Job Posting & Management**: Post new job listings with customizable experience requirements, openings count, salary, requirements list, and employment types.
- **Applicant Tracking System (ATS)**:
  - View all applicants per posted job.
  - Review candidate profile details, contact info, and downloadable resumes.
  - Update candidate status dynamically (`Accepted` / `Rejected`).

### 🔐 Security & Authentication
- Secure JWT (JSON Web Token) authentication stored in HTTP-only cookies.
- Password hashing with **bcryptjs**.
- Protected API routes and React Router client-side route guards.
- Media and resume uploads processed with **Multer** and securely stored on **Cloudinary** using DataURI buffers.

### 🎲 Automated Data Seeding
- Includes a dedicated Faker.js script (`seed.js`) capable of automatically generating **100 realistic companies** and **100 categorized jobs** linked to a recruiter account.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/) via [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/animate`
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)
- **Icons & Motion**: [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Authentication**: `jsonwebtoken` (JWT) & `cookie-parser`
- **Password Security**: `bcryptjs`
- **File Uploads**: `multer` + `datauri` + `cloudinary`
- **Mock Data**: `@faker-js/faker`
- **Dev Tooling**: `nodemon`, `dotenv`, `cors`

---

## 📂 Folder Structure

```text
job-portal/
├── backend/
│   ├── controllers/            # Route controllers (user, job, company, application)
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── user.controller.js
│   ├── middlewares/            # Auth and file upload middlewares
│   │   ├── isAuthenticated.js
│   │   └── mutler.js
│   ├── models/                 # Mongoose schemas & models
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   ├── routes/                 # Express route definitions
│   │   ├── application.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── user.route.js
│   ├── utils/                  # DB connection and Cloudinary helper
│   │   ├── cloudinary.js
│   │   ├── datauri.js
│   │   └── db.js
│   ├── index.js                # Express app entry point
│   ├── seed.js                 # Faker database seed script
│   └── package.json
│
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images & static media
│   │   ├── components/         # React components
│   │   │   ├── admin/          # Recruiter/Admin components (Companies, PostJob, Applicants)
│   │   │   ├── auth/           # Login & Signup forms
│   │   │   ├── shared/         # Navbar, Footer
│   │   │   ├── ui/             # Radix / Shadcn reusable UI components
│   │   │   ├── Browse.jsx      # Browse search page
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── JobDescription.jsx # Single job details page
│   │   │   ├── Jobs.jsx        # Jobs listing with sidebar filters
│   │   │   └── Profile.jsx     # User profile & applied jobs table
│   │   ├── hooks/              # Custom React hooks for data fetching
│   │   ├── redux/              # Redux slices (auth, job, company, application) & store
│   │   ├── utils/              # API endpoints & utility functions
│   │   ├── App.jsx             # React Router configuration
│   │   ├── index.css           # Tailwind CSS directives & theme
│   │   └── main.jsx            # React root & Redux Provider setup
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 📡 API Endpoints Reference

Base URL: `http://localhost:3000/api/v1`

### User Routes (`/api/v1/user`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user (`student` or `recruiter`) with avatar | Public |
| `POST` | `/login` | Authenticate user & set JWT cookie | Public |
| `GET` | `/logout` | Clear auth token cookie | Public |
| `POST` | `/profile/update` | Update bio, skills, profile photo, and resume | Authenticated |

### Company Routes (`/api/v1/company`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new company | Recruiter |
| `GET` | `/get` | Get all companies registered by logged-in recruiter | Recruiter |
| `GET` | `/get/:id` | Get company details by ID | Recruiter |
| `PUT` | `/update/:id` | Update company information and upload logo | Recruiter |

### Job Routes (`/api/v1/job`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/post` | Create and post a new job listing | Recruiter |
| `GET` | `/get` | Get all jobs (supports search keyword queries) | Public |
| `GET` | `/getadminjobs` | Get all jobs posted by logged-in recruiter | Recruiter |
| `GET` | `/get/:id` | Get job details by ID | Public |

### Application Routes (`/api/v1/application`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/apply/:id` | Apply for a specific job | Candidate |
| `GET` | `/get` | Get all applied jobs for logged-in user | Candidate |
| `GET` | `/:id/applicants`| Get all applicants for a specific job | Recruiter |
| `POST` | `/status/:id/update`| Update applicant status (`accepted` or `rejected`) | Recruiter |

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Port
PORT=3000

# MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/jobportal?retryWrites=true&w=majority

# JWT Secret Key
SECRET_KEY=your_super_secret_jwt_key_here

# Cloudinary Credentials (for image & resume uploads)
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

---

## 🚀 Installation & Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- [Cloudinary](https://cloudinary.com/) free account for media storage

---

### 1. Clone the Repository
```bash
git clone https://github.com/Dhiraj706Sardar/job-portal.git
cd job-portal
```

---

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file and fill in your MongoDB and Cloudinary credentials:
   ```bash
   cp .env.example .env # Or manually create backend/.env
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:3000`.*

---

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client app will launch at `http://localhost:5173`.*

---

### 4. Database Seeding (Optional)
To quickly populate the database with **100 realistic companies** and **100 jobs**:

1. Ensure at least one recruiter account is registered via the web UI.
2. Run the seed command inside the `backend/` folder:
   ```bash
   cd backend
   npm run seed
   ```
3. To wipe existing mock jobs/companies and re-seed from scratch:
   ```bash
   npm run seed -- --clean
   ```

---

## 📜 Available Scripts

### Backend (`/backend`)
| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts backend server with `nodemon` for auto-restarts |
| `npm run seed` | Seeds database with 100 Faker companies & 100 jobs |
| `npm run seed -- --clean` | Clears existing jobs/companies and seeds fresh data |

### Frontend (`/frontend`)
| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with hot-reload |
| `npm run build` | Compiles and optimizes assets for production deployment |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint analysis across the codebase |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.
