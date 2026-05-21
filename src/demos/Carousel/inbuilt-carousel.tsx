import { useRenderCount } from '../../perf/PerfPanel';

const SLIDES = ['🍓', '🍊', '🍋', '🍇', '🍉', '🍑'];

export function CssCarousel() {
  useRenderCount('Carousel · <CssCarousel> [CSS]');
  return (
    <div className="carousel css-carousel">
      <div className="snap-viewport">
        {SLIDES.map((s, idx) => (
          <div key={idx} className="snap-slide" aria-label={`Slide ${idx + 1}`}>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <aside className="support-note support-note--scroll-buttons">
        ⚠️ Your browser does not yet support <code>::scroll-button()</code> and{' '}
        <code>::scroll-marker</code>. Try again in Chrome 135+.
      </aside>
    </div>
  );
}
