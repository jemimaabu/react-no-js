import { useRenderCount } from '../../perf/PerfPanel';

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
    </div>
  );
}
