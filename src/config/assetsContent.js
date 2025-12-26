/**
 * Enhanced content configuration for Assets page
 * Premium data structure with all required fields
 */

export const ASSETS_DATA = {
  'concept-art': {
    id: 'concept-art',
    title: 'Concept Art',
    description: 'Visual development pieces that shaped the aesthetic direction',
    items: [
      {
        id: 'concept-001',
        title: 'Environment Concepts',
        description: 'Dystopian cityscapes, neon-lit corridors, and industrial decay visuals',
        category: 'Concept Art',
        type: 'image',
        tool: 'Midjourney v6',
        date: '2024-01',
        tags: ['environment', 'cyberpunk', 'cityscape'],
        thumbnail: null,
        preview: '/img/moodboard-1.png',
        link: '/img/moodboard-1.png',
        notes: 'These concept pieces explore the cyberpunk aesthetic through rain-soaked streets, towering megastructures, and the contrast between advanced technology and urban decay. Inspired by Blade Runner\'s visual language.'
      },
      {
        id: 'concept-002',
        title: 'Character Studies',
        description: 'Visual references and mood boards for protagonists and antagonists',
        category: 'Concept Art',
        type: 'image',
        tool: 'Midjourney v6',
        date: '2024-01',
        tags: ['character', 'design', 'protagonist'],
        thumbnail: null,
        preview: '/img/moodboard-2.png',
        link: '/img/moodboard-2.png',
        notes: 'Character design sheets exploring costume design, silhouettes, and visual storytelling through wardrobe. These studies informed the description syntax used in AI video prompts.'
      },
      {
        id: 'concept-003',
        title: 'Lighting Studies',
        description: 'Neon reflections, volumetric fog, and dramatic noir lighting tests',
        category: 'Concept Art',
        type: 'image',
        tool: 'Midjourney v6',
        date: '2024-02',
        tags: ['lighting', 'atmosphere', 'mood'],
        thumbnail: null,
        preview: '/img/moodboard-3.png',
        link: '/img/moodboard-3.png',
        notes: 'Exploration of lighting scenarios: neon signs reflecting in puddles, volumetric fog cutting through darkness, and high-contrast noir compositions.'
      }
    ]
  },
  'video-assets': {
    id: 'video-assets',
    title: 'Video Assets',
    description: 'AI-generated footage and final rendered sequences',
    items: [
      {
        id: 'video-001',
        title: 'Sora 2 Test Generations',
        description: 'Early experimental footage testing narrative prompts and camera motion',
        category: 'Video Assets',
        type: 'video',
        tool: 'Sora 2',
        date: '2024-11',
        tags: ['generation', 'test', 'narrative'],
        thumbnail: null,
        preview: '/videos/sora2-example.mp4',
        link: '/videos/sora2-example.mp4',
        notes: 'Collection of Sora 2 generations exploring narrative coherence, character consistency, and cinematic camera movements. Includes prompt metadata and generation parameters.'
      },
      {
        id: 'video-002',
        title: 'Veo 3.1 Character Tests',
        description: 'Character-focused generations testing consistency and emotion',
        category: 'Video Assets',
        type: 'video',
        tool: 'Veo 3.1',
        date: '2024-12',
        tags: ['character', 'emotion', 'consistency'],
        thumbnail: null,
        preview: '/videos/veo31-example.mp4',
        link: '/videos/veo31-example.mp4',
        notes: 'Veo 3.1 experiments focusing on character expression, emotional nuance, and maintaining visual consistency across multiple shots.'
      },
      {
        id: 'video-003',
        title: 'Wan2.5 Sequences',
        description: 'Experimental narrative sequences with dynamic camera work',
        category: 'Video Assets',
        type: 'video',
        tool: 'Wan 2.5',
        date: '2024-12',
        tags: ['sequence', 'camera', 'narrative'],
        thumbnail: null,
        preview: '/videos/wan25-example.mp4',
        link: '/videos/wan25-example.mp4',
        notes: 'Wan2.5 generations testing complex camera movements, scene transitions, and narrative flow across multiple connected moments.'
      },
      {
        id: 'video-004',
        title: 'Higgsfield Experiments',
        description: 'Quick iteration tests for style and aesthetic validation',
        category: 'Video Assets',
        type: 'video',
        tool: 'Higgsfield',
        date: '2024-12',
        tags: ['style', 'aesthetic', 'iteration'],
        thumbnail: null,
        preview: '/videos/higgsfield-example.mp4',
        link: '/videos/higgsfield-example.mp4',
        notes: 'Fast-iteration style experiments using Higgsfield for rapid aesthetic validation before committing to longer generation times.'
      },
      {
        id: 'video-005',
        title: 'Seedance Generations',
        description: 'Abstract motion and atmospheric footage for establishing shots',
        category: 'Video Assets',
        type: 'video',
        tool: 'Seedance',
        date: '2024-12',
        tags: ['abstract', 'atmosphere', 'establishing'],
        thumbnail: null,
        preview: '/videos/seedance-example.mp4',
        link: '/videos/seedance-example.mp4',
        notes: 'Seedance-generated abstract sequences and atmospheric footage perfect for establishing shots and transitional moments.'
      },
      {
        id: 'video-006',
        title: 'Kling AI Tests',
        description: 'High-fidelity motion and physics simulation experiments',
        category: 'Video Assets',
        type: 'video',
        tool: 'Kling AI',
        date: '2024-12',
        tags: ['physics', 'motion', 'quality'],
        thumbnail: null,
        preview: '/videos/kling-example.mp4',
        link: '/videos/kling-example.mp4',
        notes: 'Kling AI experiments testing realistic physics simulation, fluid motion, and high-fidelity visual quality for hero shots.'
      }
    ]
  },
  'sound-design': {
    id: 'sound-design',
    title: 'Sound Design',
    description: 'Audio atmosphere and sonic world-building',
    items: [
      {
        id: 'sound-001',
        title: 'Ambient Soundscapes',
        description: 'Layered audio: rain on metal, distant sirens, electronic hums',
        category: 'Sound Design',
        type: 'audio',
        tool: 'Custom Sound Design',
        date: '2024-02',
        tags: ['ambient', 'atmosphere', 'layered'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Multi-layered audio design creating the sonic texture of a cyberpunk dystopia. Combines field recordings with synthesized elements to build immersive environments.'
      },
      {
        id: 'sound-002',
        title: 'UI Sound Effects',
        description: 'Interface beeps, hologram activations, and terminal interactions',
        category: 'Sound Design',
        type: 'audio',
        tool: 'Custom Sound Design',
        date: '2024-03',
        tags: ['ui', 'interface', 'effects'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Futuristic UI sound library featuring holographic interface sounds, terminal clicks, and data processing audio feedback.'
      }
    ]
  },
  'technical-docs': {
    id: 'technical-docs',
    title: 'Technical Documentation',
    description: 'Behind-the-scenes process documentation and prompt engineering logs',
    items: [
      {
        id: 'tech-001',
        title: 'Prompt Engineering Logs',
        description: 'Systematic documentation of prompt iterations and parameters',
        category: 'Technical Documents',
        type: 'doc',
        tool: 'Documentation',
        date: '2024-01 - Present',
        tags: ['prompts', 'engineering', 'documentation'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Detailed logs tracking prompt evolution across 156+ development iterations. Documents: original prompts, models used, parameters, output quality assessments, and lessons learned.'
      },
      {
        id: 'tech-002',
        title: 'Technical References',
        description: 'Model documentation, API guides, and workflow diagrams',
        category: 'Technical Documents',
        type: 'doc',
        tool: 'Documentation',
        date: '2024-01 - Present',
        tags: ['api', 'workflow', 'reference'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Consolidated technical resources including API documentation for each AI model, workflow diagrams, and troubleshooting notes for common generation issues.'
      },
      {
        id: 'tech-003',
        title: 'Generation Statistics',
        description: 'Analytics on 249 generation attempts across all platforms',
        category: 'Technical Documents',
        type: 'doc',
        tool: 'Analytics',
        date: '2024-12',
        tags: ['analytics', 'statistics', 'metrics'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Comprehensive analysis of generation success rates, parameter correlations, model comparisons, and cost efficiency metrics across all AI video platforms.'
      }
    ]
  }
};

// Table of Contents sections for navigation
export const ASSETS_SECTIONS = Object.values(ASSETS_DATA).map(section => ({
  id: section.id,
  title: section.title
}));

// Legacy export for backwards compatibility
export const ASSET_ITEMS = ASSETS_SECTIONS;
