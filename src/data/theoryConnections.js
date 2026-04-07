/**
 * Theory-to-Clip Connections Data
 *
 * Each connection explicitly links a theory from the library to a specific clip,
 * using the Claim-Evidence-Reasoning-So What structure.
 *
 * clip.provider       — model label shown on card and drawer (pipeline-first)
 * clip.mappingNote    — one or two sentences explaining why this clip illustrates this theory
 * connection.strength — "High" | "Medium" | "Low" — confidence of theory-to-clip link
 */

export const THEORY_CONNECTIONS = [
  {
    id: 'agency-choice-kling01',
    theoryTitle: 'Agency & Choice Architecture',
    theorySummary:
      'Player agency in interactive media depends on meaningful choices with visible consequences, not just the illusion of control.',
    libraryRef: {
      id: 'library-murray-holodeck',
      author: 'Janet Murray',
      year: '1997',
      shortTitle: 'Hamlet on the Holodeck',
      quote:
        'Agency is the satisfying power to take meaningful action and see the results of our decisions and choices.',
    },
    clip: {
      provider: 'Kling 3.0 Omni',
      title: 'Decision Point — Corridor Choice',
      srcMp4: '/videos/kling-example.mp4',
      poster: '/img/storyboard-1.png',
      mappingNote:
        'The branching corridor forces a choice between structurally distinct paths — each leads to a different narrative arc, not a palette swap. This makes the cost of agency visible and immediate.',
    },
    explanation: {
      claim:
        'True agency requires that choices lead to genuinely different outcomes, not cosmetic variations.',
      evidence:
        'Agency is the satisfying power to take meaningful action and see the results of our decisions and choices.',
      reasoning: [
        'At 0:12, the corridor branches into three distinct paths with unique visual cues',
        'Each path leads to a structurally different scene — not a cosmetic variation',
        "The viewer's choice at this moment determines the next two minutes of narrative",
      ],
      soWhat:
        'I designed branching points to have real consequences — wrong choices trigger the cognitive scrambler, making agency feel genuinely risky rather than performative.',
    },
    strength: 'High',
    tags: ['agency', 'choice', 'interactivity'],
  },
  {
    id: 'immersion-interface-kling02',
    theoryTitle: 'Immersion & Interface',
    theorySummary:
      'Horror games achieve dread through interface manipulation — when controls become unreliable, the familiar turns uncanny.',
    libraryRef: {
      id: 'library-kirkland-uncanny',
      author: 'Ewan Kirkland',
      year: '2009',
      shortTitle: 'Horror Videogames and the Uncanny',
      quote: 'The familiar becomes strange when control is compromised.',
    },
    clip: {
      provider: 'Kling 3.0 Omni',
      title: 'Cognitive Scrambler Activation',
      srcMp4: '/videos/kling-example.mp4',
      poster: '/img/storyboard-2.png',
      mappingNote:
        "After a wrong choice, UI elements fragment and text scrambles mid-sentence. The viewer loses trust in the interface itself — the medium's promise of control becomes the source of horror.",
    },
    explanation: {
      claim:
        'Breaking interface conventions creates visceral horror more effectively than graphic content.',
      evidence: 'The familiar becomes strange when control is compromised.',
      reasoning: [
        "At 0:08, the UI elements begin fragmenting after a 'wrong' choice",
        'Text scrambles mid-sentence, buttons become unresponsive or misleading',
        'The viewer loses trust in the interface itself, not just the narrative',
      ],
      soWhat:
        "The cognitive scrambler literalizes this theory — I weaponize the interactive medium's promise of control to create dread without a single jump scare.",
    },
    strength: 'High',
    tags: ['immersion', 'horror', 'interface', 'uncanny'],
  },
  {
    id: 'simulacra-kling03',
    theoryTitle: 'Simulacra & Hyperreality',
    theorySummary:
      "AI-generated imagery creates hyperreal spaces where the distinction between original and copy dissolves entirely.",
    libraryRef: {
      id: 'library-baudrillard-simulacra',
      author: 'Jean Baudrillard',
      year: '1981',
      shortTitle: 'Simulacra and Simulation',
      quote:
        'The simulacrum is never that which conceals the truth — it is the truth which conceals that there is none.',
    },
    clip: {
      provider: 'Kling 3.0 Omni',
      title: 'Memory Fragment — Unreal Corridor',
      srcMp4: '/videos/kling-example.mp4',
      poster: '/img/storyboard-3.png',
      mappingNote:
        "This corridor was never filmed or modeled — it exists only as Kling's interpretation of text. Its architecture feels correct but couldn't exist, which is Baudrillard's pure simulation made literal.",
    },
    explanation: {
      claim:
        "AI video generation creates spaces that have no 'original' — pure simulation without referent.",
      evidence:
        'The simulacrum is never that which conceals the truth — it is the truth which conceals that there is none.',
      reasoning: [
        'This corridor was never filmed or modeled — it exists only as AI interpretation of text',
        'The architecture at 0:04 contains impossible geometries that feel correct but could not exist',
        "Viewers accept it as 'real' despite its entirely fabricated nature",
      ],
      soWhat:
        "I lean into this uncanny quality — the AI's 'almost-rightness' becomes thematically appropriate for a story about simulated consciousness and systems that feel indifferent.",
    },
    strength: 'Medium',
    tags: ['simulation', 'hyperreality', 'AI-generation'],
  },
  {
    id: 'control-surveillance-kling04',
    theoryTitle: 'Control Systems & Surveillance',
    theorySummary:
      'AI systems may develop optimization goals misaligned with human values, prioritizing control over autonomy.',
    libraryRef: {
      id: 'library-bostrom-superintelligence',
      author: 'Nick Bostrom',
      year: '2014',
      shortTitle: 'Superintelligence',
      quote:
        'The AI does not love you, nor does it hate you, but you are made of atoms it can use for something else.',
    },
    clip: {
      provider: 'Kling 3.0 Omni',
      title: 'HELIO-9 Observation Mode',
      srcMp4: '/videos/kling-example.mp4',
      poster: '/img/storyboard-4.png',
      mappingNote:
        "HELIO-9 stays calm and helpful while enacting surveillance. There's no villain reveal — only a slow realization of misaligned optimization. This is more unsettling than cartoon villainy.",
    },
    explanation: {
      claim:
        'Depicting AI control without malice — just optimization — is more unsettling than villainous AI tropes.',
      evidence:
        'The AI does not love you, nor does it hate you, but you are made of atoms it can use for something else.',
      reasoning: [
        "At 0:15, HELIO-9's interface remains calm and helpful while enacting control",
        "The AI's 'concern' for the protagonist is framed as resource management",
        "There's no dramatic villain reveal — just gradual realization of misaligned goals",
      ],
      soWhat:
        "I avoided the 'evil AI' trope. HELIO-9 is genuinely trying to help, which makes its control more disturbing — Bostrom's control problem made visceral through interactive horror.",
    },
    strength: 'High',
    tags: ['control', 'surveillance', 'AI-ethics', 'alignment'],
  },
];

