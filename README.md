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

## API Endpoints

### 🟢 Base

#### `GET /`
**Summary:** Health Check
**Description:** Returns a simple "server is running" message to verify the API is online.

| Code | Description | Sample Response |
| :--- | :---------- | :-------------- |
| 200 | OK | `"server is running"` |

---

### 👤 Users (Prospects)

#### `POST /api/user/`
**Summary:** Create Prospect
**Description:** Create a new prospect after validating unique email and data formats.

**Request Body (JSON):**
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| name | string | Yes | Min 3 characters |
| email | string | Yes | Unique, valid email format |
| phone | string | Yes | Exactly 10 digits |
| company | string | Yes | Min 3 characters |

**Responses:**
| Code | Description | Sample Response |
| :--- | :---------- | :-------------- |
| 201 | Created | `{"success":true,"data":"user created Successfully","user":{...}}` |
| 400 | Bad Request | `{"success":false,"message":"user already Exists with this Mail"}` |
| 500 | Server Error | `{"success":false,"message":"internal server error"}` |

---

#### `GET /api/user/`
**Summary:** Get All Prospects
**Description:** Retrieves a list of prospects with support for filtering and pagination.

**Query Parameters:**
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| search| string | "" | Filter by name |
| sort | string | "name" | Field to sort by |
| order | string | "asc" | Sort order (`asc`, `desc`) |
| limit | integer| 20 | Records per page |
| offset| integer| 0 | Records to skip |

**Responses:**
| Code | Description | Sample Response |
| :--- | :---------- | :-------------- |
| 200 | OK | `{"success":true,"data":[{...}]}` |
| 404 | Not Found | `{"success":false,"message":"No users found"}` |
| 500 | Server Error | `{"success":false,"message":"internal server error"}` |

---

#### `GET /api/user/:id`
**Summary:** Get Prospect by ID
**Description:** Retrieves detailed information for a specific prospect.

**Path Parameters:**
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| id | integer | Yes | Numeric ID of the prospect |

**Responses:**
| Code | Description | Sample Response |
| :--- | :---------- | :-------------- |
| 200 | OK | `{"success":true,"user":{...}}` |
| 404 | Not Found | `{"success":false,"message":"user not found"}` |

---

#### `PUT /api/user/:id`
**Summary:** Update Prospect
**Description:** Updates an existing prospect's details.

**Path Parameters:**
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| id | integer | Yes | Numeric ID of the prospect |

**Request Body (JSON):**
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| name | string | No | Updated name |
| email | string | No | Updated email |
| phone | string | No | Updated phone |
| company | string | No | Updated company |

**Responses:**
| Code | Description | Sample Response |
| :--- | :---------- | :-------------- |
| 200 | OK | `{"success":true,"message":"User Updated Successfully","data":{...}}` |
| 400 | Bad Request | `{"success":false,"message":"No Data Provided to update"}` |
| 404 | Not Found | `{"success":false,"message":"No User Found"}` |

---

#### `DELETE /api/user/:id`
**Summary:** Delete Prospect
**Description:** Removes a prospect record from the database.

**Path Parameters:**
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| id | integer | Yes | Numeric ID of the prospect |

**Responses:**
| Code | Description | Sample Response |
| :--- | :---------- | :-------------- |
| 200 | OK | `{"success":true,"data":"user Deleted Successfully","user":{...}}` |
| 404 | Not Found | `{"success":false,"message":"No User Found"}` |

---

### 📦 Schemas

#### Prospect
| Name | Type | Description |
| :--- | :--- | :---------- |
| id | integer | Auto-incrementing primary key |
| name | string | Name of the prospect |
| email | string | Unique email address |
| phone | string | 10-digit phone number |
| company | string | Company associated with the prospect |
| created_at | datetime | Timestamp of creation |
| updated_at | datetime | Timestamp of last update |

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
