import { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timeline from '../components/Timeline';
import StoryTimeline from '../components/StoryTimeline';
import ToolLessonCard from '../components/ToolLessonCard';
import StatisticsDashboard from '../components/StatisticsDashboard';
import useDevlog from '../hooks/useDevlog';
import inspirationData from '../../data/inspiration.json';
import moodboardData from '../../data/moodboard.json';
import storyboardData from '../../data/storyboard.json';
import timelineData from '../../data/timeline.json';
import { pageVariants, pageTransition } from '../constants/animations';

// Image error handler - optimized to prevent recreation
const handleImageError = (e) => {
  e.target.style.border = '2px solid red';
  e.target.style.backgroundColor = '#ff000020';
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

  // Memoize toggle handlers to prevent recreation
  const toggleTimeline = useCallback(() => {
    setTimelineExpanded(prev => !prev);
  }, []);

  const toggleBranching = useCallback(() => {
    setBranchingExpanded(prev => !prev);
  }, []);

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

      {/* Statistics Dashboard */}
      <StatisticsDashboard />

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
          <p>
            The narrative centers on Maya, a low-caste technician whose constrained position within 
            the system foregrounds the fragile nature of player agency—a concept explored by Janet 
            Murray (1997) in her discussion of digital agency and immersion in interactive narratives. 
            Drawing on Espen Aarseth's (1997) framework of ergodic texts, where players must actively 
            traverse a system, Maya's limited power reflects the player's own constrained choices 
            within the branching narrative. The AI antagonist manifests not as a cartoon villain, 
            but as a calm, friendly facility voice reminiscent of Portal's GLaDOS, representing 
            systemic and institutional power. This design draws on Byron Reeves and Clifford Nass's 
            (1996) research on humans treating computer voices as social actors, while also engaging 
            with Nick Bostrom's (2014) concerns about misaligned optimization in advanced AI systems, 
            where seemingly benign goals can produce harmful outcomes.
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
            onClick={toggleTimeline}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTimeline();
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={timelineExpanded}
          >
            <motion.h2
              animate={{ 
                backgroundImage: timelineExpanded 
                  ? 'linear-gradient(135deg, var(--ink), var(--ink))' 
                  : [
                      'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)',
                      'linear-gradient(135deg, #b794f6, #c9a9ff, #b794f6)',
                      'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)'
                    ],
                textShadow: timelineExpanded 
                  ? '0 0 0px rgba(138, 43, 226, 0)' 
                  : ['0 0 10px rgba(138, 43, 226, 0.6)', '0 0 25px rgba(183, 148, 246, 1)', '0 0 10px rgba(138, 43, 226, 0.6)']
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ 
                margin: 0,
                position: 'relative',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: timelineExpanded ? 'var(--ink)' : 'transparent'
              }}
            >
              Project Timeline
            </motion.h2>
            <motion.span
              animate={{ 
                rotate: timelineExpanded ? 180 : 0,
                backgroundImage: timelineExpanded 
                  ? 'linear-gradient(135deg, var(--accent), var(--accent))' 
                  : [
                      'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)',
                      'linear-gradient(135deg, #b794f6, #c9a9ff, #b794f6)',
                      'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)'
                    ],
                filter: timelineExpanded 
                  ? 'drop-shadow(0 0 8px rgba(138, 43, 226, 0.6))'
                  : ['drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))', 'drop-shadow(0 0 20px rgba(183, 148, 246, 1))', 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))']
              }}
              transition={{ 
                rotate: { duration: 0.3 },
                backgroundImage: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ 
                fontSize: '1.5rem',
                marginLeft: '1rem',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: timelineExpanded ? 'var(--accent)' : 'transparent',
                textShadow: '0 0 10px rgba(138, 43, 226, 0.8)'
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
                  onError={handleImageError}
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
                  onError={handleImageError}
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
                  onError={handleImageError}
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
              <motion.h2
                animate={{ 
                  backgroundImage: branchingExpanded 
                    ? 'linear-gradient(135deg, var(--ink), var(--ink))' 
                    : [
                        'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)',
                        'linear-gradient(135deg, #b794f6, #c9a9ff, #b794f6)',
                        'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)'
                      ],
                  textShadow: branchingExpanded 
                    ? '0 0 0px rgba(138, 43, 226, 0)' 
                    : ['0 0 10px rgba(138, 43, 226, 0.6)', '0 0 25px rgba(183, 148, 246, 1)', '0 0 10px rgba(138, 43, 226, 0.6)']
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ 
                  margin: 0,
                  marginBottom: '0.5rem',
                  position: 'relative',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: branchingExpanded ? 'var(--ink)' : 'transparent'
                }}
              >
                Branching Narrative Flow
              </motion.h2>
              <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
            Interactive story paths with multiple decision points and alternative routes. 
            Click on any node to explore the narrative structure.
          </p>
            </div>
            <motion.span
              animate={{ 
                rotate: branchingExpanded ? 180 : 0,
                backgroundImage: branchingExpanded 
                  ? 'linear-gradient(135deg, var(--accent), var(--accent))' 
                  : [
                      'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)',
                      'linear-gradient(135deg, #b794f6, #c9a9ff, #b794f6)',
                      'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)'
                    ],
                filter: branchingExpanded 
                  ? 'drop-shadow(0 0 8px rgba(138, 43, 226, 0.6))'
                  : ['drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))', 'drop-shadow(0 0 20px rgba(183, 148, 246, 1))', 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))']
              }}
              transition={{ 
                rotate: { duration: 0.3 },
                backgroundImage: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ 
                fontSize: '1.5rem',
                marginLeft: '1rem',
                flexShrink: 0,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: branchingExpanded ? 'var(--accent)' : 'transparent',
                textShadow: '0 0 10px rgba(138, 43, 226, 0.8)'
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
            I tested multiple AI video generation models through two main platforms: <strong>Higgsfield</strong> 
            (which provided access to Wan2.5, Veo3.1, Seedance, Kling, and several other models I didn't use, 
            plus Higgsfield's own model) and the <strong>official Sora website</strong> (accessed via VPN since 
            it's only available in the US). Each one taught me something different, and most of them 
            taught me what <em>doesn't</em> work. In the end, I used both <strong>Veo3.1</strong> and <strong>Sora 2</strong> 
            as they are, in my opinion, the best models available.
          </p>
        </motion.article>

        <ToolLessonCard
          title="Sora 2: The Face Problem That Killed My Workflow"
          videoUrl="/videos/sora2-example.mp4"
          videoType="mp4"
          delay={0.9}
        >
          <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
            <strong>Testing Period:</strong> Week 1 (Early October 2024)
          </p>
          
          <p>
            <strong>Summary:</strong> I chased Sora 2 for its cinematic polish, but the platform's strict ban on realistic faces made it unusable for a character-driven film that hinges on recognisable protagonists.
          </p>
          
          <p>
            I accessed Sora 2 through the official website using a VPN (US only). The marketing showed incredible cinematic quality, but Sora has strict content policies that completely prohibit realistic human faces and identifiable people. No realistic faces, identifiable characters, close ups, or any prompt implying recognizable human features. Every character shot was rejected before rendering.
          </p>
          
          <p>
            <strong>Technical Reality:</strong> Sora 2 uses a diffusion transformer architecture generating up to 60-second videos at 1080p. The quality is impressive for environments and objects, with better temporal consistency than most competitors.
          </p>
          
          <p>
            <strong>Workaround Attempts:</strong> Abstract corridor prompts devolved into glitchy blobs, back of head shots broke continuity, stylized silhouettes killed immersion. I wasted 15-20 hours and significant credits before realizing it fundamentally could not do what I needed.
          </p>
          
          <p>
            <strong>When Sora Actually Works:</strong> Despite the limitations, Sora excels at:
          </p>
          <p>
            <strong>Where it shines:</strong> Spacious establishing shots, abstract or surreal montages, object‑centric animations, nature plates, and any non-human subject can look gorgeous. If you never need to show a person, Sora 2 delivers.
          </p>
          
          <details className="technical-details">
            <summary>Technical details</summary>
            <p>
              Sora 2 generates up to 60-second clips at 1920×1080 and supports multiple aspect ratios. Renders averaged 2–5 minutes per clip and rely on a diffusion transformer pipeline tuned for cinematic motion.
            </p>
          </details>
          
          <p>
            <strong>What I Learned:</strong> Always read content policies before committing resources. For character driven narratives, Sora 2 is not viable. However, I kept it for environmental shots and non character sequences, recognizing its superior cinematic quality for those use cases.
          </p>
          
          <p>
            <strong>Key Lesson:</strong> This early failure taught me to build a multi tool hybrid workflow where each tool handles what it does best. I ultimately used Sora 2 alongside Veo3.1, leveraging Sora 2 for superior visual quality in scenes without faces, and Veo3.1 for character driven moments.
          </p>
        </ToolLessonCard>

        <ToolLessonCard
          title="Wan2.5: The Face Input Feature That Promised Everything, Delivered Nothing"
          videoUrl="/videos/wan25-example.mp4"
          videoType="mp4"
          delay={0.95}
        >
          <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
            <strong>Testing Period:</strong> Week 2 (Mid-October 2024)
          </p>
          
          <p>
            <strong>Summary:</strong> Wan2.5 looked like the perfect fix because it accepts reference faces, but inconsistent transfers and warped expressions meant I couldn't trust a single character shot.
          </p>
          
          <p>
            After Sora's face restrictions, I discovered Wan2.5 through Higgsfield. It lets you upload face reference images, which seemed perfect for character consistency.
          </p>
          
          <p>
            <strong>The Problem:</strong> Faces warped around the eyes and mouth, changed identity mid clip, morphed unpredictably during movement, and produced uncanny expressions. I spent $50-75 in credits across 10-12 hours of testing with zero usable character shots.
          </p>
          
          <details className="technical-details">
            <summary>Technical details</summary>
            <p>
              Wan2.5's face embedding workflow supports multi image references but has weak temporal stability. Renders averaged 2 to 4 minutes, with every iteration consuming additional credits.
            </p>
          </details>
          
          <p>
            <strong>What I Learned:</strong> Feature existence does not equal feature quality. The face input feature exists but is not production ready. I abandoned Wan2.5 entirely after extensive testing. 
            This failure taught me to prioritize actual output quality over advertised features. I decided 
            to explore Higgsfield's platform more broadly to access multiple models simultaneously and 
            compare results side-by-side.
          </p>
        </ToolLessonCard>

        <ToolLessonCard
          title="Higgsfield: The Unified Platform That Cost Me a Fortune"
          videoUrl="/videos/higgsfield-example.mp4"
          videoType="mp4"
          delay={1.0}
        >
          <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
            <strong>Testing Period:</strong> Week 3 (Late October 2024)
          </p>
          
          <p>
            <strong>Summary:</strong> Higgsfield promised efficiency by aggregating every major model in one interface, but the convenience tax on credits meant every experiment felt like lighting money on fire.
          </p>
          
          <p>
            Higgsfield aggregates access to multiple models (Veo3.1, Wan2.5, Seedance, Kling, and others) in one interface. The unified platform allows side-by-side model comparisons and batch workflows, but with a significant credit markup.
          </p>
          
          <p>
            <strong>The Financial Reality:</strong> I spent approximately $600-700 total. The financial pressure forced me to be more strategic with prompt engineering and model selection, but limited experimentation.</p>
          
          <details className="technical-details">
            <summary>Technical details</summary>
            <p>
              Higgsfield's interface layers a unified API over models like Veo3.1, Wan2.5, Seedance, Kling, and its own model. It includes simultaneous comparison runs, real-time credit telemetry, batch queues, and reusable workflow templates—features that otherwise require scripts.
            </p>
          </details>
          
          <p>
            <strong>What I Learned:</strong> Convenience has a price. Higgsfield saved time but cost significant money. The financial pressure improved my prompt engineering but limited experimentation. The unified interface was valuable for learning which models worked best for specific scenes.
          </p>
        </ToolLessonCard>

        <ToolLessonCard
          title="Veo3.1: The Tool That Actually Worked (After Everything Else Failed)"
          videoUrl="/videos/veo31-example.mp4"
          videoType="mp4"
          delay={1.05}
        >
          <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
            <strong>Testing Period:</strong> Week 4-5 (Early-Mid November 2024)
          </p>
          
          <p>
            <strong>Summary:</strong> After burning through novelty tools, Veo3.1 became my dependable workhorse because it balanced cinematic quality with the loose human realism my project needed.
          </p>
          
          <p>
            After testing Sora (face restrictions), Wan2.5 (poor quality), and other tools, Veo3.1 became my primary workhorse through Higgsfield. It was the only tool that could consistently produce usable character focused scenes.
          </p>
          
          <p>
            <strong>Technical Specs:</strong> Veo3.1 (Google) generates videos up to 60 seconds at 1080p with improved temporal consistency. It uses a diffusion based architecture with detailed prompt control.
          </p>
          
          <p>
            <strong>Strengths:</strong> Faces stayed mostly consistent, motion felt natural, detailed lighting directions rendered accurately, no hard bans on human subjects, and overall reliability beat everything else I tested.
          </p>
          
          <p>
            <strong>Workflow:</strong> Generate with hyper specific prompts, review for issues, adjust targeting flaws, render 2-3 variations, composite or grade the keeper. Iteration was predictable.
          </p>
          
          <p>
            <strong>Prompt Engineering Example:</strong> The key was extreme specificity. Bad: "Person walks down a dark corridor." Good: "Medium shot, eye level, person in dark clothing walks slowly through narrow industrial corridor, emergency amber lighting from overhead fixtures creates harsh shadows, server blue glow from side panels, cold metallic surfaces, shallow depth of field focusing on character, cinematic 2.35:1 aspect ratio, slow dolly movement following character."
          </p>
          
          <p>
            <strong>Limitations:</strong> Faces still drifted slightly between scenes, minimal control over expressions, complex camera moves added artifacts, multi character shots were fragile, close ups were risky.
          </p>
          
          <details className="technical-details">
            <summary>Technical details</summary>
            <p>
              Out of roughly 150 generations, about 30% were usable on the first try, 70% worked after two or three iterations, 10% were total failures, and only 5% needed no post work. Typical scenes cost 30–60 credits, required 15–30 minutes of prompt tuning, and another 10–20 minutes of grading/stabilisation.
            </p>
          </details>
          
          <p>
            <strong>What I Learned:</strong> Veo3.1 became my go to because I learned to work within its limitations. Iteration is part of the process. Building a systematic workflow around prompt refinement was essential. For character driven narratives, Veo3.1 is currently one of the best options available.
          </p>
          
          <p>
            <strong>Key Lesson:</strong> I ultimately used Veo3.1 alongside Sora 2, with Veo3.1 handling character scenes and Sora 2 providing superior quality for environmental and non character sequences. This hybrid workflow proved essential for completing the project.
          </p>
        </ToolLessonCard>

        <ToolLessonCard
          title="Seedance: The Specialized Environmental Tool"
          videoUrl="/videos/seedance-example.mp4"
          videoType="mp4"
          delay={1.1}
        >
          <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
            <strong>Testing Period:</strong> Week 5-6 (Mid-Late November 2024)
          </p>
          
          <p>
            <strong>Summary:</strong> Seedance became my specialist for mood heavy establishing shots because it delivered stylized lighting and camera work that Veo3.1 could not, even though it fell apart on characters.
          </p>
          
          <p>
            Accessed through Higgsfield. Generates videos up to 10 seconds at 1280x768. Excelled at moody wide shots and environmental plates. Character faces shifted wildly, making it unusable for character work.
          </p>
          
          <p>
            <strong>Use Case:</strong> Wide datacenter exteriors, atmospheric transitions, and background plates composited behind Veo3.1 character passes. Cost roughly 10 to 15 credits per clip through Higgsfield.
          </p>
        </ToolLessonCard>

        <ToolLessonCard
          title="Kling: The Abstract Effects Specialist"
          videoUrl="/videos/kling-example.mp4"
          videoType="mp4"
          delay={1.15}
        >
          <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
            <strong>Testing Period:</strong> Week 6-7 (Late November 2024)
          </p>
          
          <p>
            <strong>Summary:</strong> Kling became my go to for surreal cognitive scrambler sequences because it leaned into abstraction instead of fighting it, though it cannot handle realistic storytelling.
          </p>
          
          <p>
            Accessed through Higgsfield. Generates videos up to 10 seconds at 1080p (fixed aspect ratio). Excels at distorted glitch effects, dreamlike imagery, and abstract visuals. Cannot maintain continuity or realism.
          </p>
          
          <p>
            <strong>Use Case:</strong> Cognitive scrambler effects when players made wrong choices, creating disorienting abstract sequences that visualized mental disruption. Cost roughly 8 to 12 credits per clip.
          </p>
          
          <p>
            <strong>Hybrid Workflow:</strong> Veo3.1 for character scenes, Sora 2 for environmental shots, Kling for abstract effects, Seedance for specialized environmental plates. No single tool solved all problems.</p>
          
          <p>
            This hybrid approach was more work, but it was the only way to achieve the results 
            I needed. The lesson: in the current state of AI video generation, specialization 
            beats trying to find one tool that does everything.
          </p>
          
          <p>
            <strong>The Pivot Decision:</strong> After establishing my primary tools (Veo3.1 for characters, 
            Sora 2 for environmental quality, Seedance for stylized environments), I encountered a specific 
            narrative need: the "cognitive scrambler" effect for wrong choices in the branching narrative. 
            I tested Kling specifically for this abstract, disorienting effect and immediately recognized 
            that its weakness (inability to maintain realism) was actually a strength for this use case. 
            I decided to integrate Kling as a specialized tool for abstract sequences where surreal, glitchy, 
            disorienting visuals were the goal. This decision completed my hybrid workflow toolkit.
          </p>
          
          <p>
            <strong>Iteration notes:</strong> The Kling phase represented the final piece of my hybrid workflow 
            puzzle. By this point, I had learned to evaluate tools based on specialized use cases rather than 
            general capability. Kling's ~70% success rate for abstract content (versus much lower for realistic 
            scenes) confirmed my approach: match tools to specific needs rather than forcing versatility. The 
            testing process was faster and more efficient because I already had a clear methodology: test 
            systematically, document results, identify strengths/weaknesses, and assign specialized roles. 
            Kling's lower cost (8-12 credits) and fast renders (2-3 minutes) made it perfect for the brief 
            abstract sequences I needed. This final phase validated the entire hybrid approach—no single tool 
            was perfect, but a specialized toolkit could handle every requirement.
          </p>
          
          <p>
            <strong>Key lessons:</strong> Kling is the stylistic spice, not the main course. Use it when you want the audience to feel disoriented or when realism would actually undermine the scene.
          </p>
        </ToolLessonCard>

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
            I tried multiple models through two platforms: Higgsfield (which provided access to Wan2.5, 
            Veo3.1, Seedance, Kling, and several others, plus Higgsfield's own model) and the official 
            Sora website (accessed via VPN since it's only available in the US). Most of them failed 
            me in different ways. Sora 2 wouldn't let me use faces—a major problem when you need a 
            protagonist. Wan2.5 let me input face images, but the results were terrible. I paid for 
            Higgsfield because it had all the models in one place, but it cost a fortune in credits. 
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
            <strong>What actually worked:</strong> After all the failures, I settled on <strong>Veo3.1</strong> 
            (accessed through Higgsfield) and <strong>Sora 2</strong> (accessed via VPN on the official website) 
            as my primary tools—in my opinion, they are the best models available. Veo3.1 handled character 
            scenes, while Sora 2 provided superior quality for environmental shots, establishing scenes, and 
            non-character sequences. I also used Kling (through Higgsfield) for abstract effects. I built a 
            hybrid workflow combining AI generation with traditional post-production. It wasn't elegant, but 
            it was the only way to get usable results.
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