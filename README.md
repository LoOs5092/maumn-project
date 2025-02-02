# Graduation Project - BackEnd

## Overview
This project is the backend service for the Graduation Project. It provides APIs for managing and processing data related to the project.

## Technologies Used
- Java
- Spring Boot
- Hibernate
- MySQL

## Setup Instructions
1. Clone the repository:
    ```
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```
    cd GraduationProject/BackEnd
    ```
3. Configure the database connection in `application.properties`:
    ```
    spring.datasource.url=jdbc:mysql://localhost:3306/your_database
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```
4. Build the project:
    ```
    ./mvnw clean install
    ```
5. Run the application:
    ```
    ./mvnw spring-boot:run
    ```

## API Endpoints
- `GET /api/resource` - Retrieves a list of resources
- `POST /api/resource` - Creates a new resource
- `PUT /api/resource/{id}` - Updates an existing resource
- `DELETE /api/resource/{id}` - Deletes a resource

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License
This project is licensed under the MIT License.