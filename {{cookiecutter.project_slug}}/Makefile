.PHONY: help
.EXPORT_ALL_VARIABLES:

PROJECT_SLUG := {{ cookiecutter.project_slug }}

APP_NAME := $(PROJECT_SLUG)-backend
# environment variables

help:		## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Spin up Traefik to mimic test/prod CloudFront/ALB setup across multiple services
# Install latest traefik in /usr/local/bin from https://github.com/containous/traefik/releases
lb:
	traefik --entryPoints.dev.address=:4000 --providers.file.filename=lb.yml

# Make localhost self-signed cert with: https://github.com/FiloSottile/mkcert
lb-ssl:
	traefik --entryPoints.dev.address=:4000 --providers.file.filename=lb-ssl.yml

# Using Terminal
serve-backend:
	@cd $(PROJECT_SLUG)/backend; make dev

serve-frontend:
	@cd $(PROJECT_SLUG)/frontend; make dev

dev:
	pip install -r $(PROJECT_SLUG)/backend/requirements.txt
	make -j 4 lb db serve-backend serve-frontend

prep:
	@cd backend && ./prestart.sh

# Using Docker
db:
	@docker compose -f $(PROJECT_SLUG)/backend/docker-compose.yml up --build

## Start local development environment
start:
	docker compose -p local -f docker/docker-compose.yml --env-file docker/local.env up --build

## Stop test development environment
stop:
	@COMPOSE_PROJECT_NAME=test docker compose -f docker/docker-compose.yml down

prep-docker:
	docker exec local-api-1 ./prestart.sh


# Deployment
build:
	docker build -f $(PROJECT_SLUG)/backend/Dockerfile -t $(APP_NAME) .$(PROJECT_SLUG)/backend

stage:
	docker tag $(APP_NAME):latest beafdocker/$(APP_NAME):latest
	docker push beafdocker/$(APP_NAME):latest


# Testing
backend-test:
	cd backend/

	POSTGRES_SERVER=null \
	python -m pytest

frontend-test:
	@cd frontend && npm run test


# Helpers
c:
	@cd scripts && python controller.py run -n $(name)
