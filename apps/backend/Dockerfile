FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    PORT=8000

WORKDIR /app

# O contexto de build é a raiz do monorepo (veja compose.yaml).
COPY apps/backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY apps/backend/ ./apps/backend/
WORKDIR /app/apps/backend

# collectstatic importa as configurações do Django, que exigem SECRET_KEY.
# A chave abaixo é descartável e existe somente durante o build da imagem.
RUN SECRET_KEY=build-only-not-a-real-secret python manage.py collectstatic --noinput \
    && groupadd --system --gid 10001 app \
    && useradd --system --uid 10001 --gid app --home-dir /app --no-create-home app \
    && chown -R app:app /app

USER app

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py create_superuser_from_env && exec gunicorn projeto.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers ${GUNICORN_WORKERS:-1} --threads 4 --timeout 60 --access-logfile - --error-logfile - --capture-output"]
