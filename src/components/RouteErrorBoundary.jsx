import { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * RouteErrorBoundary
 * Prevents a runtime error inside a page/effect from blanking the whole app.
 *
 * Use it around <Outlet/> (or page components) so nav/layout stays alive.
 */
class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Always log; this is critical to diagnosing “BG only” failures.
    // eslint-disable-next-line no-console
    console.error('[RouteErrorBoundary] Route crashed:', error, errorInfo);
    if (this.props.onError) this.props.onError(error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    // Reset boundary when navigation changes.
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        className="card"
        style={{
          maxWidth: 820,
          margin: '2rem auto',
          padding: '1.5rem',
        }}
        role="alert"
        aria-live="polite"
      >
        <h2 style={{ marginTop: 0 }}>Something went wrong</h2>
        <p style={{ color: 'var(--muted)' }}>
          A visual effect or page component crashed, but the site is still running.
          You can reload, or jump to another page.
        </p>

        {import.meta.env.DEV && this.state.error?.message ? (
          <pre
            style={{
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(0,0,0,0.25)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              overflowX: 'auto',
              color: 'var(--muted)',
              fontSize: 12,
            }}
          >
            {this.state.error.message}
          </pre>
        ) : null}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
          <Link className="btn btn-secondary" to="/">
            Go Home
          </Link>
          <Link className="btn btn-secondary" to="/my-journey">
            My Journey
          </Link>
        </div>
      </div>
    );
  }
}

export default RouteErrorBoundary;


