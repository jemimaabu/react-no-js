import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRenderCount } from '../../perf/PerfPanel';

type Theme = 'light' | 'dark';
type ThemeCtx = { theme: Theme; toggle: () => void };
const ThemeContext = createContext<ThemeCtx | null>(null);

function ReactThemeProvider({ children }: { children: ReactNode }) {
  useRenderCount('Theme · <ThemeProvider>');
  const [theme, setTheme] = useState<Theme>('light');

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('react-theme') as Theme | null;
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem('react-theme', theme);
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    []
  );

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const v = useContext(ThemeContext);
  if (!v) throw new Error('useTheme must be inside ThemeProvider');
  return v;
}

function ReactThemedCard() {
  useRenderCount('Theme · <ThemedCard>');
  const { theme } = useTheme();
  return (
    <div className={`themed-card themed-${theme}`}>
      <h4>Hello, world</h4>
      <p>Current theme: {theme}</p>
      <p>This card re-renders every time the theme flips.</p>
    </div>
  );
}

function ReactThemeToggle() {
  useRenderCount('Theme · <ThemeToggle>');
  const { theme, toggle } = useTheme();
  return (
    <button className="btn" onClick={toggle}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}

export function ReactThemeApp() {
  useRenderCount('Theme · <App>');
  return (
    <ReactThemeProvider>
      <ReactThemeToggle />
      <ReactThemedCard />
      <ReactThemedCard />
      <ReactThemedCard />
    </ReactThemeProvider>
  );
}
