import { useRenderCount } from '../../perf/PerfPanel';

const ITEMS = [
  {
    q: 'Why should I avoid JS for this?',
    a: 'Less code to ship, parse, execute. Inbuilt accessibility by default. Works without hydration.',
  },
  {
    q: 'What about animation?',
    a: 'Modern CSS supports interpolate-size and calc-size() for animating to auto height.',
  },
  {
    q: 'Browser support?',
    a: '<details>/<summary> are universally supported. The animated height bit is progressive enhancement.',
  },
];

export function CssAccordion({ exclusive }: { exclusive: boolean }) {
  useRenderCount('Accordion · <CssAccordion> [CSS]');

  return (
    <div>
      <div className="accordion native">
        {ITEMS.map((it, i) => (
          <details
            key={i}
            // open={i === 0}
            // The whole feature: one HTML attribute.
            name={exclusive ? 'faq' : undefined}
            className="accordion-item"
          >
            <summary className="accordion-trigger">
              {it.q}
              <span className="chev" aria-hidden>▾</span>
            </summary>
            <div className="accordion-panel">
              <p>{it.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
