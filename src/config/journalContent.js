/**
 * Journal / backfilled devlog posts — process, tools, and reflection
 */

export const JOURNAL_POSTS = [
  {
    id: 'project-rename',
    title: 'Project rename: from Protocol of Control to Echoes of Control',
    paragraphs: [
      'The project did not launch with its final title. Early framing used “Protocol of Control” and related working names while the story and assessment brief were still settling.',
      '“Echoes of Control” better matched the finished artefact: emphasis on resonance, repetition, and voices that return—whether as narrative loops or the AI systems that shape the maze. The rename was a deliberate alignment of title, theme, and what we actually built.',
      'You will still see “Echo Maze Protocol” in places as the in-world fiction name; the public-facing project title for the course and portfolio is Echoes of Control.'
    ]
  },
  {
    id: 'ai-video-pipeline',
    title: 'Testing the AI video pipeline',
    paragraphs: [
      'Production meant treating generation as a pipeline, not a single button: reference stills, prompt drafts, platform credits, failed passes, and re-generation when characters or lighting drifted.',
      'Early runs exposed how fast each model was, how often faces broke, and where sound was missing or mismatched. That testing shaped which tools became “primary” and which stayed for experiments or B-roll only.',
      'The pipeline lesson is simple: the model is not the director—you are. The tools are inconsistent collaborators; the workflow is where consistency is manufactured.'
    ]
  },
  {
    id: 'comparing-models',
    title: 'Comparing Sora, Veo, Kling, Seedance, and WAN',
    paragraphs: [
      'Side-by-side comparisons across models (including access via Higgsfield where applicable) mattered because marketing copy rarely matches your exact scene and prompt.',
      'Sora and Veo delivered strong moments but with different failure modes; WAN and Seedance were useful for speed or style tests; Kling 3.0 Omni later became the backbone for many finals once quality and integrated sound were clear wins.',
      'The My Journey page and tool matrix document the criteria we cared about: character consistency, horror readability, iteration cost, and whether a clip could survive an edit in Twine without breaking immersion.'
    ]
  },
  {
    id: 'furnace-prompts',
    title: 'Prompting the furnace reveal scene',
    paragraphs: [
      'The furnace scene needed staging: hiding, witness, slow realisation, and sound that felt industrial rather than musical. Prompting moved from “describe a room” to directing beats—who is in frame, what they hear, what the viewer should feel before the cut.',
      'Integrated sound in Kling reduced the gap between picture and atmosphere; prompts specified drones, rumble, and absence of score where a traditional horror cue might go.',
      'Iteration was normal: first passes that were too clean, then pushes toward grit, shadow, and longer holds. The devlog’s asset notes capture the intent even if the exact prompt strings live in project logs.'
    ]
  },
  {
    id: 'twine-interface',
    title: 'Building the Twine interface with ChatGPT + McKeown tutorials',
    paragraphs: [
      'Twine handled structure and branching; the default skin did not match the dystopian look we wanted. ChatGPT helped draft passages and iterate on SugarCube markup, while CSS pulled the UI toward a controlled, terminal-adjacent feel.',
      'Dr Conor McKeown’s tutorials were the practical bridge: hosting video on GitHub and embedding stable URLs in Twine so the prototype could load real clips instead of placeholders.',
      'JSON-style structuring for passages, CSS, and HTML later made the interface easier to reason about and tweak without losing the narrative graph.'
    ]
  },
  {
    id: 'github-hosting',
    title: 'Hosting videos with GitHub and publishing via GitHub Pages',
    paragraphs: [
      'Large video files do not belong inside the Twine HTML export. Releases on GitHub (or similar) with direct links to MP4 files kept the story file small and the media cacheable.',
      'This devlog site is deployed separately (see the repo’s deployment notes); the Twine artefact and the portfolio site are related but not the same deployment. The common thread is GitHub for assets and versioned links you can trust in a `<video>` element.',
      'If a link breaks, the passage still loads—so stable hosting is part of the narrative infrastructure, not an afterthought.'
    ]
  },
  {
    id: 'mobile-anything',
    title: 'Prototyping a mobile version on anything.com',
    paragraphs: [
      'Desktop Twine is not how most people first touch a link. A mobile prototype on Anything.com (MAX plan) let us test tap targets, load behaviour, and whether the horror pacing survived on a small screen.',
      'The experiment was worth the cost for confidence: branching video on mobile is fragile across browsers, and a dedicated prototype surfaced issues before submission.',
      'That pass sits alongside the main artefact as process evidence, not a replacement for the primary Twine build.'
    ]
  },
  {
    id: 'process-lessons',
    title: 'What the process taught me about control, inconsistency, and compromise',
    paragraphs: [
      'Control: you can storyboard, prompt, and branch—but generative tools do not guarantee obedience. Every “choice” in the interface is also a negotiation with models that drift.',
      'Inconsistency: the same prompt can produce brilliance or garbage. The project’s look is partly a record of fighting that variance with anchors, references, and re-rolls.',
      'Compromise: time, credits, and assessment deadlines mean the final piece is not “the best possible universe” but the best honest version of this pipeline at this moment. The essay and this journal are where that compromise becomes explicit rather than hidden.'
    ]
  }
];

/** Short teasers for Home / optional cards */
export const JOURNAL_TEASERS = JOURNAL_POSTS.slice(0, 4).map((p) => ({
  title: p.title,
  desc: p.paragraphs[0],
  icon: '📝'
}));

/** TOC labels: subtitle after first colon, or truncated title */
export const JOURNAL_NAV_SECTIONS = JOURNAL_POSTS.map((p) => {
  const parts = p.title.split(/:\s*/);
  const label =
    parts.length >= 2 ? parts.slice(1).join(': ').trim() : p.title;
  return {
    id: p.id,
    title: label.length > 56 ? `${label.slice(0, 53)}…` : label
  };
});
