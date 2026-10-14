# Maidle

Maidle is a daily maimai chart guessing game. The repository contains a Django REST API and a React frontend.

## Prerequisites

- Python 3 with `pip`
- Node.js `22.20.0` (see `maidle-front/.nvmrc`)

## Backend setup

This instruction should work almost perfectly fine, unless you use Windows

(which you probably should quit)

Install the backend dependencies and initialize the SQLite database:

```sh
cd maidle
python -m pip install -r requirements.txt
python manage.py migrate
```

Optionally, create `maidle/.env` with a development secret key:

```dotenv
DJANGO_SECRET_KEY=replace-with-a-local-secret
```

Generate a value with:

```sh
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

Start the API server:

```sh
python manage.py runserver
```

The backend runs at [http://127.0.0.1:8000](http://127.0.0.1:8000). The task API is available at [http://127.0.0.1:8000/api/tasks/](http://127.0.0.1:8000/api/tasks/).

## Frontend setup

In a second terminal, from the repository root:

```sh
cd maidle-front
nvm use
npm ci
npm start
```

If you do not use `nvm`, install and use Node.js `22.20.0` before running `npm ci`.

Open [http://localhost:3000](http://localhost:3000) in a browser. The frontend requests the API at `http://127.0.0.1:8000/api/tasks/`, so the backend must be running while developing the frontend.

## Validation

Run backend tests from `maidle/`:

```sh
python manage.py test
```

Run frontend tests and create a production build from `maidle-front/`:

```sh
npm test -- --watchAll=false
npm run build
```
