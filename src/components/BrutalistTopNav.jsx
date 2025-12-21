import { NavLink } from 'react-router-dom';

/**
 * BrutalistTopNav - Minimal top navigation for page routes
 * Always visible, fixed at top
 */
const BrutalistTopNav = () => {
  const pages = [
    { path: '/', label: 'HOME' },
    { path: '/journey', label: 'MY JOURNEY' },
    { path: '/theories', label: 'THEORIES' },
    { path: '/assets', label: 'ASSETS' },
    { path: '/extras', label: 'EXTRAS' },
    { path: '/about', label: 'ABOUT' },
  ];

  return (
    <nav className="brutalist-top-nav" role="navigation" aria-label="Main navigation">
      <div className="brutalist-top-nav__container">
        <div className="brutalist-top-nav__brand">
          <NavLink to="/" className="brutalist-top-nav__logo">
            ECHO MAZE PROTOCOL
          </NavLink>
        </div>
        
        <div className="brutalist-top-nav__links">
          {pages.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              className={({ isActive }) =>
                `brutalist-top-nav__link ${isActive ? 'brutalist-top-nav__link--active' : ''}`
              }
              end={page.path === '/'}
            >
              {page.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BrutalistTopNav;
