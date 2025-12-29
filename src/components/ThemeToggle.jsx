import { useMemo } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import '../styles/ThemeToggle.css';

/**
 * ThemeToggle
 * Toggles between "dark" and "dimmed" themes (persisted by ThemeContext).
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const isDimmed = theme === 'dimmed';
  const label = useMemo(() => (isDimmed ? 'Switch to dark theme' : 'Switch to dimmed theme'), [isDimmed]);

  return (
    <button
      type="button"
      className={`theme-toggle ${isDimmed ? 'theme-toggle--dimmed' : 'theme-toggle--dark'}`}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isDimmed ? <Sun size={16} /> : <Moon size={16} />}
      </span>
      <span className="theme-toggle__text">{isDimmed ? 'Dimmed' : 'Dark'}</span>
    </button>
  );
};

export default ThemeToggle;