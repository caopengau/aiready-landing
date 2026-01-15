# Vercel Deployment Guide

## Quick Deploy

1. **Install Vercel CLI** (if not installed):
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy from landing directory**:
```bash
cd landing
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time) or **Y** (subsequent deploys)
   - What's your project's name? `aiready-landing` (or your choice)
   - In which directory is your code located? **./** (current directory)
   - Want to override settings? **N** (auto-detection works great)

5. **Production deploy**:
```bash
vercel --prod
```

## Alternative: GitHub Integration

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Set root directory to `landing`
5. Deploy! 🚀

## Configuration

The project is configured in:
- `vercel.json` - Vercel settings
- `package.json` - Build commands
- Auto-detects Next.js 16

## Custom Domain

After first deploy:
1. Go to project settings in Vercel dashboard
2. Navigate to Domains
3. Add your custom domain
4. Update DNS records as instructed

Example domains:
- aiready.dev
- getaiready.com
- aiready.io

## Environment Variables

If you need env vars:
```bash
vercel env add VARIABLE_NAME
```

Or add in Vercel dashboard under Settings → Environment Variables

## Preview Deployments

Every push to branches gets automatic preview URLs:
```bash
git checkout -b feature/pricing-page
git push origin feature/pricing-page
# Vercel automatically creates preview URL
```

## Monitoring

View deployment logs:
```bash
vercel logs
```

## Production URL

After deployment, you'll get:
- Production: `aiready-landing.vercel.app`
- Preview: `aiready-landing-{hash}.vercel.app`

## Tips

✅ **Speed**: Deploys in ~30 seconds
✅ **SSL**: Automatic HTTPS
✅ **CDN**: Global edge network
✅ **Analytics**: Free Vercel Analytics
✅ **Zero Config**: Just works™

## Next Steps

- [ ] Deploy to production
- [ ] Add custom domain
- [ ] Set up Vercel Analytics
- [ ] Configure SEO metadata
- [ ] Add Open Graph images
