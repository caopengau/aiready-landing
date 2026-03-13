import InvisibleCodebase from './invisible-codebase';
import invisibleCodebaseMeta from './invisible-codebase.meta';
import AiCodeDebtTsunami from './ai-code-debt-tsunami';
import aiCodeDebtTsunamiMeta from './ai-code-debt-tsunami.meta';
import MetricsThatMatter from './metrics-that-actually-matter';
import metricsThatMatterMeta from './metrics-that-actually-matter.meta';
import SemanticDuplicateDetection from './semantic-duplicate-detection';
import semanticDuplicateDetectionMeta from './semantic-duplicate-detection.meta';
import HiddenCostImportChains from './hidden-cost-import-chains';
import hiddenCostImportChainsMeta from './hidden-cost-import-chains.meta';
import VisualizingInvisible from './visualizing-invisible';
import visualizingInvisibleMeta from './visualizing-invisible.meta';
import FutureHumanFriendlyCode from './future-human-friendly-code';
import futureHumanFriendlyCodeMeta from './future-human-friendly-code.meta';
import TheAgenticWall from './the-agentic-wall';
import theAgenticWallMeta from './the-agentic-wall.meta';
import BeyondTheSidekick from './beyond-the-sidekick';
import beyondTheSidekickMeta from './beyond-the-sidekick.meta';
import TheEconomicMoat from './the-economic-moat';
import theEconomicMoatMeta from './the-economic-moat.meta';
import TheNeuralSpine from './the-neural-spine';
import theNeuralSpineMeta from './the-neural-spine.meta';
import ClosingTheLoop from './closing-the-loop';
import closingTheLoopMeta from './closing-the-loop.meta';
import CognitiveTiering from './cognitive-tiering';
import cognitiveTieringMeta from './cognitive-tiering.meta';
import ResilienceFortress from './resilience-fortress';
import resilienceFortressMeta from './resilience-fortress.meta';
import ObservabilityIntelligence from './observability-intelligence';
import observabilityIntelligenceMeta from './observability-intelligence.meta';
import HumanAgentCoManagement from './human-agent-co-management';
import humanAgentCoManagementMeta from './human-agent-co-management.meta';
import RecursiveSafety from './recursive-safety';
import recursiveSafetyMeta from './recursive-safety.meta';
import RoadmapToAutonomy from './roadmap-to-autonomy';
import roadmapToAutonomyMeta from './roadmap-to-autonomy.meta';
import LivingRepository from './living-repository';
import livingRepositoryMeta from './living-repository.meta';

