import { memo } from 'react';
import useViewport from '../hooks/useViewport';

/**
 * Responsive container component that auto-adjusts based on viewport
 * Ensures content is always properly centered and constrained
 */
const ResponsiveContainer = ({ children, maxWidth = '1400px' }) => {
  const { isMobile, isTablet } = useViewport();

  const containerStyle = {
    width: '100%',
    maxWidth: isMobile ? '100%' : isTablet ? '100%' : maxWidth,
    margin: '0 auto',
    padding: isMobile ? '0' : isTablet ? '0 1rem' : '0 2rem',
    boxSizing: 'border-box',
    position: 'relative'
  };

  return <div style={containerStyle}>{children}</div>;
};

export default memo(ResponsiveContainer);

