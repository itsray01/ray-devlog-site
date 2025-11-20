import { Link, useLocation } from 'react-router-dom';

/**
 * Header component with logo and navigation
 * Shows active state based on current route
 */
const Header = () => {
  const location = useLocation();

  // Check if a link is active based on current pathname
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header>
      <div className="logo">DIGITAL LOGBOOK</div>
      <nav>
        <Link 
          to="/" 
          className={isActive('/') ? 'active' : ''}
        >
          Home
        </Link>
        <Link 
          to="/my-journey" 
          className={isActive('/my-journey') ? 'active' : ''}
        >
          My Journey So Far
        </Link>
        <Link 
          to="/assets" 
          className={isActive('/assets') ? 'active' : ''}
        >
          Assets
        </Link>
        <Link 
          to="/about" 
          className={isActive('/about') ? 'active' : ''}
        >
          About
        </Link>
        <Link 
          to="/extras" 
          className={isActive('/extras') ? 'active' : ''}
        >
          Extras
        </Link>
      </nav>
    </header>
  );
};

export default Header;
