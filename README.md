TEAM TASK MANAGER PROJECT

Project Type:
Full Stack Team Task Management Application

Tech Stack:
Frontend:

* React.js
* Vite
* CSS / Tailwind CSS

Backend:

* Node.js
* Express.js

Database:

* PostgreSQL
* Prisma ORM

Authentication:

* JWT Authentication
* bcrypt password hashing

Deployment:

* Railway (Backend)
* GitHub Repository

Project Features:

1. User Authentication

   * Signup
   * Login
   * JWT token generation
   * Role based access

2. Project Management

   * Create Projects
   * View Projects
   * Manage Team Tasks

3. Task Management

   * Create Tasks
   * Update Tasks
   * Delete Tasks
   * Track task progress

4. Dashboard

   * Project statistics
   * Task overview

Folder Structure:

team-task-manager/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│   ├── index.js
│   ├── prismaClient.js
│   └── package.json
│
└── README.md

Environment Variables:

DATABASE_URL=
JWT_SECRET=
PORT=8080

Installation Steps:

1. Clone Repository
   git clone <repository-url>

2. Install Frontend Dependencies
   cd client
   npm install

3. Install Backend Dependencies
   cd ../server
   npm install

4. Run Prisma Migration
   npx prisma migrate dev

5. Generate Prisma Client
   npx prisma generate

6. Start Backend Server
   npm start

7. Start Frontend
   cd ../client
   npm run dev

Railway Deployment:

* Root Directory: server
* Build Command: npm install
* Start Command: npm start

Author:
Vaibhav Gupta
