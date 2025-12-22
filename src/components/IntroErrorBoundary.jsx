import { Component } from 'react';

/**
 * IntroErrorBoundary - Lightweight error boundary specifically for IntroSequence
 * If intro crashes, it calls finishIntro() to ensure content is visible
 */
class IntroErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error
    console.error('[IntroErrorBoundary] Intro sequence crashed:', error, errorInfo);
    
    // Call onError callback if provided (to finish intro and show content)
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      // Don't render anything - just let the content show
      return null;
    }

    return this.props.children;
  }
}

export default IntroErrorBoundary;
