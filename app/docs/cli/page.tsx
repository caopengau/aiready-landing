'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DocsCliRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/docs#cli');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Redirecting...
        </h1>
        <p className="text-slate-600">
          We are moving you to the CLI documentation section.
        </p>
        <p className="text-sm text-slate-400 mt-8">
          If you are not redirected automatically,{' '}
          <a href="/docs#cli" className="text-blue-600 underline">
            click here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
