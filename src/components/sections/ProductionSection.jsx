/**
 * Production & Reflection section - Milestones and learnings
 */
const ProductionSection = () => {
  return (
    <section id="production" className="content-section">
      <div className="card">
        <h2>Production & Reflection: The Real Story</h2>
        <p>
          This isn't a polished success story. It's the messy reality of trying to create something
          ambitious with AI tools that aren't quite ready for narrative filmmaking yet.
        </p>
        <p>
          Here's what actually happened—the false starts, the tool failures, the pivot points, and
          what I learned along the way.
        </p>
      </div>

      <article className="card note">
        <h3>Starting Too Big: My First Mistake</h3>
        <small className="meta">October 2025</small>

        <p>
          I started with grand ambitions. "Echo Maze Protocol" would be an interactive horror film
          exploring AI control and human agency—multiple branching paths, complex choices, deep
          thematic exploration. I researched horror conventions, studied Black Mirror: Bandersnatch
          and The Stanley Parable, and designed a narrative structure that was... way too complex.
        </p>

        <p>
          <strong>What I learned:</strong> I had to simplify. I cut back to three main acts with
          strategic convergence points. This wasn't a compromise on my creative vision; it was a
          necessary reality check.
        </p>
      </article>

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
        </div>
      </div>
    </section>
  );
};

export default ProductionSection;
