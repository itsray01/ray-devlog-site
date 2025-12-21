import { forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * SimpleButton - Button/Link without magnetic effect
 */
const SimpleButton = ({ children, className, onClick, href, isLink, external }) => {
  const buttonRef = useRef(null);

  if (isLink) {
    if (external) {
      return (
        <a
          ref={buttonRef}
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link ref={buttonRef} to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

/**
 * FeatureCard - Shopify-style feature card with cyberpunk aesthetics
 * Now without tilt effect and magnetic CTA
 *
 * @param {string} eyebrow - Optional small label above title
 * @param {string} title - Required heading
 * @param {string} body - Short description
 * @param {object} cta - Call to action: { label, href } or { label, onClick }
 * @param {React.Component} icon - Optional Lucide icon component
 * @param {string} thumbnail - Optional image URL
 * @param {string} variant - 'default' | 'highlight' | 'compact'
 * @param {number} delay - Animation delay for staggered entrance
 * @param {string} className - Additional CSS classes
 */
const FeatureCard = forwardRef(({
  eyebrow,
  title,
  body,
  cta,
  icon: Icon,
  thumbnail,
  variant = 'default',
  delay = 0,
  className = '',
  children,
  ...props
}, ref) => {
  // Removed tilt effect - keeping card simple

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Render CTA button or link
  const renderCTA = () => {
    if (!cta) return null;

    const ctaContent = (
      <>
        <span>{cta.label}</span>
        <ArrowRight size={16} className="feature-card__cta-icon" />
      </>
    );

    if (cta.href) {
      const isExternal = !cta.href.startsWith('/');
      return (
        <SimpleButton
          href={cta.href}
          className="feature-card__cta"
          isLink
          external={isExternal}
        >
          {ctaContent}
        </SimpleButton>
      );
    }

    if (cta.onClick) {
      return (
        <SimpleButton
          className="feature-card__cta"
          onClick={cta.onClick}
        >
          {ctaContent}
        </SimpleButton>
      );
    }

    return null;
  };

  // Card content
  const cardContent = (
    <>
      {/* Thumbnail */}
      {thumbnail && (
        <div className="feature-card__thumbnail">
          <img src={thumbnail} alt="" loading="lazy" />
        </div>
      )}

      {/* Content area */}
      <div className="feature-card__content">
        {/* Header with optional icon */}
        <div className="feature-card__header">
          {Icon && (
            <div className="feature-card__icon">
              <Icon size={24} />
            </div>
          )}
          <div className="feature-card__titles">
            {eyebrow && (
              <span className="feature-card__eyebrow">{eyebrow}</span>
            )}
            <h3 className="feature-card__title">{title}</h3>
          </div>
        </div>

        {/* Body text */}
        {body && (
          <p className="feature-card__body">{body}</p>
        )}

        {/* Additional children content */}
        {children && (
          <div className="feature-card__children">{children}</div>
        )}

        {/* CTA */}
        {renderCTA()}
      </div>

      {/* Glow effect overlay (original) */}
      <div className="feature-card__glow" aria-hidden="true" />
    </>
  );

  // Handle forwarded ref
  const setRefs = (el) => {
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  // If CTA has href and covers the whole card
  if (cta?.href && !children) {
    const CardWrapper = cta.href.startsWith('/') ? Link : 'a';
    const linkProps = cta.href.startsWith('/')
      ? { to: cta.href }
      : { href: cta.href, target: '_blank', rel: 'noopener noreferrer' };

    return (
      <motion.div
        ref={setRefs}
        className={`feature-card feature-card--${variant} feature-card--linked ${className}`}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        style={{ position: 'relative', overflow: 'hidden' }}
        {...props}
      >
        <CardWrapper {...linkProps} className="feature-card__link-overlay">
          <span className="sr-only">{cta.label}</span>
        </CardWrapper>
        {cardContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={setRefs}
      className={`feature-card feature-card--${variant} ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      style={{ position: 'relative', overflow: 'hidden' }}
      {...props}
    >
      {cardContent}
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
