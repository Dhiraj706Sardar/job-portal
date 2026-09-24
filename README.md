# Full-Stack MERN Job Portal

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)](https://github.com/Dhiraj706Sardar/job-portal)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2B%20Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-orange?style=for-the-badge)](#license)

A full-stack job portal built with MongoDB, Express, React (Vite), and Node. It connects job seekers with recruiters through role-based accounts, a working application pipeline, resume uploads handled through Cloudinary, and dashboards for managing postings and candidates.

---

## Table of Contents

- [Features](#features)
  - [For Candidates](#for-candidates)
  - [For Recruiters](#for-recruiters)
  - [Security and Authentication](#security-and-authentication)
  - [Sample Data Seeding](#sample-data-seeding)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [API Reference](#api-reference)
  - [User Routes](#user-routes-apiv1user)
  - [Company Routes](#company-routes-apiv1company)
  - [Job Routes](#job-routes-apiv1job)
  - [Application Routes](#application-routes-apiv1application)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. Seed the Database (Optional)](#4-seed-the-database-optional)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### For Candidates

Job seekers get a landing page with category carousels and a keyword search, plus filtering by location, industry, salary range, and job type — full-time, part-time, remote, or internship. Each job listing page lays out the role's requirements, salary in LPA, experience level, and the hiring company's profile. Applying takes one click, with instant feedback and a check to stop someone applying twice for the same role. Candidates can also keep their profile current — contact details, a short bio, skills, a profile photo, and a PDF resume — and track every application's status (pending, accepted, or rejected) from one place.

### For Recruiters

Recruiters work from a dashboard that's locked behind authentication, separate from the candidate-facing side of the app. From there they can register a company profile with a description, website, location, and logo, then post job openings with details like experience level, number of openings, salary, requirements, and employment type. For each posting, recruiters can see everyone who applied, review their profile and contact info, download resumes, and mark applicants as accepted or rejected.

### Security and Authentication

Authentication runs on JWTs stored in HTTP-only cookies, with passwords hashed using bcryptjs. API routes are protected on the backend, and the frontend mirrors this with route guards in React Router. File uploads — profile photos, resumes, company logos — go through Multer, get converted with DataURI, and are stored on Cloudinary.

### Sample Data Seeding

A Faker.js script (`seed.js`) is included for generating test data — 100 companies and 100 jobs, all linked to a recruiter account, so you don't have to populate the database by hand while developing.

---

## Tech Stack

**Frontend**
- React 18, built with Vite
- Redux Toolkit and Redux Persist for state
- React Router DOM v6
- Tailwind CSS, with `@tailwindcss/animate`
- Radix UI / Shadcn UI for component primitives
- Lucide React for icons, Framer Motion for animation
- Sonner for notifications
- Axios for HTTP requests

**Backend**
- Node.js (ES Modules)
- Express.js
- MongoDB with Mongoose
- JWT authentication via `jsonwebtoken` and `cookie-parser`
- Password hashing with `bcryptjs`
- File uploads via `multer`, `datauri`, and `cloudinary`
- Mock data generation with `@faker-js/faker`
- `nodemon`, `dotenv`, and `cors` for development

---

## Folder Structure

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

## API Reference

Base URL: `http://localhost:3000/api/v1`

### User Routes (`/api/v1/user`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user (student or recruiter) with an avatar | Public |
| `POST` | `/login` | Log in and receive a JWT cookie | Public |
| `GET` | `/logout` | Clear the auth cookie | Public |
| `POST` | `/profile/update` | Update bio, skills, profile photo, and resume | Authenticated |

### Company Routes (`/api/v1/company`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new company | Recruiter |
| `GET` | `/get` | List companies registered by the logged-in recruiter | Recruiter |
| `GET` | `/get/:id` | Get details for a specific company | Recruiter |
| `PUT` | `/update/:id` | Update company info and upload a logo | Recruiter |

### Job Routes (`/api/v1/job`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/post` | Create a new job listing | Recruiter |
| `GET` | `/get` | List all jobs, with support for keyword search | Public |
| `GET` | `/getadminjobs` | List jobs posted by the logged-in recruiter | Recruiter |
| `GET` | `/get/:id` | Get details for a specific job | Public |

### Application Routes (`/api/v1/application`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/apply/:id` | Apply for a job | Candidate |
| `GET` | `/get` | List jobs the logged-in user has applied to | Candidate |
| `GET` | `/:id/applicants` | List applicants for a specific job | Recruiter |
| `POST` | `/status/:id/update` | Update an applicant's status (accepted or rejected) | Recruiter |

---

## Environment Variables

Create a `.env` file inside `backend/`:

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

## Getting Started

### Prerequisites

- Node.js, version 18 or higher
- MongoDB, either a local instance or an Atlas connection string
- A free Cloudinary account for storing media

### 1. Clone the Repository

```bash
git clone https://github.com/Dhiraj706Sardar/job-portal.git
cd job-portal
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create your `.env` file and fill in your MongoDB and Cloudinary credentials:

```bash
cp .env.example .env # or create backend/.env manually
```

Then start the backend:

```bash
npm run dev
```

The server runs on `http://localhost:3000`.

### 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app launches at `http://localhost:5173`.

### 4. Seed the Database (Optional)

To quickly populate the database with 100 companies and 100 jobs:

1. Register at least one recruiter account through the web UI first.
2. From the `backend/` folder, run:

```bash
npm run seed
```

To wipe existing mock data and start fresh:

```bash
npm run seed -- --clean
```

---

## Available Scripts

**Backend (`/backend`)**

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the backend with `nodemon` for auto-restarts |
| `npm run seed` | Seeds the database with 100 companies and 100 jobs |
| `npm run seed -- --clean` | Clears existing jobs and companies, then reseeds |

**Frontend (`/frontend`)**

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite dev server with hot reload |
| `npm run build` | Builds and optimizes assets for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint across the codebase |

---

## Contributing

Contributions, issues, and feature requests are all welcome.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

---

## License

This project is licensed under the ISC License.