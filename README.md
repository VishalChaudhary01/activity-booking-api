# Activity Booking API

A simple RESTful API for users to browse public activities (like cricket matches, movies, football games) and make bookings. This API is designed with a modular architecture, following controller-based logic and JWT authentication.

## ✨ Features

- Public listing of available activities
- User authentication (signup, signin)
- Authenticated activity booking
- View personal bookings
- Modular structure with controllers and schema validation

## 🚀 Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **TypeScript**
- **Zod** for schema validation
- **JWT** for authentication
- **dotenv** for environment variables
- **Postman** collection for testing

## 🛠️ Setup Instructions

1. **Clone the Repository**

   ```bash
     git clone https://github.com/VishalChaudhary01/activity-booking-api.git
     cd activity-booking-api
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**

   ```bash
     cp .env.example .env
   ```

   **Update DATABASE_URL with yours**

4. **Run the Server**

   ```bash
     npm run dev
   ```

5. **Now server running at http://localhost:5001**

## 🔍 API Endpoints

### Auth Routes

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | `/api/v1/auth/signup` | Register a new user     |
| POST   | `/api/v1/auth/signin` | Login and get JWT token |

### Activity Routes

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/api/v1/activities` | Get list of activities |

### Booking Routes (Protected)

| Method | Endpoint                       | Description                    |
| ------ | ------------------------------ | ------------------------------ |
| GET    | `/api/v1/bookings/my-bookings` | Get bookings of logged-in user |
| POST   | `/api/v1/bookings`             | Book an activity by ID         |
