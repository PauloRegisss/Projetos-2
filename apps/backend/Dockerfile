


FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
PYTHONUNBUFFERED=1 \
PIP_NO_CACHE_DIR=1

WORKDIR /app

# Install requirements first for better build-cache reuse.
COPY apps/backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# The Django project is located at apps/backend, but the repository root
# is copied because the backend may import shared project modules.
COPY . .

WORKDIR /app
RUN python apps/backend/manage.py collectstatic --noinput

EXPOSE 8000

CMD ["sh", "-c", "python apps/backend/manage.py migrate --noinput && python apps/backend/manage.py create_superuser_from_env && gunicorn --chdir apps/backend --bind 0.0.0.0:8000 --workers ${GUNICORN_WORKERS:-1} --access-logfile - --error-logfile - --capture-output projeto.wsgi:application"]
