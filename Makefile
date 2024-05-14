.PHONY: help
.EXPORT_ALL_VARIABLES:

PROJECT_SLUG := "next-fast-template"
APP_NAME := $(PROJECT_SLUG)-backend
PRECOMMIT_CONFIG_PATH = "./dev_config/python/.pre-commit-config.yaml"

# ANSI color codes
GREEN=$(shell tput -Txterm setaf 2)
YELLOW=$(shell tput -Txterm setaf 3)
RED=$(shell tput -Txterm setaf 1)
BLUE=$(shell tput -Txterm setaf 6)
RESET=$(shell tput -Txterm sgr0)

## Start local development environment
startTest:
	docker compose -p next-fast-template --env-file .env up --build

# This target can be used in a separate terminal to update any containers after a change in config without restarting (environment variables, requirements.txt, etc)
updateTest:  ## Update test environment containers (eg: after config changes)
	docker compose -p next-fast-template -f docker-compose.yml up --build -d

stopTest: ## Stop test development environment
	@COMPOSE_PROJECT_NAME=next-fast-template docker compose down

# Backend Deployment
build:
	docker build -f backend/Dockerfile -t $(APP_NAME) --env-file .env ./backend

stage:
	docker tag $(APP_NAME):latest beafdocker/$(APP_NAME):latest
	docker push beafdocker/$(APP_NAME):latest


# Utilities
lint-backend:
	@echo "$(YELLOW)Running linters...$(RESET)"
	@cd backend && make format
	# @poetry run pre-commit run --files $$(git diff --name-only $$(git merge-base main $$(git branch --show-current)) $$(git branch --show-current) | tr '\n' ' ') --show-diff-on-failure --config $(PRECOMMIT_CONFIG_PATH)

lint-frontend:
	@echo "$(YELLOW)Running linters for frontend...$(RESET)"
	@cd frontend && npm run lint

lint:
	@$(MAKE) -s lint-backend
	@$(MAKE) -s lint-frontend

test-frontend:
	@echo "$(YELLOW)Running tests for frontend...$(RESET)"
	@cd frontend && npm run test

test-backend:
	@echo "$(YELLOW)Running tests for backend...$(RESET)"
	@cd backend && POSTGRES_SERVER=null PROJECT_NAME=null FIRST_SUPERUSER_FIRSTNAME=null FIRST_SUPERUSER_LASTNAME=null FIRST_SUPERUSER=email@email.com FIRST_SUPERUSER_PASSWORD=null python -m pytest

test:
	@$(MAKE) -s test-backend
	@$(MAKE) -s test-frontend


# Helpers
scaffold:
	@cd scripts && python scaffold.py run -n $(name)
