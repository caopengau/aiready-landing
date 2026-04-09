// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

// Suppress AWS SDK warning when both profile and static keys are set
// by prioritizing the profile (which is the project standard)
if (
  process.env.AWS_PROFILE &&
  (process.env.AWS_ACCESS_KEY_ID || process.env.AWS_SECRET_ACCESS_KEY)
) {
  delete process.env.AWS_ACCESS_KEY_ID;
  delete process.env.AWS_SECRET_ACCESS_KEY;
}

export default $config({
  app(input) {
    const stage = input?.stage || 'dev';
    return {
      name: 'aiready-landing-' + stage,
      removal: stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    const cloudflareZoneId = '50eb7dcadc84c58ab34583742db0b671';

    // Storage for report submissions
    const submissions = new sst.aws.Bucket('Submissions', {
      public: false,
      versioned: false,
    });

    // SES domain identity - managed only for production to avoid conflicts
    const domainName = 'getaiready.dev';
    const defaultSesFromEmail = `notifications@${domainName}`;

    // For production, don't try to create SES identity - it already exists
    // For dev, optionally create if requested
    const isProduction = $app.stage === 'production';
    const manageSesDomainIdentity =
      isProduction && process.env.SES_MANAGE_DOMAIN_IDENTITY === 'true';

    let emailDomain = domainName;

    // API Gateway HTTP API for public form submissions
    const api = new sst.aws.ApiGatewayV2('RequestApi', {
      cors: true,
    });

    api.route('POST /', {
      handler: 'api/request-report.handler',
      link: [submissions],
      environment: {
        SUBMISSIONS_BUCKET: submissions.name,
        SES_TO_EMAIL: process.env.SES_TO_EMAIL || '',
        SES_FROM_EMAIL: process.env.SES_FROM_EMAIL || defaultSesFromEmail,
        SES_CONFIGURATION_SET:
          'aiready-landing-production-notificationemailconfig-ttxwnzxe',
      },
      permissions: [
        {
          actions: ['ses:SendEmail', 'ses:SendRawEmail'],
          resources: ['*'],
        },
      ],
    });

    // Static site deployment - domain only for prod to prevent conflicts
    const useCustomDomain = $app.stage === 'production';

    const site = new sst.aws.StaticSite('AireadyLanding', {
      path: './',
      build: {
        command: 'pnpm build',
        output: 'out',
      },
      environment: {
        NEXT_PUBLIC_REQUEST_URL: api.url,
      },
      ...(useCustomDomain && {
        domain: {
          name: 'getaiready.dev',
          redirects: ['www.getaiready.dev'],
          dns: sst.cloudflare.dns({
            zone: cloudflareZoneId,
            proxy: true,
          }),
        },
      }),
      invalidation: {
        paths: ['/*'],
        wait: true,
      },
    });

    const siteUrl = site.url;

    return {
      site: siteUrl,
      apiUrl: api.url,
      submissionsBucket: submissions.name,
      emailDomain: emailDomain,
    };
  },
});
