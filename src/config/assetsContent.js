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
        title: 'Veo3 Scene Generations',
        description: 'Primary video generation for key narrative scenes',
        category: 'Video Assets',
        type: 'video',
        tool: 'Veo3',
        date: '2025-10',
        tags: ['generation', 'narrative', 'primary'],
        thumbnail: null,
        preview: '/videos/veo3-example.mp4',
        link: '/videos/veo3-example.mp4',
        notes: 'Veo3 served as one of the primary video generation tools for Echoes of Control. Used for atmospheric scenes requiring cinematic quality and emotional nuance. No single model could consistently produce every scene, so Veo3 was part of a comparative workflow alongside other tools.'
      },
      {
        id: 'video-002',
        title: 'Kling AI Generations',
        description: 'High-fidelity motion and physics simulation for key scenes',
        category: 'Video Assets',
        type: 'video',
        tool: 'Kling AI',
        date: '2025-10',
        tags: ['physics', 'motion', 'quality'],
        thumbnail: null,
        preview: '/videos/kling-example.mp4',
        link: '/videos/kling-example.mp4',
        notes: 'Kling AI was used for scenes requiring realistic physics and fluid motion. Each tool interpreted prompts differently, creating the need for repeated cycles of generation, comparison, and selection to find outputs that best supported the artefact\'s tone and visual logic.'
      },
      {
        id: 'video-003',
        title: 'NanoBanana Experiments',
        description: 'Alternative generations for scene comparison and selection',
        category: 'Video Assets',
        type: 'video',
        tool: 'NanoBanana',
        date: '2025-10',
        tags: ['comparison', 'alternative', 'selection'],
        thumbnail: null,
        preview: '/videos/nanobanana-example.mp4',
        link: '/videos/nanobanana-example.mp4',
        notes: 'NanoBanana provided alternative generations for comparison in the multi-model workflow. The workflow became curatorial as well as technical—evaluating which outputs from different tools best supported the scene requirements.'
      },
      {
        id: 'video-004',
        title: 'Furnace Scene Development',
        description: 'The pivotal revelation scene where Maya discovers the data centre\'s secret',
        category: 'Video Assets',
        type: 'video',
        tool: 'Multi-Model Workflow',
        date: '2026-03',
        tags: ['furnace', 'revelation', 'key-scene'],
        thumbnail: null,
        preview: '/videos/furnace-scene.mp4',
        link: '/videos/furnace-scene.mp4',
        notes: 'The furnace scene required staging a revelation where Maya hides, witnesses something horrifying, and slowly realises the violence of the system. The prompt specified the oppressive industrial chamber, glowing furnace, distant human silhouettes, and deliberately excluded music in favour of drones and mechanical rumbling.'
      },
      {
        id: 'video-005',
        title: 'Post-Production Enhancement',
        description: 'Refined clips addressing quality issues from raw AI generation',
        category: 'Video Assets',
        type: 'video',
        tool: 'Post-Production',
        date: '2026-01',
        tags: ['enhancement', 'polish', 'refinement'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Even when clips captured the right atmosphere, they could appear soft, blurry, or inconsistent. Post-production enhancement was used to improve selected clips and bring them closer to the cinematic quality needed for the final artefact.'
      },
      {
        id: 'video-006',
        title: 'Comparative Workflow Documentation',
        description: 'Process documentation showing multi-model selection approach',
        category: 'Video Assets',
        type: 'doc',
        tool: 'Documentation',
        date: '2026-02',
        tags: ['workflow', 'process', 'methodology'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'The artefact was not produced through one-step automation. Multiple tools were involved at different stages, with model selection becoming part of the creative process itself. This documentation captures the insight that constructing AI-generated work depends heavily on human selection, intervention, and compromise.'
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
        title: 'ElevenLabs Voice Generation',
        description: 'AI-generated voice work for Maya and system announcements',
        category: 'Sound Design',
        type: 'audio',
        tool: 'ElevenLabs',
        date: '2025-10',
        tags: ['voice', 'dialogue', 'AI-generated'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'ElevenLabs was used for voice generation, creating Maya\'s internal monologue and the cold, synthetic voice of the AI system. The contrast between human vulnerability and machine authority was achieved through careful voice design and delivery parameters.'
      },
      {
        id: 'sound-002',
        title: 'Suno Atmospheric Audio',
        description: 'Industrial drones, mechanical rumbling, and tension-building soundscapes',
        category: 'Sound Design',
        type: 'audio',
        tool: 'Suno',
        date: '2025-10',
        tags: ['ambient', 'atmosphere', 'industrial'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Suno generated the atmospheric audio layers: mechanical rumbling, industrial drones, distant alarms, and environmental tension. Rather than conventional background music, these sounds create a stark, mechanical atmosphere that reinforces the artefact\'s themes.'
      },
      {
        id: 'sound-003',
        title: 'Embedded Audio Prompting',
        description: 'Sound design elements specified directly in video generation prompts',
        category: 'Sound Design',
        type: 'audio',
        tool: 'Prompt Engineering',
        date: '2026-01',
        tags: ['prompting', 'embedded', 'technique'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'A key technique was embedding sound design directly into video prompts—specifying mechanical rumbling, faint crowd murmurs, and Maya\'s fearful breathing within the generation instructions. This meant prompting functioned as audiovisual direction rather than purely visual input.'
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
        date: '2025-10 - 2026-03',
        tags: ['prompts', 'engineering', 'documentation'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Detailed logs tracking prompt evolution across development iterations. Prompting became closer to directing than generating—needing to communicate narrative context, emotional stakes, and sensory texture simultaneously. Includes audiovisual prompts that embedded sound design directly into video generation.'
      },
      {
        id: 'tech-002',
        title: 'Twine Integration Guide',
        description: 'Workflow for embedding AI video in Twine interactive narratives',
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
        id: 'tech-003',
        title: 'ChatGPT Interface Styling',
        description: 'AI-assisted HTML/CSS generation for Twine UI customisation',
        category: 'Technical Documents',
        type: 'doc',
        tool: 'ChatGPT',
        date: '2026-03',
        tags: ['interface', 'styling', 'chatgpt'],
        thumbnail: null,
        preview: null,
        link: null,
        notes: 'Twine\'s default interface was too plain and risked weakening immersion. ChatGPT was used to generate HTML and CSS for a dark, futuristic, cyberpunk interface. The aim was to ensure the mode of interaction itself supported the artefact\'s mood, making choices feel like part of a controlled system rather than ordinary website navigation.'
      },
      {
        id: 'tech-004',
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
