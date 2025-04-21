# Graduation Project (Student Exit System) - Backend

## Overview
This project is the backend service for the Student Exit System. It provides a comprehensive set of APIs for managing and processing data related to student exits. Built using Node.js, Express.js, and Sequelize ORM, it interacts with a PostgreSQL database to ensure data integrity and ease of management.

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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the ISC License. See the LICENSE file for details.
