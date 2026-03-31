import React from 'react';
import CodeBlock from '../../components/CodeBlock';

const PostContent = () => (
  <>
    <p>
      Traditional code metrics like cyclomatic complexity and lines of code
      don't capture the real blockers for AI-assisted development teams. Here
      are the 9 dimensions that actually matter for AI-readiness.
    </p>

    <h2>The 9 Dimensions of AI-Readiness</h2>

    <ol>
      <li>
        <strong>Semantic Consistency</strong> - How consistently your codebase
        uses naming conventions and patterns
      </li>
      <li>
        <strong>Context Window Efficiency</strong> - How much context AI needs
        to understand your code
      </li>
      <li>
        <strong>Import Chain Depth</strong> - How deep your dependency chains go
      </li>
      <li>
        <strong>Domain Cohesion</strong> - How well related logic is grouped
        together
      </li>
      <li>
        <strong>Pattern Recognition</strong> - How easily AI can identify and
        reuse patterns
      </li>
      <li>
        <strong>Documentation Coverage</strong> - How well-documented your code
        is
      </li>
      <li>
        <strong>Type Safety</strong> - How well your types guide AI
        understanding
      </li>
      <li>
        <strong>Test Coverage</strong> - How well your tests validate AI
        suggestions
      </li>
      <li>
        <strong>Architectural Clarity</strong> - How clear your system's
        structure is
      </li>
    </ol>

    <h2>Why Traditional Metrics Fall Short</h2>

    <p>
      Traditional metrics were designed for human developers, not AI assistants.
      They measure code complexity from a human perspective, but AI has
      different strengths and weaknesses:
    </p>

    <ul>
      <li>
        AI excels at pattern recognition but struggles with inconsistent naming
      </li>
      <li>
        AI needs clear context windows but traditional metrics ignore them
      </li>
      <li>
        AI benefits from shallow import chains but complexity metrics don't
        measure depth
      </li>
    </ul>

    <h2>Measuring What Matters</h2>

    <p>
      AIReady measures these 9 dimensions to give you a comprehensive picture of
      how well your codebase is optimized for AI assistance. Each dimension is
      scored independently, and the overall AI-Readiness Score combines them
      into a single metric.
    </p>

    <CodeBlock lang="bash">{`# Run AIReady analysis
npx @aiready/cli scan . --score

# Output:
# AI-Readiness Score: 78/100
# 
# Strengths:
#   ✓ Semantic Consistency: 85%
#   ✓ Type Safety: 90%
# 
# Areas for Improvement:
#   ⚠ Context Window Efficiency: 65%
#   ⚠ Import Chain Depth: 70%`}</CodeBlock>

    <h2>Getting Started</h2>

    <p>
      Ready to measure your codebase's AI-readiness? Run the analysis and see
      how your code scores across these 9 dimensions.
    </p>

    <CodeBlock lang="bash">{`# Install AIReady CLI
npm install -g @aiready/cli

# Analyze your codebase
npx @aiready/cli scan . --score`}</CodeBlock>
  </>
);

export default PostContent;
