import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Scale, Gamepad2, Film, GraduationCap, Bot, Feather, Book, ArrowUp } from 'lucide-react';
import ReadingProgress from '../components/ReadingProgress';
import { pageVariants, pageTransition } from '../constants/animations';
import { useNavigation } from '../context/NavigationContext';
import { TheoryConnections, TheoriesHud, SfxProvider } from '../components/theories';
import { getConnectionsByLibraryId } from '../data/theoryConnections';
import '../styles/theories.css';

// Table of Contents sections - grouped by category
export const THEORIES_SECTIONS = [
  { id: 'connections', title: 'Theory-to-Clip Connections' },
  { id: 'research-framework', title: 'Research Framework' },
  { id: 'ai-ethics', title: 'AI & Ethics' },
  { id: 'interactive-media', title: 'Interactive Media Theory' },
  { id: 'influences', title: 'Influences' },
  { id: 'course-connection', title: 'Course Connection' }
];

/**
 * LibraryReferencedBy - Shows chips of connections that reference this library entry
 */
const LibraryReferencedBy = ({ libraryId }) => {
  const connections = getConnectionsByLibraryId(libraryId);
  
  if (connections.length === 0) return null;

  const scrollToConnection = (e, connectionId) => {
    e.preventDefault();
    const element = document.getElementById(connectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add highlight effect
      element.style.boxShadow = '0 0 0 2px var(--accent)';
      setTimeout(() => {
        element.style.boxShadow = '';
      }, 2000);
    }
  };

  return (
    <div className="library__referenced-by">
      <span className="library__referenced-label">Referenced by:</span>
      {connections.map(conn => (
        <a
          key={conn.id}
          href={`#${conn.id}`}
          className="library__ref-chip"
          onClick={(e) => scrollToConnection(e, conn.id)}
        >
          <ArrowUp size={10} />
          {conn.theoryTitle}
        </a>
      ))}
    </div>
  );
};

/**
 * AuthorCard - Library entry with stable anchor ID and Referenced By chips
 */
const AuthorCard = ({ libraryId, author, year, citation, quote, children }) => (
  <div className="author-card" id={libraryId}>
    <Book className="author-icon" />
    <div>
      <h3>{author} ({year})</h3>
      <p className="citation"><em>{citation}</em></p>
      <blockquote>{quote || children}</blockquote>
      <LibraryReferencedBy libraryId={libraryId} />
    </div>
  </div>
);

/**
 * Theories - Dedicated page for theoretical frameworks and academic foundations
 * Comprehensive documentation of theories, citations, and their application to the project
 * 
 * UPGRADED: Now includes explicit Theory-to-Clip Connections section
 */
