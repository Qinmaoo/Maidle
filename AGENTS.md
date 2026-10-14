# Maidle Agent Guide

## Repository Layout

- `maidle/` contains the Django 5.2 backend and Django REST Framework API.
- `maidle/api/` is the backend application. Follow Django's model -> serializer -> `ModelViewSet` -> URL router structure when extending the API.
- `maidle-front/` contains the React 19 frontend, built with Create React App, Ant Design, and Tailwind CSS.
- `maidle-front/src/components/` contains reusable UI, `src/types/` contains shared domain types, and `src/theme/` contains theme configuration.
- `main.py` is a standalone utility that fetches maimai data.

## Setup And Development

Use Node `22.20.0` for the frontend, as specified in `maidle-front/.nvmrc`.

Backend commands, run from `maidle/`:

```sh
python -m pip install -r requirements.txt
python manage.py runserver
python manage.py test
python manage.py makemigrations
python manage.py migrate
```

Frontend commands, run from `maidle-front/`:

```sh
npm ci
npm start
npm test -- --watchAll=false
npm run build
```

Use `npm ci` for a clean frontend installation because `package-lock.json` is committed. Run the Django and React development servers separately when working across the API boundary.

## Frontend Policy

- New React components must use `.tsx`; new non-React frontend modules must use `.ts`.
- Do not add new `.js` or `.jsx` files under `maidle-front/src/`.
- Convert existing JavaScript or JSX files only when substantially modifying them. Do not perform an unrelated repository-wide conversion.
- Keep shared API and domain types in `maidle-front/src/types/`.
- Follow existing Ant Design and Tailwind patterns. Preserve established component structure and avoid broad style refactors unrelated to the requested change.

## Testing And Validation

- Add or update focused tests for every behavior change and bug fix.
- Use React Testing Library and Jest for frontend component and utility behavior.
- Add Django tests for backend model, serializer, view, and API behavior in `maidle/api/tests.py` or focused test modules when the test suite grows.
- Documentation-only and purely visual styling-only changes do not require new tests; run relevant existing validation when practical.
- For frontend changes, run `npm test -- --watchAll=false` and `npm run build`.
- For backend changes, run `python manage.py test`.
- In the final handoff, report validation run and any command not run with its reason.

There is no dedicated project lint, formatter, or standalone typecheck command. Do not claim one was run unless the project adds and configures it.

## Django And Data Changes

- Generate and commit Django migration files for model changes that alter the database schema.
- Review generated migrations before committing them. Do not hand-edit migrations except to correct a known generated migration issue.
- The local SQLite database is `maidle/db.sqlite3`.
- Django loads `DJANGO_SECRET_KEY` from `maidle/.env`. Never commit `.env` files or secrets.
- `DEBUG = True` and permissive CORS are development settings. Do not widen production exposure without an explicit deployment requirement.

## Scope And Hygiene

- Keep changes focused; avoid drive-by formatting, dependency upgrades, and unrelated refactors.
- Keep dependency manifests and lockfiles consistent when dependencies change.
- Do not commit virtual environments (.venv), Python caches, local SQLite databases, frontend build output, or credentials.
