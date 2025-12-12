# Maumn (مأمن) - Student Exit System Backend

## Overview
**Maumn (مأمن)** is a smart Student Exit System designed to streamline and secure the process of dismissing students from schools. This project serves as the backend infrastructure for the Maumn platform, ensuring real-time synchronization, secure data management, and seamless communication between schools and parents.

This project was developed as a participation in the **Absher Tuwaiq Hackathon (هاكاثون أبشر طويق)**.

Built using **Node.js**, **Express.js**, and **Sequelize ORM**, it interacts with a **PostgreSQL** database to ensure data integrity and ease of management. It also leverages **Firebase** for authentication and **Socket.IO** for real-time updates.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Setup Instructions

1. Clone the repository:
    ```sh
    git clone https://github.com/LoOs5092/maumn-project.git
    ```

2. Navigate to the backend directory:
    ```sh
    cd maumn-project/BackEnd
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Create a `.env` file in the root directory and configure it:
    ```env
    PORT=3000
    DATABASE_URL=postgres://username:password@localhost:5432/your_database_name
    ```

## Usage

Start the development server:
```sh
npm run dev
```

Start the production server:
```sh
npm start
```

## API Endpoints

### Health Check
- **GET /health**: Check if the server is running.

### Users
- **POST /users**
- **GET /users**
- **GET /users/:id**
- **PUT /users/:id**
- **DELETE /users/:id**
### Get User By Phone Number
- **GET /users/phone/:phone**  
  Retrieves a user by their phone number. The endpoint normalizes various phone number formats.  
  - If the phone number does not start with a `+`, it is assumed to be a local Saudi Arabia number and prefixed with `+966`.  
  - Example requests:
    - `/users/phone/0555123456` will be normalized to `/users/phone/+966555123456`
    - `/users/phone/+966555123456` remains unchanged  
  - If the phone number is invalid or the user is not found, appropriate error responses will be returned.

### Schools
- **POST /schools**
- **GET /schools**
- **GET /schools/:id**
- **PUT /schools/:id**
- **DELETE /schools/:id**

### Grade Levels
- **POST /grade-levels**
- **GET /grade-levels**
- **GET /grade-levels/:id**
- **PUT /grade-levels/:id**
- **DELETE /grade-levels/:id**

### Students
- **POST /students**
- **GET /students**
- **GET /students/:id**
- **PUT /students/:id**
- **DELETE /students/:id**

### Authorized Pickups
- **POST /authorized-pickups**
- **GET /authorized-pickups**
- **GET /authorized-pickups/:id**
- **PUT /authorized-pickups/:id**
- **DELETE /authorized-pickups/:id**

### Dismissal Records
- **POST /dismissal-records**
- **GET /dismissal-records**
- **GET /dismissal-records/:id**
- **PUT /dismissal-records/:id**
- **DELETE /dismissal-records/:id**

### Announcements
- **POST /announcements**
- **GET /announcements**
- **GET /announcements/:id**
- **PUT /announcements/:id**
- **DELETE /announcements/:id**

## Environment Variables

- `PORT`: The port on which the server will run.
- `DATABASE_URL`: The URL to connect to your PostgreSQL database.

## Docker

To run the application using Docker, ensure you have a valid [`docker-compose.yml`](docker-compose.yml) file, then run:
```sh
docker-compose up --build
```
The application will be accessible at `http://localhost:3000`.

