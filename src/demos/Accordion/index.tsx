import { useState } from 'react';
import { DemoSplit } from '../../components/DemoSplit';
import { ReactAccordion } from './react-accordion';
import { CssAccordion } from './inbuilt-accordion';
import './accordion.css';

export function AccordionDemo() {
  // React side
  const [reactExclusive, setReactExclusive] = useState(false);
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  // When exclusive is turned on, collapse down to at most one open panel.
  const onReactExclusiveChange = (checked: boolean) => {
    setReactExclusive(checked);
    if (checked) {
      setOpen((prev) => {
        const first = prev.values().next().value;
        return first === undefined ? new Set() : new Set([first]);
      });
    }
  };

  // CSS side
  const [cssExclusive, setCssExclusive] = useState(false);

  return (
    <DemoSplit
      reactSide={
        <ReactAccordion
          exclusive={reactExclusive}
          open={open}
          setOpen={setOpen}
        />
      }
      cssSide={<CssAccordion exclusive={cssExclusive} />}
      reactHeaderExtra={
        <label className="exclusive-toggle">
          <input
            type="checkbox"
            checked={reactExclusive}
            onChange={(e) => onReactExclusiveChange(e.target.checked)}
          />
          Exclusive
        </label>
      }
      cssHeaderExtra={
        <label className="exclusive-toggle">
          <input
            type="checkbox"
            checked={cssExclusive}
            onChange={(e) => setCssExclusive(e.target.checked)}
          />
          Exclusive
        </label>
      }
      reactNotes={
        <ul>
          <li>
            Set-based state for which panels are open, plus extra logic to
            collapse to one when "exclusive" is toggled on.
          </li>
          <li>Re-renders the entire accordion subtree on every click.</li>
        </ul>
      }
      cssNotes={
        <ul>
          <li>
            Native <code>&lt;details&gt;</code> with a shared{' '}
            <code>name</code> gives you exclusive accordion behaviour for
            free — that's the entire feature.
          </li>
          <li>Inbuilt keyboard and screen reader functionality.</li>
        </ul>
      }
    />
  );
}
