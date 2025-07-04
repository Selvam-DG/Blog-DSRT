# Blog - Full Stack (DRF + Supabase + React + Tailwind)

This is a full-stack blog application built with:

- **Backend**: Django REST Framework (DRF), Supabase (PostgreSQL)
- **Frontend**: React (Vite), TailwindCSS
- **Deployment**:
  -  Backend: [Render](https://render.com/)
  - Frontend: [Vercel](https://vercel.com/)

Currently, the app supports basic blog functionalities (Posts only). The frontend interacts with the backend API to fetch and display posts.

##  Project Structure
```
blog/
├── backend/ # Django + DRF backend
|      └── README.md
├── frontend/ # React + Vite + Tailwind frontend
|      └── README.md
├── .gitignore
├── README.md`

```

##  Prerequisites

- Python 3.10+
- Node.js 18+
- Supabase project ( database)


## 🚀 Live Demos

- **Frontend** (Vercel): [https://blog-drp.vercel.app/](https://blog-drp.vercel.app/)
- **Backend API** (Render): [https://blog-drm.onrender.com/api/](https://blog-drm.onrender.com/api/)

## 🛠️ Getting Started Locally


### 1.Clone the project#
```bash

git clone https://github.com/Selvam-DG/Blog-DSRT.git

cd blog-project
```




### 2. Setup Backend
```bash

cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

```

### 3. Setup Frontend
```bash

cd ../frontend
npm install
npm run dev

```

##  Tech Stack

| Category   | Technologies                          |
|------------|----------------------------------------|
| Backend    | Django, DRF, Supabase PostgreSQL       |
| Frontend   | React, Vite, TailwindCSS               |
| Deployment | Render (backend), Vercel (frontend)    |


## Future Features
- User Authentication (JWT / Supabase Auth)
- Comments, Tags, Categories
- Markdown rendering
- Admin dashboard

## See More
- [backend/README.md]()
- [frontend/README.md]()