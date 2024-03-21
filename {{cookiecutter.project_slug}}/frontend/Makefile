# Makefile for building and running the FastAPI app in Docker

# Variables
PROJECT_SLUG := {{ cookiecutter.project_slug }}
PORT := 4001
APP_NAME := $(PROJECT_SLUG)-frontend

# Targets
build:
	docker build -t $(APP_NAME) .

run:
	docker run -p $(PORT):$(PORT) --name $(APP_NAME) -v ./frontend/:/app/ $(APP_NAME)

stop:
	docker stop $(APP_NAME)
	docker rm $(APP_NAME)

dev:
	npm run dev

lint:
	npm run lint:fix && npm run format