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
        description: 'Dystopian cityscapes, data centre interiors, and industrial decay visuals',
        category: 'Concept Art',
        type: 'image',
        tool: 'Midjourney v6',
        date: '2025-10',
        tags: ['environment', 'cyberpunk', 'data-centre'],
        thumbnail: null,
        preview: '/img/moodboard-1.png',
        link: '/img/moodboard-1.png',
        notes: 'These concept pieces explore the dystopian aesthetic of Echoes of Control—the data centre that powers the AI system, industrial corridors, and the oppressive technological environment Maya navigates. Inspired by Blade Runner\'s visual language and the brutalist architecture of Control.'
      },
      {
        id: 'concept-002',
        title: 'Maya Character Studies',
        description: 'Visual references for Maya, the protagonist from the slums',
        category: 'Concept Art',
        type: 'image',
        tool: 'Midjourney v6',
        date: '2025-10',
        tags: ['character', 'maya', 'protagonist'],
        thumbnail: null,
        preview: '/img/moodboard-2.png',
        link: '/img/moodboard-2.png',
        notes: 'Character design exploring Maya\'s visual identity—her vulnerability, social position, and proximity to the machinery of control. These studies informed the prompts used for AI video generation, requiring more explicit visual specifications than traditional filmmaking.'
      },
      {
        id: 'concept-003',
        title: 'Atmospheric Lighting Studies',
        description: 'Industrial lighting, furnace glow, and horror atmosphere tests',
        category: 'Concept Art',
        type: 'image',
        tool: 'Midjourney v6',
        date: '2025-10',
        tags: ['lighting', 'atmosphere', 'horror'],
        thumbnail: null,
        preview: '/img/moodboard-3.png',
        link: '/img/moodboard-3.png',
        notes: 'Exploration of lighting scenarios for key scenes: the oppressive industrial chamber, glowing furnace light, and high-contrast noir compositions. These studies helped codify visual specifications for AI prompt engineering.'
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
        title: 'Kling 3.0 Omni Generations',
        description: 'Primary video generation tool for the final artefact - 400+ clips generated',
        category: 'Video Assets',
        type: 'video',
        tool: 'Kling 3.0 Omni',
        date: '2026-01',
        tags: ['primary', 'kling', 'final'],
        thumbnail: null,
        preview: '/videos/kling-example.mp4',
        link: '/videos/kling-example.mp4',
        notes: 'Kling 3.0 Omni became the primary generation tool after extensive testing. When this project started, it hadn\'t been released yet—Veo 3.1 and Sora 2 were considered the best available. Kling 3.0 Omni surpassed them all in quality, consistency, and included integrated sound generation, eliminating the need for separate audio tools.'
      },
      {
        id: 'video-002',
        title: 'Gemini-Generated Elements',
        description: 'Images generated in Gemini and used as visual anchors in Kling',
        category: 'Video Assets',
        type: 'image',
        tool: 'Google Gemini',
        date: '2026-01',
        tags: ['elements', 'gemini', 'consistency'],
        thumbnail: null,
        preview: '/img/gemini-elements.png',
        link: '/img/gemini-elements.png',
        notes: 'Kling 3.0 Omni\'s \'elements\' feature allows images to be used as visual anchors during generation. Gemini was used to create character and environment images that ensured Maya and key settings remained consistent across all generated clips.'
      },
      {
        id: 'video-003',
        title: 'Higgsfield Model Testing',
        description: 'Comparative testing of Sora 2, Grok Imagine, Veo 3.1, WAN, Seedance',
        category: 'Video Assets',
        type: 'video',
        tool: 'Higgsfield Platform',
        date: '2025-10',
        tags: ['testing', 'comparison', 'evaluation'],
        thumbnail: null,
        preview: '/videos/higgsfield-tests.mp4',
        link: '/videos/higgsfield-tests.mp4',
        notes: 'Before Kling 3.0 Omni was released, extensive testing was conducted through Higgsfield, comparing Sora 2, Grok Imagine, Veo 3.1, WAN, Seedance, and other available models. This evaluation phase was crucial for understanding each tool\'s strengths and limitations.'
      },
      {
        id: 'video-004',
        title: 'Furnace Scene Development',
        description: 'The pivotal revelation scene where Maya discovers the data centre\'s secret',
        category: 'Video Assets',
        type: 'video',
        tool: 'Kling 3.0 Omni',
        date: '2026-03',
        tags: ['furnace', 'revelation', 'key-scene'],
        thumbnail: null,
        preview: '/videos/furnace-scene.mp4',
        link: '/videos/furnace-scene.mp4',
        notes: 'The furnace scene required staging a revelation where Maya hides, witnesses something horrifying, and slowly realises the violence of the system. Generated with Kling 3.0 Omni\'s integrated sound—industrial drones and mechanical rumbling instead of conventional music—creating a stark, disturbing atmosphere.'
      },
      {
        id: 'video-005',
        title: 'Anything.com Mobile Prototype',
        description: 'Mobile-optimised prototype created with MAX plan',
        category: 'Video Assets',
        type: 'doc',
        tool: 'Anything.com',
        date: '2026-03',
        tags: ['mobile', 'prototype', 'responsive'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Created a mobile prototype using Anything.com\'s MAX plan. After reaching out to the founder, secured a 50% discount—$100 for the plan. This enabled rapid prototyping to ensure the artefact worked across devices.'
      },
      {
        id: 'video-006',
        title: 'Generation Statistics',
        description: 'Analytics across 400+ generation attempts',
        category: 'Video Assets',
        type: 'doc',
        tool: 'Documentation',
        date: '2026-03',
        tags: ['analytics', 'statistics', 'workflow'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'The final artefact required 400+ clip generations across the development period. The initial testing phase used multiple models through Higgsfield, while the majority of final clips were generated with Kling 3.0 Omni after its release proved it superior to earlier options.'
      }
    ]
  },
  'sound-design': {
    id: 'sound-design',
    title: 'Sound Design',
    description: 'Integrated audio generation through Kling 3.0 Omni',
    items: [
      {
        id: 'sound-001',
        title: 'Kling 3.0 Omni Integrated Sound',
        description: 'Audio generated alongside video within the same model',
        category: 'Sound Design',
        type: 'audio',
        tool: 'Kling 3.0 Omni',
        date: '2026-01',
        tags: ['integrated', 'kling', 'seamless'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Kling 3.0 Omni\'s integrated sound generation eliminated the need for separate audio tools like ElevenLabs or Suno. Sound is generated alongside video, creating more cohesive atmospheric moments where audio and visuals are naturally synchronised.'
      },
      {
        id: 'sound-002',
        title: 'Industrial Atmosphere',
        description: 'Mechanical rumbling, drones, and environmental tension',
        category: 'Sound Design',
        type: 'audio',
        tool: 'Kling 3.0 Omni',
        date: '2026-03',
        tags: ['ambient', 'atmosphere', 'industrial'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'The artefact deliberately avoids conventional background music. Instead, Kling 3.0 Omni generated industrial drones, mechanical rumbling, distant alarms, and environmental sounds that create a stark, mechanical atmosphere reinforcing the themes of technological oppression.'
      },
      {
        id: 'sound-003',
        title: 'Audiovisual Prompting',
        description: 'Sound elements specified within video generation prompts',
        category: 'Sound Design',
        type: 'audio',
        tool: 'Prompt Engineering',
        date: '2026-01',
        tags: ['prompting', 'integrated', 'technique'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Because Kling 3.0 Omni generates audio alongside video, prompts function as audiovisual direction—specifying mechanical rumbling, faint crowd murmurs, and Maya\'s fearful breathing within the same generation instructions. This creates naturally synchronised sound design.'
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
        title: 'Kling 3.0 Omni Prompt Logs',
        description: 'Systematic documentation of 400+ generation prompts',
        category: 'Technical Documents',
        type: 'doc',
        tool: 'Kling 3.0 Omni',
        date: '2026-01 - 2026-03',
        tags: ['prompts', 'kling', 'documentation'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Detailed logs tracking prompt evolution across 400+ clip generations. Prompting became closer to directing than generating—needing to communicate narrative context, emotional stakes, and audiovisual texture simultaneously. Includes documentation of the \'elements\' feature workflow using Gemini-generated images.'
      },
      {
        id: 'tech-002',
        title: 'JSON-Based Twine Development',
        description: 'Using JSON to structure Twine passages, CSS, and HTML',
        category: 'Technical Documents',
        type: 'doc',
        tool: 'JSON + Twine',
        date: '2026-03',
        tags: ['json', 'twine', 'systematic'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'All Twine development was structured using JSON prompting—passages, CSS, and HTML were generated systematically rather than manually coded. This approach enabled rapid iteration and ensured consistency across the branching narrative structure.'
      },
      {
        id: 'tech-003',
        title: 'Twine Video Integration',
        description: 'Workflow for embedding Kling videos in Twine',
        category: 'Technical Documents',
        type: 'doc',
        tool: 'Twine + GitHub',
        date: '2025-10',
        tags: ['twine', 'video', 'integration'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Following Dr. Conor McKeown\'s YouTube tutorials, this documents the workflow for hosting videos on GitHub and embedding them using raw links in Twine div elements. A critical workflow for prototyping interactive video narratives.'
      },
      {
        id: 'tech-004',
        title: 'Model Evolution Timeline',
        description: 'Documentation of AI video tool landscape changes during development',
        category: 'Technical Documents',
        type: 'doc',
        tool: 'Documentation',
        date: '2025-10 - 2026-03',
        tags: ['models', 'evolution', 'timeline'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'When this project started, Kling 3.0 Omni didn\'t exist. Veo 3.1 and Sora 2 were the best available. This documents the rapid evolution of AI video tools and how the project adapted—from testing through Higgsfield to adopting Kling 3.0 Omni once its superior quality became apparent.'
      },
      {
        id: 'tech-005',
        title: 'Practice as Research Framework',
        description: 'Methodological documentation connecting making to research',
        category: 'Technical Documents',
        type: 'doc',
        tool: 'Academic Framework',
        date: '2026-02',
        tags: ['methodology', 'PaR', 'research'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Documentation of the Practice as Research (PaR) approach. Drawing on Nelson\'s onto-epistemological model and Schön\'s reflective practice, this captures how the making process itself generated research insights—not just the finished artefact. The production process echoed the project\'s themes: navigating systems that offered possibilities while withholding full control.'
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
