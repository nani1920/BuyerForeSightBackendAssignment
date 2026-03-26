# Prospect Management System RESTful API

This project implements a RESTful API for a prospect management system, supporting structured data handling for potential leads, request validation, and comprehensive CRUD functionalities.

## Project Description

This backend API provides the core functionality for managing "prospects" (leads) for the BuyerForeSight assignment. It allows for creating, retrieving, updating, and deleting prospect information, including names, emails, phone numbers, and company details. The API is built with a focus on security and data integrity, featuring rate limiting, secure headers, and robust input validation.

## Technologies Used

*   **Node.js:** JavaScript runtime environment
*   **Express.js:** Web application framework for Node.js
*   **SQLite:** Relational database for persistent storage
*   **sqlite/sqlite3:** Database drivers for Node.js
*   **express-validator:** For robust request validation and sanitization
*   **helmet:** For securing the app by setting various HTTP headers
*   **morgan:** HTTP request logger middleware
*   **express-rate-limit:** To protect the API from brute-force/DOS attacks
*   **dotenv:** For managing environment variables

## Project Structure

```text
BuyerForeSightBackendAssignment/
├── index.js               # Application entry point and server setup
├── .env                   # Environment variables (not tracked by Git)
├── package.json           # Dependencies and project scripts
├── lib/
│   └── db/
│       ├── dbConnect.js   # SQLite connection and initialization
│       └── prospect_leads.db # SQLite database file
└── src/
    ├── controllers/       # Request handlers (logic for each route)
    │   └── userController.js
    ├── middleware/        # Custom middleware (e.g., validation handler)
    │   └── validateRequests.js
    ├── repositories/      # Data access layer (SQL queries)
    │   └── userRepository.js
    ├── requests/          # Validation rules using express-validator
    │   └── userRequest.js
    └── routes/            # API route definitions
        └── user.js
```

## Features

*   **Prospect Management:**
    *   Create new prospects with unique email validation.
    *   Retrieve a list of all prospects with support for searching, sorting, and pagination.
    *   Retrieve detailed information for a specific prospect by ID.
    *   Update existing prospect details.
    *   Delete prospect records.
*   **Security & Validation:**
    *   Rate limiting (100 requests per 15-minute window).
    *   Secure HTTP headers via Helmet.
    *   Comprehensive input validation for all endpoints (email format, phone length, etc.).
    *   CORS support for cross-origin requests.

## Installation

To set up and run the API locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/BuyerForeSightBackendAssignment.git
    cd BuyerForeSightBackendAssignment
    ```
    *  Replace `YOUR_USERNAME` with your github username.
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file in the root directory.** Include the following environment variables:
    ```
    PORT=3000
    ```
    *   `PORT`: The port number the server will listen on (default 3000).

## Usage

1.  **Start the server:**
    ```bash
    npm run dev
    ```
    (Uses `nodemon` for automatic restarts)
2. The API will be accessible at `http://localhost:3000` (or the port specified in your `.env` file).

3.  **API Endpoints:**

    *   **Base:**

        ### Health Check
        **GET** `/`
        Returns a simple "server is running" message to verify the API is online.

    *   **Users (Prospects):**

        ### Create Prospect Endpoint

        **POST** `/api/user/`

        #### Description:
        This endpoint allows creating a new prospect by providing their `name`, `email`, `phone`, and `company`. It validates that the email is unique and the data formats are correct.

        #### Request Format:

        **URL**: `/api/user/`

        **Method**: `POST`

        **Request Body (JSON)**:
        ```json
        {
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "phone": "9876543210",
            "company": "Tech Corp"
        }
        ```
        * `name` (required, string): Min 3 characters.
        * `email` (required, string): Must be a valid, unique email.
        * `phone` (required, string): Must be exactly 10 digits.
        * `company` (required, string): Min 3 characters.

        #### Expected Responses:

        *   **201 Created**: Prospect created successfully.
            ```json
            {
                "success": true,
                "data": "user created Successfully",
                "user": { ... }
            }
            ```
        *   **400 Bad Request**: Validation failed or user already exists.
            ```json
            {
                "success": false,
                "message": "user already Exists with this Mail"
            }
            ```

        ### Get All Prospects Endpoint

        **GET** `/api/user/`

        #### Description:
        Retrieves all prospects. Supports searching, sorting, and pagination via query parameters.

        #### Request Format:

        **URL**: `/api/user/`

        **Method**: `GET`

        **Query Parameters:**
        * `search` (optional): Filter by name.
        * `sort` (optional): Field to sort by (default: `name`).
        * `order` (optional): `asc` or `desc` (default: `asc`).
        * `limit` (optional): Number of records (default: 20).
        * `offset` (optional): Number of records to skip (default: 0).

        #### Expected Responses:
        * **200 OK**: Returns an array of prospects.
        * **404 Not Found**: If no prospects match the criteria.

        ### Get Prospect by ID Endpoint

        **GET** `/api/user/:id`

        #### Description:
        Retrieves a specific prospect by its numeric ID.

        #### Request Format:

        **URL**: `/api/user/:id`
        **Method**: `GET`

        #### Expected Responses:
        * **200 OK**: Returns the prospect data.
        * **404 Not Found**: If the prospect is not found.

        ### Update Prospect Endpoint

        **PUT** `/api/user/:id`

        #### Description:
        Updates an existing prospect's information.

        #### Request Format:

        **URL**: `/api/user/:id`
        **Method**: `PUT`

        **Request Body (JSON)**: (All fields optional)
        ```json
        {
            "name": "Updated Name",
            "email": "new.email@example.com"
        }
        ```

        #### Expected Responses:
        * **200 OK**: Prospect updated successfully.
        * **404 Not Found**: If the prospect is not found.

        ### Delete Prospect Endpoint

        **DELETE** `/api/user/:id`

        #### Description:
        Deletes a prospect record from the database.

        #### Expected Responses:
        * **200 OK**: Prospect deleted successfully.
        * **404 Not Found**: If the prospect is not found.

## Deployment

The application can be deployed to platforms like **Render**, **Heroku**, or **DigitalOcean**. Ensure the SQLite database path is correctly handled if using ephemeral filesystems (consider using an external DB or persistent volume).

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/new-feature`).
3.  Commit your changes (`git commit -m "Add new feature"`).
4.  Push to your fork (`git push origin feature/new-feature`).
5.  Create a Pull Request.

## License

[ISC](https://choosealicense.com/licenses/isc/) (from `package.json`)
