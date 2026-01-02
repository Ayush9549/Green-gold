# Green Gold - Premium Olive Oil E-commerce

A luxury e-commerce platform for premium organic olive oil, featuring a high-end design, secure OTP-based authentication, and a seamless shopping experience.

## 🚀 Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, CSS Modules, Framer Motion.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose).
- **Authentication:** Custom Email OTP Verification (Nodemailer).
- **State Management:** React Context API (Auth, Cart, Product).

## 📂 Project Structure

This distinct setup separates the concerns between the client interface and the server API.

- `client/`: Next.js frontend application.
- `server/`: Express.js backend API.

## 🛠️ Getting Started

### 1. Backend Setup (`server`)

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jaitun_oil_db
# OR your MongoDB Atlas URI

# Email Configuration (for OTP)
SMPT_SERVICE=gmail
SMPT_MAIL=your_email@gmail.com
SMPT_PASSWORD=your_app_password
```

Start the backend server:

```bash
npm start
```

### 2. Frontend Setup (`client`)

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

## ✨ Key Features

- **Premium Aesthetics:** Gold and Deep Olive color palette with glassmorphism effects.
- **Secure Authentication:** Email-based OTP verification for signups.
- **Dynamic Cart:** Real-time cart management with local storage persistence.
- **Product Management:** Admin-ready structure for managing products.

## 📦 Deployment

- **Frontend:** Deploy the `client` folder to **Vercel**.
  - **Framework Preset:** Next.js
  - **Root Directory:** `client`
- **Backend:** Deploy the `server` folder to **Render**, **Railway**, or **Heroku**.
