# HealthDocs – Design Document

## 1. Tech Stack Choices

###  Frontend framework

**Chosen:** React with TypeScript (via Vite)

**Why:**

- React is widely used and great for building component-based UIs.
- TypeScript catches type errors early and improves maintainability.
- Vite gives a very fast dev environment and simple configuration.

---

###  Backend framework

**Chosen:** Node.js with Express + TypeScript

**Why:**

- Express is lightweight and easy to set up for REST APIs.
- Works very well with middleware like `multer` for file uploads.
- TypeScript improves type safety and makes refactoring easier.
- Node.js is good for I/O-heavy workloads like file uploads/downloads.

---

###  Database

**Chosen:** MySQL (via XAMPP) with TypeORM

**Why:**

- MySQL is easy to run locally using XAMPP and is a familiar relational DB.
- TypeORM integrates well with TypeScript and gives an ORM layer (entities, repositories).
- The schema is simple (single `documents` table), so a relational DB is more than enough.

Table: `documents`

- `id` – INT, primary key, auto-increment
- `filename` – original filename (string)
- `filepath` – path on disk where file is stored
- `filesize` – file size in bytes
- `created_at` – timestamp when uploaded

---

### Scaling to 1,000 users – what would change?

If I had to support ~1,000 users:

- **File storage:**
  - Move from local `uploads/` folder to an object storage (e.g., S3 or similar).
  - Store only the URL / key in the database.
- **Database:**
  - Use a managed MySQL/PostgreSQL instance instead of local XAMPP.
  - Add indexes on frequently accessed columns (e.g., `created_at`).
- **Backend:**
  - Add proper authentication & per-user document isolation.
  - Implement pagination for `/documents` (e.g., `?page=1&limit=10`).
  - Add rate-limiting and better validation for file size / type.
- **Frontend:**
  - Show loading states, pagination controls, and handle errors more gracefully.
- **Infra:**
  - Containerize with Docker, use environment-based configs, and deploy to a cloud VM or managed platform.

---

## 2. Architecture Overview

### Components

- **Frontend (React + Vite + TS)**
  - Handles UI: file upload form, list of documents, download & delete actions.
  - Talks to backend via Axios (`/api/...` endpoints).

- **Backend (Express + TS + TypeORM)**
  - Exposes REST APIs under `/api`.
  - Uses `multer` to handle file uploads.
  - Stores files in `backend/src/uploads/`.
  - Stores metadata in MySQL via TypeORM.

- **Database (MySQL)**
  - Single table: `documents`.
  - Stores file metadata only, not file contents.

- **File Storage**
  - Local folder: `backend/src/uploads/`.

### Flow (high-level)

1. User interacts with React UI in the browser.
2. React calls backend APIs (`/api/documents/...`) using Axios.
3. Backend:
   - For uploads: receives file via `multer`, saves to `uploads/`, stores metadata in DB.
   - For list: reads metadata from DB.
   - For download: finds metadata in DB, reads file from disk, streams file.
   - For delete: deletes file from disk and metadata from DB.
4. Response is sent back to frontend and shown to the user.

---

## 3. API Specification

**Base URL:** `http://localhost:3000/api`

### 3.1 `POST /documents/upload` – Upload a PDF

- **URL:** `/api/documents/upload`
- **Method:** `POST`
- **Request type:** `multipart/form-data`
- **Form field:** `file` (must be a PDF)

**Sample Request (curl):**
Upload a PDF : curl --location 'http://localhost:3000/api/documents/upload' \
--form 'file=@"/C:/Users/SACHIN KUMAR/Resume/DECEMBER 25/Sachin_Kumar_Resume.pdf"'

Fetch All Documents : curl --location 'http://localhost:3000/api/documents'

Download a Document : curl --location --request DELETE 'http://localhost:3000/api/documents/3' 

Delete a Document : curl --location --request DELETE 'http://localhost:3000/api/documents/3'


