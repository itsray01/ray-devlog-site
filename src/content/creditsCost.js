/**
 * Credits Cost Configuration
 * Based on Higgsfield Ultimate plan: $49/month for 1,200 credits
 * Cost per credit: $49 / 1,200 = $0.04083
 */

// Credits required per generation for each tool
export const CREDITS_PER_GENERATION = {
  "Sora 2": 0,           // Free - accessed separately via OpenAI
  "Veo 3.1": 58,         // 58 credits per generation
  "Higgsfield": 10,      // Higgsfield Standard - 10 credits
  "Wan 2.5": 12,         // 12 credits per generation
  "Seedance": 4,         // Seedance Pro - 4 credits
  "Kling 2.5": 10,       // 10 credits (if tracked in future)
  "Sora 2 Pro Max": 68   // 68 credits (if tracked in future)
};

// Higgsfield Ultimate plan pricing
const HIGGSFIELD_PLAN_COST = 49.00;  // USD per month
const HIGGSFIELD_PLAN_CREDITS = 1200; // Credits per month
const COST_PER_HIGGSFIELD_CREDIT = HIGGSFIELD_PLAN_COST / HIGGSFIELD_PLAN_CREDITS; // $0.04083

// Cost per generation in USD for each tool
export const COST_PER_CREDIT = {
  "Sora 2": 0,                                                    // $0.00 (Free)
  "Veo 3.1": CREDITS_PER_GENERATION["Veo 3.1"] * COST_PER_HIGGSFIELD_CREDIT,      // $2.37
  "Higgsfield": CREDITS_PER_GENERATION["Higgsfield"] * COST_PER_HIGGSFIELD_CREDIT,  // $0.41
  "Wan 2.5": CREDITS_PER_GENERATION["Wan 2.5"] * COST_PER_HIGGSFIELD_CREDIT,      // $0.49
  "Seedance": CREDITS_PER_GENERATION["Seedance"] * COST_PER_HIGGSFIELD_CREDIT,    // $0.16
  "Kling 2.5": CREDITS_PER_GENERATION["Kling 2.5"] * COST_PER_HIGGSFIELD_CREDIT,  // $0.41
  "Sora 2 Pro Max": CREDITS_PER_GENERATION["Sora 2 Pro Max"] * COST_PER_HIGGSFIELD_CREDIT // $2.78
};

/**
 * Calculate USD cost for a log entry
 * @param {Object} log - Journey log entry
 * @returns {number} Cost in USD
 */
export const calculateCost = (log) => {
  // Special case: Sora 2 is free
  if (log.tool === "Sora 2") {
    return 0;
  }

  // For all Higgsfield tools, multiply actual credits spent by per-credit cost
  return log.creditsSpent * COST_PER_HIGGSFIELD_CREDIT;
};

/**
 * Calculate cost efficiency score (output quality per dollar)
 * Higher score = better value
 * @param {Object} log - Journey log entry
 * @returns {number} Efficiency score (0-10)
 */
export const calculateCostEfficiency = (log) => {
  const cost = calculateCost(log);
  if (cost === 0) return 0;

  // Score per dollar (result score / cost)
  // Normalize to 0-10 scale (assuming max is ~50 points per dollar)
  const efficiency = (log.resultScore / cost) * 2;
  return Math.min(10, Math.max(0, efficiency));
};

/**
 * Calculate average cost efficiency for a tool across all logs
 * @param {Array} logs - All journey logs
 * @param {string} tool - Tool name
 * @returns {number} Average efficiency (1-5 rating scale)
 */
export const getToolCostEfficiency = (logs, tool) => {
  const toolLogs = logs.filter(log => log.tool === tool);
  if (toolLogs.length === 0) return 3; // Default average rating

  const avgEfficiency = toolLogs.reduce((sum, log) => {
    return sum + calculateCostEfficiency(log);
  }, 0) / toolLogs.length;

  // Convert 0-10 scale to 1-5 rating scale
  return Math.round((avgEfficiency / 10) * 4) + 1;
};

export default {
  COST_PER_CREDIT,
  calculateCost,
  calculateCostEfficiency,
  getToolCostEfficiency
};
