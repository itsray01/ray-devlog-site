import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

/**
 * Layout component that wraps all pages
 * Provides consistent sidebar navigation across the application
 */
const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
