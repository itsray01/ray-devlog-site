/**
 * Tool Comparison Matrix
 * Ratings and comparison data for AI video generation tools
 */

const toolMatrix = {
  tools: ["Sora 2", "Veo 3.1", "Higgsfield", "Wan 2.5", "Seedance"],

  criteria: [
    "Consistency",
    "Camera Control",
    "Mood",
    "Prompt Control",
    "Speed",
    "Cost Efficiency"
  ],

  // Ratings: 1 (poor) to 5 (excellent)
  ratings: {
    "Sora 2": {
      "Consistency": 3,
      "Camera Control": 4,
      "Mood": 5,
      "Prompt Control": 4,
      "Speed": 2,
      "Cost Efficiency": 2
    },
    "Veo 3.1": {
      "Consistency": 4,
      "Camera Control": 4,
      "Mood": 4,
      "Prompt Control": 4,
      "Speed": 3,
      "Cost Efficiency": 3
    },
    "Higgsfield": {
      "Consistency": 3,
      "Camera Control": 3,
      "Mood": 4,
      "Prompt Control": 3,
      "Speed": 3,
      "Cost Efficiency": 4
    },
    "Wan 2.5": {
      "Consistency": 2,
      "Camera Control": 2,
      "Mood": 3,
      "Prompt Control": 3,
      "Speed": 5,
      "Cost Efficiency": 5
    },
    "Seedance": {
      "Consistency": 2,
      "Camera Control": 3,
      "Mood": 4,
      "Prompt Control": 2,
      "Speed": 4,
      "Cost Efficiency": 4
    }
  },

  // Optional notes per tool
  notes: {
    "Sora 2": {
      text: "Best for establishing shots and environments. Struggles with consistent character rendering. Evolving content policies can block unexpected prompts.",
      pros: ["Stunning visual quality", "Excellent lighting/mood", "Great for non-human subjects"],
      cons: ["Face inconsistency", "Content policy blocks", "Expensive", "Slow generation"]
    },
    "Veo 3.1": {
      text: "Most reliable for character-focused shots. Became my primary tool for dialogue scenes and protagonist close-ups.",
      pros: ["Consistent faces", "Natural motion", "Reliable output", "Good prompt adherence"],
      cons: ["Lower visual fidelity than Sora", "Some texture artifacts", "Mid-range cost"]
    },
    "Higgsfield": {
      text: "Valuable as a multi-model platform. Proprietary model works well for abstract/artistic shots but struggles with realistic narrative content.",
      pros: ["Multi-model access", "Good for stylized content", "Reasonable pricing", "Platform comparison features"],
      cons: ["Inconsistent character rendering", "Less photorealistic", "Platform-specific limitations"]
    },
    "Wan 2.5": {
      text: "Fast generation makes it useful for concept testing and previsualization. Not suitable for final footage due to quality trade-offs.",
      pros: ["Very fast generation", "Low cost", "Good for quick tests", "Useful for framing previews"],
      cons: ["Low detail quality", "Jittery motion", "Poor photorealism", "Unusable for final shots"]
    },
    "Seedance": {
      text: "Excels at stylized and artistic content. Artistic interpretation often overrides prompt specificity, limiting use for grounded realism.",
      pros: ["Unique stylistic flair", "Good for transitions", "Interesting artistic results", "Reasonably fast"],
      cons: ["Poor prompt control", "Struggles with photorealism", "Artistic override", "Limited narrative use"]
    }
  }
};

export default toolMatrix;
