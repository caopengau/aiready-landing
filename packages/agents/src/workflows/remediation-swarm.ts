import { Workflow } from 'mastra';
import { PrioritizationAgent } from '../prioritization-agent';
import { ImpactAgent } from '../impact-agent';
import { RestructureAgent } from '../restructure-agent';
import { RefactorAgent } from '../refactor-agent';
import { ValidationAgent } from '../validation-agent';

export const RemediationSwarm = new Workflow({
  name: 'Remediation Swarm',
  steps: [
    {
      id: 'prioritize',
      agent: PrioritizationAgent,
      description: 'Calculating ROI and Risk hierarchy',
    },
    {
      id: 'impact',
      agent: ImpactAgent,
      description: 'Predicting monetary token savings',
    },
    {
      id: 'restructure',
      agent: RestructureAgent,
      description: 'Optimizing architecture and folder structure',
    },
    {
      id: 'refactor',
      agent: RefactorAgent,
      description: 'Executing the code consolidation',
    },
    {
      id: 'validate',
      agent: ValidationAgent,
      description: 'Verifying types and automated tests',
    },
  ],
  // Note: Complex looping and conditional logic is typically handled
  // in the workflow's trigger or a custom execution handler in Mastra.
});
