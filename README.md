# Tasteorama Frontend

Frontend part of the Tasteorama application — a modern web platform for searching, exploring, and managing recipes.

## About the Project

Tasteorama helps users discover recipes, browse categories and ingredients, save favorite recipes, and manage their personal cooking experience through an intuitive and responsive interface.

## Technologies

- Next.js
- React
- JavaScript
- Axios
- CSS Modules
- ESLint
- Prettier

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
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3001
```

## Backend

The frontend communicates with the backend API running at:

```text
http://localhost:3000
```

Backend repository:

https://github.com/allivan2020/tasteorama-project-5-backend

## Features

Current and planned functionality:

- User registration
- User authentication
- Protected routes
- Recipe browsing
- Recipe search
- Category filtering
- Ingredient filtering
- Favorites management
- Responsive design
- Personal profile management

## Available Scripts

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Run linting:

```bash
npm run lint
```

## API Configuration

The frontend uses the following environment variable:

| Variable | Description |
|-----------|-------------|
| NEXT_PUBLIC_API_URL | Backend API URL |

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Deployment

The project is intended to be deployed on Vercel.

Production environment variables should be configured in the deployment platform settings.

## Screenshots

Screenshots will be added after the project is completed.

## Contributors

Tasteorama Development Team

## License

This project was created for educational purposes.