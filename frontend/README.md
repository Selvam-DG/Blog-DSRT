
#  Frontend - React (Vite) + TailwindCSS

This is the frontend for the blog project. It connects to the DRF backend to fetch and display blog posts.

##  Live URL 

Frontend deployed on **Vercel**:  
[https://blog-drp.vercel.app/](https://blog-drp.vercel.app/)

## Features 

- Display list of posts from API
- Post details view
- Responsive UI with TailwindCSS

## 📦 Tech Stack

- React (Vite)
- TailwindCSS
- Axios (for API calls)
- React Router (for navigation)

## 🚀 Getting Started

### 1. Clone & Install

```bash
cd frontend
npm install
npm run dev
```

### 2. Environment Variables
Create a .env file in the root of frontend/:
``` env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api/

```
## Project Structure
```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── public/
└── tailwind.config.js
```
## Deployment
Frontend is deployed to Vercel:
- Make sure VITE_API_BASE_URL is set correctly in Vercel’s environment settings.
- Build output: dist