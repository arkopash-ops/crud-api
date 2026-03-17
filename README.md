# Project Management CRUD API

A simple CRUD API to manage projects, project members, and project managers. Built using **Node.js**, **Express**, **TypeScript**, and **MongoDB**, with:

- **Cloudinary** for file storage  
- **Winston** for logging
- **Zod** for validation

---

## Features

- Create, Read, Update, and Delete projects
- Automatically calculates total members
- Track project status, priority, and tags
- Upload and store project files via **Cloudinary**
- Structured logging with **Winston**
- Validate request data using **Zod** for type-safe and reliable inputs


---

## Project Schema

```ts
enum ProjectStatus {
    PENDING = "pending",
    IN_PROGRESS = "in-progress",
    COMPLETED = "completed",
}

interface Project {
    projectName: string;
    description: string;
    projectMembers: string[];     // more than 1 member
    projectManagers: string[];     // more than 1 manager
    totalMembers: number;     // projectMembers.length + projectManagers.length
    projectLocation: {
        city: string;
        state: string;
        country: string;
    };
    projectFiles: string[];   // URLs from Cloudinary
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;
    isComplete: boolean;
    createdAt: Date;      // auto timestamp on creation
    updatedAt: Date;      // auto timestamp on update
}
```


---

## API Endpoints

| Method | Endpoint          | Description                |
| ------ | ----------------- | -------------------------- |
| POST   | /api/projects     | Create a new project       |
| GET    | /api/projects     | Get all projects           |
| GET    | /api/projects/:id | Get a single project by ID |
| PUT    | /api/projects/:id | Update a project           |
| DELETE | /api/projects/:id | Delete a project           |


---

***The API will be running at `http://localhost:8080`.***
