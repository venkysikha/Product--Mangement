# Product Management System

A full-stack web application for managing products, built with React (frontend) and Express/MongoDB (backend).

## Features

- Add, edit, delete, and view products
- Search and filter products by name and price range
- Responsive, professional UI inspired by e-commerce platforms
- RESTful API with MongoDB for persistent storage

## Project Structure

```
Product_mangement/
  backend/
    src/
      models/
      routes/
      config.js
      server.js
    .env
    package.json
  frontend/
    src/
      components/
      pages/
      services/
      styles.css
      App.jsx
      main.jsx
    index.html
    package.json
    vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Backend Setup

1. Install dependencies:

   ```sh
   cd backend
   npm install
   ```

2. Create a `.env` file in `backend/`:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/productdb
   ```

3. Start the backend server:

   ```sh
   npm run dev
   ```

   The API will be available at `http://localhost:5000/api`.

### Frontend Setup

1. Install dependencies:

   ```sh
   cd frontend
   npm install
   ```

2. Start the frontend development server:

   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

   > The frontend is configured to proxy API requests to the backend.

## API Endpoints

- `GET /api/products` — List products (supports `search` and `priceRange` query params)
- `GET /api/products/:id` — Get product details
- `POST /api/products` — Add a new product
- `PUT /api/products/:id` — Update a product
- `DELETE /api/products/:id` — Delete a product

## Technologies Used

- **Frontend:** React, Vite, React Router
- **Backend:** Express, MongoDB, Mongoose
- **Styling:** CSS

## License

MIT

---

**Author:** _Your Name Here_
