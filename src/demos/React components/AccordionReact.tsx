import { useRenderCount } from '../../perf/PerfPanel';
import './AccordionReact.css';

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

export function ReactAccordion({
  exclusive,
  open,
  setOpen,
}: {
  exclusive: boolean;
  open: Set<number>;
  setOpen: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
  useRenderCount('Accordion · <Accordion>');

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        if (exclusive) next.clear();
        next.add(i);
      }
      return next;
    });
  };

  return (
    <div className="accordion">
      {ITEMS.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <button
              className="accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={`r-panel-${i}`}
              id={`r-trigger-${i}`}
              onClick={() => toggle(i)}
            >
              {it.q}
              <span className="chev" aria-hidden>▾</span>
            </button>
            <div
              id={`r-panel-${i}`}
              role="region"
              aria-labelledby={`r-trigger-${i}`}
              className="accordion-panel"
              hidden={!isOpen}
            >
              <p>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
