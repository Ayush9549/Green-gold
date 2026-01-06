# Olive Oil - Premium eCommerce Store

Welcome to the **Olive Oil** official eCommerce platform. This project is a modern, high-performance web application designed to sell premium organic olive oil products globally. It features a stunning, animated user interface and a robust backend infrastructure.

## 🚀 Technology Stack

This project uses a cutting-edge **MERN** stack variation with Next.js for specific optimizations:

### **Frontend (Client)**
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) - For server-side rendering and SEO excellence.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type-safe, maintainable code.
- **Styling**: **Vanilla CSS Modules** - Custom, high-performance styling without heavy frameworks.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - For complex, smooth interface animations.
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) - Comprehensive icon library.
- **Internationalization**: `next-intl` (Planned) - For country-wise language translation.

### **Backend (Server)**
- **Runtime**: [Node.js](https://nodejs.org/) - Fast, event-driven JavaScript runtime.
- **Framework**: [Express.js](https://expressjs.com/) - Minimalist web framework for API routing.
- **Database**: [MongoDB](https://www.mongodb.com/) (NoSQL) - For flexible and scalable data storage.
- **ODM**: [Mongoose](https://mongoosejs.com/) - Schema-based modeling for application data.

### **Services & Integrations**
- **Media Storage**: [Cloudinary](https://cloudinary.com/) - Optimized hosting for high-quality product images and videos.
- **Payments**: [PayPal Developer SDK](https://developer.paypal.com/) - Secure global payment processing.
- **Authentication**: Custom JWT-based auth (Planned).

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas URL)
- Cloudinary Account
- PayPal Developer Account

### 1. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jaitun_oil_db
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

Run the server:
```bash
npm run dev
```

### 2. Frontend Setup
Navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## ✨ Key Features
- **Premium UI/UX**: Custom "Olive & Gold" aesthetic with `Playfair Display` typography.
- **Responsive Design**: Fully responsive layouts for Mobile, Tablet, and Desktop.
- **Dynamic Animations**: Smooth scroll reveals and interactive elements.
- **Secure Architecture**: Separation of concerns between Client and Server.

## 📁 Project Structure
```
jaitun-oil/
├── client/          # Next.js Frontend
│   ├── src/app      # App Router Pages
│   └── src/components # Reusable UI Components
└── server/          # Express Backend
    ├── models/      # Mongoose Database Schemas
    ├── routes/      # API Routes
    └── controllers/ # Business Logic
```
