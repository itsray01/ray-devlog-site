import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Sidebar component with nested navigation
 * Shows page links and section links with smooth scrolling
 */
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHomeExpanded, setIsHomeExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  // Define all sections that appear under Home
  const homeSections = [
    { id: 'overview', title: 'Overview' },
    { id: 'inspiration', title: 'Inspiration' },
    { id: 'moodboard', title: 'Moodboard' },
    { id: 'storyboard', title: 'Storyboard' },
    { id: 'branching', title: 'Branching Narrative' },
    { id: 'experiments', title: 'Technical Experiments' },
    { id: 'audience', title: 'Audience & Accessibility' },
    { id: 'production', title: 'Production & Reflection' },
    { id: 'references', title: 'References' }
  ];

  // Other navigation pages
  const otherPages = [
    { path: '/assets', title: 'Assets' },
    { path: '/about', title: 'About' },
    { path: '/extras', title: 'Extras' }
  ];

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Auto-expand Home when on home page
  useEffect(() => {
    if (isHomePage) {
      setIsHomeExpanded(true);
    }
  }, [isHomePage]);

  // Scroll spy to track active section
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = homeSections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(homeSections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Handle section click
  const handleSectionClick = (sectionId) => {
    if (!isHomePage) {
      // Navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setActiveSection(sectionId);
  };

  // Toggle Home expansion
  const toggleHome = () => {
    setIsHomeExpanded(!isHomeExpanded);
  };

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

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    })
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
          {/* Home Section (expandable) */}
          <div className="nav-section">
            <motion.button
              className={`nav-item nav-item-main ${isHomePage ? 'active' : ''}`}
              onClick={toggleHome}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="nav-item-text">Home</span>
              <motion.span 
                className="nav-arrow"
                animate={{ rotate: isHomeExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▶
              </motion.span>
            </motion.button>

            {/* Home subsections */}
            <AnimatePresence>
              {isHomeExpanded && (
                <motion.div
                  className="nav-subsections"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={sectionVariants}
                >
                  {homeSections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      className={`nav-item nav-item-sub ${activeSection === section.id && isHomePage ? 'active' : ''}`}
                      onClick={() => handleSectionClick(section.id)}
                      custom={index}
                      variants={itemVariants}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="nav-bullet">•</span>
                      <span className="nav-item-text">{section.title}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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

