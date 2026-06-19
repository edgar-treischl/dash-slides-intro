# ---- Config ----
APP_NAME := dash-slides-intro
ENTRY := slides.md
DIST := dist
BRANCH := gh-pages

# ---- Commands ----
YARN := yarn

# ---- Default ----
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  make dev        - Start Slidev dev server"
	@echo "  make build      - Build slides"
	@echo "  make export     - Export static site"
	@echo "  make lint       - Lint code (if eslint installed)"
	@echo "  make format     - Format with prettier (if installed)"
	@echo "  make clean      - Remove build artifacts"
	@echo "  make deploy     - Deploy to GitHub Pages"

# ---- Dev ----
.PHONY: dev
dev:
	$(YARN) slidev $(ENTRY)

# ---- Build ----
.PHONY: build
build:
	$(YARN) slidev build $(ENTRY)

# ---- Export static site ----
.PHONY: export
export:
	$(YARN) slidev export $(ENTRY)

# ---- Lint ----
.PHONY: lint
lint:
	@if command -v eslint >/dev/null 2>&1; then \
		eslint .; \
	else \
		echo "eslint not installed"; \
	fi

# ---- Format ----
.PHONY: format
format:
	@if command -v prettier >/dev/null 2>&1; then \
		prettier --write .; \
	else \
		echo "prettier not installed"; \
	fi

# ---- Clean ----
.PHONY: clean
clean:
	rm -rf $(DIST)

# ---- Deploy to GitHub Pages ----
.PHONY: deploy
deploy: build
	@echo "Deploying to GitHub Pages..."
	npx gh-pages -d $(DIST) -b $(BRANCH)