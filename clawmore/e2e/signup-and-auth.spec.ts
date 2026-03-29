import { test, expect } from '@playwright/test';

test.describe('Signup Flow', () => {
  test('signup page renders with form fields', async ({ page }) => {
    await page.goto('/signup');

    // Check heading
    await expect(page.locator('h1')).toContainText('Create Account');

    // Check form fields exist
    await expect(page.locator('input[placeholder="Jane Smith"]')).toBeVisible();
    await expect(
      page.locator('input[placeholder="you@company.com"]')
    ).toBeVisible();

    // Check submit button (default is "managed" plan → "Start One-Click Setup")
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });

  test('signup page shows plan selection options', async ({ page }) => {
    await page.goto('/signup');

    // Check plan selection buttons exist
    await expect(page.locator('text=Managed Node')).toBeVisible();
    await expect(page.locator('text=Free Tier')).toBeVisible();
    await expect(page.locator('text=$29')).toBeVisible();
    await expect(page.locator('text=$0')).toBeVisible();
  });

  test('signup page shows managed node benefits by default', async ({
    page,
  }) => {
    await page.goto('/signup');

    // Check managed node benefits are listed (default selection)
    await expect(page.locator('text=Dedicated AWS Managed Node')).toBeVisible();
    await expect(
      page.locator('text=Unlimited Repositories & Scans')
    ).toBeVisible();
    await expect(
      page.locator('text=$10 Monthly AI Fuel Allowance')
    ).toBeVisible();
  });

  test('signup page shows free tier benefits when selected', async ({
    page,
  }) => {
    await page.goto('/signup');

    // Click on Free Tier button
    await page.click('button:has-text("Free Tier")');

    // Check free tier features are listed
    await expect(page.locator('text=3 public repositories')).toBeVisible();
    await expect(page.locator('text=10 analysis runs / month')).toBeVisible();
    await expect(page.locator('text=$5 welcome AI credit')).toBeVisible();
  });

  test('signup page has link to login', async ({ page }) => {
    await page.goto('/signup');

    const loginLink = page.locator('a:has-text("Sign in")').first();
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute('href', '/login');
  });

  test('signup form validates required fields', async ({ page }) => {
    await page.goto('/signup');

    // Select free tier to get "Create Free Account" button text
    await page.click('button:has-text("Free Tier")');

    // Try to submit empty form
    const submitBtn = page.locator('button[type="submit"]');

    // HTML5 validation should prevent submission
    // The form has `required` attributes
    await submitBtn.click();

    // Page should still be on /signup (no redirect)
    await expect(page).toHaveURL(/\/signup/);
  });

  test('signup form submits and shows success state', async ({ page }) => {
    await page.goto('/signup');

    // Select free tier to get "Create Free Account" button
    await page.click('button:has-text("Free Tier")');

    // Fill form
    await page.fill('input[placeholder="Jane Smith"]', 'Test User');
    await page.fill(
      'input[placeholder="you@company.com"]',
      `test-${Date.now()}@example.com`
    );

    // Submit
    await page.click('button[type="submit"]');

    // Should show success state with "Account Created"
    await expect(page.locator('text=Account Created')).toBeVisible({
      timeout: 10000,
    });
  });
});

test.describe('Login Page', () => {
  test('login page renders with email input', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('h1')).toContainText('Sign In');
    await expect(
      page.locator('input[placeholder="you@company.com"]')
    ).toBeVisible();
    await expect(
      page.locator('button[type="submit"]:has-text("Send Magic Link")')
    ).toBeVisible();
  });

  test('login page has GitHub and Google auth buttons', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('button:has-text("GitHub")')).toBeVisible();
    await expect(page.locator('button:has-text("Google")')).toBeVisible();
  });

  test('login page has link to signup', async ({ page }) => {
    await page.goto('/login');

    const signupLink = page.locator('a:has-text("Create an account")');
    await expect(signupLink).toBeVisible();
    await expect(signupLink).toHaveAttribute('href', '/signup');
  });
});

test.describe('Legal Pages', () => {
  test('terms of service page renders', async ({ page }) => {
    await page.goto('/terms');

    await expect(page.locator('h1')).toContainText('Terms of Service');
    await expect(page.locator('text=Acceptance of Terms')).toBeVisible();
  });

  test('privacy policy page renders', async ({ page }) => {
    await page.goto('/privacy');

    await expect(page.locator('h1')).toContainText('Privacy Policy');
    await expect(page.locator('text=Information We Collect')).toBeVisible();
  });

  test('footer links to terms and privacy', async ({ page }) => {
    await page.goto('/');

    const termsLink = page.locator('footer a:has-text("Terms")');
    const privacyLink = page.locator('footer a:has-text("Privacy")');

    await expect(termsLink).toHaveAttribute('href', '/terms');
    await expect(privacyLink).toHaveAttribute('href', '/privacy');
  });
});
