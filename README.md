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
```

## 💡 Codebase Overview
- This project showcases a full-stack application where the frontend, built with Angular 17, integrates seamlessly with a NestJS backend. It demonstrates key full-stack concepts, including:

- Modular Architecture: The app is organized into reusable components, services, and modules in both the Angular and NestJS layers, ensuring maintainability and scalability.

- Form Handling & Validation: The Angular frontend handles complex user forms with reactive forms and validation, ensuring that data input is efficient and error-free.

- CRUD Operations: The app provides basic CRUD functionality for managing user and company data, implementing smooth interactions between the frontend and backend.

- Integration with PostgreSQL: The project integrates a PostgreSQL database running via Docker to persist data.

- API Development: The NestJS backend serves as a RESTful API, providing endpoints for user and company management.

🚀 Features
- User Management: Create, update, and view users with detailed profiles and associated company data.

- Company Management: Add and manage companies and their associated users.

- Responsive UI: The Angular app is styled with Tailwind CSS for a clean and responsive design.

- API Integration: Communicates with the backend to perform CRUD operations via HTTP requests.

By leveraging this stack, the project demonstrates modern web development practices with an emphasis on modularity, scalability, and seamless integration between frontend and backend technologies.
