import { useMemo } from 'react';
import { motion } from 'framer-motion';
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

      {/* Timeline Section */}
      <motion.section
        id="timeline"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <Timeline entries={timelineData} />
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

      {/* Branching Narrative Section */}
      <motion.section
        id="branching"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
      >
        <div className="card">
          <h2>Branching Narrative Flow</h2>
          <p>
            Interactive story paths with multiple decision points and alternative routes. 
            Click on any node to explore the narrative structure.
          </p>
          <StoryTimeline />
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
          <h3>Sora 2: The Face Problem</h3>
          <p>
            I was excited to try Sora 2—it's OpenAI's latest, and the quality looked incredible 
            in demos. But here's what they don't tell you upfront: <strong>Sora doesn't let you 
            use faces or realistic human prompts</strong>. At all.
          </p>
          
          <p>
            This was a major setback. My story needed a protagonist, and I couldn't generate 
            realistic human characters with Sora. I spent hours trying to work around this—using 
            abstract descriptions, focusing on environments, trying to imply presence without 
            showing faces. None of it worked for what I needed.
          </p>
          
          <p>
            <strong>What I learned:</strong> Always read the fine print before committing to a 
            tool. What looks amazing in marketing materials might have restrictions that kill your 
            use case. I had to pivot away from Sora for character work entirely, which meant 
            wasted time and a lesson in doing proper research upfront.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
        >
          <h3>Wan2.5: The Face Input That Didn't Deliver</h3>
          <p>
            After the Sora disappointment, I found Wan2.5, which actually <strong>lets you input 
            face images</strong>. Finally! I thought this would solve my character consistency 
            problem. I uploaded reference photos, carefully crafted prompts, and waited for 
            magic to happen.
          </p>
          
          <p>
            The results? <strong>Not that good</strong>. The faces looked distorted, the 
            temporal consistency was poor, and the character would morph between frames in 
            ways that broke immersion completely. I tried different reference images, adjusted 
            prompts, experimented with settings—nothing worked well enough for production use.
          </p>
          
          <p>
            <strong>What I learned:</strong> Just because a feature exists doesn't mean it works 
            well. Having face input capability is different from having <em>good</em> face input 
            capability. This was another dead end that cost me time and credits. Sometimes the 
            tool that promises what you need isn't the tool that delivers it.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3>Higgsfield: The Expensive Solution</h3>
          <p>
            I eventually found Higgsfield, which has access to all the major models (Veo3.1, 
            Sora, Runway, etc.) in one platform. This seemed perfect—I could test different 
            models without switching platforms, compare outputs side-by-side, and find what 
            worked best for each scene.
          </p>
          
          <p>
            But here's the catch: <strong>it costs a lot of credits</strong>. Like, a lot. 
            I paid for it because I needed the flexibility, but watching my credit balance 
            drain with each generation was stressful. Every failed attempt felt expensive. 
            Every regeneration hurt. I became hyper-focused on getting prompts right the 
            first time, which actually improved my prompt engineering skills, but the financial 
            pressure was real.
          </p>
          
          <p>
            <strong>What I learned:</strong> Convenience comes at a cost. Having all models in 
            one place was valuable, but I had to be much more strategic about when and how I 
            used it. This forced me to develop better workflows and be more intentional about 
            my experiments. Sometimes constraints (even financial ones) force you to work 
            smarter, not just harder.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
        >
          <h3>Veo3.1: My Go-To (After Many Failures)</h3>
          <p>
            After all the experimentation, Veo3.1 became my primary tool. It wasn't perfect—I 
            still had consistency issues, and some generations required multiple attempts—but it 
            was the most reliable for character-focused scenes. The temporal coherence was better 
            than most alternatives, and it handled the complex lighting scenarios (emergency 
            amber, server blue) relatively well when I gave it extremely detailed prompts.
          </p>
          
          <p>
            The key was learning to work within its limitations rather than fighting them. I 
            stopped trying to get perfect results on the first try and built a workflow around 
            iteration. I'd generate, evaluate, refine the prompt, and regenerate. Sometimes 
            three or four times. This wasn't efficient, but it was what worked.
          </p>
          
          <p>
            <strong>What I learned:</strong> Sometimes the "best" tool isn't the one with the 
            most features—it's the one you can actually make work consistently. Veo3.1 became 
            my go-to not because it was perfect, but because I learned how to work with its 
            quirks and limitations.
          </p>
        </motion.article>

        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h3>RunwayML and Kling: The Supporting Cast</h3>
          <p>
            RunwayML was useful for certain types of shots, but I found it inconsistent for 
            maintaining character continuity. Kling worked well for abstract sequences and 
            effects (like the cognitive scrambler moments), but I couldn't rely on it for 
            narrative continuity.
          </p>
          
          <p>
            I ended up using a hybrid approach: Veo3.1 for character scenes, Kling for abstract 
            effects, and RunwayML for specific environmental shots where I needed particular 
            aesthetics. This multi-tool workflow was more complex, but it was the only way to 
            get the results I needed.
          </p>
          
          <p>
            <strong>What I learned:</strong> No single tool solved all my problems. I had to 
            become comfortable switching between platforms, managing different prompt styles, 
            and accepting that my workflow would be messy. The "perfect" solution doesn't exist 
            in AI video generation yet—you have to build your own toolkit.
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

        {/* Milestone 6: Technical Implementation */}
        <motion.article 
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3>Milestone 6: Digital Logbook Development</h3>
          <small className="meta">November 2025 - January 2026</small>
          
          <p><strong>What I did:</strong> Developed this React-based digital logbook to document the project 
          development process. Created an interactive interface with filtering, timeline visualization, and 
          structured content sections for inspiration, moodboards, storyboards, and development reflections.</p>
          
          <p><strong>Key Decision:</strong> Built a custom React application rather than using a static 
          site generator, allowing for dynamic content loading, interactive timelines, and responsive design. 
          This technical choice supports course objectives on digital media production and web development skills.</p>
          
          <p><strong>Challenge:</strong> Balancing documentation needs with development time. Initially, the 
          logbook became a distraction from the main project. Additionally, organizing diverse content types 
          (text, images, timelines, story nodes) required careful information architecture.</p>
          
          <p><strong>Solution:</strong> Established a clear content structure with dedicated sections for 
          different documentation types. Implemented a sidebar navigation system for easy access. Used 
          component-based architecture to make content updates efficient. This approach demonstrates 
          information design principles and the importance of documentation in creative projects.</p>
          
          <p><strong>Reflection:</strong> The logbook development process itself became a valuable learning 
          experience in React development, state management, and user interface design. It also reinforced 
          the importance of documentation in creative work—capturing decisions, challenges, and reflections 
          as they occur rather than reconstructing them later. This connects to course objectives on 
          reflective practice and professional documentation standards.</p>
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