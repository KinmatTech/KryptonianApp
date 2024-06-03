# Kryptonian API Documentation

## Base URL
http://localhost:3000

## Endpoints
### To register a New Kryptonian
**Endpoint**: `/register`
**Method**: POST

**Description**: This endpoint registers a new Kryptonian with the provided email and password.

**Request Body**
```json
{
  "email": "newuser@example.com",
  "password": "UseStrongPassword123!"
};

Responses:
- 201 Created

{
  "message": "Kryptonian registered successfully. Please check your email to confirm your account."
}

409 Conflict:
{
  "message": "Email already in use"
}

** 500 Internal Server Error:
{
  "message": "Error registering Kryptonian: <error_message>"
}

## Login
Endpoint: /login
Method: POST
Description: Authenticates a Kryptonian with the provided email and password.

Request Body:
{
  "email": "newuser@example.com",
  "password": "StrongPassword123!"
}

Responses:
200 OK:
{
  "token": "<JWT_TOKEN>"
}

404 Not Found:
{
  "message": "Kryptonian not found"
}

401 Unauthorized:
{
  "message": "Invalid password"
}

500 Internal Server Error:
{
  "message": "Error logging in: <error_message>"
}

## Confirm Email
Endpoint: /confirm-email
Method: GET
Description: Confirms the Kryptonian's email using the token sent via email.
Request Query Parameters:
token: The email confirmation token.
Example URL:
http://localhost:3000/confirm-email?token=<emailToken>

Responses:
200 OK:
{
  "message": "Email confirmed successfully"
}

400 Bad Request:
{
  "message": "Invalid or expired token"
}

500 Internal Server Error:
{
  "message": "Error confirming email"
}

## Error Codes

Common Errors:
500 Internal Server Error: General server error with a message describing the issue.

Registration Errors
409 Conflict: Email already in use.

Login Errors
404 Not Found: Kryptonian not found.
401 Unauthorized: Invalid password.

Email Confirmation Errors
400 Bad Request: Invalid or expired token.

## Environment Variables
The following environment variables should be set in your .env file:
PORT=3000
MONGO_URI=your_mongo_uri
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password

## How to Run
Install dependencies:
npm install

## Run the server:
node app.js

## Test endpoints using Postman or any other API testing tool.

## Example Postman Requests
Register
Method: POST
URL: http://localhost:3000/register

Body:
{
  "email": "newuser@example.com",
  "password": "UseStrongPassword123!"
}

Login
Method: POST
URL: http://localhost:3000/login
Body:
{
  "email": "newuser@example.com",
  "password": "StrongPassword123!"
}

Confirm Email
Method: GET
URL: http://localhost:3000/confirm-email?token=<EMAIL_TOKEN>

- `README.md` provides a high-level overview, installation instructions, environment setup, and links to other documentation.
- `API_DOCUMENTATION.md` provides detailed information about each API endpoint, including request and response formats.