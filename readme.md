# 🚀 fastor_assignment: CRM Lead Management Backend

A comprehensive REST API implementation for a Customer Relationship Management (CRM) system designed to manage lead assignment and tracking for counselors and employees.

## Description

This project implements the backend REST API for a simple Lead Management system and fulfills the requirements of the Fastor Node.js Developer assignment. It is built using **Node.js** and **Express.js**, and uses **JWT (JSON Web Tokens)** for secure authentication. The main goal is to manage the lifecycle of a lead, allowing employees to claim a public inquiry and convert it into a private inquiry assigned exclusively to them.

## Prerequisites

Required tools and versions for a seamless setup:

- Operating system (OS): Platform-independent (Windows, macOS, Linux)
- Node.js: Version >= 18.x (LTS recommended)
- Package manager: npm (bundled with Node.js)
- Database: A running instance of PostgreSQL, MySQL, or MongoDB
- API client: Postman or Insomnia (for testing endpoints)

## Installation

Follow these steps to run the project locally.

### Clone the repository and install dependencies

1. Clone the repository:

```bash
git clone https://github.com/2003devansh/fastor_assingment.git
cd fastor_assignment
```

2. Install dependencies:

```bash
npm install
```

### Environment configuration

Create a file named `.env` in the project root and configure the following variables:

```env
# Database URL (Prisma requires a full URL — example shown is for PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/fastor_crm?schema=public"

# JWT secret used to sign and verify tokens
JWT_SECRET="YOUR_SUPER_STRONG_SECRET_KEY_FOR_JWT_SIGNING"

# Server port
PORT=2000
```

### Database Initialization

Run the following command to initialize the database:

```bash
npx prisma db push
```

## API Workflow

| Step      | Method | Path                       | Action             | Headers/Body Details                                               |
| --------- | ------ | -------------------------- | ------------------ | ------------------------------------------------------------------ |
| Auth      | POST   | `/api/auth/register`       | Create Employee    | `{"email": "a@crm.com", "password": "pass"}`                       |
| Auth      | POST   | `/api/auth/login`          | Login & Get Token  | `{"email": "a@crm.com", "password": "pass"}`                       |
| Public    | POST   | `/api/enquiries/public`    | Submit Lead        | `{"name": "Client Sam", "email": "sam@test.com", "course": "MBA"}` |
| Protected | GET    | `/api/enquiries/unclaimed` | View Public Leads  | Header: `Authorization: Bearer <Token>`                            |
| Protected | PATCH  | `/api/enquiries/1/claim`   | Claim Lead         | Header: `Authorization: Bearer <Token>`                            |
| Protected | GET    | `/api/enquiries/claimed`   | View Private Leads | Header: `Authorization: Bearer <Token>`                            |

------------------END

Project Maintainer :- Devansh Singh Faujdur , Gmail :- faujdardevansh@gmail.com
