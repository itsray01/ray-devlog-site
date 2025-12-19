import { motion } from 'framer-motion';
import { Brain, Scale, Gamepad2, Film, GraduationCap, Bot, Feather, Book } from 'lucide-react';
import ReadingProgress from '../components/ReadingProgress';
import TableOfContents from '../components/TableOfContents';
import { pageVariants, pageTransition } from '../constants/animations';

// Table of Contents sections - grouped by category
const TOC_SECTIONS = [
  { id: 'research-framework', title: 'Research Framework' },
  { id: 'ai-ethics', title: 'AI & Ethics' },
  { id: 'interactive-media', title: 'Interactive Media Theory' },
  { id: 'influences', title: 'Influences' },
  { id: 'course-connection', title: 'Course Connection' }
];

/**
 * Theories - Dedicated page for theoretical frameworks and academic foundations
 * Comprehensive documentation of theories, citations, and their application to the project
 */
const Theories = () => {
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="page-container"
        id="theories"
        role="main"
        aria-label="Main content"
      >
        <div id="main-content"></div>

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

        {/* Table of Contents */}
        <TableOfContents sections={TOC_SECTIONS} />

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
          </p>
        </motion.article>

        {/* Research Framework Section */}
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
            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Robin Nelson (2013)</h3>
                <p className="citation"><em>Practice as Research in the Arts</em></p>
                <blockquote>
                  "Know-how" through practice (p. 37) — Creative work generates unique knowledge. 
                  My AI video testing documented in "My Journey" exemplifies this: each failure 
                  revealed technical limitations and workflow insights unavailable through theory alone.
                </blockquote>
              </div>
            </div>

            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Donald Schön (1983)</h3>
                <p className="citation"><em>The Reflective Practitioner</em></p>
                <blockquote>
                  "Reflection-in-action" (p. 54) — Thinking while doing. My iterative prompt 
                  engineering emerged through real-time adjustments, not predetermined planning.
                </blockquote>
              </div>
            </div>

            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Barrett & Bolt (2010)</h3>
                <p className="citation"><em>Practice as Research: Creative Arts Enquiry</em></p>
                <blockquote>
                  Practice produces "different kinds of knowledge" (p. 1) than traditional research. 
                  Hands-on AI experimentation revealed constraints that shaped creative outcomes.
                </blockquote>
              </div>
            </div>
          </div>
        </motion.article>

        {/* AI & Ethics Section */}
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

            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Nick Bostrom (2014)</h3>
                <p className="citation"><em>Superintelligence: Paths, Dangers, Strategies</em></p>
                <blockquote>
                  The "control problem" (p. 127) — AI systems may develop values misaligned with 
                  humanity. My branching narrative forces viewers to experience this viscerally: 
                  wrong choices trigger the cognitive scrambler, literalizing loss of autonomy.
                </blockquote>
              </div>
            </div>

            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Kate Crawford (2021)</h3>
                <p className="citation"><em>Atlas of AI: Power, Politics, and Planetary Costs</em></p>
                <blockquote>
                  AI is "deeply material, political, and shaped by power structures" (p. 8). 
                  My use of Sora 2 and Veo3.1—trained without creator consent—demonstrates how 
                  AI tools embed particular values and constraints, not neutral instruments.
                </blockquote>
              </div>
            </div>

            <h3 className="subsection-title">
              <Feather className="subsection-icon" /> Authorship & AI-Assisted Creation
            </h3>

            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Roland Barthes (1977)</h3>
                <p className="citation">"The Death of the Author" in <em>Image-Music-Text</em></p>
                <blockquote>
                  Meaning resides with the audience, not creator (p. 148). AI-assisted creation 
                  distributes authorship across human prompter, algorithmic model, and training data.
                </blockquote>
              </div>
            </div>

            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Lev Manovich (2018)</h3>
                <p className="citation"><em>AI Aesthetics</em></p>
                <blockquote>
                  AI creates "possibility spaces" (p. 12) — algorithmic constraints become creative 
                  parameters. My hybrid workflow emerged from Veo3.1's consistency vs. Sora 2's 
                  cinematic quality, showing how tool limitations shape aesthetics.
                </blockquote>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Interactive Media Theory Section */}
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

            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Bernard Perron (2012)</h3>
                <p className="citation"><em>The World of Scary Video Games</em></p>
                <blockquote>
                  "Gameplay emotions" and "anticipatory fear" (p. 26) — Fear from agency and 
                  consequence, not just visuals. The cognitive scrambler creates dread through 
                  player complicity, making viewers architects of their own terror.
                </blockquote>
              </div>
            </div>

            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Ewan Kirkland (2009)</h3>
                <p className="citation">"Horror Videogames and the Uncanny"</p>
                <blockquote>
                  "The familiar becomes strange when control is compromised" (p. 4). When "wrong" 
                  choices trigger disorientation, interactive agency becomes uncanny—the medium's 
                  promise turned threatening.
                </blockquote>
              </div>
            </div>

            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Tanya Krzywinska (2002)</h3>
                <p className="citation">"Hands-On Horror" in <em>ScreenPlay</em></p>
                <blockquote>
                  "Embodied experience of navigating threatening spaces" (p. 207). My AI-generated 
                  maze with timed decisions tests whether horror translates through narrative choices 
                  rather than direct avatar control.
                </blockquote>
              </div>
            </div>

            <h3 className="subsection-title">Interactive Storytelling</h3>

            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Janet Murray (1997)</h3>
                <p className="citation"><em>Hamlet on the Holodeck</em></p>
                <blockquote>
                  Agency as "meaningful action with visible results" (p. 126). Strategic convergence 
                  points manage narrative complexity while maintaining player agency.
                </blockquote>
              </div>
            </div>

            <div className="author-card">
              <Book className="author-icon" />
              <div>
                <h3>Espen Aarseth (1997)</h3>
                <p className="citation"><em>Cybertext: Ergodic Literature</em></p>
                <blockquote>
                  Texts requiring "nontrivial effort" to traverse (p. 1). The maze structure and 
                  cognitive scrambler force viewers through textual labyrinths.
                </blockquote>
              </div>
            </div>
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
    </>
  );
};

export default Theories;
