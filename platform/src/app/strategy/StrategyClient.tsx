'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import PlatformShell from '@/components/PlatformShell';
import type { Team, TeamMember, AIReadyConfig } from '@/lib/db';
import { ScanConfigForm } from '../dashboard/repo/[id]/settings/ScanConfigForm';
import { SettingsIcon } from '@/components/Icons';

interface Props {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    scanConfig?: AIReadyConfig;
  };
  teams: (TeamMember & { team: Team })[];
  overallScore: number | null;
}

export default function StrategyClient({ user, teams, overallScore }: Props) {
  const router = useRouter();

  async function handleUpdateScanStrategy(settings: AIReadyConfig | null) {
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanConfig: settings }),
      });
      if (res.ok) {
        toast.success('Default scan strategy updated');
        router.refresh();
      } else {
        throw new Error('Failed to update strategy');
      }
    } catch (err) {
      console.error('Failed to update scan strategy:', err);
      toast.error('Failed to save strategy');
      throw err;
    }
  }

  return (
    <PlatformShell
      user={user}
      teams={teams}
      overallScore={overallScore}
      activePage="strategy"
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <SettingsIcon className="w-6 h-6 text-cyan-500" />
            </div>
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
              Global Strategy
            </h1>
          </div>
          <p className="text-slate-400">
            Set the baseline AI-readiness standards for your entire workspace.
            These settings auto-apply to all repositories unless overridden
            individually.
          </p>
        </div>

        <section className="space-y-6">
          <ScanConfigForm
            repoId="global"
            initialSettings={user.scanConfig || null}
            onSave={handleUpdateScanStrategy}
          />
        </section>
      </div>
    </PlatformShell>
  );
}
