

#  Backend - Django REST Framework + Supabase

This is the backend for the blog project, built using Django REST Framework. It uses **Supabase** as the database provider (PostgreSQL), replacing the default Django DB.

##  API Base URL

Live: [https://blog-drm.onrender.com/api/](https://blog-drm.onrender.com/api/)

## Features

- Blog Posts CRUD
- Connected to Supabase PostgreSQL
- CORS-enabled for frontend access

##  Tech Stack

- Django
- Django REST Framework
- Supabase (PostgreSQL)
- Render (for deployment)

##  Getting Started Locally

### 1. Clone and Set Up Environment

```bash

cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt
```
### 2. Configure `.env`

```env
DATABASE_URL=postgresURL
SECRET_KEY=django_secret_key
DEBUG=FALSE
CORS_ALLOWED_ORIGIN=http://localhost:5173
ALLOWED_HOSTS=localhost,127.0.0.2
```

### 3. Configure `setting.py`

```py
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

DATABASES = {
    'default' : dj_database_url.config(default=config('DATABASE_URL'))
}

CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGIN', cast=Csv())

CORS_ALLOW_CREDENTIALS = False

```

### 4. Migrate and Run Server

```bash
python  manage.py makemigrations
python manage.py migrate

python manage.py runserver
```
## API Endpoints

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | `/api/posts/`      | List all posts       |
| POST   | `/api/posts/`      | Create a new post    |
| GET    | `/api/posts/<id>/` | Retrieve single post |
| PUT    | `/api/posts/<id>/` | Update a post        |
| DELETE | `/api/posts/<id>/` | Delete a post        |

## Deployment

- Deployed on Render:
    - Build command: gunicorn backend.wsgi
    - Environment variables: same as .env
    - PostgreSQL connection configured to Supabase