# Deployment Automation
# Deploy landing page and services to AWS

include makefiles/Makefile.shared.mk

.PHONY: deploy-landing deploy-landing-prod deploy-landing-remove landing-logs

##@ Deployment

deploy-landing: ## Deploy landing page to AWS (dev environment)
	@$(call log_step,Deploying landing page to AWS (dev))
	@echo "$(CYAN)Using AWS Profile: $(AWS_PROFILE)$(NC)"
	@echo "$(CYAN)Using AWS Region: $(AWS_REGION)$(NC)"
	@cd landing && \
		AWS_PROFILE=$(AWS_PROFILE) AWS_REGION=$(AWS_REGION) \
		SLACK_WEBHOOK_URL="$(SLACK_WEBHOOK_URL)" SES_TO_EMAIL="$(SES_TO_EMAIL)" \
		sst deploy
	@$(call log_success,Landing page deployed to dev)

deploy-landing-prod: ## Deploy landing page to AWS (production)
	@$(call log_step,Deploying landing page to AWS (production))
	@echo "$(YELLOW)⚠️  Deploying to PRODUCTION$(NC)"
	@echo "$(CYAN)Using AWS Profile: $(AWS_PROFILE)$(NC)"
	@echo "$(CYAN)Using AWS Region: $(AWS_REGION)$(NC)"
	@cd landing && \
		AWS_PROFILE=$(AWS_PROFILE) AWS_REGION=$(AWS_REGION) \
		SLACK_WEBHOOK_URL="$(SLACK_WEBHOOK_URL)" SES_TO_EMAIL="$(SES_TO_EMAIL)" \
		sst deploy --stage production
	@$(call log_success,Landing page deployed to production)

deploy-landing-remove: ## Remove landing page deployment (dev)
	@$(call log_warning,Removing landing page deployment from AWS (dev))
	@cd landing && \
		AWS_PROFILE=$(AWS_PROFILE) AWS_REGION=$(AWS_REGION) sst remove
	@$(call log_success,Landing page deployment removed)

landing-logs: ## Show landing page logs (requires SST dashboard)
	@$(call log_step,Opening SST dashboard for logs)
	@cd landing && \
		AWS_PROFILE=$(AWS_PROFILE) AWS_REGION=$(AWS_REGION) sst dev

deploy-check: ## Check AWS credentials and SST installation
	@echo "$(CYAN)🔍 Checking deployment prerequisites...$(NC)\n"
	@echo "$(GREEN)AWS Profile:$(NC) $(AWS_PROFILE)"
	@echo "$(GREEN)AWS Region:$(NC) $(AWS_REGION)"
	@echo ""
	@if command -v sst >/dev/null 2>&1; then \
		echo "$(GREEN)✓ SST CLI installed:$(NC) $$(sst --version)"; \
	else \
		echo "$(RED)✗ SST CLI not found$(NC)"; \
		echo "  Install: npm install -g sst@ion"; \
		exit 1; \
	fi
	@echo ""
	@if aws sts get-caller-identity --profile $(AWS_PROFILE) >/dev/null 2>&1; then \
		echo "$(GREEN)✓ AWS credentials valid$(NC)"; \
		aws sts get-caller-identity --profile $(AWS_PROFILE) | \
			jq -r '"  Account: \(.Account)\n  User: \(.Arn)"'; \
	else \
		echo "$(RED)✗ AWS credentials invalid or not found$(NC)"; \
		echo "  Configure: aws configure --profile $(AWS_PROFILE)"; \
		exit 1; \
	fi
	@echo ""
	@$(call log_success,All prerequisites met)

deploy-landing-status: ## Show current deployment status
	@echo "$(CYAN)📊 Landing Page Deployment Status$(NC)\n"
	@cd landing && \
		AWS_PROFILE=$(AWS_PROFILE) AWS_REGION=$(AWS_REGION) sst list || \
		echo "$(YELLOW)No deployments found$(NC)"

leads-export: ## Export submissions from S3 to local CSV
	@$(call log_step,Exporting leads from S3)
	@mkdir -p .aiready/leads/submissions
	@bucket=$$(cd landing && AWS_PROFILE=$(AWS_PROFILE) AWS_REGION=$(AWS_REGION) sst list | awk '/submissionsBucket:/ {print $$2}'); \
	if [ -z "$$bucket" ]; then \
		echo "$(RED)✗ Could not detect submissions bucket$(NC)"; exit 1; \
	fi; \
	aws s3 sync s3://$$bucket/submissions .aiready/leads/submissions --delete --profile $(AWS_PROFILE) || exit 1; \
	jq -r '["email","repoUrl","receivedAt"], (.aiready/leads/submissions/*.json | map( [ .email, .repoUrl, .receivedAt ] ))[] | @csv' \
		<(jq -s '.' .aiready/leads/submissions/*.json 2>/dev/null) > .aiready/leads/leads.csv 2>/dev/null || \
		echo "$(YELLOW)No submissions found yet$(NC)"; \
	echo "$(GREEN)✓ Exported to .aiready/leads/leads.csv$(NC)"

leads-open: ## Open leads folder
	@open .aiready/leads 2>/dev/null || xdg-open .aiready/leads 2>/dev/null || echo "Path: .aiready/leads"
