import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import AssetCard from '../components/AssetCard';
import { useNavigation } from '../context/NavigationContext';

// Table of Contents sections for Assets page
export const ASSETS_SECTIONS = [
  { id: 'concept-art', title: 'Concept Art' },
  { id: 'video-assets', title: 'Video Assets' },
  { id: 'sound-design', title: 'Sound Design' },
  { id: 'technical-docs', title: 'Technical Documents' }
];

// Detailed asset data with write-ups and image placeholders
const ASSET_SECTIONS_DATA = [
  {
    id: 'concept-art',
    title: 'Concept Art',
    description: 'Visual development pieces that shaped the aesthetic direction',
    items: [
      {
        category: 'Visual Development',
        title: 'Environment Concepts',
        description: 'Dystopian cityscapes, neon-lit corridors, and industrial decay that define the visual language of the project.',
        details: {
          status: 'available',
          writeup: 'These concept pieces explore the cyberpunk aesthetic through rain-soaked streets, towering megastructures, and the contrast between advanced technology and urban decay. Inspired by Blade Runner\'s visual language, each piece establishes mood, lighting, and architectural style that would later inform AI prompt engineering for video generation.',
          images: ['Neon Street Scene.png', 'Industrial Corridor.png', 'Megastructure Exterior.png']
        }
      },
      {
        category: 'Visual Development',
        title: 'Character Studies',
        description: 'Visual references and mood boards for protagonists, antagonists, and background characters in the dystopian world.',
        details: {
          status: 'in-progress',
          writeup: 'Character design sheets exploring costume design, silhouettes, and visual storytelling through wardrobe. These studies informed the description syntax used in AI video prompts to generate consistent character appearances across multiple scenes.',
          images: ['Protagonist Sketches.png', 'AI Overseer Design.png']
        }
      }
    ]
  },
  {
    id: 'video-assets',
    title: 'Video Assets',
    description: 'AI-generated footage and final rendered sequences',
    items: [
      {
        category: 'Generated Footage',
        title: 'Test Clips & Generations',
        description: 'Raw outputs from Sora 2, Veo3.1, Wan2.5, Higgsfield, and Seedance showing successes, failures, and learning moments.',
        details: {
          status: 'available',
          writeup: 'This collection documents 249 generation attempts across five different AI video models. Each clip represents an experiment in prompt engineering, parameter tuning, or workflow iteration. Organized by model and generation date, these clips show the evolution from early failed attempts to more refined outputs. Includes metadata logs for each generation: prompt text, seed values, guidance scale, and model version.',
          images: ['Sora2 Street Scene.mp4', 'Veo3.1 Character Test.mp4', 'Failed Generation Examples.mp4']
        }
      },
      {
        category: 'Final Sequences',
        title: 'Edited Narrative Clips',
        description: 'Post-processed sequences combining multiple AI generations into cohesive narrative moments.',
        details: {
          status: 'in-progress',
          writeup: 'Selected clips that passed quality control, color-graded and edited together to form narrative sequences. These represent the "keepers" from hundreds of generations—the clips that achieved cinematic quality and narrative coherence.',
          images: ['Opening Sequence.mp4', 'Choice Moment 01.mp4']
        }
      }
    ]
  },
  {
    id: 'sound-design',
    title: 'Sound Design',
    description: 'Audio atmosphere and sonic world-building',
    items: [
      {
        category: 'Audio Production',
        title: 'Ambient Soundscapes',
        description: 'Layered audio environments: rain on metal, distant sirens, electronic hums, and industrial machinery.',
        details: {
          status: 'coming-soon',
          writeup: 'Multi-layered audio design creating the sonic texture of a cyberpunk dystopia. Each soundscape combines field recordings (city ambience, rain, machinery) with synthesized elements to build immersive environments that complement the visual aesthetic.',
          images: ['Audio Waveform - Rain Layer.png', 'Audio Waveform - Industrial.png']
        }
      }
    ]
  },
  {
    id: 'technical-docs',
    title: 'Technical Documentation',
    description: 'Behind-the-scenes process documentation and prompt engineering logs',
    items: [
      {
        category: 'Process Documentation',
        title: 'Prompt Engineering Logs',
        description: 'Systematic documentation of prompt iterations, parameter experiments, and what worked (or didn\'t).',
        details: {
          status: 'available',
          writeup: 'Detailed logs tracking prompt evolution across 156 development iterations. Each entry documents: original prompt, model used, parameters, output quality assessment, and lessons learned. Organized chronologically to show refinement process from verbose descriptions to optimized syntax that reliably produced desired results.',
          images: ['Prompt Log Spreadsheet.png', 'Parameter Notes.png']
        }
      },
      {
        category: 'Research Archive',
        title: 'Technical References',
        description: 'Model documentation, API guides, workflow diagrams, and production pipeline notes.',
        details: {
          status: 'available',
          writeup: 'Consolidated technical resources including API documentation for each AI model, workflow diagrams showing the production pipeline from prompt to final edit, and troubleshooting notes for common generation issues.',
          images: ['Workflow Diagram.png', 'API Reference Sheet.png']
        }
      }
    ]
  }
];

/**
 * Assets page - displays project assets
 * Optimized with React.memo and static animation variants
 */
const Assets = () => {
  const { setSections } = useNavigation();

  // Register sections with navigation context
  useEffect(() => {
    setSections(ASSETS_SECTIONS);
    return () => setSections([]);
  }, [setSections]);

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="page-container"
        id="assets"
        role="main"
        aria-label="Main content"
      >
        <div id="main-content"></div>
        
        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Assets</h1>
          <p className="page-subtitle">Project assets, media, and production resources</p>
        </motion.header>

        {/* Asset Sections */}
        {ASSET_SECTIONS_DATA.map((section, sectionIndex) => (
          <motion.section
            key={section.id}
            id={section.id}
            className="content-section asset-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + sectionIndex * 0.1 }}
            aria-label={section.title}
          >
            {/* Section Header */}
            <div className="asset-section-header">
              <h2 className="section-subtitle">{section.title}</h2>
              <p className="section-description">{section.description}</p>
            </div>

            {/* Section Items Grid */}
            <div className="asset-items-grid">
              {section.items.map((item, itemIndex) => (
                <AssetCard
                  key={item.title}
                  category={item.category}
                  title={item.title}
                  description={item.description}
                  details={item.details}
                  delay={0.3 + sectionIndex * 0.1 + itemIndex * 0.05}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </>
  );
};

export default memo(Assets);
