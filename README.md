# Full-Stack Project: Angular 17 & NestJS

A modern full-stack web application leveraging Angular 17 for the frontend and NestJS for the backend, integrated with PostgreSQL. This project demonstrates a scalable architecture suitable for enterprise-level applications.

## 🛠️ Tech Stack

- **Frontend**: Angular 17  
- **Backend**: NestJS  
- **Database**: PostgreSQL (via Docker)  
- **Styling**: Tailwind CSS  
- **Code Quality**: ESLint, Prettier  
- **Tooling**: Nx Monorepo

## 📁 Project Structure and Getting Started

```bash
# Folder structure:
apps/
├── backend/   # NestJS application
└── ui/        # Angular application

# Prerequisites:
# - Node.js (v18 or later)
# - Docker (for PostgreSQL)

# Clone the repository:
git clone https://github.com/hn05012/Full-Stack-Project-Angular-NestJS.git
cd Full-Stack-Project-Angular-NestJS

# Install dependencies:
npm install

# Start backend and frontend:
npm run start:backend
npm run start:ui

# Backend will be running at: http://localhost:3333
# Frontend will be running at: http://localhost:4200
