import { Component } from 'react';
import { motion } from 'framer-motion';

/**
 * ErrorBoundary - Catches React errors and displays fallback UI
 * Prevents entire app crash when a component fails
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          className="error-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: '2rem',
            textAlign: 'center',
            background: 'var(--panel)',
            border: '1px solid var(--err)',
            borderRadius: '14px',
            margin: '2rem 0'
          }}
        >
          <h3 style={{ color: 'var(--err)', marginBottom: '1rem' }}>
            Oops! Something went wrong
          </h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
            This section encountered an error and couldn't load properly.
          </p>
          {this.props.showError && this.state.error && (
            <details style={{ 
              textAlign: 'left', 
              background: 'rgba(0,0,0,0.3)', 
              padding: '1rem', 
              borderRadius: '8px',
              marginTop: '1rem'
            }}>
              <summary style={{ cursor: 'pointer', color: 'var(--muted)' }}>
                Error details
              </summary>
              <pre style={{ 
                marginTop: '0.5rem', 
                fontSize: '0.85rem',
                color: 'var(--err)',
                overflow: 'auto'
              }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1.5rem',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Try Again
          </button>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

