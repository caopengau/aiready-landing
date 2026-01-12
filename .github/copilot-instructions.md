# Copilot Instructions for AIReady

## Project Overview

AIReady is a monorepo containing tools for assessing AI-readiness and visualizing tech debt in codebases. The goal is to help teams prepare repositories for better AI adoption by detecting issues that confuse AI models and identifying tech debt.

## Architecture: Hub-and-Spoke Pattern

We follow a **hub-and-spoke** architecture to keep the codebase organized and maintainable:

```
@aiready/core (HUB)
    ↓
    ├─→ @aiready/pattern-detect (SPOKE)
    ├─→ @aiready/context-analyzer (SPOKE)
    ├─→ @aiready/doc-drift (SPOKE)
    ├─→ @aiready/consistency (SPOKE)
    └─→ @aiready/cli (SPOKE - aggregator)
```

### Hub: `@aiready/core`

**Purpose:** Shared utilities, types, and common functionality

**Contains:**
- Type definitions (`types.ts`) - All shared interfaces
- File scanning utilities (`utils/file-scanner.ts`)
- AST parsing helpers (`utils/ast-parser.ts`)
- Metric calculations (`utils/metrics.ts`)
- Common algorithms (similarity, token estimation, etc.)

**Rules:**
- ✅ **DO** add shared types and utilities here
- ✅ **DO** keep functions pure and generic
- ❌ **DON'T** add tool-specific logic
- ❌ **DON'T** create dependencies on spoke packages

### Spokes: Individual Tools

**Purpose:** Specialized analysis tools that solve ONE specific problem

**Each spoke should:**
- Import from `@aiready/core` only (never from other spokes)
- Provide both programmatic API and CLI
- Have its own README with clear use case
- Be independently publishable to npm
- Focus on a single analysis type

## Development Workflow

**⚠️ IMPORTANT: Always use Makefile commands for DevOps operations**

We use a **Makefile-based workflow** for all development, building, testing, and publishing. This ensures consistency and proper monorepo management.

### 1. Installing Dependencies

```bash
make install
# or: pnpm install
```

### 2. Building All Packages

```bash
make build
# or: pnpm build
```

### 3. Development Mode (with watch)

```bash
make dev
# or: pnpm dev

# Or build specific package
pnpm --filter @aiready/pattern-detect dev
```

### 4. Testing

```bash
make test
# or: pnpm test
```

### 5. Daily Workflow (RECOMMENDED)

```bash
# After making changes
git add .
git commit -m "feat: your changes"
make push  # ← Syncs monorepo + ALL spoke repos automatically
```

### 6. Publishing & Release

```bash
# Check what needs publishing
make release-status

# Release a spoke (one command does everything)
make release-one SPOKE=context-analyzer TYPE=patch

# Publish to npm only (advanced)
make npm-publish SPOKE=context-analyzer

# Sync GitHub only (advanced)
make publish SPOKE=context-analyzer
```

### Available Make Commands

```bash
make help           # Show all available commands
make release-help   # Show release options
make install        # Install dependencies
make build          # Build all packages
make test           # Run tests
make lint           # Check code quality
make fix            # Auto-fix linting issues
make clean          # Clean build artifacts
make push           # Push + sync all spoke repos (RECOMMENDED)
make release-status # Check versions (local vs npm)
```

### Documentation

- **[WORKFLOW_GUIDE.md](./.github/WORKFLOW_GUIDE.md)** - Daily development workflows
- **[PUBLISHING.md](../PUBLISHING.md)** - Complete publishing guide
- **[DEVOPS_WORKFLOW.md](./.github/DEVOPS_WORKFLOW.md)** - Visual workflow diagrams
- **[RELEASE_CHECKLIST.md](./.github/RELEASE_CHECKLIST.md)** - Quick release reference

## Adding a New Tool (Spoke)

Follow these steps to add a new analysis tool:

### Step 1: Create Package Structure

```bash
mkdir -p packages/your-tool/src
cd packages/your-tool
```

### Step 2: Create `package.json`

```json
{
  "name": "@aiready/your-tool",
  "version": "0.1.0",
  "description": "Brief description of what this tool does",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "bin": {
    "aiready-yourtool": "./dist/cli.js"
  },
  "scripts": {
    "build": "tsup src/index.ts src/cli.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts src/cli.ts --format cjs,esm --dts --watch",
    "test": "vitest run",
    "lint": "eslint src",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@aiready/core": "workspace:*",
    "commander": "^12.1.0"
  },
  "devDependencies": {
    "tsup": "^8.3.5"
  },
  "keywords": ["aiready", "your-keywords"],
  "license": "MIT"
}
```

### Step 3: Create `src/index.ts`

