# E-commerce Application

This is a full-stack e-commerce application built with a Node.js/Express backend and a React frontend.

## Project Structure

- `app/backen`: The Node.js/Express backend API.
- `app/fronten`: The React frontend application.

## How to Run This Project

### 1. Backend Setup

First, set up and run the backend server.

1.  **Navigate to the backend directory:**
    ```sh
    cd app/backen
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the `app/backen` directory and add your MongoDB connection string and a JWT secret. For a local MongoDB instance, it would look like this:

    ```env
    MONGO_URI=mongodb://localhost:27017/ecomm
    JWT_SECRET=yourSuperSecretKeyForJwt
    ```

4.  **Start the server:**
    ```sh
    npm start
    ```
    The API server will be running on `http://localhost:5000`.

### 2. Frontend Setup

Next, set up and run the frontend.

1.  **Navigate to the frontend directory:**
    ```sh
    cd app/fronten
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Start the client:**
    ```sh
    npm run dev
    ```
    The React application will open in your browser at `http://localhost:5173` (or another available port).

You should now be able to use the application.
