# Publishing Guide

## ⚠️ Important: Always Use pnpm for Publishing

**Never use `npm publish` directly!** This will break workspace dependencies.

## Why pnpm?

The monorepo uses `workspace:*` protocol for internal dependencies (e.g., `@aiready/core`). This is a pnpm feature that:
- ✅ Links packages during development
- ✅ Automatically resolves to actual versions when publishing with `pnpm publish`
- ❌ Breaks when using `npm publish` (npm doesn't understand `workspace:` protocol)

## How to Publish

### Quick Release (Recommended)

```bash
# From package directory
cd packages/pattern-detect
pnpm run release
```

This runs `pnpm build && pnpm publish --no-git-checks` which:
1. Builds the package
2. Automatically converts `workspace:*` → actual version (e.g., `^0.1.2`)
3. Publishes to npm registry

### Manual Publish

```bash
# 1. Update version
cd packages/pattern-detect
npm version patch  # or minor/major

# 2. Build
pnpm build

# 3. Publish with pnpm (not npm!)
pnpm publish --no-git-checks
```

## Publishing Checklist

- [ ] Update version in `package.json`
- [ ] Run `pnpm build` to create dist files
- [ ] Use `pnpm publish` (NOT `npm publish`)
- [ ] Verify published package has real versions: `npm view @aiready/pattern-detect@latest dependencies`
- [ ] Commit version bump: `git add package.json && git commit -m "Bump version to x.y.z"`
- [ ] Push to GitHub: `git push`

## Troubleshooting

### Problem: `npm EUNSUPPORTEDPROTOCOL error with workspace:`

**Cause:** Package was published with `npm publish` instead of `pnpm publish`

**Solution:**
1. Ensure `workspace:*` is in package.json (for development)
2. Use `pnpm publish` to convert it automatically
3. Bump patch version and republish

### Verify Published Package

```bash
# Check dependencies have real versions (not workspace:)
npm view @aiready/pattern-detect@latest dependencies

# Should show:
# { '@aiready/core': '^0.1.2', ... }

# NOT:
# { '@aiready/core': 'workspace:*', ... }
```

## Automation Ideas

Future improvements:
- Use [changesets](https://github.com/changesets/changesets) for version management
- Add GitHub Actions to auto-publish on version tags
- Add pre-publish checks in CI/CD
