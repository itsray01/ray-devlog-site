import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

/**
 * FeaturedExperiment - Highlight card for a featured experiment or clip
 * Cinematic HUD aesthetic with thumbnail and call-to-action
 */
const FeaturedExperiment = () => {
  return (
    <div className="featured-experiment">
      {/* Thumbnail */}
      <div className="featured-experiment__thumbnail">
        <img
          src="/src/assets/visual-grid/blade-runner.jpg"
          alt="Featured experiment thumbnail"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="featured-experiment__content">
        {/* Eyebrow label */}
        <div className="featured-experiment__eyebrow">
          <Sparkles size={14} />
          <span>Featured Experiment</span>
        </div>

        {/* Title */}
        <h3 className="featured-experiment__title">
          Visual Grid: AI Video Generation Experiments
        </h3>

        {/* Description */}
        <p className="featured-experiment__description">
          Watch real-time comparisons of 5 different AI models attempting to generate the same scene.
          See what worked, what failed spectacularly, and what surprised me.
        </p>

        {/* CTA */}
        <Link to="/process#visual-grid" className="featured-experiment__cta">
          <span>Explore Visual Grid</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedExperiment;
