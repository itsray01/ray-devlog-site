import { motion } from 'framer-motion';

/**
 * Audience & Accessibility section
 */
const AudienceSection = () => {
  return (
    <motion.section
      id="audience"
      className="content-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="card">
        <h2>Audience & Accessibility</h2>
        <p>
          Designing an interactive film for diverse audiences requires careful consideration of
          accessibility, cultural context, and viewer agency.
        </p>
        <ul className="bullets">
          <li>Clear visual and audio cues for decision points</li>
          <li>Subtitle support for all dialogue</li>
          <li>Multiple difficulty pathways</li>
          <li>Content warnings for mature themes</li>
          <li>Mobile and desktop-optimized interfaces</li>
        </ul>
      </div>
    </motion.section>
  );
};

export default AudienceSection;
