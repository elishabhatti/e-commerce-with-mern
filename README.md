# 🛒 E-Commerce Website

> A modern, full-stack e-commerce platform built with the **MERN stack**, featuring a dynamic and responsive user interface enhanced with advanced animations and streamlined styling.

---

## ✨ Features

- **User Authentication**: Secure user registration and login.
- **Product Catalog**: Browse products with descriptions and images.
- **Shopping Cart**: Add, update, and remove items easily.
- **Order Management**: Track your purchases and view order history.
- **User Profiles**: Manage personal account info.
- **Responsive Design**: Seamless across desktop, tablet, and mobile.
- **Dynamic UI/UX**: Smooth animations and transitions.

---

## 🚀 Technologies Used

### Frontend
- **React.js**
- **Tailwind CSS**
- **Framer Motion**
- **GSAP**
- **Lucide Icons**
- **Axios**
- **React Router DOM**
- **React Toastify**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

---

## 📦 Installation

### Prerequisites

- Node.js (LTS)
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

### Backend Setup

```bash
cd backend
npm install
# or
yarn install
```

Create a `.env` file inside `backend/`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
# or
yarn start
```

---

### Frontend Setup

```bash
cd frontend
npm install
# or
yarn install
```

Start the frontend dev server:

```bash
npm start
# or
yarn start
```

> Typically runs at: [http://localhost:3001](http://localhost:3001)

---

## 💡 Usage

1. Visit [http://localhost:3001](http://localhost:3001)
2. Register or login.
3. Browse products, add to cart, and experience smooth transitions.

---

## 📂 Project Structure

```text
ecommerce-website/
├── backend/
│   ├── src/
│   │   ├── controllers/    # API logic
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   └── server.js       # Main server file
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/             # Static assets (images, fonts)
│   ├── src/
│   │   ├── assets/         # Local images/SVGs
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components (Login, Register, etc.)
│   │   ├── store/          # State management (auth context, etc.)
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # Entry point
│   │   └── index.css       # Global styles
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome!  
Steps:

1. Fork the repository.
2. Create your branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add: Your feature name"
   ```
4. Push:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request**.

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for more details.
