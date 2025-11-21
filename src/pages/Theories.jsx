import { motion } from 'framer-motion';
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
            Academic frameworks, theoretical concepts, and research methodologies that inform this project
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
          <h2>References & Theoretical Foundations</h2>
          <p>
            This project draws from multiple sources across film, literature, games, and academic
            research. This section documents key references and their connections to project decisions,
            demonstrating how theoretical frameworks informed practical development choices.
          </p>
        </motion.article>

        {/* Research Framework Section */}
        <motion.article
          id="research-framework"
          className="card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2>Research Methodology: Practice as Research</h2>

          <h3>Robin Nelson - <em>Practice as Research in the Arts: Principles, Protocols, Pedagogies, Resistances</em> (2013)</h3>
          <p>
            This project employs Practice as Research (PaR) methodology, where creative practice itself 
            generates knowledge. Nelson's framework of "know-how" (tacit knowledge gained through practice, 
            p. 37) directly applies to my experimentation with AI video generation tools documented in "My Journey."
          </p>
          <p>
            <strong>Application:</strong> Each tool test, failed generation, and workflow iteration produced 
            insights that couldn't be gained through secondary research alone. The systematic documentation 
            of Sora 2's inconsistencies, Veo3.1's character reliability, and other models' limitations 
            represents emergent knowledge from sustained creative practice.
          </p>

          <h3>Donald Schön - <em>The Reflective Practitioner: How Professionals Think in Action</em> (1983)</h3>
          <p>
            Schön's concept of "reflection-in-action" (p. 54) describes how practitioners think while doing, 
            making real-time adjustments based on emerging results. My iterative testing process—where each AI 
            generation informed immediate decisions about prompt engineering and workflow adaptation—exemplifies 
            this reflective practice.
          </p>
          <p>
            <strong>Application:</strong> The development of systematic prompt templates for Veo3.1 and the 
            hybrid workflow combining multiple models emerged through reflective experimentation, not 
            predetermined planning.
          </p>

          <h3>Estelle Barrett & Barbara Bolt - <em>Practice as Research: Approaches to Creative Arts Enquiry</em> (2010)</h3>
          <p>
            Barrett and Bolt argue that practice-led research produces "different kinds of knowledge" than 
            traditional academic research (p. 1). This project demonstrates how hands-on engagement with emerging 
            AI tools reveals technical limitations, workflow optimizations, and creative possibilities 
            unavailable through theoretical analysis alone.
          </p>
        </motion.article>

        {/* AI & Ethics Section */}
        <motion.article
          id="ai-ethics"
          className="card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2>AI & Ethics</h2>

          <h3>AI Ethics & Philosophy</h3>

          <h4>Nick Bostrom - <em>Superintelligence: Paths, Dangers, Strategies</em> (2014)</h4>
          <p>
            Bostrom's "control problem"—how to ensure AI systems remain aligned with human 
            values—directly parallels the narrative's central conflict. He argues that "the 
            default outcome of an intelligence explosion is a Singleton with values that 
            are substantially different from human values" (p. 127), highlighting the existential 
            risk of misaligned AI systems.
          </p>
          <p>
            <strong>Application:</strong> The branching narrative forces viewers to experience 
            the control problem viscerally. Wrong choices trigger the cognitive scrambler, 
            literalizing the loss of autonomy Bostrom warns about when human decision-making 
            becomes subordinate to algorithmic control.
          </p>

          <h4>Kate Crawford - <em>Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence</em> (2021)</h4>
          <p>
            Crawford argues that "AI is neither artificial nor intelligent" but rather "deeply 
            material, political, and shaped by power structures" (p. 8). Her critique of AI's 
            opacity and the extractive labor behind training datasets directly applies to my 
            use of Sora 2 and Veo3.1—tools trained on vast corpora without creator consent.
          </p>
          <p>
            <strong>Application:</strong> The "My Journey" documentation reveals how these tools' 
            limitations and biases shaped creative decisions, demonstrating Crawford's argument 
            that AI tools are not neutral instruments but systems embedded with particular values 
            and constraints.
          </p>

          <h3>Authorship & AI-Assisted Creation</h3>

          <h4>Roland Barthes - "The Death of the Author" in <em>Image-Music-Text</em> (1977)</h4>
          <p>
            Barthes argues that "the birth of the reader must be at the cost of the death of 
            the Author" (p. 148), asserting that meaning resides with the audience rather than 
            creator intention. This concept takes on new dimensions with AI-assisted creation—when 
            Sora 2 generates unexpected imagery, authorship becomes distributed across human 
            prompter, algorithmic model, and training dataset.
          </p>

          <h4>Lev Manovich - <em>AI Aesthetics</em> (2018)</h4>
          <p>
            Manovich examines how "AI changes the nature of media authorship" (p. 12) by 
            reshaping creative practice through algorithmic affordances and constraints. Each 
            AI model offers distinct creative parameters—what Manovich terms "possibility spaces."
          </p>
          <p>
            <strong>Application:</strong> My systematic testing of 5 different models demonstrates 
            this concept: Veo3.1's character consistency versus Sora 2's cinematic quality forced 
            a hybrid workflow, illustrating how tool constraints become creative parameters that 
            shape aesthetic outcomes.
          </p>
        </motion.article>

        {/* Interactive Media Theory Section */}
        <motion.article
          id="interactive-media"
          className="card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2>Interactive Media Theory</h2>

          <h3>Horror in Interactive Media</h3>

          <h4>Bernard Perron - <em>The World of Scary Video Games: A Study in Videoludic Horror</em> (2012)</h4>
          <p>
            Perron establishes that interactive horror operates through "gameplay emotions"—fear 
            generated not just by audiovisual stimuli but by "player agency, uncertainty, and the 
            threat of failure" (p. 26). He identifies anticipatory fear as central to interactive 
            horror, where dread stems from knowing consequences await player mistakes.
          </p>
          <p>
            <strong>Application:</strong> The cognitive scrambler mechanic that punishes wrong 
            choices and loops players back creates Perron's "anticipatory fear." Unlike passive 
            horror films, the interactive structure makes viewers complicit in their own terror, 
            heightening psychological impact through agency and consequence.
          </p>

          <h4>Ewan Kirkland - "Horror Videogames and the Uncanny" in <em>DiGRA 2009 Conference Proceedings</em></h4>
          <p>
            Kirkland applies Freud's concept of the uncanny to interactive horror, arguing that 
            "the familiar becomes strange when control is compromised" (p. 4). Player agency—the 
            defining promise of interactive media—becomes a source of horror when subverted or 
            restricted.
          </p>
          <p>
            <strong>Application:</strong> The branching narrative's cognitive scrambler literalizes 
            this loss of control. When "wrong" choices trigger disorientation and forced loops, 
            the interactive medium's promise of agency becomes uncanny—familiar mechanics turned 
            threatening, similar to Black Mirror: Bandersnatch's meta-commentary on constrained choice.
          </p>

          <h4>Tanya Krzywinska - "Hands-On Horror" in <em>ScreenPlay: Cinema/videogames/interfaces</em> (2002)</h4>
          <p>
            Krzywinska coins the term "hands-on horror" to describe how interactive media creates 
            "embodied experience of navigating threatening spaces" (p. 207). She argues that horror 
            in interactive contexts draws power from spatial navigation and environmental threat.
          </p>
          <p>
            <strong>Application:</strong> This project tests whether horror's affective power 
            translates when player agency is mediated through narrative choices rather than direct 
            avatar control. The AI-generated maze environment with timed decisions creates spatial 
            threat within a cinematic presentation—a hybrid form at the intersection of film horror 
            and interactive horror.
          </p>

          <h3>Interactive Storytelling Theory</h3>

          <h4>Janet Murray - <em>Hamlet on the Holodeck: The Future of Narrative in Cyberspace</em> (1997)</h4>
          <p>
            Murray's concepts of agency, immersion, and transformation directly informed the narrative
            structure. She defines agency as "the satisfying power to take meaningful action and see 
            the results of our decisions and choices" (p. 126). The decision to use strategic convergence 
            points reflects Murray's discussion of managing complexity in interactive narratives while 
            maintaining player agency.
          </p>

          <h4>Espen Aarseth - <em>Cybertext: Perspectives on Ergodic Literature</em> (1997)</h4>
          <p>
            Aarseth's work on ergodic literature—texts that require "nontrivial effort" to traverse 
            (p. 1)—informed the design of the maze structure and looping mechanics. The cognitive 
            scrambler effect connects to Aarseth's discussion of how interactive texts can resist easy 
            navigation, forcing readers to work through textual labyrinths.
          </p>
        </motion.article>

        {/* Influences Section */}
        <motion.article
          id="influences"
          className="card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2>Film & Media References</h2>

          <h3>Blade Runner (1982) - Dir. Ridley Scott</h3>
          <p>
            <strong>Visual Influence:</strong> The neon-noir aesthetic, industrial decay, and
            rain-soaked reflections directly informed the moodboard and visual language.
          </p>

          <h3>Black Mirror: Bandersnatch (2018) - Netflix</h3>
          <p>
            <strong>Narrative Structure:</strong> The branching narrative format and meta-commentary
            on choice and control directly informed the project's interactive structure.
          </p>
        </motion.article>

        {/* Course Connection Section */}
        <motion.article
          id="course-connection"
          className="card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2>Connection to Course Objectives</h2>
          <p>
            These references connect to course objectives in several ways:
          </p>
          <ul className="bullets">
            <li><strong>Theoretical Application:</strong> Applied concepts from interactive
            storytelling theory to practical design decisions</li>

            <li><strong>Interdisciplinary Research:</strong> Drew from multiple fields to inform
            a cohesive creative project</li>

            <li><strong>Critical Analysis:</strong> Evaluated reference works as case studies in
            interactive narrative design and AI ethics</li>

            <li><strong>Contemporary Relevance:</strong> Engaged with current debates in AI ethics
            and emerging practices in AI-assisted production</li>
          </ul>
        </motion.article>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <p>
            These theoretical frameworks provide the academic foundation for the project's 
            creative and technical decisions, demonstrating the intersection of practice and theory.
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
};

export default Theories;

