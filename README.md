# Tasteorama Frontend

Frontend part of the Tasteorama application — a modern web platform for searching, exploring, and managing recipes.

---

## About the Project

Tasteorama helps users discover recipes, browse categories and ingredients, save favorite recipes, and manage their personal cooking experience through an intuitive and responsive interface.

---

## Technologies

- Next.js
- React
- JavaScript
- Axios
- CSS Modules
- ESLint
- Prettier

---

## Project Structure

```text
src/
├── app/
├── components/
├── services/
├── hooks/
├── utils/
├── styles/
└── assets/
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/allivan2020/tasteorama-project-5-frontend.git
cd tasteorama-project-5-frontend
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# ==========================================
# API CONFIGURATION
# ==========================================

# Default: Connect to the deployed backend on Render
NEXT_PUBLIC_API_URL=https://tasteorama-project-5-backend.onrender.com

# Uncomment for local backend development
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3001
```

---

## Backend

The frontend communicates with the backend API.

### Production Backend

```text
https://tasteorama-project-5-backend.onrender.com
```

### Local Backend

```text
http://localhost:3000
```

### Backend Repository

```text
https://github.com/allivan2020/tasteorama-project-5-backend
```

---

## Features

### Current and Planned Functionality

- User registration
- User authentication
- Protected routes
- Recipe browsing
- Recipe search
- Category filtering
- Ingredient filtering
- Favorites management
- Personal profile management
- Responsive design

---

## Available Scripts

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Run Linting

```bash
npm run lint
```

---

## API Configuration

The frontend uses the following environment variable to communicate with the backend:

| Variable | Description |
|-----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL (Render or Localhost) |

---

## Team

- Oleksandr Sizov
- Snizhana Pertushka
- Ivan Yuschuk
- Viktoria Babyuk
- Ihor Yaremkevych
- Eugene Mukhin
- Valeriia Kravchuk
- Viacheslav Butrim
- Oksana Bochkor
- Roman Yakubovskyi
- Maksym Yaropovets
- Anatolii Honchar

### QA Team

- Marta Vitiaz
- Olena Ihnatiuk
- Iryna Ielkina

---

## Deployment

The project is intended to be deployed on Vercel.

Production environment variables should be configured in the deployment platform settings. For example:

```env
NEXT_PUBLIC_API_URL=https://tasteorama-project-5-backend.onrender.com
```

---

## Development Status

This project is currently under active development. Some features may be incomplete or subject to change.
