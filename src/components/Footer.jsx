import { useLocation } from 'react-router-dom';

/**
 * Footer component that shows current page information
 */
const Footer = () => {
  const location = useLocation();

  // Get current page name from pathname
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    return path.charAt(1).toUpperCase() + path.slice(2);
  };

  return (
    <footer>
      <p>© 2025 Digital Project • {getCurrentPage()}</p>
    </footer>
  );
};

export default Footer;
