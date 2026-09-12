# Full-Stack E-Commerce Web Application

Полнофункциональное веб-приложение интернет-магазина электроники и техники,
разработанное в рамках курсовой работы.

## Технологический стек

- **Frontend**: React, Vite, TypeScript, SCSS, Zustand, Bun
- **Backend**: FastAPI, Python (uv), SQLAlchemy, Pydantic, PostgreSQL
- **Infrastructure**: Docker, Docker Compose, Nginx

---

## Инструкция по запуску через Docker

Проект полностью контейнеризирован и запускается одной командой через Docker
Compose.

1. Убедитесь, что запущен Docker Desktop.
2. В корне проекта создайте файл `.env` (при необходимости настройте переменные
   окружения).
3. Запустите сборку и поднятие сервисов в фоне:
   ```bash
   docker compose up --build -d
   ```

## После запуска сервисы будут доступны по адресам:

- Фронтенд: http://localhost
- Бэкенд (Swagger API): http://localhost:8000/docs
- База данных PostgreSQL: localhost:5432
