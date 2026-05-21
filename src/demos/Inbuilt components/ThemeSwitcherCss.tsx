import { useRenderCount } from '../../perf/PerfPanel';
import './ThemeSwitcherCss.css';

export function CssThemeApp() {
  useRenderCount('Theme · <CssThemeApp> [CSS]');
  return (
    <div className="css-theme-root">
      <label className="btn switch" htmlFor="theme-switcher">
        <input type="checkbox" id="theme-switcher" />
        <span>Toggle dark mode</span>
      </label>
      <div className="themed-card themed-light">
        <h4>Hello, world</h4>
        <p>Current theme: <span className="theme-name" /></p>
        <p>Look ma, no re-renders &#128588;.</p>
      </div>
      <div className="themed-card themed-light">
        <h4>Another card</h4>
        <p>Driven entirely by <code>:has()</code> on the ancestor.</p>
      </div>
      <div className="themed-card themed-light">
        <h4>And - you guessed it - yet another!</h4>
        <p>Let the browser do all the work.</p>
      </div>
      <aside className="support-note support-note--has">
        ⚠️ Your browser does not yet support the <code>:has()</code> selector.
        Try again in Chrome 105+, Safari 15.4+ or Firefox 121+.
      </aside>
    </div>
  );
}
