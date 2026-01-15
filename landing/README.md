# AIReady Landing Page

Landing page for AIReady - built with Next.js 16.

## Development

```bash
# From monorepo root
pnpm dev

# Or from landing directory
cd landing
pnpm dev
```

Visit http://localhost:3000

## Build

```bash
pnpm build
pnpm start
```

## Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd landing
vercel
```

3. Follow prompts:
   - Link to existing project or create new
   - Set root directory to `landing`
   - Keep build settings (auto-detected)

## Features

- ✅ Next.js 16 (App Router)
- ✅ Tailwind CSS 4
- ✅ TypeScript
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Fast page loads
- ✅ Zero config deployment

## Structure

```
landing/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   ├── pricing/         # Pricing page (TODO)
│   └── docs/            # Docs page (TODO)
├── components/          # Reusable components (TODO)
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind configuration
```

## TODO

- [ ] Add pricing page
- [ ] Add docs page  
- [ ] Add blog section
- [ ] Add analytics (Plausible)
- [ ] Add SEO metadata
- [ ] Add Open Graph images
- [ ] Optimize images
- [ ] Add testimonials section
