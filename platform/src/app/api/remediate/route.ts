import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getRemediation, updateRemediation } from '@/lib/db/remediation';
import { RefactorAgent } from '@aiready/agents';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { remediationId, type } = await req.json();
    if (!remediationId) {
      return NextResponse.json(
        { error: 'Missing remediationId' },
        { status: 400 }
      );
    }

    const remediation = await getRemediation(remediationId);
    if (!remediation) {
      return NextResponse.json(
        { error: 'Remediation not found' },
        { status: 404 }
      );
    }

    // 2. Trigger the remediation cycle
    const isSwarm = type === 'swarm';

    if (isSwarm) {
      await updateRemediation(remediationId, {
        status: 'in-progress',
        agentStatus: 'Remediation Swarm active: Analyzing architecture...',
      });
      // In a real implementation, we would call RemediationSwarm.execute()
      // For the prototype, we simulate the stage transitions:
      setTimeout(async () => {
        await updateRemediation(remediationId, {
          agentStatus: 'Swarm update: Refactoring Agent is applying fixes...',
        });
      }, 3000);

      setTimeout(async () => {
        await updateRemediation(remediationId, {
          agentStatus:
            'Swarm update: Validation Agent is verifying types/tests...',
        });
      }, 6000);
    } else {
      await updateRemediation(remediationId, {
        status: 'in-progress',
        agentStatus: 'Refactor agent started...',
      });
    }

    // 2. Trigger Mastra Refactor Agent (Simulated for Alpha)
    console.log(`[RemediateAPI] Triggering RefactorAgent for ${remediationId}`);

    // In a real implementation, this would be an async background task (SQS)
    // For Alpha, we simulate the agentic loop
    setTimeout(async () => {
      try {
        await updateRemediation(remediationId, {
          agentStatus: 'Generating consolidated code...',
        });

        // Mocking RefactorAgent execution
        const mockResult = {
          status: 'success',
          prUrl: 'https://github.com/caopengau/aiready/pull/123',
          prNumber: 123,
        };

        await updateRemediation(remediationId, {
          status: 'pr-created',
          agentStatus: 'PR Created',
          prUrl: mockResult.prUrl,
          prNumber: mockResult.prNumber,
        });
      } catch (err) {
        console.error('[RemediateAPI] Mastra execution failed:', err);
        await updateRemediation(remediationId, {
          status: 'failed',
          agentStatus: 'Refactoring failed',
        });
      }
    }, 2000);

    return NextResponse.json({
      success: true,
      message: 'Remediation agent started',
    });
  } catch (error) {
    console.error('[RemediateAPI] Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