```typescript
import { scanFiles, readFileContent } from '@aiready/core';
import type { AnalysisResult, Issue, ScanOptions } from '@aiready/core';

export interface YourToolOptions extends ScanOptions {
  // Your specific options
}

export async function analyzeYourTool(
  options: YourToolOptions
): Promise<AnalysisResult[]> {
  const files = await scanFiles(options);
  const results: AnalysisResult[] = [];

  // Your analysis logic here
make build
# or: pnpm --filter @aiready/your-tool dev
```

### Step 8: Publish (After Implementation)

```bash
# Commit everything
git add .
git commit -m "feat: add @aiready/your-tool"
make push  # Syncs all repositories

# Create GitHub repo
gh repo create caopengau/aiready-your-tool --public

# Release first version
make release-one SPOKE=your-tool TYPE=minor
}
```

### Step 4: Create `src/cli.ts`

```typescript
#!/usr/bin/env node
import { Command } from 'commander';
import { analyzeYourTool } from './index';
import chalk from 'chalk';

const program = new Command();

program
  .name('aiready-yourtool')
  .description('Description of your tool')
  .version('0.1.0')
  .argument('<directory>', 'Directory to analyze')
  .action(async (directory, options) => {
    console.log(chalk.blue('🔍 Analyzing...\n'));
    const results = await analyzeYourTool({ rootDir: directory });
    // Display results
  });

program.parse();
```

### Step 5: Create `tsconfig.json`

```json
{
  "extends": "../core/tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

### Step 6: Create `README.md`

Document:
- What problem it solves
- Why it exists (vs alternatives)
- Installation
- Usage (CLI + programmatic)
- Configuration options

### Step 7: Build and Test

```bash
pnpm build
pnpm --filter @aiready/your-tool dev
```

## Common Patterns

### Adding Shared Utilities to Core

If multiple spokes need the same functionality:

1. Add to `packages/core/src/utils/`
2. Export from `packages/core/src/index.ts`
3. Import in spokes: `import { utility } from '@aiready/core'`

### Adding New Issue Types

1. Add to `IssueType` union in `packages/core/src/types.ts`
2. Use in your spoke package
3. Rebuild core: `pnpm --filter @aiready/core build`

### Token Estimation

```typescript
import { estimateTokens } from '@aiready/core';

const tokens = estimateTokens(codeString); // ~4 chars per token
```

### Similarity Scoring

```typescript
import { similarityScore } from '@aiready/core';

const score = similarityScore(code1, code2); // Returns 0-1
```

## Publishing Strategy

###

### Publishing Workflow

**Use Makefile commands (never direct npm/pnpm publish):**

```bash
# Check status
make release-status

# Release a spoke (recommended - does everything)
make release-one SPOKE=your-tool TYPE=patch

# Or manual steps:
make version-patch SPOKE=your-tool
make build
make npm-publish SPOKE=your-tool
make publish SPOKE=your-tool
```

**Important:** 
- Always use `make push` after commits to sync spoke repos
- Always use `make npm-publish` (handles workspace:* protocol)
- Never use `npm publish` directly (will fail with workspace:* protocol)
- Release order: `core` first, then dependent spokes Free Tier (npm packages)
- All spoke packages are free and open source
- Publish to npm with `@aiready/` scope
- Basic analysis with limited output

### Paid Tier (SaaS)
- Historical trend analysis
- Team benchmarking
- Custom rule engines
- Integration APIs
- Hosted at aiready.dev

**Upsell Funnel:**
```
Free CLI → Shows issues → "See trends" → Upgrade to Pro
```

## What Already Exists (Don't Rebuild)

- **jscpd** - Byte-level duplicate detection
- **madge** - Circular dependency graphs
- **depcheck** - Unused dependencies
- **ESLint** - Code linting
- **typescript-metrics** - Complexity metrics

**Our Differentiators:**
- Semantic duplicate detection (not byte-level)
- AI context cost estimation
- Documentation drift analysis
- Pattern consistency scoring

## File Organization

```
aiready/
├── packages/
│   ├── core/              # Hub - shared utilities
│   │   ├── src/
│   │   │   ├── types.ts           # All shared types
│   │   │   ├── index.ts           # Public exports
│   │   │   └── utils/
│   │   │       ├── file-scanner.ts
│   │   │       ├── ast-parser.ts
│   │   │       └── metrics.ts
│   │   └── package.json
│   │
│   ├── pattern-detect/    # Spoke - duplicate patterns
│   │   ├── src/
2. ✅ **@aiready/pattern-detect** - Semantic duplicates (DONE, v0.5.1 on npm)
3. ✅ **@aiready/context-analyzer** - Context window cost analysis (DONE, v0.1.0 on npm)
4. **@aiready/doc-drift** - Documentation staleness
5. **@aiready/consistency** - Naming patterns
6. **@aiready/cli** - Unified interface
7. **@aiready/deps** - Wrapper for madge/depcheck

