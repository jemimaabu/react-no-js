import { useRenderCount } from '../../perf/PerfPanel';
import './ScrollCss.css';

const CARDS = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`);

export function CssScroll() {
  useRenderCount('Scroll · <CssScroll> [CSS]');
  return (
    <div className="scroll-track">
      {CARDS.map((c) => (
        <div key={c} className="scroll-card css-scroll">
          <h4>{c}</h4>
          <p>
            <code>animation-timeline: view()</code> — pure CSS, off the main
            thread.
          </p>
        </div>
      ))}
      <aside className="support-note support-note--scroll-timeline">
        ⚠️ Your browser does not yet support scroll-driven animations
        (<code>animation-timeline: view()</code>). Try again in Chrome 115+.
      </aside>
    </div>
  );
}
