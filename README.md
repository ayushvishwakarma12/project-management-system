# Project Management System

Welcome to the **Project Management System**! This is a comprehensive full-stack web application designed to help manage projects, tasks, and teams efficiently. The system provides various features for project planning, task management.

## Features

### Dashboard

- **Project Overview**: View all projects with start and end dates.
- **Task PieChart**: Visual representation of task statuses (e.g., completed, pending, in progress).
- **User Overview**: View and manage all users in the system.

### Project Page

- **Project Details**: View detailed information about each project, including start and end dates, team members, and project manager.
- **CRUD Operations**: Create, update, and delete projects.

### Task Page

- **Task Management**: Admins can create tasks and assign them to users.
- **Task Status**: Track the status of tasks (To Do, In Progress, Completed).
- **Task Priority**: Assign and view the priority of tasks.
- **CRUD Operations**: Create, update, and delete tasks.

### User Page

- **User Management**: Admins can view all users and their details.

### Authentication

- **Login/Signup**: Secure authentication system using JWT tokens.

## Technology Stack

### Backend

- **Java**: Primary language for backend development.
- **Spring Boot**: Framework for building the backend API.
- **Spring Security**: For authentication and authorization using JWT tokens.
- **PostgreSQL**: Database for storing user, project, and task data.
- **JWT (JSON Web Token)**: For securing API endpoints.

### Frontend

- **React**: Frontend framework for building user interfaces.
- **TypeScript**: Superset of JavaScript for type safety and enhanced code quality.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For handling navigation and routing in the application.

### Deployment

- **Frontend**: Deployed on Vercel. [View Live Demo](https://project-management-system-ksvh0tmlz.vercel.app)
- **Backend**: Deployed on a cloud service, handling API requests and data management.

## Installation

### Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/ayushvishwakarma12/project-management-system.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd project-management-system
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm start
   ```

### Backend

1. Clone the backend repository:

   ```bash
   git clone https://github.com/ayushvishwakarma12/project-management-system-API.git
   ```

2. Navigate to the backend directoryand follow the setup instruction in the backend README.

### Usage

1. Login with your credentialsor sign up as a new user.

2. Use the dashboard to manage projects, tasks and users.
