.PHONY: init dev test build deploy clean help

# Default target
help:
	@echo "Available commands:"
	@echo "  init     - Initialize project (build containers, run migrations, seed data)"
	@echo "  dev      - Start development environment"
	@echo "  test     - Run all tests"
	@echo "  build    - Build all containers"
	@echo "  deploy   - Deploy to staging/production"
	@echo "  clean    - Clean up containers and volumes"
	@echo "  format   - Format code"
	@echo "  lint     - Run linters"

# Initialize project
init: build
	@echo "🚀 Initializing Personal Investment Assistant..."
	docker-compose up -d postgres redis elasticsearch
	@echo "⏳ Waiting for services to be ready..."
	sleep 10
	docker-compose run --rm api alembic upgrade head
	@echo "✅ Database migration completed"
	docker-compose run --rm api python scripts/seed_data.py
	@echo "✅ Sample data seeded"

# Start development environment
dev:
	@echo "🔥 Starting development environment..."
	docker-compose up -d

# Stop development environment
stop:
	@echo "⏹️ Stopping development environment..."
	docker-compose down

# Build all containers
build:
	@echo "🏗️ Building containers..."
	docker-compose build

# Run tests
test: test-unit test-integration

test-unit:
	@echo "🧪 Running unit tests..."
	docker-compose run --rm api pytest tests/unit/ -v
	cd frontend && npm test -- --watchAll=false

test-integration:
	@echo "🔗 Running integration tests..."
	docker-compose run --rm api pytest tests/integration/ -v

test-e2e:
	@echo "🎭 Running E2E tests..."
	cd frontend && npx playwright test

# Code quality
format:
	@echo "🎨 Formatting code..."
	docker-compose run --rm api black .
	docker-compose run --rm api isort .
	cd frontend && npm run format

lint:
	@echo "🔍 Linting code..."
	docker-compose run --rm api flake8 .
	docker-compose run --rm api mypy .
	cd frontend && npm run lint

# Database operations
db-migrate:
	@echo "📊 Running database migrations..."
	docker-compose run --rm api alembic upgrade head

db-seed:
	@echo "🌱 Seeding database with sample data..."
	docker-compose run --rm api python scripts/seed_data.py

db-reset:
	@echo "🗑️ Resetting database..."
	docker-compose run --rm api alembic downgrade base
	docker-compose run --rm api alembic upgrade head
	docker-compose run --rm api python scripts/seed_data.py

# Deployment
deploy-staging:
	@echo "🚀 Deploying to staging..."
	docker build -t investment-assistant-api:staging ./backend
	docker build -t investment-assistant-frontend:staging ./frontend
	# Add your staging deployment commands here

deploy-prod:
	@echo "🚀 Deploying to production..."
	docker build -t investment-assistant-api:latest ./backend
	docker build -t investment-assistant-frontend:latest ./frontend
	# Add your production deployment commands here

# Cleanup
clean:
	@echo "🧹 Cleaning up..."
	docker-compose down -v
	docker system prune -f

# Logs
logs:
	docker-compose logs -f

logs-api:
	docker-compose logs -f api

logs-frontend:
	docker-compose logs -f frontend

# Development utilities
shell-api:
	docker-compose exec api bash

shell-db:
	docker-compose exec postgres psql -U postgres -d investment_db

# Monitor services
status:
	docker-compose ps