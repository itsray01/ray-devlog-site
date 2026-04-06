/**
 * Development diary — module requirement: 5–8 entries, first entry = project + aims + academic context.
 * Single source for /diary and legacy JOURNAL_POSTS alias.
 * Twine + GitHub merged here to avoid repeating McKeown/embed story; theory names concentrated in entry 1 and Research page.
 */

export const DIARY_ENTRIES = [
  {
    id: 'project-overview',
    kind: 'opening',
    date: 'October 2025',
    title: 'Project overview, aims, and academic context',
    paragraphs: [
      'Echoes of Control is an interactive branching narrative built in Twine, using AI-generated video clips served from stable GitHub-hosted URLs rather than embedded inside the story file. The viewer makes choices that branch the story; certain paths loop back through a cognitive-scrambler mechanic so that “wrong” decisions feel consequential rather than disposable. Thematically the work sits at the intersection of surveillance, institutional control, and generative AI — asking what agency means when the system that shapes the maze is partly opaque, partly automated, and partly indifferent to authorial intent.',
      'The project aims were threefold. First, to produce a finished interactive film artefact that reads as coherent horror rather than a technology demo — with pacing, integrated sound, and visual consistency that survive branching and repeated viewing. Second, to develop and document a comparative workflow across AI video models (Sora, Veo, Kling, WAN, Seedance, and others), treating tool choice, failure modes, and regeneration cost as research data rather than private frustration. Third, to connect that practice to academic frameworks: Practice as Research (PaR), interactive narrative theory, and debates on AI ethics and creative labour — material that feeds the accompanying essay and satisfies the module’s expectation that making and reflection stay in dialogue.',
      'The academic context starts from the proposal’s research question: how interactive form can stage anxieties about AI and control without reducing them to a lecture. PaR treats making as a way of knowing — the prompt log, failed generations, and interface constraints are evidence, not mess. Janet Murray, Donald Schön, and Espen Aarseth (among others) are developed properly on the Research page; here it is enough to say their ideas were lenses when models drifted or when branching structure had to be justified as a reader contract, not optional decoration. Surveillance fiction and the traditions Black Mirror draws on (Kafka, Dick) informed tone and title choices.',
      'After an early supervisor check-in and re-reading the assessment brief, I had to name what was distinctive about the approach: repetition — loops, echoing voices, choices that return — rather than a purely procedural “protocol.” Early working titles included “Protocol of Control”; “Echoes of Control” better matched the finished artefact. “Echo Maze Protocol” remains the in-world fiction name for the facility — the portfolio title speaks to the audience and the research question; the diegetic title does different work inside the fiction.',
      'This entry is the shortened proposal snapshot the module asks for. Dated entries below unpack production weeks without repeating the full theoretical argument — see Timeline for milestones, Research for theory, Process for data.'
    ]
  },
  {
    id: 'ai-video-pipeline',
    kind: 'diary',
    date: 'October–November 2025',
    title: 'Testing the AI video pipeline',
    paragraphs: [
      'Production meant treating generation as a pipeline, not a single button: reference stills, prompt drafts, platform credits, failed passes, and re-generation when characters or lighting drifted. The difference between a usable clip and a rejected one was rarely the model in isolation — it was whether the workflow made re-generation recoverable instead of starting from zero.',
      'One corridor chase through Sora 2 failed immediately: hands distorted under motion, the protagonist’s face shifted between frames, clothing physics felt wrong. The instinct was to re-prompt with a longer character description. The fix that worked was structural — constraining camera movement, locking the pose description, and reducing motion complexity. The model did not improve; the ask became more answerable.',
      'A contrasting success from the same period: a three-shot dialogue sequence through Veo 3.1 worked on the first pass using a template that locked face, clothes, and lighting across generations. The lesson was not “Veo is better” but that character anchoring had to be designed into the prompt hierarchy from the start.',
      'Early runs exposed how fast each platform was, how often faces broke, and where sound was missing or mismatched. Sora handled environment shots where no character had to hold continuity across cuts; Veo handled character-centred scenes more reliably. You are the director; the tools are inconsistent collaborators — consistency is manufactured in the workflow, prompt log, and reference stills.',
      'Credit burn was costly enough that I logged cost per usable second of footage; that spreadsheet became as important as the moodboard for deciding when to abandon a line of prompting and change the scene beat instead.'
    ]
  },
  {
    id: 'comparing-models',
    kind: 'diary',
    date: 'October 2025 – January 2026',
    title: 'Comparing Sora, Veo, Kling, Seedance, and WAN',
    paragraphs: [
      'Side-by-side comparisons mattered because marketing copy rarely matches your exact scene and prompt. I evaluated six models through Higgsfield — Sora 2, Veo 3.1, Grok Imagine, WAN 2.5, Seedance, and Higgsfield’s proprietary model — against criteria: character consistency across cuts, horror readability, iteration speed, and cost per usable clip.',
      'WAN and Seedance suited previsualization and abstract beats where stylistic drift was acceptable; neither produced reliable narrative footage. Sora excelled at atmosphere but broke on faces and hit content policy on conflict-adjacent prompts. Veo delivered the most dependable character work through the prototype phase.',
      'When Kling 3.0 Omni launched mid-project, the switch was evidence-based: measurably tighter consistency, integrated sound (removing a whole audio pass), and the “elements” feature with Gemini-generated reference images to anchor a character across scenes. By January 2026 the workflow had consolidated around Kling; over 200 additional clips were generated for branching paths — volume reflects passes per branch, not vanity metrics.',
      'Supervision at this stage asked whether chasing the newest model was scope creep. The answer I documented was methodological: without the multi-model baseline, I could not have shown Kling’s leap was real for my scenes rather than hype — comparison tables and saved outputs stayed in the Process journey log and tool matrix.',
      'Narrowing to Kling for finals did not erase WAN and Seedance from the project history; they remain in experimental branches as deliberate low-fidelity probes — informed scope management, not accidental monotheism.'
    ]
  },
  {
    id: 'furnace-prompts',
    kind: 'diary',
    date: 'January–March 2026',
    title: 'Prompting the furnace reveal scene',
    paragraphs: [
      'The furnace scene needed staging: hiding, witness, slow realisation, and industrial sound — not a music sting. Early prompts that “described the room” were technically fine and dramatically dead. Remedy’s Control influenced the approach: threat through space and system, not a monster in frame. The furnace is part of the institution.',
      'Prompting shifted to directing beats — who is in frame, what they hear, what the viewer should feel before the cut. Kling’s integrated sound let me specify drones and rumble while withholding score, in line with course discussion on restraint and viewer responsibility for affect.',
      'Iterations were experiments in what AI video could carry emotionally: dread needed grit, shadow, and longer holds, learned from failed passes. This sequence consumed the most regeneration budget; the principle carried into later set pieces.',
      'In supervision we discussed whether the scene was “too slow”; the counter was genre-specific — horror lives in the gap between understanding and looking away. Longer holds on the character’s face were a deliberate choice once the model could deliver silence and machine noise together.',
      'Environmental storytelling in Control and Portal’s test-chamber language helped me defend the scene as systemic revelation rather than creature feature when dailies looked light on “action.”'
    ]
  },
  {
    id: 'twine-and-media-hosting',
    kind: 'diary',
    date: 'November 2025 – March 2026',
    title: 'Twine interface, McKeown tutorials, and GitHub media hosting',
    paragraphs: [
      'Twine gave structure and branching; the default skin clashed with the dystopian look the story needed. Internal playtests and prototype submission feedback converged: the interface’s visual language was undermining the horror tone. The module convenor pushed for a coherent visual identity rather than an unexamined mismatch — I committed.',
      'Dr Conor McKeown’s tutorials were the practical bridge: host video on GitHub, embed stable URLs in Twine, treat passages as HTML containers with full styling control. ChatGPT helped draft SugarCube markup; CSS pushed the UI toward a terminal-adjacent feel. Upskilling into CSS custom properties, SugarCube macros, and JavaScript for state unlocked timed transitions, conditional links, and a HUD for loop position without breaking the fiction. JSON-style structuring for passages, CSS, and HTML kept the graph maintainable.',
      'Embedding MP4s inside the Twine export produced a 400MB file that failed on mobile and crawled on desktop — media and the story file could not share one bundle. I moved clips to GitHub Releases: versioned raw URLs, no player chrome, rollback when a clip was regenerated. The devlog site lives on GitHub Pages separately; the pattern is trustworthy `<video>` sources. The convenor had stressed portable, assessable submission builds — a single massive HTML would have failed that bar.',
      'Feedback on the prototype pushed clearer distinction between interactive and non-interactive states — implemented. Suggestions to strip looping animation were set aside where the loop had to read as design. Infrastructure iteration matched creative iteration: split media first, then version it, then wire URLs into passages so story logic stayed separate from asset swaps. McKeown’s walkthroughs count as practitioner secondary research — reproducible steps, appropriate for a software-adjacent artefact.'
    ]
  },
  {
    id: 'mobile-anything',
    kind: 'diary',
    date: 'March 2026',
    title: 'Prototyping a mobile version on anything.com',
    paragraphs: [
      'Desktop Twine is not how most people first open a shared link. Testers on phones hit tap targets that were too small, mid-scene buffering that killed horror pacing, and timing between choice and consequence that fell apart behind a loading spinner.',
      'A prototype on Anything.com (MAX plan, 50% discount after contacting the founder) let me scale tap targets, tune resolution for buffer risk, and test iOS Safari, Chrome on Android, and Firefox — each handled `<video>` differently from the desktop build.',
      'Fixes — larger choice areas, preload hints, reduced autoplay reliance — went back into the main Twine build. Desktop-first assumptions about overlay layout, loop indicator, and aspect ratio failed in portrait until tested. Paying for a dedicated tier was a calculated risk so the experiment could run properly rather than on one handset alone.',
      'Each mobile round produced a short changelog I could bring to supervision — concrete UI diffs instead of vague promises to “fix mobile later.”'
    ]
  },
  {
    id: 'process-lessons',
    kind: 'diary',
    date: 'April 2026',
    title: 'What the process taught me about control, inconsistency, and compromise',
    paragraphs: [
      'Generative tools do not guarantee obedience — prompting is negotiation. Often it felt like steering a collaborator with its own idea of the shot rather than commanding a camera. The prompt log is where that negotiation left traces; the Research page names the theorists who frame that dynamic in academic terms.',
      'Inconsistency is the default. The look of the piece is partly a record of fighting variance with anchors, references, and re-rolls. Deadlines and credits mean the final work is the best honest version of this pipeline at this moment.',
      'Feedback that mattered most: the module convenor’s response to the November prototype singled out player orientation — that pushed persistent spatial markers so loops read as design, not glitch. Peers flagged uneven horror pacing, which drove a refinement pass. I kept a stylised interface where “safer” UI advice would have softened the story’s argument about systems — those suggestions were considered and set aside for cause.',
      'The essay develops theory and citation; this diary stays process-first. If I were starting again, I would still budget time for generations that looked wasteful — they became the dataset for every later defensible choice.',
      'What stays unresolved is whether any generative pipeline can be “fair” to performers who never existed; the project lets that unease sit inside the horror rather than polishing it away.'
    ]
  }
];

/** @deprecated Use DIARY_ENTRIES — kept for imports */
export const JOURNAL_POSTS = DIARY_ENTRIES;

export const DIARY_NAV_SECTIONS = DIARY_ENTRIES.map((p) => {
  const parts = p.title.split(/:\s*/);
  const label =
    parts.length >= 2 ? parts.slice(1).join(': ').trim() : p.title;
  return {
    id: p.id,
    title: label.length > 56 ? `${label.slice(0, 53)}…` : label
  };
});

/** @deprecated Use DIARY_NAV_SECTIONS */
export const JOURNAL_NAV_SECTIONS = DIARY_NAV_SECTIONS;

/** Short teasers for Home / optional cards */
export const JOURNAL_TEASERS = DIARY_ENTRIES.slice(0, 4).map((p) => ({
  title: p.title,
  desc: p.paragraphs[0],
  icon: '📝'
}));
