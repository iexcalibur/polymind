.PHONY: dev frontend backend setup db-create db-drop db-reset install clean help

ROOT_DIR := $(shell pwd)

# ─── Main Commands ───────────────────────────────────────────────

## Start everything (backend + frontend)
dev:
	@echo "🧠 Starting Ploy-Note..."
	@make backend &
	@sleep 5
	@make frontend

## Start frontend only (http://localhost:8080)
frontend:
	@echo "🌐 Starting frontend on http://localhost:8080..."
	cd $(ROOT_DIR) && yarn r affine.ts bundle -p @affine/web --dev

## Start backend only (http://localhost:3010)
backend:
	@echo "⚙️  Starting backend..."
	cd $(ROOT_DIR)/packages/backend/server && NODE_OPTIONS="--import=$(ROOT_DIR)/tools/cli/register.js --disable-warning=ExperimentalWarning" yarn dev

# ─── Setup Commands ─────────────────────────────────────────────

## First-time setup (install deps + create db + push schema)
setup: install db-create db-push
	@echo "✅ Setup complete! Run 'make dev' to start."

## Install dependencies
install:
	@echo "📦 Installing dependencies..."
	yarn install

## Push Prisma schema to database
db-push:
	@echo "🗄️  Pushing database schema..."
	cd $(ROOT_DIR)/packages/backend/server && npx prisma db push

## Create database
db-create:
	@echo "🗄️  Creating database..."
	createdb affine 2>/dev/null || echo "Database 'affine' already exists"

## Drop database
db-drop:
	@echo "⚠️  Dropping database..."
	dropdb affine 2>/dev/null || echo "Database 'affine' does not exist"

## Reset database (drop + create + push schema)
db-reset: db-drop db-create db-push
	@echo "✅ Database reset complete."

## Clean build artifacts
clean:
	@echo "🧹 Cleaning..."
	rm -rf node_modules/.cache
	rm -rf packages/frontend/apps/web/dist
	@echo "✅ Clean complete."

# ─── Help ────────────────────────────────────────────────────────

## Show this help
help:
	@echo ""
	@echo "  Ploy-Note Commands:"
	@echo "  ────────────────────────────────"
	@echo "  make dev        - Start backend + frontend"
	@echo "  make frontend   - Start frontend only (localhost:8080)"
	@echo "  make backend    - Start backend only (localhost:3010)"
	@echo "  make setup      - First-time setup (install + db)"
	@echo "  make install    - Install dependencies"
	@echo "  make db-push    - Push Prisma schema to database"
	@echo "  make db-create  - Create database"
	@echo "  make db-drop    - Drop database"
	@echo "  make db-reset   - Reset database"
	@echo "  make clean      - Clean build artifacts"
	@echo ""
