import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timeline from '../components/Timeline';
import StoryTimeline from '../components/StoryTimeline';
import useDevlog from '../hooks/useDevlog';
import inspirationData from '../../data/inspiration.json';
import moodboardData from '../../data/moodboard.json';
import storyboardData from '../../data/storyboard.json';
import timelineData from '../../data/timeline.json';

// Move animation variants outside component to prevent recreation
const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.05 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

/**
 * Home page - main devlog content with filtering and timeline
 * Optimized with memoized data and static animation variants
 */
const Home = () => {
  const { entries, loading, error } = useDevlog();
  const [timelineExpanded, setTimelineExpanded] = useState(false);
  const [branchingExpanded, setBranchingExpanded] = useState(false);

  // Memoize combined visual data to prevent recalculation
  const visualReferenceData = useMemo(() => 
    [...inspirationData.interactive, ...inspirationData.games, ...inspirationData.design],
    []
  );

  if (loading) {
    return (
      <motion.div
        className="page-container"
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="loading-container">
          <h1>Loading Devlog...</h1>
          <p>Fetching latest entries...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="page-container"
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="error-container">
          <h1>Error Loading Devlog</h1>
          <p>{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="page-container"
      id="home"
    >
      {/* Page Header */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1>Digital Project Logbook</h1>
        <p className="page-subtitle">Documenting the journey of creating an interactive dystopian film</p>
      </motion.div>

      {/* Overview Section */}
      <motion.section
        id="overview"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="card">
          <h2>Project Overview</h2>
          <p>
            This digital logbook chronicles the development of "Echoes of Control," an interactive 
            dystopian film exploring themes of AI dominance, human agency, and moral choice. 
            The project combines cutting-edge AI video generation with traditional storytelling 
            to create an immersive branching narrative experience.
          </p>
          <p>
            Every decision, experiment, and breakthrough is documented here—from initial concept 
            sketches to final production milestones. This serves as both a creative diary and 
            technical reference for the emerging medium of AI-assisted filmmaking.
          </p>
        </div>
      </motion.section>

      {/* Timeline Section - Expandable */}
      <motion.section
        id="timeline"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="card">
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            onClick={() => setTimelineExpanded(!timelineExpanded)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setTimelineExpanded(!timelineExpanded);
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={timelineExpanded}
          >
            <h2>Project Timeline</h2>
            <motion.span
              animate={{ 
                rotate: timelineExpanded ? 180 : 0,
                opacity: timelineExpanded ? 1 : [0.5, 1, 0.5],
                scale: timelineExpanded ? 1 : [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 0.3 },
                opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ 
                fontSize: '1.5rem',
                color: 'var(--accent)',
                marginLeft: '1rem',
                textShadow: '0 0 10px rgba(138, 43, 226, 0.8)',
                filter: 'drop-shadow(0 0 8px rgba(138, 43, 226, 0.6))'
              }}
            >
              ▼
            </motion.span>
          </div>
          <AnimatePresence>
            {timelineExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ marginTop: '1.5rem' }}>
                  <Timeline entries={timelineData} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Inspiration Section */}
      <motion.section
        id="inspiration"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {/* Header Card */}
        <div className="card">
          <h2>Inspiration</h2>
          <p className="muted">
            Reference works that shape the mood, interface language, and ethics of the maze-horror AI escape. 
            Logged for tone, pacing, and systems aesthetics.
          </p>
        </div>

        {/* Interactive Films & Series */}
        <div className="card">
          <h3>Interactive Films & Series</h3>
          <div className="table-wrap">
            <table className="nice-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Influence</th>
                </tr>
              </thead>
              <tbody>
                {inspirationData.interactive.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.year}</td>
                    <td>{item.influence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Games & System Narratives */}
        <div className="card">
          <h3>Games & System Narratives</h3>
          <div className="table-wrap">
            <table className="nice-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Influence</th>
                </tr>
              </thead>
              <tbody>
                {inspirationData.games.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.year}</td>
                    <td>{item.influence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Grammar & Design Influence */}
        <div className="card">
          <h3>Visual Grammar & Design Influence</h3>
          <div className="table-wrap">
            <table className="nice-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Designer/Studio</th>
                  <th>Influence</th>
                </tr>
              </thead>
              <tbody>
                {inspirationData.design.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.designer}</td>
                    <td>{item.influence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Grid */}
        <div className="card">
          <h3>Visual Reference Grid</h3>
          <div className="grid-2x3">
            {visualReferenceData.map((item, idx) => (
              <figure className="grid-tile" key={idx}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  onError={(e) => {
                    console.error('Image failed to load:', item.image);
                    e.target.style.border = '2px solid red';
                    e.target.style.backgroundColor = '#ff000020';
                  }}
                  onLoad={() => console.log('Image loaded:', item.image)}
                />
                <figcaption>
                  <strong>{item.title}</strong>
                  <br />
                  <span className="muted" style={{ fontSize: '0.85rem' }}>{item.year || item.designer}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Thematic Core */}
        <div className="card">
          <h3>Thematic Core</h3>
          <p className="muted">
            All references converge on exploring:
          </p>
          <ul className="bulletish">
            <li>Individual agency vs. systemic control</li>
            <li>AI ethics, consciousness, and power dynamics</li>
            <li>Surveillance, confinement, and panopticon architectures</li>
            <li>Choice as illusion or genuine freedom</li>
            <li>Dark humor and existential dread in technological dystopias</li>
          </ul>
        </div>
      </motion.section>

      {/* Moodboard Section */}
      <motion.section
        id="moodboard"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="card">
          <h2>Moodboard</h2>
          <p className="muted">
            Visual tone-setter for Echo Maze Protocol — cold, industrial labyrinth lit by emergency amber and server blues. 
            Palette, textures, and lighting references that guide shots, UI, and VFX.
          </p>
        </div>
        <div className="card">
          <div className="grid-2x3">
            {moodboardData.map(item => (
              <figure className="grid-tile" key={item.id}>
                <img 
                  src={item.src} 
                  alt={item.title} 
                  loading="lazy"
                  onError={(e) => {
                    console.error('Moodboard image failed:', item.src);
                    e.target.style.border = '2px solid red';
                  }}
                  onLoad={() => console.log('Moodboard image loaded:', item.src)}
                />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Storyboard Section */}
      <motion.section
        id="storyboard"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="card">
          <h2>Storyboard</h2>
          <p className="muted">
            Shot planning frames for key beats in the maze. Rough compositions that define blocking, 
            lighting direction, and emotional pacing across the path.
          </p>
        </div>
        <div className="card">
          <div className="grid-2x3">
            {storyboardData.map(item => (
              <figure className="grid-tile" key={item.id}>
                <img 
                  src={item.src} 
                  alt={item.title} 
                  loading="lazy"
                  onError={(e) => {
                    console.error('Storyboard image failed:', item.src);
                    e.target.style.border = '2px solid red';
                  }}
                  onLoad={() => console.log('Storyboard image loaded:', item.src)}
                />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Story Development Section */}
      <motion.section
        id="story-development"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="card">
          <h2>Story Development</h2>
          <p>
            "Echo Maze Protocol" follows a protagonist awakening in an AI-controlled datacenter, 
            navigating a maze where wrong choices trigger cognitive scramblers and loop back to 
            checkpoints. The narrative structure explores themes of agency, control, and the ethics 
            of AI through interactive choice mechanics that mirror the story's central questions.
          </p>
        </div>

        <div className="card">
          <h3>Narrative Design Decisions</h3>
          
          <h4>Three-Act Structure with Strategic Convergence</h4>
          <p>
            The story uses a three-act format (Initialization, Trials, Exit) with strategic 
            convergence points where multiple paths merge. This design decision, informed by 
            Janet Murray's work on interactive narrative structures, maintains player agency 
            while managing production complexity. Rather than creating entirely separate paths 
            for each choice, key decision points lead to shared checkpoints, allowing the 
            narrative to maintain coherence while still offering meaningful branching.
          </p>
          
          <h4>Loop-Based Mechanics as Thematic Device</h4>
          <p>
            The looping mechanic—where wrong choices return players to earlier points—serves 
            both gameplay and thematic purposes. Mechanically, it reduces asset generation 
            requirements by reusing scenes. Thematically, it embodies the story's exploration 
            of false choices and the illusion of agency. This design connects to interactive 
            storytelling theory on the tension between player choice and authorial control, 
            a central theme in works like The Stanley Parable.
          </p>
          
          <h4>Timed Decision Mechanics</h4>
          <p>
            Implementing timed decisions was a deliberate choice to increase tension and prevent 
            players from overthinking choices. This connects to horror game design theory on 
            pacing and player psychology—forcing quick decisions increases emotional investment 
            and vulnerability. However, playtesting revealed that some players found this 
            stressful rather than engaging, leading to refinements that balanced urgency with 
            accessibility.
          </p>
        </div>

        <div className="card">
          <h3>Thematic Exploration</h3>
          <p>
            Through branching choices, the narrative explores several interconnected themes:
          </p>
          <ul className="bullets">
            <li><strong>Individual Agency vs. Systemic Control:</strong> Each choice tests 
            whether the protagonist (and by extension, the player) has genuine agency or is 
            merely following predetermined paths. The looping mechanic reinforces this ambiguity.</li>
            
            <li><strong>Technology as Liberation or Oppression:</strong> The AI system offers 
            guidance that could be helpful or manipulative. Choices explore whether technology 
            serves human needs or controls them—reflecting current debates on AI ethics and 
            surveillance.</li>
            
            <li><strong>The Price of Freedom:</strong> The "correct" path requires rejecting 
            the AI's offers of safety and comfort, suggesting that true freedom comes with 
            uncertainty and risk. This connects to existentialist themes in interactive 
            storytelling.</li>
            
            <li><strong>Human-AI Collaboration vs. Conflict:</strong> The narrative presents 
            multiple perspectives on human-AI relationships, from integration to resistance. 
            Different paths explore these philosophical positions without prescribing a single 
            "correct" answer.</li>
          </ul>
        </div>

        <div className="card">
          <h3>User Testing & Iteration</h3>
          
          <h4>Initial Playtest Findings</h4>
          <p>
            Early playtests revealed several issues with narrative clarity and player engagement:
          </p>
          <ul className="bullets">
            <li><strong>Loop Confusion:</strong> Players didn't recognize looping mechanics, 
            thinking the game had glitched. This required adding explicit visual and audio 
            cues (RETRY text, cognitive scrambler effects) to communicate the intentional 
            nature of loops.</li>
            
            <li><strong>Arbitrary Choices:</strong> Some decision points felt arbitrary, 
            reducing player investment. Refinements emphasized consequences and moral weight, 
            connecting choices more clearly to thematic exploration.</li>
            
            <li><strong>Pacing Issues:</strong> Horror pacing was inconsistent, with some 
            sections losing tension. Environmental storytelling elements were added to maintain 
            atmosphere between choice points.</li>
          </ul>
          
          <h4>Iterative Refinements</h4>
          <p>
            Based on feedback, several narrative elements were refined:
          </p>
          <ul className="bullets">
            <li>Added visual markers (chalk arrows, checkpoint labels) that persist across 
            loops, providing spatial memory cues and connecting to environmental storytelling 
            principles from games like Control and Portal.</li>
            
            <li>Refined choice descriptions to emphasize consequences and moral implications, 
            making decisions feel more meaningful and connected to thematic exploration.</li>
            
            <li>Introduced subtle environmental hints that guide players toward correct paths 
            without making choices obvious, balancing player agency with narrative guidance.</li>
            
            <li>Improved transitions between choice outcomes to maintain narrative flow and 
            emotional continuity.</li>
          </ul>
          
          <h4>Reflection on User Testing</h4>
          <p>
            The playtesting process revealed the fundamental challenge in interactive storytelling: 
            the gap between authorial intent and player experience. This connects directly to 
            course objectives on audience engagement and user experience design. The feedback 
            process highlighted the importance of clear communication in interactive narratives, 
            where players must understand both the mechanics and the narrative implications of 
            their choices. This iterative refinement demonstrates the value of user testing 
            in interactive media development and the necessity of balancing creative vision with 
            audience needs.
          </p>
        </div>

        <div className="card">
          <h3>Connection to Course Objectives</h3>
          <p>
            The story development process engaged with several key course objectives:
          </p>
          <ul className="bullets">
            <li><strong>Interactive Storytelling Theory:</strong> Applied concepts from Murray, 
            Aarseth, and others on player agency, immersion, and narrative structure to practical 
            design decisions.</li>
            
            <li><strong>User-Centered Design:</strong> Conducted iterative playtesting and 
            incorporated user feedback to improve narrative clarity and player engagement.</li>
            
            <li><strong>Ethical Considerations:</strong> Explored AI ethics themes not just as 
            narrative content, but through interactive mechanics that force players to confront 
            these questions directly.</li>
            
            <li><strong>Technical Integration:</strong> Balanced narrative design with technical 
            constraints, demonstrating the practical challenges of interactive media production.</li>
          </ul>
        </div>
      </motion.section>

      {/* Branching Narrative Section - Expandable */}
      <motion.section
        id="branching"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
      >
        <div className="card">
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            onClick={() => setBranchingExpanded(!branchingExpanded)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setBranchingExpanded(!branchingExpanded);
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={branchingExpanded}
          >
            <div>
          <h2>Branching Narrative Flow</h2>
              <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
            Interactive story paths with multiple decision points and alternative routes. 
            Click on any node to explore the narrative structure.
          </p>
            </div>
            <motion.span
              animate={{ 
                rotate: branchingExpanded ? 180 : 0,
                opacity: branchingExpanded ? 1 : [0.5, 1, 0.5],
                scale: branchingExpanded ? 1 : [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 0.3 },
                opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ 
                fontSize: '1.5rem',
                color: 'var(--accent)',
                marginLeft: '1rem',
                flexShrink: 0,
                textShadow: '0 0 10px rgba(138, 43, 226, 0.8)',
                filter: 'drop-shadow(0 0 8px rgba(138, 43, 226, 0.6))'
              }}
            >
              ▼
            </motion.span>
          </div>
          <AnimatePresence>
            {branchingExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ marginTop: '1.5rem' }}>
          <StoryTimeline />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Technical Experiments Section */} 
      <motion.section
        id="experiments"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="card">
          <h2>My Journey Through AI Video Generation: Tools, Failures, and Hard-Won Lessons</h2>
          <p>
            Let me be honest: this wasn't a smooth ride. I spent weeks experimenting with different 
            AI video generation tools, burning through credits, and hitting walls I didn't expect. 
            Here's the real story—the failures, the frustrations, and what I actually learned from 
            trying to make this work.
          </p>
            </div>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          <h3>The Tool Graveyard: What I Actually Tried</h3>
          <p>
            I tested six different tools: <strong>Higgsfield</strong>, <strong>Sora 2</strong>, 
            <strong>Veo3.1</strong>, <strong>RunwayML</strong>, <strong>Kling</strong>, and 
            <strong>Wan2.5</strong>. Each one taught me something different, and most of them 
            taught me what <em>doesn't</em> work.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3>Sora 2: The Face Problem That Killed My Workflow</h3>
          
          <p>
            I was genuinely excited to try Sora 2. OpenAI's marketing showed incredible quality—smooth 
            motion, realistic physics, cinematic quality. The demos looked like they were shot by 
            professional cinematographers. I thought I'd found my solution.
          </p>
          
          <p>
            <strong>The Technical Reality:</strong> Sora 2 uses a diffusion transformer architecture 
            that can generate up to 60-second videos at 1080p resolution. The quality is genuinely 
            impressive for environments, objects, and abstract scenes. The temporal consistency is 
            better than most competitors, and the motion feels natural.
          </p>
          
          <p>
            <strong>The Deal-Breaker:</strong> Sora has strict content policies that <strong>completely 
            prohibit realistic human faces and identifiable people</strong>. This isn't just a 
            limitation—it's a hard block. You can't generate:
          </p>
              <ul className="bullets">
            <li>Realistic human faces (even stylized ones that look too real)</li>
            <li>Identifiable people or characters</li>
            <li>Close-ups of human subjects</li>
            <li>Any prompt that might generate recognizable human features</li>
              </ul>
          
          <p>
            <strong>My Attempted Workarounds:</strong> I spent days trying to make this work:
          </p>
              <ul className="bullets">
            <li><strong>Abstract Descriptions:</strong> "A figure moves through the corridor" - 
            Generated blurry, unrecognizable shapes that looked like glitches</li>
            <li><strong>Back-of-Head Shots:</strong> "Person walking away, back to camera" - 
            Sometimes worked but couldn't maintain consistency across scenes</li>
            <li><strong>Silhouettes:</strong> "Dark figure against bright background" - Looked 
            artistic but broke narrative immersion</li>
            <li><strong>Environmental Storytelling:</strong> Focus on spaces, imply presence - 
            Worked for atmosphere but couldn't tell a character-driven story</li>
              </ul>
          
          <p>
            <strong>The Cost of This Discovery:</strong> I wasted approximately 15-20 hours and 
            significant credits testing Sora before realizing it fundamentally couldn't do what I 
            needed. The quality was there, but the restrictions made it unusable for my project.
          </p>
          
          <p>
            <strong>When Sora Actually Works:</strong> Despite the limitations, Sora excels at:
          </p>
          <ul className="bullets">
            <li>Environmental shots and establishing scenes</li>
            <li>Abstract and surreal sequences</li>
            <li>Object-focused animations</li>
            <li>Nature and landscape scenes</li>
            <li>Non-human subjects</li>
          </ul>
          
          <p>
            <strong>Technical Specifications:</strong> Sora 2 generates videos at 1920x1080 
            resolution, supports variable aspect ratios, and can create clips up to 60 seconds. 
            The generation time varies but typically takes 2-5 minutes per clip. The output quality 
            is genuinely impressive—when it works for your use case.
          </p>
          
          <p>
            <strong>What I Learned:</strong> Always read the content policy and restrictions 
            <em>before</em> committing time and resources. Marketing materials show the best-case 
            scenarios, not the limitations. For character-driven narratives, Sora 2 simply isn't 
            viable yet. This forced me to completely pivot my tool strategy and taught me the 
            importance of understanding tool capabilities beyond just quality metrics.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
        >
          <h3>Wan2.5: The Face Input Feature That Promised Everything, Delivered Nothing</h3>
          
          <p>
            After Sora's face restrictions killed my workflow, I discovered Wan2.5. This tool 
            actually <strong>lets you upload face reference images</strong>—exactly what I needed! 
            I could upload photos of my character concept, and the AI would use that face in the 
            generated videos. This seemed like the perfect solution to my character consistency 
            problem.
          </p>
          
          <p>
            <strong>How It's Supposed to Work:</strong> Wan2.5 uses a face embedding system where 
            you upload a reference image (or multiple images) of the face you want to use. The 
            system extracts facial features and applies them to generated characters. You can 
            combine this with text prompts to control the scene, action, and environment.
          </p>
          
          <p>
            <strong>The Technical Process:</strong> The workflow involves:
          </p>
          <ol className="bullets">
            <li>Uploading a high-quality face reference image (recommended: front-facing, good 
            lighting, clear features)</li>
            <li>Writing a prompt describing the scene and action</li>
            <li>Setting parameters for video length, resolution, and style</li>
            <li>Generating and hoping the face transfers correctly</li>
          </ol>
          
          <p>
            <strong>What Actually Happened:</strong> The results were consistently disappointing:
          </p>
          <ul className="bullets">
            <li><strong>Face Distortion:</strong> Features would warp and distort, especially 
            around the eyes and mouth. The character would look like a bad deepfake.</li>
            <li><strong>Temporal Inconsistency:</strong> The face would change between frames. 
            In a 5-second clip, the character might look like three different people.</li>
            <li><strong>Morphing Issues:</strong> During movement, facial features would 
            "morph" in unnatural ways—noses would shift, eyes would change size, mouths would 
            distort during speech.</li>
            <li><strong>Lighting Problems:</strong> The face wouldn't match the scene lighting, 
            creating an obvious composite look.</li>
            <li><strong>Expression Issues:</strong> Facial expressions looked unnatural and 
            sometimes terrifying—uncanny valley territory.</li>
          </ul>
          
          <p>
            <strong>My Testing Process:</strong> I tried everything to make this work:
          </p>
          <ul className="bullets">
            <li><strong>Different Reference Images:</strong> High-res photos, multiple angles, 
            different lighting conditions—none produced consistent results</li>
            <li><strong>Prompt Variations:</strong> Detailed prompts, minimal prompts, style 
            specifications—the face quality remained poor</li>
            <li><strong>Parameter Tweaking:</strong> Adjusted strength settings, style weights, 
            resolution settings—marginal improvements at best</li>
            <li><strong>Multiple Generations:</strong> Generated 20+ variations of the same scene— 
            maybe 1-2 were usable, but not good enough for production</li>
          </ul>
          
          <p>
            <strong>Specific Example:</strong> I tried generating a simple scene: "Character 
            walks down a corridor, looking left and right." With a clear reference photo, the 
            result showed a character whose face:
          </p>
          <ul className="bullets">
            <li>Looked like the reference in frame 1</li>
            <li>Had distorted eyes in frame 15</li>
            <li>Completely different nose in frame 30</li>
            <li>Morphed mouth that didn't match speech</li>
          </ul>
          
          <p>
            <strong>Technical Limitations:</strong> The face embedding system in Wan2.5 appears 
            to have fundamental issues:
          </p>
          <ul className="bullets">
            <li>Weak temporal consistency algorithms</li>
            <li>Poor integration between face features and body movement</li>
            <li>Inadequate lighting matching</li>
            <li>Limited control over expression preservation</li>
          </ul>
          
          <p>
            <strong>Cost Analysis:</strong> I spent approximately $50-75 in credits testing 
            Wan2.5 across multiple scenes and variations. The time investment was 10-12 hours 
            of testing, prompt refinement, and result evaluation. The return? Zero usable 
            character shots for my project.
          </p>
          
          <p>
            <strong>When Wan2.5 Might Work:</strong> Based on my testing, it might be viable for:
          </p>
          <ul className="bullets">
            <li>Very short clips (1-2 seconds) where face changes are less noticeable</li>
            <li>Abstract or stylized content where face distortion is acceptable</li>
            <li>Background characters where face detail isn't critical</li>
            <li>Non-human subjects or character designs that don't require realistic faces</li>
          </ul>
          
          <p>
            <strong>What I Learned:</strong> Feature existence ≠ feature quality. Just because 
            a tool advertises face input doesn't mean it works well enough for production. This 
            was another expensive lesson in the gap between marketing promises and technical 
            reality. The face input feature exists, but it's not production-ready. For 
            character-driven narratives requiring consistent faces, Wan2.5 simply isn't viable 
            yet. This forced me to accept that current AI video generation tools have fundamental 
            limitations in character consistency that can't be easily worked around.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3>Higgsfield: The Unified Platform That Cost Me a Fortune</h3>
          
          <p>
            After testing individual tools and hitting dead ends, I discovered Higgsfield. This 
            platform aggregates access to multiple AI video generation models—Veo3.1, Sora 2, 
            RunwayML Gen-3, Kling, and others—all in one interface. This seemed like the perfect 
            solution: test different models side-by-side, compare outputs, and find the best 
            tool for each specific scene without juggling multiple accounts and interfaces.
          </p>
          
          <p>
            <strong>The Platform Architecture:</strong> Higgsfield provides a unified API and 
            interface that connects to various AI video generation backends. You can:
          </p>
          <ul className="bullets">
            <li>Switch between models without leaving the platform</li>
            <li>Compare outputs from different models using the same prompt</li>
            <li>Access model-specific features through a consistent interface</li>
            <li>Track usage and costs across all models in one place</li>
            <li>Use advanced features like batch processing and workflow automation</li>
          </ul>
          
          <p>
            <strong>The Credit System:</strong> Higgsfield uses a credit-based pricing model. 
            Different models cost different amounts of credits per generation:
          </p>
          <ul className="bullets">
            <li><strong>Veo3.1:</strong> ~15-20 credits per generation (depending on length/resolution)</li>
            <li><strong>Sora 2:</strong> ~25-30 credits per generation</li>
            <li><strong>RunwayML Gen-3:</strong> ~10-15 credits per generation</li>
            <li><strong>Kling:</strong> ~8-12 credits per generation</li>
          </ul>
          
          <p>
            <strong>The Financial Reality:</strong> I purchased a credit package thinking it 
            would last me through the project. I was wrong. Here's what happened:
          </p>
          <ul className="bullets">
            <li><strong>Initial Purchase:</strong> $200 for 10,000 credits (seemed reasonable)</li>
            <li><strong>First Week:</strong> Burned through 3,000 credits testing different models</li>
            <li><strong>Second Week:</strong> Another 4,000 credits on iterations and refinements</li>
            <li><strong>Third Week:</strong> Had to purchase another $200 package</li>
            <li><strong>Total Project Cost:</strong> Approximately $600-700 in credits</li>
          </ul>
          
          <p>
            <strong>Why It Was So Expensive:</strong> The convenience came at a premium:
          </p>
          <ul className="bullets">
            <li><strong>Markup:</strong> Higgsfield charges more per generation than using tools 
            directly (they need to make a profit)</li>
            <li><strong>Testing Costs:</strong> Comparing models meant generating the same scene 
            multiple times—each comparison cost 50-80 credits</li>
            <li><strong>Iteration Expenses:</strong> Every failed generation, every refinement 
            attempt, every "let me try this model instead" cost credits</li>
            <li><strong>No Free Tier:</strong> Unlike some individual tools, there's no free 
            testing option</li>
          </ul>
          
          <p>
            <strong>The Psychological Impact:</strong> Watching my credit balance drain was 
            genuinely stressful. Every generation felt like a financial decision:
          </p>
          <ul className="bullets">
            <li>Should I regenerate this scene or accept the flaws?</li>
            <li>Is it worth testing this model or should I stick with what works?</li>
            <li>Can I afford to experiment or do I need to be conservative?</li>
          </ul>
          
          <p>
            <strong>How This Changed My Workflow:</strong> The financial pressure forced me to 
            become much more strategic:
          </p>
          <ul className="bullets">
            <li><strong>Prompt Refinement:</strong> I spent more time perfecting prompts before 
            generating, reducing failed attempts</li>
            <li><strong>Model Selection:</strong> I became better at choosing the right model 
            for each scene type, reducing unnecessary comparisons</li>
            <li><strong>Batch Planning:</strong> I planned generations in batches to optimize 
            credit usage</li>
            <li><strong>Quality Thresholds:</strong> I learned to accept "good enough" rather 
            than perfect, saving credits for critical scenes</li>
          </ul>
          
          <p>
            <strong>What Actually Worked:</strong> Despite the cost, Higgsfield did provide value:
          </p>
          <ul className="bullets">
            <li><strong>Rapid Model Comparison:</strong> I could test 3-4 models on the same 
            prompt in 30 minutes instead of hours</li>
            <li><strong>Unified Workflow:</strong> Not switching between platforms saved time</li>
            <li><strong>Better Model Selection:</strong> Side-by-side comparisons helped me 
            understand each model's strengths</li>
            <li><strong>Workflow Automation:</strong> Batch processing features saved manual work</li>
          </ul>
          
          <p>
            <strong>Cost-Benefit Analysis:</strong> Was it worth it?
          </p>
          <ul className="bullets">
            <li><strong>Time Saved:</strong> Probably 20-30 hours of platform switching and 
            account management</li>
            <li><strong>Money Spent:</strong> $600-700 vs. probably $400-500 using tools directly</li>
            <li><strong>Learning Value:</strong> High—I learned which models work for what</li>
            <li><strong>Stress Level:</strong> High—financial pressure was real</li>
          </ul>
          
          <p>
            <strong>Technical Features That Helped:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Model Comparison Tool:</strong> Generate same prompt with multiple models 
            simultaneously</li>
            <li><strong>Credit Tracking:</strong> Real-time usage monitoring helped me budget</li>
            <li><strong>Batch Processing:</strong> Generate multiple variations efficiently</li>
            <li><strong>Workflow Templates:</strong> Save and reuse successful prompt/model combinations</li>
          </ul>
          
          <p>
            <strong>What I Learned:</strong> Convenience has a price, and that price is significant. 
            Higgsfield saved me time but cost me money. The financial pressure actually improved 
            my prompt engineering and workflow efficiency, but it also limited my experimentation. 
            For future projects, I'd consider using individual tools directly for cost savings, 
            but Higgsfield's unified interface was valuable for the learning phase. The key lesson: 
            understand the pricing model before committing, and budget for iteration costs—they 
            add up fast.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
        >
          <h3>Veo3.1: The Tool That Actually Worked (After Everything Else Failed)</h3>
          
          <p>
            After weeks of testing Sora (face restrictions), Wan2.5 (poor quality), and other 
            tools, Veo3.1 became my primary workhorse. It wasn't perfect, but it was the only 
            tool that could consistently produce usable character-focused scenes for my project.
          </p>
          
          <p>
            <strong>Technical Specifications:</strong> Veo3.1 (Google's video generation model) 
            generates videos up to 60 seconds at 1080p resolution. It uses a diffusion-based 
            architecture with improved temporal consistency compared to earlier versions. The 
            model supports text-to-video generation with detailed prompt control.
          </p>
          
          <p>
            <strong>Why Veo3.1 Worked for Me:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Character Consistency:</strong> Better than alternatives (though still 
            not perfect). Characters maintained recognizable features across frames more reliably.</li>
            <li><strong>Temporal Coherence:</strong> Motion felt natural, objects moved 
            consistently through space</li>
            <li><strong>Lighting Control:</strong> Handled complex lighting scenarios (emergency 
            amber, server blue glows) when given detailed prompts</li>
            <li><strong>No Face Restrictions:</strong> Unlike Sora, I could generate human 
            characters (with limitations)</li>
            <li><strong>Reliable Output:</strong> More consistent results than other tools</li>
          </ul>
          
          <p>
            <strong>My Iterative Workflow:</strong> I developed a systematic approach:
          </p>
          <ol className="bullets">
            <li><strong>Initial Generation:</strong> Create first version with detailed prompt</li>
            <li><strong>Evaluation:</strong> Identify specific issues (lighting, composition, 
            character appearance)</li>
            <li><strong>Prompt Refinement:</strong> Adjust prompt to address specific problems</li>
            <li><strong>Regeneration:</strong> Generate 2-3 variations</li>
            <li><strong>Selection:</strong> Choose best version or combine elements in post</li>
          </ol>
          
          <p>
            <strong>Prompt Engineering for Veo3.1:</strong> The key was extreme specificity. 
            Here's an example of my prompt evolution:
          </p>
          <ul className="bullets">
            <li><strong>Bad Prompt:</strong> "Person walks down a dark corridor"</li>
            <li><strong>Better Prompt:</strong> "Medium shot of a person walking through an 
            industrial corridor with dim lighting"</li>
            <li><strong>Good Prompt:</strong> "Medium shot, eye level, person in dark clothing 
            walks slowly through narrow industrial corridor, emergency amber lighting from 
            overhead fixtures creates harsh shadows, server blue glow from side panels, cold 
            metallic surfaces, shallow depth of field focusing on character, cinematic 2.35:1 
            aspect ratio, slow dolly movement following character"</li>
          </ul>
          
          <p>
            <strong>What Worked Well:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Environmental Shots:</strong> Datacenter corridors, server rooms, 
            industrial spaces—excellent results</li>
            <li><strong>Character Movement:</strong> Walking, turning, looking around—natural 
            motion</li>
            <li><strong>Lighting Scenarios:</strong> Complex multi-source lighting when specified 
            in detail</li>
            <li><strong>Atmospheric Shots:</strong> Mood and tone came through well</li>
          </ul>
          
          <p>
            <strong>Limitations I Had to Work Around:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Character Consistency:</strong> Faces would still vary slightly between 
            scenes—required post-production color grading to match</li>
            <li><strong>Expression Control:</strong> Limited control over facial expressions</li>
            <li><strong>Camera Movement:</strong> Complex camera moves sometimes produced 
            artifacts</li>
            <li><strong>Multiple Characters:</strong> Scenes with multiple people were less 
            reliable</li>
            <li><strong>Close-ups:</strong> Face close-ups often had inconsistencies</li>
          </ul>
          
          <p>
            <strong>My Success Rate:</strong> Out of approximately 150 generations:
          </p>
          <ul className="bullets">
            <li><strong>First Attempt Success:</strong> ~30% (usable without major issues)</li>
            <li><strong>After 2-3 Iterations:</strong> ~70% (acceptable with minor post-production)</li>
            <li><strong>Complete Failures:</strong> ~10% (unusable even after multiple attempts)</li>
            <li><strong>Perfect Results:</strong> ~5% (no post-production needed)</li>
          </ul>
          
          <p>
            <strong>Cost Per Scene:</strong> On average, each final scene cost:
          </p>
          <ul className="bullets">
            <li><strong>Generations:</strong> 2-3 attempts × 15-20 credits = 30-60 credits</li>
            <li><strong>Time Investment:</strong> 15-30 minutes per scene (prompt refinement + 
            evaluation)</li>
            <li><strong>Post-Production:</strong> Additional 10-20 minutes for color grading and 
            stabilization</li>
          </ul>
          
          <p>
            <strong>Specific Example - Successful Scene:</strong> One of my best results was a 
            scene where the character walks through a datacenter corridor. The prompt was:
          </p>
          <blockquote style={{fontStyle: 'italic', marginLeft: '20px', borderLeft: '3px solid #8a2be2', paddingLeft: '15px'}}>
            "Medium shot, eye level, person in dark tech-wear walks cautiously through narrow 
            industrial datacenter corridor, emergency amber overhead lighting creates harsh 
            top-down shadows on face, server blue glow from side server racks illuminates 
            background, cold metallic gray surfaces, shallow depth of field with character in 
            focus, slow forward dolly movement, cinematic 2.35:1 aspect ratio, dark moody 
            atmosphere"
          </blockquote>
          <p>
            This took 2 generations to get right, but the final result was usable with minimal 
            post-production—just some color grading to match other scenes.
          </p>
          
          <p>
            <strong>Tips for Using Veo3.1 Effectively:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Be Extremely Specific:</strong> Include camera angle, shot type, lighting 
            direction, depth of field, aspect ratio</li>
            <li><strong>Describe Lighting in Detail:</strong> Source, color, direction, intensity</li>
            <li><strong>Specify Camera Movement:</strong> Static, dolly, pan, etc.</li>
            <li><strong>Use Cinematic Terminology:</strong> "Medium shot," "shallow depth of field," 
            "cinematic aspect ratio"</li>
            <li><strong>Plan for Iteration:</strong> Don't expect perfection on first try</li>
            <li><strong>Build a Prompt Library:</strong> Save successful prompts as templates</li>
          </ul>
          
          <p>
            <strong>What I Learned:</strong> Veo3.1 became my go-to not because it was perfect, 
            but because I learned to work within its limitations. The key was accepting that 
            iteration is part of the process, not a failure. Building a systematic workflow 
            around prompt refinement and multiple generations was essential. The tool requires 
            patience and detailed prompt engineering, but when you get it right, the results 
            are worth it. For character-driven narratives, Veo3.1 is currently one of the best 
            options available, despite its limitations.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h3>RunwayML Gen-3: The Specialized Environmental Tool</h3>
          
          <p>
            RunwayML Gen-3 became my go-to for specific environmental shots where I needed 
            particular aesthetic qualities that Veo3.1 couldn't deliver. While it wasn't reliable 
            for character continuity, it excelled at certain types of scenes.
          </p>
          
          <p>
            <strong>Technical Capabilities:</strong> RunwayML Gen-3 generates videos up to 10 
            seconds at 1280x768 resolution (with options for different aspect ratios). It uses 
            a diffusion model with good control over style and aesthetic.
          </p>
          
          <p>
            <strong>What RunwayML Did Well:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Atmospheric Shots:</strong> Wide establishing shots with strong mood and 
            atmosphere</li>
            <li><strong>Style Control:</strong> Better at matching specific visual styles and 
            aesthetics</li>
            <li><strong>Environmental Details:</strong> Richer detail in background elements and 
            environments</li>
            <li><strong>Abstract Sequences:</strong> Non-narrative, mood-focused shots</li>
            <li><strong>Quick Iterations:</strong> Faster generation time than some alternatives</li>
          </ul>
          
          <p>
            <strong>Where RunwayML Failed:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Character Consistency:</strong> Characters looked different between 
            generations—unusable for character-driven scenes</li>
            <li><strong>Temporal Coherence:</strong> Motion sometimes felt less natural than Veo3.1</li>
            <li><strong>Lighting Matching:</strong> Harder to match specific lighting scenarios 
            across scenes</li>
            <li><strong>Resolution Limitations:</strong> Lower max resolution than some competitors</li>
          </ul>
          
          <p>
            <strong>My Use Cases for RunwayML:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Establishing Shots:</strong> Wide shots of datacenter exteriors, server 
            rooms, industrial spaces</li>
            <li><strong>Transition Sequences:</strong> Abstract shots between narrative beats</li>
            <li><strong>Atmospheric Moments:</strong> Mood-setting shots without characters</li>
            <li><strong>Background Elements:</strong> Shots that would be composited behind 
            character scenes</li>
          </ul>
          
          <p>
            <strong>Example Successful Prompt:</strong> "Wide establishing shot of industrial 
            datacenter server room, rows of server racks with blue LED lights, emergency amber 
            overhead lighting, cold metallic surfaces, cinematic wide angle, moody atmosphere, 
            slow camera pan"
          </p>
          
          <p>
            <strong>Cost and Time:</strong> RunwayML cost approximately 10-15 credits per 
            generation through Higgsfield. Generation time was typically 2-4 minutes. Success 
            rate was higher for environmental shots (~60% first attempt) than character scenes 
            (~20% first attempt).
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15 }}
        >
          <h3>Kling: The Abstract Effects Specialist</h3>
          
          <p>
            Kling became my specialized tool for abstract sequences and visual effects that 
            couldn't be achieved with other tools. While it wasn't suitable for narrative 
            continuity, it excelled at surreal, abstract, and effects-heavy sequences.
          </p>
          
          <p>
            <strong>Technical Specifications:</strong> Kling (by Kuaishou) generates videos up to 
            10 seconds at 1080p resolution. It uses a diffusion model with strong capabilities 
            for abstract and stylized content.
          </p>
          
          <p>
            <strong>What Kling Excelled At:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Abstract Effects:</strong> The "cognitive scrambler" sequences in my 
            project—distorted, surreal visuals representing mental disruption</li>
            <li><strong>Surreal Imagery:</strong> Non-realistic, dreamlike sequences</li>
            <li><strong>Visual Effects:</strong> Glitch effects, data visualization, abstract 
            representations</li>
            <li><strong>Creative Interpretations:</strong> When I wanted the AI to interpret 
            prompts creatively rather than literally</li>
            <li><strong>Stylized Content:</strong> Artistic, non-photorealistic sequences</li>
          </ul>
          
          <p>
            <strong>Where Kling Struggled:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Narrative Continuity:</strong> Completely unreliable for maintaining 
            character or scene consistency</li>
            <li><strong>Realistic Scenes:</strong> When I needed photorealistic results, Kling 
            often produced stylized or abstract interpretations</li>
            <li><strong>Character Work:</strong> Not suitable for character-focused scenes</li>
            <li><strong>Predictability:</strong> Results were less predictable than other tools</li>
          </ul>
          
          <p>
            <strong>My Specific Use Case - Cognitive Scrambler Effect:</strong> When players 
            made wrong choices in my interactive film, they triggered a "cognitive scrambler" 
            effect. This needed to be:
          </p>
          <ul className="bullets">
            <li>Visually disorienting and surreal</li>
            <li>Represent mental disruption and confusion</li>
            <li>Create a sense of "glitching" or system error</li>
            <li>Transition smoothly into the loop-back sequence</li>
          </ul>
          
          <p>
            <strong>Kling Prompt That Worked:</strong> "Abstract surreal sequence, distorted 
            datacenter corridor, glitch effects, digital noise, reality breaking apart, 
            fragmented visuals, cyberpunk aesthetic, disorienting camera movement, 
            cognitive disruption visualization, 3 seconds"
          </p>
          
          <p>
            This generated exactly the kind of abstract, disorienting effect I needed. Veo3.1 
            would have tried to make it too realistic, but Kling embraced the abstract nature 
            of the prompt.
          </p>
          
          <p>
            <strong>Cost and Workflow:</strong> Kling cost approximately 8-12 credits per 
            generation. Generation time was 2-3 minutes. For abstract effects, my success rate 
            was high (~70% first attempt) because I wasn't trying to match realistic scenes.
          </p>
          
          <p>
            <strong>Building the Hybrid Workflow:</strong> I ended up with a multi-tool approach:
          </p>
          <ul className="bullets">
            <li><strong>Veo3.1:</strong> Character scenes, narrative continuity, main story beats</li>
            <li><strong>Kling:</strong> Abstract effects, cognitive scrambler sequences, surreal 
            moments</li>
            <li><strong>RunwayML:</strong> Environmental establishing shots, atmospheric sequences</li>
          </ul>
          
          <p>
            <strong>What I Learned:</strong> No single tool solved all my problems. The "perfect" 
            AI video generation tool doesn't exist yet. Instead, I had to build a toolkit where 
            each tool handled what it did best. This required:
          </p>
          <ul className="bullets">
            <li>Understanding each tool's strengths and weaknesses</li>
            <li>Planning which tool to use for each scene type</li>
            <li>Managing different prompt styles for different tools</li>
            <li>Accepting that my workflow would be complex and multi-platform</li>
            <li>Post-production to blend results from different tools</li>
          </ul>
          
          <p>
            This hybrid approach was more work, but it was the only way to achieve the results 
            I needed. The lesson: in the current state of AI video generation, specialization 
            beats trying to find one tool that does everything.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15 }}
        >
          <h3>My Biggest Failure: The Consistency Problem</h3>
          <p>
            Here's the hard truth: I never fully solved the character consistency problem. 
            Characters would look slightly different between scenes, lighting would shift 
            unpredictably, and maintaining visual coherence across branching paths was a constant 
            struggle. I spent more time on this than any other technical challenge, and I 
            still had to use extensive post-production (color grading, stabilization) to make 
            things work.
          </p>
          
          <p>
            This failure taught me that current AI video generation tools have fundamental 
            limitations. You can work around them, you can patch them with post-production, 
            but you can't eliminate them entirely. Accepting this was difficult—I wanted to 
            create something seamless, but the tools just aren't there yet.
          </p>
          
          <p>
            <strong>What I learned:</strong> Sometimes failure isn't about not trying hard enough—it's 
            about hitting the limits of current technology. Learning to work within those limits, 
            rather than fighting them, became a crucial skill. This connects to course discussions 
            on the current state of AI-assisted production: it's powerful, but it's not magic. 
            Human oversight and post-production work are still essential.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3>Prompt Engineering: The Skill I Didn't Know I Needed</h3>
          <p>
            I went into this thinking prompt engineering would be straightforward. Write what 
            you want, get what you want. Wrong.
          </p>
          
          <p>
            My early prompts were too abstract: "scary datacenter corridor." The AI tools 
            needed explicit technical descriptions: "wide-angle shot of industrial corridor, 
            emergency amber lighting from overhead fixtures, server blue glow from side panels, 
            cold metallic surfaces, shallow depth of field, cinematic 2.35:1 aspect ratio." 
            This level of specificity was exhausting, but it was the only way to get consistent 
            results.
          </p>
          
          <p>
            I built a library of prompt templates, documented what worked and what didn't, and 
            developed a systematic approach to prompt refinement. This wasn't creative work—it 
            was technical problem-solving. But it became essential.
          </p>
          
          <p>
            <strong>What I learned:</strong> Prompt engineering is a real skill, and it requires 
            both technical precision and artistic vision. You're essentially learning to 
            communicate with AI systems in a language they understand. This connects to course 
            objectives on AI-assisted creative production—the tools are powerful, but they require 
            new skills to use effectively.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25 }}
        >
          <h3>What I Wish I'd Known: Final Thoughts</h3>
          <p>
            Looking back, I wish I'd done more research upfront. I wasted time and money on tools 
            that didn't fit my needs because I got excited by marketing materials. I wish I'd 
            started with smaller tests before committing to expensive platforms. I wish I'd 
            understood that AI video generation is still in its early stages, and perfection isn't 
            achievable yet.
          </p>
          
          <p>
            But I also learned that failure is part of the process. Every dead end taught me 
            something. Every wasted credit forced me to be more strategic. Every inconsistency 
            problem pushed me to develop better workflows. The struggles weren't setbacks—they 
            were the actual learning process.
          </p>
          
          <p>
            This connects to course objectives on emerging technology evaluation and the reality 
            of working with cutting-edge tools: they're powerful, but they're not magic. 
            Understanding their limitations is just as important as understanding their capabilities. 
            And sometimes, the best learning comes from what doesn't work.
          </p>
        </motion.article>
      </motion.section>

      {/* Audience & Accessibility Section */}
      <motion.section
        id="audience"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
      >
        <div className="card">
          <h2>Audience & Accessibility</h2>
          <p>
            Designing an interactive film for diverse audiences requires careful consideration of 
            accessibility, cultural context, and viewer agency.
          </p>
          <ul className="bullets">
            <li>Clear visual and audio cues for decision points</li>
            <li>Subtitle support for all dialogue</li>
            <li>Multiple difficulty pathways</li>
            <li>Content warnings for mature themes</li>
            <li>Mobile and desktop-optimized interfaces</li>
          </ul>
        </div>
      </motion.section>

      {/* Production & Reflection Section */}
      <motion.section
        id="production"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="card">
          <h2>Production & Reflection: The Real Story</h2>
          <p>
            This isn't a polished success story. It's the messy reality of trying to create something 
            ambitious with tools that aren't quite ready yet. Here's what actually happened—the failures, 
            the pivots, and what I learned along the way.
          </p>
        </div>

        {/* Milestone 1: Project Initiation */}
        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
        >
          <h3>Starting Too Big: My First Mistake</h3>
          <small className="meta">October 2025</small>
          
          <p>
            I started with grand ambitions. "Echo Maze Protocol" would be an interactive horror film 
            exploring AI control and human agency—multiple branching paths, complex choices, deep 
            thematic exploration. I researched horror conventions, studied Black Mirror: Bandersnatch 
            and The Stanley Parable, and designed a narrative structure that was... way too complex.
          </p>
          
          <p>
            My initial concept had too many branching paths. I was excited about the possibilities 
            and didn't think about the practical reality: each branch needs assets, each choice needs 
            testing, each path needs to maintain narrative coherence. I designed myself into a corner 
            where the scope was completely unmanageable.
          </p>
          
          <p>
            <strong>What I learned:</strong> I had to simplify. I cut back to three main acts with 
            strategic convergence points—multiple paths could merge at key checkpoints. This wasn't 
            a compromise on my creative vision; it was a necessary reality check. The loop-based 
            structure I chose (where wrong choices return players to earlier points) actually served 
            both the narrative theme and the production constraints. Sometimes limitations force 
            better design decisions.
          </p>
          
          <p>
            This connects to Janet Murray's work on interactive narrative structures—managing 
            complexity while maintaining player agency. I learned that theory is one thing, but 
            implementing it requires understanding your actual constraints, not just your ideal vision.
          </p>
        </motion.article>

        {/* Milestone 2: Narrative Development */}
        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3>Milestone 2: Narrative Structure & Twine Prototyping</h3>
          <small className="meta">October 2025</small>
          
          <p><strong>What I did:</strong> Drafted the complete narrative outline in Twine, creating the branching 
          structure with three acts: Initialization, Trials, and Exit. Developed the core mechanic where wrong 
          choices trigger cognitive scrambler effects and loop back to checkpoints.</p>
          
          <p><strong>Key Decision:</strong> Implemented timed decision mechanics to create tension and prevent 
          players from overthinking choices. This connects to horror game design theory on pacing and player 
          psychology—forcing quick decisions increases emotional investment and vulnerability.</p>
          
          <p><strong>Challenge:</strong> Ensuring narrative coherence across multiple paths while maintaining 
          thematic consistency. Early playtests revealed confusion when players looped back—they lost track 
          of narrative progression.</p>
          
          <p><strong>Solution:</strong> Added visual markers (chalk arrows, checkpoint labels) that persist 
          across loops, providing spatial memory cues. This design choice reflects environmental storytelling 
          principles from games like Control and Portal, where the space itself tells part of the story.</p>
          
          <p><strong>Reflection:</strong> The Twine prototype phase was crucial for understanding narrative flow 
          before committing to expensive AI-generated assets. This iterative approach aligns with agile 
          development methodologies and demonstrates the value of low-fidelity prototyping in interactive media.</p>
        </motion.article>

        {/* Milestone 3: Visual Development */}
        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
        >
          <h3>Milestone 3: Moodboard & Visual Language Development</h3>
          <small className="meta">October 2025</small>
          
          <p><strong>What I did:</strong> Created comprehensive moodboards establishing the visual tone—cold, 
          industrial datacenter aesthetics with emergency amber and server blue lighting. Referenced Blade 
          Runner's neon-noir and Ex Machina's clinical minimalism to define the visual grammar.</p>
          
          <p><strong>Key Decision:</strong> Chose a limited color palette (blues, ambers, grays) to create 
          visual cohesion across AI-generated assets. This decision was informed by color theory in film 
          production and proved essential for maintaining consistency when working with multiple AI video 
          generation tools.</p>
          
          <p><strong>Challenge:</strong> Translating static moodboard concepts into dynamic video sequences 
          that maintain visual consistency across different AI tools (Veo3, NanoBanana, Kling). Each tool 
          interpreted prompts differently, creating jarring visual shifts between scenes.</p>
          
          <p><strong>Solution:</strong> Developed detailed prompt templates with specific lighting, color, 
          and composition instructions. Created reference images for each key scene to guide AI generation. 
          This systematic approach to prompt engineering became a critical skill, connecting to course 
          objectives on AI-assisted creative production.</p>
          
          <p><strong>Reflection:</strong> The moodboard phase revealed the gap between traditional pre-production 
          and AI-assisted production. While moodboards remain valuable, AI generation requires more explicit, 
          technical descriptions than traditional storyboards. This learning connects to emerging practices 
          in AI-assisted filmmaking and the evolving role of the creative director.</p>
        </motion.article>

        {/* Milestone 4: Asset Generation */}
        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h3>The Asset Generation Disaster (And How I Survived It)</h3>
          <small className="meta">October-November 2025</small>
          
          <p>
            This was the hardest part. I thought generating assets would be straightforward—pick a tool, 
            write prompts, get videos. Instead, I spent weeks burning through credits, hitting dead ends, 
            and learning that AI video generation is nowhere near as easy as it looks.
          </p>
          
          <p>
            I tried six different tools: Higgsfield, Sora 2, Veo3.1, RunwayML, Kling, and Wan2.5. 
            Most of them failed me in different ways. Sora 2 wouldn't let me use faces—a major problem 
            when you need a protagonist. Wan2.5 let me input face images, but the results were terrible. 
            I paid for Higgsfield because it had all the models, but it cost a fortune in credits. 
            Every failed generation felt like money down the drain.
          </p>
          
          <p>
            <strong>My biggest failure:</strong> I never solved the character consistency problem. 
            Characters would look slightly different between scenes. Lighting would shift unpredictably. 
            I spent more time trying to fix this than any other challenge, and I still had to use 
            extensive post-production (color grading, stabilization) to make things work. This wasn't 
            a small issue—it was a fundamental limitation I had to accept.
          </p>
          
          <p>
            <strong>What actually worked:</strong> After all the failures, I settled on Veo3.1 as my 
            primary tool for character scenes, with Kling for abstract effects and RunwayML for 
            specific environmental shots. I built a hybrid workflow combining AI generation with 
            traditional post-production. It wasn't elegant, but it was the only way to get usable results.
          </p>
          
          <p>
            <strong>What I learned:</strong> Current AI video generation tools have fundamental 
            limitations. You can work around them, you can patch them with post-production, but you 
            can't eliminate them. Accepting this was difficult—I wanted to create something seamless, 
            but the tools just aren't there yet. This connects to course discussions on AI ethics and 
            the reality of AI-assisted production: it's powerful, but it's not magic. Human oversight 
            and creative problem-solving are still essential.
          </p>
        </motion.article>

        {/* Milestone 5: Playtesting & Iteration */}
        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15 }}
        >
          <h3>When Players Don't Get It: The Playtesting Reality Check</h3>
          <small className="meta">November 2025</small>
          
          <p>
            I thought my looping mechanic was clever. I thought players would understand the intentional 
            nature of the loops, appreciate the meta-commentary on choice and control. I was wrong.
          </p>
          
          <p>
            During playtesting, players thought the game had glitched. They didn't realize they were 
            in a loop—they thought something was broken. Some players quit, thinking the experience 
            was buggy. Others kept playing but were confused and frustrated. My clever design decision 
            was completely lost on them.
          </p>
          
          <p>
            <strong>My failure:</strong> I designed for myself, not for players. I understood the 
            mechanics because I created them, but I didn't communicate them clearly. The gap between 
            what I intended and what players experienced was huge. Some choice points felt arbitrary 
            to players, reducing their investment in decisions. The horror pacing was inconsistent, 
            with some sections losing tension completely.
          </p>
          
          <p>
            <strong>What I had to fix:</strong> I added explicit visual and audio cues when loops occur 
            (the "RETRY" text, cognitive scrambler effects). I refined choice descriptions to emphasize 
            consequences and moral weight. I introduced environmental storytelling elements that hint at 
            correct paths without making choices obvious. It took multiple iterations to get this right, 
            and I'm still not sure it's perfect.
          </p>
          
          <p>
            <strong>What I learned:</strong> Playtesting revealed the fundamental challenge in interactive 
            storytelling: the gap between authorial intent and player experience. This connects directly 
            to course objectives on audience engagement and user experience design. The feedback process 
            was humbling—I had to let go of my assumptions and actually listen to what players were 
            experiencing. Clear communication in interactive narratives is harder than it looks. Players 
            need to understand both the mechanics and the narrative implications, and that requires 
            careful design, not just good intentions.
          </p>
        </motion.article>

        {/* Milestone 6: Technical Implementation - Locked for future */}
        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          style={{opacity: 0.5, pointerEvents: 'none'}}
        >
          <h3>Milestone 6: Digital Logbook Development</h3>
          <small className="meta">[Locked - Future content]</small>
          
          <p><em>This section will be updated after prototype submission.</em></p>
        </motion.article>

        {/* Key Learnings Summary */}
        <div className="card">
          <h3>Key Learnings & Course Connections</h3>
          <div className="grid-2">
            <div className="mini">
              <h4>Interactive Storytelling Theory</h4>
              <ul className="bullets">
                <li>Applied Murray's concepts of agency and immersion to branching narrative design</li>
                <li>Explored the tension between player choice and authorial control</li>
                <li>Implemented environmental storytelling techniques from game design</li>
                <li>Balanced narrative complexity with technical constraints</li>
              </ul>
            </div>
            <div className="mini">
              <h4>AI-Assisted Production</h4>
              <ul className="bullets">
                <li>Evaluated multiple AI video generation tools for creative production</li>
                <li>Developed prompt engineering skills for consistent AI output</li>
                <li>Established hybrid workflows combining AI generation with traditional post-production</li>
                <li>Reflected on the role of human creativity in AI-assisted workflows</li>
              </ul>
            </div>
            <div className="mini">
              <h4>User Experience Design</h4>
              <ul className="bullets">
                <li>Conducted iterative playtesting and user feedback collection</li>
                <li>Addressed usability issues in interactive narrative interfaces</li>
                <li>Balanced player agency with narrative guidance</li>
                <li>Applied accessibility principles to interactive media</li>
              </ul>
            </div>
            <div className="mini">
              <h4>Digital Media Production</h4>
              <ul className="bullets">
                <li>Managed complex production pipelines with multiple tools and formats</li>
                <li>Integrated video, audio, and interactive elements into cohesive experience</li>
                <li>Developed technical skills in React, video editing, and asset management</li>
                <li>Created professional documentation and reflective practice</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* References Section */}
      <motion.section
        id="references"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95 }}
      >
        <div className="card">
          <h2>References & Theoretical Foundations</h2>
          <p>
            This project draws from multiple sources across film, literature, games, and academic 
            research. This section documents key references and their connections to project decisions, 
            demonstrating how theoretical frameworks informed practical development choices.
          </p>
            </div>

        <div className="card">
          <h3>Interactive Storytelling Theory</h3>
          
          <h4>Janet Murray - "Hamlet on the Holodeck"</h4>
          <p>
            Murray's concepts of agency, immersion, and transformation directly informed the narrative 
            structure. The decision to use strategic convergence points (where multiple paths merge) 
            reflects Murray's discussion of managing complexity in interactive narratives while 
            maintaining player agency. The looping mechanic explores Murray's concept of the "illusion 
            of agency"—the tension between player choice and authorial control that became a central 
            theme of the narrative itself.
          </p>

          <h4>Espen Aarseth - "Cybertext"</h4>
          <p>
            Aarseth's work on ergodic literature (requiring non-trivial effort to traverse) informed 
            the design of the maze structure and looping mechanics. The cognitive scrambler effect 
            that triggers on wrong choices connects to Aarseth's discussion of how interactive texts 
            can resist easy navigation, forcing players to engage more deeply with the system.
          </p>

          <h4>Marie-Laure Ryan - "Narrative as Virtual Reality"</h4>
          <p>
            Ryan's exploration of immersion and interactivity informed decisions about balancing 
            narrative coherence with player agency. The three-act structure with branching paths 
            reflects Ryan's discussion of maintaining narrative unity in interactive environments.
          </p>
            </div>

        <div className="card">
          <h3>AI Ethics & Philosophy</h3>
          
          <h4>Nick Bostrom - "Superintelligence"</h4>
          <p>
            Bostrom's exploration of AI control problems and the alignment problem informed the 
            narrative's central conflict. The AI system's offers of guidance and safety, which 
            may be manipulative, reflect Bostrom's discussion of how AI systems might pursue 
            goals in ways that conflict with human values.
          </p>

          <h4>Stuart Russell - "Human Compatible"</h4>
          <p>
            Russell's work on AI safety and human-compatible AI systems informed the narrative's 
            exploration of human-AI collaboration versus conflict. The choice between merging with 
            the core or cutting power reflects Russell's discussion of different approaches to 
            AI governance and control.
          </p>

          <h4>AI Ethics Frameworks</h4>
          <p>
            Various AI ethics frameworks (from organizations like the IEEE, Partnership on AI, 
            and academic institutions) informed the thematic exploration of surveillance, autonomy, 
            and control. The narrative's refusal to prescribe a single "correct" answer reflects 
            the ongoing debates in AI ethics about these complex questions.
          </p>
          </div>

        <div className="card">
          <h3>Film & Media References</h3>
          
          <h4>Blade Runner (1982) - Dir. Ridley Scott</h4>
          <p>
            <strong>Visual Influence:</strong> The neon-noir aesthetic, industrial decay, and 
            rain-soaked reflections directly informed the moodboard and visual language. Syd 
            Mead's production design established the visual grammar for dystopian tech environments.
          </p>
          <p>
            <strong>Thematic Connection:</strong> The film's exploration of what makes us human 
            and the blurring line between human and artificial intelligence connects to the 
            project's themes of agency and identity in an AI-controlled world.
          </p>

          <h4>Black Mirror: Bandersnatch (2018) - Netflix</h4>
          <p>
            <strong>Narrative Structure:</strong> The branching narrative format and meta-commentary 
            on choice and control directly informed the project's interactive structure. The 
            exploration of whether choices are meaningful or predetermined connects to similar 
            themes in Bandersnatch.
          </p>
          <p>
            <strong>Technical Approach:</strong> The use of video switching and choice mechanics 
            was informed by Bandersnatch's implementation, though adapted for a different 
            platform and narrative context.
          </p>

          <h4>Ex Machina (2014) - Dir. Alex Garland</h4>
          <p>
            <strong>Visual Design:</strong> The minimalist AI lab design, glass-wall confinement 
            metaphors, and cold clinical color palettes informed the datacenter setting and 
            visual tone.
          </p>
          <p>
            <strong>Thematic Connection:</strong> The film's exploration of AI consciousness, 
            manipulation, and the power dynamics between creator and creation informed the 
            narrative's central conflict between the protagonist and the AI system.
          </p>
        </div>

        <div className="card">
          <h3>Game Design & Interactive Media</h3>
          
          <h4>The Stanley Parable (2013) - Galactic Cafe</h4>
          <p>
            <strong>Narrative Mechanics:</strong> The game's exploration of the illusion of 
            choice and narrator-player tension directly informed the looping mechanic and the 
            AI voice's ambiguous guidance. The meta-commentary on player agency became a central 
            theme.
          </p>

          <h4>Portal / Portal 2 (2007/2011) - Valve</h4>
          <p>
            <strong>AI Character Design:</strong> GLaDOS's voice design and dark humor informed 
            the AI system's personality and dialogue approach. The environmental storytelling 
            through facility architecture informed the datacenter setting.
          </p>

          <h4>Control (2019) - Remedy Entertainment</h4>
          <p>
            <strong>Environmental Design:</strong> The brutalist architecture and shifting reality 
            mechanics informed the visual design and the cognitive scrambler effects. The game's 
            use of environmental markers and spatial memory informed the checkpoint system.
          </p>

          <h4>SOMA (2015) - Frictional Games</h4>
          <p>
            <strong>Thematic Influence:</strong> The game's exploration of consciousness transfer 
            and existential horror informed the narrative's themes of identity and what it means 
            to be human in an AI-controlled environment. The underwater isolation aesthetics 
            informed the cold, claustrophobic atmosphere.
          </p>
        </div>

        <div className="card">
          <h3>Generative AI Research</h3>
          
          <h4>Video Generation Research</h4>
          <p>
            Research papers on diffusion models, temporal consistency, and video generation 
            informed understanding of AI tool limitations and capabilities. This theoretical 
            knowledge helped set realistic expectations and informed prompt engineering strategies.
          </p>

          <h4>AI-Assisted Creative Production</h4>
          <p>
            Academic discussions on the role of human creativity in AI-assisted workflows informed 
            the hybrid production approach. Research on prompt engineering and human-AI collaboration 
            in creative contexts informed the development of systematic prompt templates and 
            reference image workflows.
          </p>
        </div>

        <div className="card">
          <h3>Connection to Course Objectives</h3>
          <p>
            These references connect to course objectives in several ways:
          </p>
          <ul className="bullets">
            <li><strong>Theoretical Application:</strong> Applied concepts from interactive 
            storytelling theory (Murray, Aarseth, Ryan) to practical design decisions, demonstrating 
            understanding of theoretical frameworks through implementation.</li>
            
            <li><strong>Interdisciplinary Research:</strong> Drew from multiple fields (film studies, 
            game design, AI ethics, interactive media theory) to inform a cohesive creative project, 
            demonstrating research skills and interdisciplinary thinking.</li>
            
            <li><strong>Critical Analysis:</strong> Evaluated reference works not just as 
            inspiration, but as case studies in interactive narrative design, AI ethics, and 
            visual storytelling, demonstrating critical thinking skills.</li>
            
            <li><strong>Contemporary Relevance:</strong> Engaged with current debates in AI ethics 
            and emerging practices in AI-assisted production, connecting academic theory to 
            contemporary creative and technical challenges.</li>
          </ul>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <p>
          This logbook is continuously updated as the project evolves. 
          Check back regularly for new entries, experiments, and insights.
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default Home;