const Theories = () => {
  const { setSections } = useNavigation();

  // Register sections with navigation context
  useEffect(() => {
    setSections(THEORIES_SECTIONS);
    return () => setSections([]);
  }, [setSections]);

  return (
    <SfxProvider>
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="theories__page-container page-container"
        id="theories"
        role="main"
        aria-label="Theories page content"
      >
        <div id="main-content"></div>

        {/* HUD Strip */}
        <TheoriesHud />

        {/* Page Header */}
        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Theoretical Foundations</h1>
          <p className="page-subtitle">
            Academic frameworks and research methodologies informing this project
          </p>
        </motion.header>

        {/* Introduction Card */}
        <motion.article
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Overview</h2>
          <p>
            This project integrates multiple theoretical frameworks—from Practice as Research to AI ethics 
            and interactive horror—demonstrating how academic theory informs creative practice. 
            The <strong>Theory-to-Clip Connections</strong> section below makes these links explicit, 
            showing exactly how each theory shaped specific creative decisions.
          </p>
        </motion.article>

        {/* NEW: Theory-to-Clip Connections Section */}
        <motion.section
          id="connections"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <TheoryConnections />
        </motion.section>

        {/* Research Framework Section (Library) */}
        <motion.article
          className="card theory-card gradient-research"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="theory-header" id="research-framework">
            <Brain className="theory-icon" />
            <h2>Research Methodology: Practice as Research</h2>
          </div>

          <div className="theory-content">
            <AuthorCard
              libraryId="library-nelson-par"
              author="Robin Nelson"
              year="2013"
              citation="Practice as Research in the Arts"
              quote={`"Know-how" through practice (p. 37) — Creative work generates unique knowledge. 
                My AI video testing documented in "My Journey" exemplifies this: each failure 
                revealed technical limitations and workflow insights unavailable through theory alone.`}
            />

            <AuthorCard
              libraryId="library-schon-reflective"
              author="Donald Schön"
              year="1983"
              citation="The Reflective Practitioner"
              quote={`"Reflection-in-action" (p. 54) — Thinking while doing. My iterative prompt 
                engineering emerged through real-time adjustments, not predetermined planning.`}
            />

            <AuthorCard
              libraryId="library-barrett-bolt"
              author="Barrett & Bolt"
              year="2010"
              citation="Practice as Research: Creative Arts Enquiry"
              quote={`Practice produces "different kinds of knowledge" (p. 1) than traditional research. 
                Hands-on AI experimentation revealed constraints that shaped creative outcomes.`}
            />
          </div>
        </motion.article>

        {/* AI & Ethics Section (Library) */}
        <motion.article
          className="card theory-card gradient-ai"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="theory-header" id="ai-ethics">
            <Bot className="theory-icon" />
            <h2>AI & Ethics</h2>
          </div>

          <div className="theory-content">
            <h3 className="subsection-title">
              <Scale className="subsection-icon" /> AI Ethics & Philosophy
            </h3>

            <AuthorCard
              libraryId="library-bostrom-superintelligence"
              author="Nick Bostrom"
              year="2014"
              citation="Superintelligence: Paths, Dangers, Strategies"
              quote={`The "control problem" (p. 127) — AI systems may develop values misaligned with 
                humanity. My branching narrative forces viewers to experience this viscerally: 
                wrong choices trigger the cognitive scrambler, literalizing loss of autonomy.`}
            />

            <AuthorCard
              libraryId="library-crawford-atlas"
              author="Kate Crawford"
              year="2021"
              citation="Atlas of AI: Power, Politics, and Planetary Costs"
              quote={`AI is "deeply material, political, and shaped by power structures" (p. 8). 
                My use of Sora 2 and Veo3.1—trained without creator consent—demonstrates how 
                AI tools embed particular values and constraints, not neutral instruments.`}
            />

            <h3 className="subsection-title">
              <Feather className="subsection-icon" /> Authorship & AI-Assisted Creation
            </h3>

            <AuthorCard
              libraryId="library-barthes-author"
              author="Roland Barthes"
              year="1977"
              citation='"The Death of the Author" in Image-Music-Text'
              quote={`Meaning resides with the audience, not creator (p. 148). AI-assisted creation 
                distributes authorship across human prompter, algorithmic model, and training data.`}
            />

            <AuthorCard
              libraryId="library-manovich-aesthetics"
              author="Lev Manovich"
              year="2018"
              citation="AI Aesthetics"
              quote={`AI creates "possibility spaces" (p. 12) — algorithmic constraints become creative 
                parameters. My hybrid workflow emerged from Veo3.1's consistency vs. Sora 2's 
                cinematic quality, showing how tool limitations shape aesthetics.`}
            />
          </div>
        </motion.article>

        {/* Interactive Media Theory Section (Library) */}
        <motion.article
          className="card theory-card gradient-interactive"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="theory-header" id="interactive-media">
            <Gamepad2 className="theory-icon" />
            <h2>Interactive Media Theory</h2>
          </div>

          <div className="theory-content">
            <h3 className="subsection-title">Horror in Interactive Media</h3>

            <AuthorCard
              libraryId="library-perron-horror"
              author="Bernard Perron"
              year="2012"
              citation="The World of Scary Video Games"
              quote={`"Gameplay emotions" and "anticipatory fear" (p. 26) — Fear from agency and 
                consequence, not just visuals. The cognitive scrambler creates dread through 
                player complicity, making viewers architects of their own terror.`}
            />

            <AuthorCard
              libraryId="library-kirkland-uncanny"
              author="Ewan Kirkland"
              year="2009"
              citation="Horror Videogames and the Uncanny"
              quote={`"The familiar becomes strange when control is compromised" (p. 4). When "wrong" 
                choices trigger disorientation, interactive agency becomes uncanny—the medium's 
                promise turned threatening.`}
            />

            <AuthorCard
              libraryId="library-krzywinska-horror"
              author="Tanya Krzywinska"
              year="2002"
              citation='"Hands-On Horror" in ScreenPlay'
              quote={`"Embodied experience of navigating threatening spaces" (p. 207). My AI-generated 
                maze with timed decisions tests whether horror translates through narrative choices 
                rather than direct avatar control.`}
            />

            <h3 className="subsection-title">Interactive Storytelling</h3>

            <AuthorCard
              libraryId="library-murray-holodeck"
              author="Janet Murray"
              year="1997"
              citation="Hamlet on the Holodeck"
              quote={`Agency as "meaningful action with visible results" (p. 126). Strategic convergence 
                points manage narrative complexity while maintaining player agency.`}
            />

            <AuthorCard
              libraryId="library-aarseth-cybertext"
              author="Espen Aarseth"
              year="1997"
              citation="Cybertext: Ergodic Literature"
              quote={`Texts requiring "nontrivial effort" to traverse (p. 1). The maze structure and 
                cognitive scrambler force viewers through textual labyrinths.`}
            />

            <AuthorCard
              libraryId="library-baudrillard-simulacra"
              author="Jean Baudrillard"
              year="1981"
              citation="Simulacra and Simulation"
              quote={`"The simulacrum is never that which conceals the truth—it is the truth which 
                conceals that there is none." AI-generated spaces have no 'original'—pure simulation.`}
            />
          </div>
        </motion.article>

        {/* Influences Section */}
        <motion.article
          className="card theory-card gradient-influences"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="theory-header" id="influences">
            <Film className="theory-icon" />
            <h2>Film & Media Influences</h2>
          </div>

          <div className="theory-content">
            <div className="influence-card">
              <h3>Blade Runner (1982)</h3>
              <p><strong>Dir. Ridley Scott</strong></p>
              <p>Neon-noir aesthetic, industrial decay, rain-soaked reflections informed the visual language.</p>
            </div>

            <div className="influence-card">
              <h3>Black Mirror: Bandersnatch (2018)</h3>
              <p><strong>Netflix</strong></p>
              <p>Branching narrative format and meta-commentary on choice/control informed interactive structure.</p>
            </div>
          </div>
        </motion.article>

        {/* Course Connection Section */}
        <motion.article
          className="card theory-card gradient-course"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="theory-header" id="course-connection">
            <GraduationCap className="theory-icon" />
            <h2>Connection to Course Objectives</h2>
          </div>

          <div className="theory-content">
            <div className="objective-grid">
              <div className="objective-card">
                <h3>Theoretical Application</h3>
                <p>Applied interactive storytelling and AI ethics concepts to practical design decisions.</p>
              </div>

              <div className="objective-card">
                <h3>Interdisciplinary Research</h3>
                <p>Drew from film, games, philosophy, and computer science to inform a cohesive project.</p>
              </div>

              <div className="objective-card">
                <h3>Critical Analysis</h3>
                <p>Evaluated reference works as case studies in narrative design and AI ethics.</p>
              </div>

              <div className="objective-card">
                <h3>Contemporary Relevance</h3>
                <p>Engaged with current debates in AI ethics and emerging production practices.</p>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <p>
            These theoretical frameworks provide the academic foundation for creative and technical decisions.
          </p>
        </motion.footer>
      </motion.div>
    </SfxProvider>
  );
};

export default Theories;
