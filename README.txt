# Team Task Manager (Full-Stack MERN Application)

## Live Demo

Frontend (Vercel): [https://team-task-manager-pi-ruddy.vercel.app](https://team-task-manager-pi-ruddy.vercel.app)

## GitHub Repository

[https://github.com/Chiinmay1234/Team-Task-Manager](https://github.com/Chiinmay1234/Team-Task-Manager)

---

# Project Overview

Team Task Manager is a full-stack MERN application developed for managing projects, assigning tasks, tracking progress, and implementing role-based access control.

The application allows users to:

* Create and manage projects
* Create and manage tasks
* Track task status
* View dashboard analytics
* Use secure authentication
* Access features based on user roles (Admin / Member)

This project was built using:

* React.js
* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Tailwind CSS
* Railway Deployment
* Vercel Deployment

---

# Features

## Authentication

* User Signup
* User Login
* JWT Authentication
* Secure Protected Routes
* Logout Functionality

## Project Management

* Create Projects
* View Projects
* Project Description Support

## Task Management

* Create Tasks
* View Tasks
* Update Task Status
* Delete Tasks
* Task Status Tracking

## Dashboard

* Total Tasks
* Completed Tasks
* Pending Tasks
* Overdue Tasks

## Role-Based Access Control (RBAC)

### Admin

* Create Projects
* Create Tasks
* Delete Tasks

### Member

* View Projects
* View Tasks
* Update Task Status

## Deployment

* Backend deployed using Railway
* Frontend deployed using Vercel

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Vite

## Backend

* Node.js
* Express.js

## Database

* MongoDB

## Authentication

* JWT (JSON Web Token)
* bcrypt.js

## Deployment

* Railway
* Vercel

---

# Folder Structure

```
Team-Task-Manager
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Chiinmay1234/Team-Task-Manager.git
```

---

# Backend Setup

```bash
cd server
npm install
npm start
```

Backend runs on:

```bash
http://localhost:8000
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside the server folder.

Example:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=8000
```

---

# API Endpoints

## Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

## Projects

* GET `/api/projects`
* POST `/api/projects`

## Tasks

* GET `/api/tasks`
* POST `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`

## Dashboard

* GET `/api/dashboard`

---

# Future Improvements

* Assign tasks to team members visually
* Add due date picker
* Add task filtering
* Add profile management
* Improve dashboard analytics
* Add notifications

---

# Author

Chinmayi Sharma
B.Tech Computer Science Engineering
Amity University, Noida

---

# Project Status

Completed and deployed successfully.