### Tool Implementation Plans
- [Context Analyzer Plan](.github/plans/context-analyzer-plan.md) - Completed implementation
- [Pattern Detect Retrospective](.github/plans/pattern-detect-plan.md) - Lessons learned from first spoke

### DevOps Documentation
- [WORKFLOW_GUIDE.md](.github/WORKFLOW_GUIDE.md) - Daily development workflows ⭐
- [PUBLISHING.md](../PUBLISHING.md) - Complete publishing guide
- [DEVOPS_WORKFLOW.md](.github/DEVOPS_WORKFLOW.md) - Visual workflow diagrams
- [RELEASE_CHECKLIST.md](.github/RELEASE_CHECKLIST.md) - Quick release referenc
├── turbo.json            # Turborepo config
└── README.md             # Project overview
```

- **Should I use make or pnpm?** (Use `make` for DevOps, `pnpm --filter` for dev)
- **Did I run `make push` after committing?** (Keeps spoke repos in sync)

## DevOps Best Practices

### ✅ DO

1. **Use Makefile commands** - `make build`, `make test`, `make push`
2. **Run `make push` after every commit** - Keeps all spoke repos synchronized
3. **Use `make release-one`** - One command handles complete release workflow
4. **Check `make release-status`** - Know what needs publishing before releasing
5. **Release core first** - If core changes, publish before dependent spokes
6. **Test before pushing** - `make test` catches issues early

### ❌ DON'T

1. **Don't use `npm publish` directly** - Use `make npm-publish` (handles workspace:*)
2. **Don't skip `make push`** - Spoke repos will drift out of sync
3. **Don't `git push` without `make push`** - Won't sync spoke repositories
4. **Don't release spokes before core** - Core changes need to publish first
5. **Don't forget to sync** - External contributors need current code

### Command Priority

When performing DevOps tasks, prefer this order:

1. **Make commands** (highest priority) - `make build`, `make push`, `make release-one`
2. **Turbo commands** (monorepo builds) - Used internally by Make
3. **pnpm commands** (package-specific dev) - `pnpm --filter @aiready/core build`
4. **Direct commands** (avoid) - `npm publish`, `git push` alone

## Getting Help

- Check existing spoke implementations for patterns
- Review `@aiready/core` types for available utilities
- Look at `@aiready/pattern-detect` as reference implementation
- Keep spokes focused - one tool, one job
- **Read [WORKFLOW_GUIDE.md](.github/WORKFLOW_GUIDE.md) for daily workflows**
- **Read [PUBLISHING.md](../PUBLISHING.md) for release processes**

### Issue Severity Levels
- `critical` - Breaks AI understanding or causes bugs
- `major` - Significantly impacts AI effectiveness
- `minor` - Minor quality issues
- `info` - Suggestions for improvement

### Code Style
- TypeScript strict mode enabled
- Pure functions preferred
- Async/await over promises
- Explicit return types

## Next Steps

Current priority order:

1. ✅ **@aiready/core** - Basic utilities (DONE) - [Retrospective](.github/plans/pattern-detect-retrospective.md)
2. ✅ **@aiready/pattern-detect** - Semantic duplicates (DONE) - [Retrospective](.github/plans/pattern-detect-retrospective.md)
3. **@aiready/context-analyzer** - Token cost + fragmentation - [Implementation Plan](.github/plans/context-analyzer-plan.md)
4. **@aiready/doc-drift** - Documentation staleness
5. **@aiready/consistency** - Naming patterns
6. **@aiready/cli** - Unified interface
7. **@aiready/deps** - Wrapper for madge/depcheck

### Tool Implementation Plans
- [Context Analyzer Plan](.github/plans/context-analyzer-plan.md) - Next tool to implement
- [Pattern Detect Retrospective](.github/plans/pattern-detect-retrospective.md) - Lessons learned from first spoke

## Questions for Agent

When working on this codebase, consider:

- **Does this belong in core or a spoke?** (If multiple tools need it → core)
- **Am I creating a spoke-to-spoke dependency?** (Don't - refactor to core)
- **Is this tool independently useful?** (Should be publishable alone)
- **Does this overlap with existing tools?** (Check npm search first)
- **Can I test this on a real repo?** (Validate before over-engineering)

## Getting Help

- Check existing spoke implementations for patterns
- Review `@aiready/core` types for available utilities
- Look at `@aiready/pattern-detect` as reference implementation
- Keep spokes focused - one tool, one job