export const posts = [
  {
    slug: beyondTheSidekickMeta.slug,
    title: beyondTheSidekickMeta.title,
    date: beyondTheSidekickMeta.date,
    excerpt: beyondTheSidekickMeta.excerpt,
    author: beyondTheSidekickMeta.author,
    tags: beyondTheSidekickMeta.tags || [],
    readingTime: beyondTheSidekickMeta.readingTime,
    Content: BeyondTheSidekick,
  },
  {
    slug: theEconomicMoatMeta.slug,
    title: theEconomicMoatMeta.title,
    date: theEconomicMoatMeta.date,
    excerpt: theEconomicMoatMeta.excerpt,
    author: theEconomicMoatMeta.author,
    tags: theEconomicMoatMeta.tags || [],
    readingTime: theEconomicMoatMeta.readingTime,
    Content: TheEconomicMoat,
  },
  {
    slug: theNeuralSpineMeta.slug,
    title: theNeuralSpineMeta.title,
    date: theNeuralSpineMeta.date,
    excerpt: theNeuralSpineMeta.excerpt,
    author: theNeuralSpineMeta.author,
    tags: theNeuralSpineMeta.tags || [],
    readingTime: theNeuralSpineMeta.readingTime,
    Content: TheNeuralSpine,
  },
  {
    slug: closingTheLoopMeta.slug,
    title: closingTheLoopMeta.title,
    date: closingTheLoopMeta.date,
    excerpt: closingTheLoopMeta.excerpt,
    author: closingTheLoopMeta.author,
    tags: closingTheLoopMeta.tags || [],
    readingTime: closingTheLoopMeta.readingTime,
    Content: ClosingTheLoop,
  },
  {
    slug: cognitiveTieringMeta.slug,
    title: cognitiveTieringMeta.title,
    date: cognitiveTieringMeta.date,
    excerpt: cognitiveTieringMeta.excerpt,
    author: cognitiveTieringMeta.author,
    tags: cognitiveTieringMeta.tags || [],
    readingTime: cognitiveTieringMeta.readingTime,
    Content: CognitiveTiering,
  },
  {
    slug: resilienceFortressMeta.slug,
    title: resilienceFortressMeta.title,
    date: resilienceFortressMeta.date,
    excerpt: resilienceFortressMeta.excerpt,
    author: resilienceFortressMeta.author,
    tags: resilienceFortressMeta.tags || [],
    readingTime: resilienceFortressMeta.readingTime,
    Content: ResilienceFortress,
  },
  {
    slug: observabilityIntelligenceMeta.slug,
    title: observabilityIntelligenceMeta.title,
    date: observabilityIntelligenceMeta.date,
    excerpt: observabilityIntelligenceMeta.excerpt,
    author: observabilityIntelligenceMeta.author,
    tags: observabilityIntelligenceMeta.tags || [],
    readingTime: observabilityIntelligenceMeta.readingTime,
    Content: ObservabilityIntelligence,
  },
  {
    slug: humanAgentCoManagementMeta.slug,
    title: humanAgentCoManagementMeta.title,
    date: humanAgentCoManagementMeta.date,
    excerpt: humanAgentCoManagementMeta.excerpt,
    author: humanAgentCoManagementMeta.author,
    tags: humanAgentCoManagementMeta.tags || [],
    readingTime: humanAgentCoManagementMeta.readingTime,
    Content: HumanAgentCoManagement,
  },
  {
    slug: recursiveSafetyMeta.slug,
    title: recursiveSafetyMeta.title,
    date: recursiveSafetyMeta.date,
    excerpt: recursiveSafetyMeta.excerpt,
    author: recursiveSafetyMeta.author,
    tags: recursiveSafetyMeta.tags || [],
    readingTime: recursiveSafetyMeta.readingTime,
    Content: RecursiveSafety,
  },
  {
    slug: roadmapToAutonomyMeta.slug,
    title: roadmapToAutonomyMeta.title,
    date: roadmapToAutonomyMeta.date,
    excerpt: roadmapToAutonomyMeta.excerpt,
    author: roadmapToAutonomyMeta.author,
    tags: roadmapToAutonomyMeta.tags || [],
    readingTime: roadmapToAutonomyMeta.readingTime,
    Content: RoadmapToAutonomy,
  },
  {
    slug: livingRepositoryMeta.slug,
    title: livingRepositoryMeta.title,
    date: livingRepositoryMeta.date,
    excerpt: livingRepositoryMeta.excerpt,
    author: livingRepositoryMeta.author,
    tags: livingRepositoryMeta.tags || [],
    readingTime: livingRepositoryMeta.readingTime,
    Content: LivingRepository,
  },
  {
    slug: theAgenticWallMeta.slug,
    title: theAgenticWallMeta.title,
    date: theAgenticWallMeta.date,
    excerpt: theAgenticWallMeta.excerpt,
    author: theAgenticWallMeta.author,
    tags: theAgenticWallMeta.tags || [],
    readingTime: theAgenticWallMeta.readingTime,
    Content: TheAgenticWall,
  },
  {
    slug: futureHumanFriendlyCodeMeta.slug,
    title: futureHumanFriendlyCodeMeta.title,
    date: futureHumanFriendlyCodeMeta.date,
    excerpt: futureHumanFriendlyCodeMeta.excerpt,
    author: futureHumanFriendlyCodeMeta.author,
    tags: futureHumanFriendlyCodeMeta.tags || [],
    readingTime: futureHumanFriendlyCodeMeta.readingTime,
    Content: FutureHumanFriendlyCode,
  },
  {
    slug: visualizingInvisibleMeta.slug,
    title: visualizingInvisibleMeta.title,
    date: visualizingInvisibleMeta.date,
    excerpt: visualizingInvisibleMeta.excerpt,
    author: visualizingInvisibleMeta.author,
    tags: visualizingInvisibleMeta.tags || [],
    readingTime: visualizingInvisibleMeta.readingTime,
    Content: VisualizingInvisible,
  },
  {
    slug: invisibleCodebaseMeta.slug,
    title: invisibleCodebaseMeta.title,
    date: invisibleCodebaseMeta.date,
    excerpt: invisibleCodebaseMeta.excerpt,
    author: invisibleCodebaseMeta.author,
    tags: invisibleCodebaseMeta.tags || [],
    readingTime: invisibleCodebaseMeta.readingTime,
    Content: InvisibleCodebase,
  },
  {
    slug: aiCodeDebtTsunamiMeta.slug,
    title: aiCodeDebtTsunamiMeta.title,
    date: aiCodeDebtTsunamiMeta.date,
    excerpt: aiCodeDebtTsunamiMeta.excerpt,
    author: aiCodeDebtTsunamiMeta.author,
    tags: aiCodeDebtTsunamiMeta.tags || [],
    readingTime: aiCodeDebtTsunamiMeta.readingTime,
    Content: AiCodeDebtTsunami,
  },
  {
    slug: metricsThatMatterMeta.slug,
    title: metricsThatMatterMeta.title,
    date: metricsThatMatterMeta.date,
    excerpt: metricsThatMatterMeta.excerpt,
    author: metricsThatMatterMeta.author,
    tags: metricsThatMatterMeta.tags || [],
    readingTime: metricsThatMatterMeta.readingTime,
    Content: MetricsThatMatter,
  },
  {
    slug: semanticDuplicateDetectionMeta.slug,
    title: semanticDuplicateDetectionMeta.title,
    date: semanticDuplicateDetectionMeta.date,
    excerpt: semanticDuplicateDetectionMeta.excerpt,
    author: semanticDuplicateDetectionMeta.author,
    tags: semanticDuplicateDetectionMeta.tags || [],
    readingTime: semanticDuplicateDetectionMeta.readingTime,
    Content: SemanticDuplicateDetection,
  },
  {
    slug: hiddenCostImportChainsMeta.slug,
    title: hiddenCostImportChainsMeta.title,
    date: hiddenCostImportChainsMeta.date,
    excerpt: hiddenCostImportChainsMeta.excerpt,
    author: hiddenCostImportChainsMeta.author,
    tags: hiddenCostImportChainsMeta.tags || [],
    readingTime: hiddenCostImportChainsMeta.readingTime,
    Content: HiddenCostImportChains,
  },
];