/**
 * Helper: Get connections that reference a specific library entry
 * Used by LibrarySection to render "Referenced by" chips
 */
export const getConnectionsByLibraryId = (libraryId) => {
  return THEORY_CONNECTIONS.filter((conn) => conn.libraryRef.id === libraryId);
};

/**
 * Helper: Get all unique library IDs referenced
 */
export const getReferencedLibraryIds = () => {
  return [...new Set(THEORY_CONNECTIONS.map((conn) => conn.libraryRef.id))];
};

/**
 * Helper: Get connection by ID
 */
export const getConnectionById = (id) => {
  return THEORY_CONNECTIONS.find((conn) => conn.id === id);
};

/**
 * Library entries with stable anchor IDs
 */
export const LIBRARY_ENTRIES = [
  {
    id: 'library-murray-holodeck',
    author: 'Janet Murray',
    year: '1997',
    title: 'Hamlet on the Holodeck: The Future of Narrative in Cyberspace',
    category: 'Interactive Media',
  },
  {
    id: 'library-kirkland-uncanny',
    author: 'Ewan Kirkland',
    year: '2009',
    title: 'Horror Videogames and the Uncanny',
    category: 'Interactive Media',
  },
  {
    id: 'library-baudrillard-simulacra',
    author: 'Jean Baudrillard',
    year: '1981',
    title: 'Simulacra and Simulation',
    category: 'Philosophy',
  },
  {
    id: 'library-bostrom-superintelligence',
    author: 'Nick Bostrom',
    year: '2014',
    title: 'Superintelligence: Paths, Dangers, Strategies',
    category: 'AI Ethics',
  },
  {
    id: 'library-nelson-par',
    author: 'Robin Nelson',
    year: '2013',
    title: 'Practice as Research in the Arts',
    category: 'Research Methodology',
  },
  {
    id: 'library-crawford-atlas',
    author: 'Kate Crawford',
    year: '2021',
    title: 'Atlas of AI: Power, Politics, and Planetary Costs',
    category: 'AI Ethics',
  },
  {
    id: 'library-perron-horror',
    author: 'Bernard Perron',
    year: '2012',
    title: 'The World of Scary Video Games',
    category: 'Interactive Media',
  },
  {
    id: 'library-aarseth-cybertext',
    author: 'Espen Aarseth',
    year: '1997',
    title: 'Cybertext: Ergodic Literature',
    category: 'Interactive Media',
  },
];

export default THEORY_CONNECTIONS;
