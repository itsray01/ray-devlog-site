import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Sidebar component with nested navigation
 * Shows page links and section links with smooth scrolling
 */
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Other navigation pages
  const otherPages = [
    { path: '/assets', title: 'Assets' },
    { path: '/about', title: 'About' },
    { path: '/extras', title: 'Extras' }
  ];

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <motion.aside 
      className="sidebar"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <div className="sidebar-content">
        {/* Logo */}
        <Link to="/" className="sidebar-logo">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            DIGITAL LOGBOOK
          </motion.div>
        </Link>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {/* Home Section (simple link) */}
          <div className="nav-section">
            <Link
              to="/"
              className={`nav-item nav-item-main ${isHomePage ? 'active' : ''}`}
            >
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%' }}
              >
                <span className="nav-item-text">Home</span>
              </motion.div>
            </Link>
          </div>

          {/* Divider */}
          <div className="nav-divider"></div>

          {/* Other Pages */}
          <div className="nav-section">
            {otherPages.map((page, index) => (
              <Link
                key={page.path}
                to={page.path}
                className={`nav-item nav-item-main ${location.pathname === page.path ? 'active' : ''}`}
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: '100%' }}
                >
                  <span className="nav-item-text">{page.title}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer in sidebar */}
        <div className="sidebar-footer">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>© 2025 Digital Project</p>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="sidebar-gradient"></div>
    </motion.aside>
  );
};

export default Sidebar;

