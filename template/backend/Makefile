# Makefile for building and running the FastAPI app in Docker

# Variables
PORT := 4002
PROJECT_SLUG := {{ cookiecutter.project_slug }}
APP_NAME := $(PROJECT_SLUG)-backend

# Targets
build:
	docker build -t $(APP_NAME) .

run:
	docker run -p $(PORT):$(PORT) --name $(APP_NAME) -v ./backend:/app:ro $(APP_NAME)

stop:
	docker stop $(APP_NAME)
	docker rm $(APP_NAME)

dev:
	uvicorn main:app --host 0.0.0.0 --port $(PORT)  --reload

format:
	black .
	ruff --fix .
