# Task Manager API

A RESTful API for managing tasks and users, built with **Node.js**, **Express**, **Prisma**, and **TypeScript**. Includes JWT-based authentication, task CRUD with filtering and pagination, rate limiting, and more.

## Setup & Installation

### Clone the Repository

```git clone https://github.com/yourusername/task-manager-api.git```
```cd task-manager-api ```

### Install Dependencies
``` npm install```

### Create a .env file
Create a .env file in the root directory and add:
```DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE```
```JWT_SECRET=your_jwt_secret```

### Start the Development Server
```npm run dev```

Server will run on http://localhost:3000

### Testing
```npm test```
