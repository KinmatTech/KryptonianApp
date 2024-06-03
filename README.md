# Kryptonian Project

Welcome to the Kryptonian Project! This project provides an API for registering, logging in, and confirming email addresses for Kryptonians.


## Introduction

The Kryptonian Project is an API service built with Node.js and Express that allows Kryptonians to register, log in, and confirm their email addresses. The project uses MongoDB for data storage, Redis for caching, and Nodemailer for sending email confirmations.

## Features

- Register new Kryptonians
- Log in existing Kryptonians
- Confirm email addresses through a token-based system

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine
- MongoDB installed and running
- Redis installed and running
- A Gmail account for sending email confirmations

## Installation

1. **Clone the repository**:

    git clone https://github.com/KinmatTech/KryptonianApp.git
    cd KryptonianApp
    

2. **Install dependencies**:

    npm install


3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following environment variables:

    PORT=3000
    MONGO_URI=your_mongo_uri
    REDIS_HOST=your_redis_host
    REDIS_PORT=your_redis_port
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password

## Running the Project

1. **Start the server**:

    node app.js

2. **Test the API**:

    Use Postman or any other API testing tool to test the endpoints.

## Environment Variables

The following environment variables should be set in your `.env` file:

- `PORT`: The port on which the server will run (default is 3000)
- `MONGO_URI`: The URI for connecting to your MongoDB instance
- `REDIS_HOST`: The host address for your Redis instance
- `REDIS_PORT`: The port number for your Redis instance
- `JWT_SECRET`: The secret key used for signing JWT tokens
- `EMAIL_USER`: The email address used for sending confirmation emails
- `EMAIL_PASS`: The password for the email address used for sending confirmation emails

## API Documentation

For detailed API documentation, please see [API Documentation](API_DOCUMENTATION.md).

## Contributing

To contribute to this project, please fork the repository, create a new branch, and submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License.