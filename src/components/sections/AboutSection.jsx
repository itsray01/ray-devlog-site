import ScrollSection, { ScrollReveal } from '../ScrollSection';
import Timeline from '../Timeline';
import timelineData from '../../../data/timeline.json';

const AboutSection = () => {
  return (
    <ScrollSection id="about" title="About This Project">
      <ScrollReveal preset="fadeUp">
        <div className="card">
          <h3>Project Timeline</h3>
          <p className="page-subtitle" style={{ marginBottom: '1.5rem' }}>
            Key milestones and development phases
          </p>
          <Timeline entries={timelineData} />
        </div>
      </ScrollReveal>

      <ScrollReveal preset="fadeUp" delay={0.1}>
        <div className="card">
          <h3>The Vision</h3>
          <p>
            This digital logbook documents the creation of an interactive dystopian film exploring
            themes of AI dominance, human agency, and moral choice in a world ruled by machines.
          </p>
          <p>
            The project combines cutting-edge AI video generation tools with traditional storytelling
            techniques to create an immersive, branching narrative experience that challenges viewers
            to navigate difficult ethical dilemmas.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal preset="fadeUp" delay={0.2}>
        <div className="card">
          <h3>The Process</h3>
          <p>
            Every step of this journey is documented here—from initial concept sketches to current
            production milestones. This logbook serves as both a creative diary and a technical reference
            for my experiments with AI-assisted filmmaking.
          </p>
          <p>
            The goal is transparency: showing the messy, iterative reality of creative work with tools
            that are still evolving and workflows that are still being figured out.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal preset="fadeUp" delay={0.3}>
        <div className="card">
          <h3>Research Methodology</h3>
          <p>
            This project employs a <strong>Practice as Research (PaR)</strong> approach, where knowledge 
            emerges through the creative process itself. Rather than applying pre-existing theories to 
            AI filmmaking, I'm generating new insights by doing the work.
          </p>
          <p>
            <strong>Key PaR Principles Applied:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Practice generates theory</strong> — Testing AI tools revealed limitations not documented 
            in marketing materials</li>
            <li><strong>Failure is data</strong> — Each unsuccessful generation taught me about model constraints 
            and capabilities</li>
            <li><strong>Iteration builds knowledge</strong> — Hundreds of prompt refinements developed tacit 
            expertise in prompt engineering</li>
            <li><strong>Reflection completes the cycle</strong> — Documenting lessons learned transforms experience 
            into transferable knowledge</li>
            <li><strong>Systematic documentation</strong> — Capturing both successes and failures creates a 
            research record for others working with these tools</li>
          </ul>
          <p>
            The <strong>"My Journey"</strong> sections above document this research process in detail, showing how 
            hands-on experimentation with emerging AI tools produces insights unavailable through traditional 
            research methods.
          </p>
        </div>
      </ScrollReveal>
    </ScrollSection>
  );
};

export default AboutSection;
