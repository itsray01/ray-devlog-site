/**
 * Production & Reflection section - Milestones and learnings
 */
const ProductionSection = () => {
  return (
    <section id="production" className="content-section">
      <div className="card" data-animate="reveal">
        <h2>Production & Reflection: The Real Story</h2>
        <p>
          This isn't a polished success story. It's the messy reality of trying to create something
          ambitious with AI tools that aren't quite ready for narrative filmmaking yet.
        </p>
        <p>
          Here's what actually happened — the false starts, the tool failures, the pivot points, and
          what I learned along the way.
        </p>
      </div>

      <article className="card note" data-animate="reveal">
        <h3>Starting Too Big: My First Mistake</h3>
        <small className="meta">October 2025</small>
        <p>
          I started with grand ambitions. "Echo Maze Protocol" would be an interactive horror film
          exploring AI control and human agency — multiple branching paths, complex choices, deep
          thematic exploration. I researched horror conventions, studied Black Mirror: Bandersnatch
          and The Stanley Parable, and designed a narrative structure that was... way too complex.
        </p>
        <p>
          <strong>What I learned:</strong> I had to simplify. I cut back to three main acts with
          strategic convergence points. This wasn't a compromise on my creative vision; it was a
          necessary reality check. Scope reduction was itself a design decision — and documenting
          why it happened is part of the research.
        </p>
      </article>

      <article className="card note" data-animate="reveal">
        <h3>The Consistency Problem No One Warns You About</h3>
        <small className="meta">November 2025</small>
        <p>
          Every AI video model I tested produced great individual clips. The real problem only became
          visible when I put them together: faces changed between shots, lighting shifted arbitrarily,
          and the protagonist looked like a different person in every scene.
        </p>
        <p>
          I tried locking descriptions, using reference images, and constraining camera angles — all
          of which helped partially. But the honest conclusion was that character consistency across
          a branching narrative is still an unsolved problem for AI video generation at this stage.
          The workflow fix was to use each model where it was strongest: Sora 2 for wide establishing
          shots with no human subjects, Veo 3.1 for character-focused dialogue, Wan 2.5 only for
          rough previsualization.
        </p>
        <p>
          <strong>What I learned:</strong> A hybrid approach forced by failure turned out to be more
          deliberate than any single-tool workflow would have been. The limitations shaped the
          aesthetic — which connects directly to Manovich's (2018) argument that algorithmic
          constraints become creative parameters.
        </p>
      </article>

      <article className="card note" data-animate="reveal">
        <h3>When a Better Tool Arrives Mid-Production</h3>
        <small className="meta">January 2026</small>
        <p>
          Kling 3.0 Omni launched after months of multi-model testing. It was immediately apparent
          that it outperformed everything I had been using — better character consistency, integrated
          sound generation, and an "elements" feature that let Gemini-generated images anchor visual
          continuity across scenes.
        </p>
        <p>
          This created a real production dilemma: rebuild the asset library or keep the existing
          clips and accept inconsistency. I chose to rebuild the key scenes — the furnace reveal,
          the maze sequences, and all protagonist dialogue — while keeping Sora 2 for the
          establishing shots where it still performed best.
        </p>
        <p>
          <strong>What I learned:</strong> The decision to switch mid-production was only possible
          because of the documentation built up during the testing phase. Knowing precisely what
          each earlier tool had failed at meant I could immediately identify what Kling solved and
          what it didn't, rather than starting from scratch. This is the practical value of the
          experiment log.
        </p>
      </article>

      {/* Key Learnings Summary */}
      <div className="card" data-animate="reveal">
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
