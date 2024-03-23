# Variables
PROJECT_SLUG := next-template
APP_NAME := $(PROJECT_SLUG)-frontend

# Targets
build:
	docker build -t $(APP_NAME) .

dev:
	npm run dev

lint:
	npm run lint:fix && npm run format