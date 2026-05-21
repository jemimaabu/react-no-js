import { useEffect, useState } from 'react';
import { DemoSplit } from '../../components/DemoSplit';
import { ReactScroll } from './react-scroll';
import { CssScroll } from './inbuilt-scroll';
import './scroll.css';

export function ScrollDemo() {
  const [busy, setBusy] = useState(false);

  // Synthetic main-thread congestion: block the thread in tight bursts with
  // tiny yields between them. The React side (IntersectionObserver + state)
  // visibly stutters; the CSS side (animation-timeline: view()) stays smooth
  // because it runs off the main thread.
  useEffect(() => {
    if (!busy) return;
    const BLOCK_MS = 200;
    const YIELD_MS = 16;
    let cancelled = false;
    let timer: number | undefined;

    const burn = () => {
      if (cancelled) return;
      performance.mark('busy:start');
      const end = performance.now() + BLOCK_MS;
      // eslint-disable-next-line no-empty
      while (performance.now() < end) {}
      performance.mark('busy:end');
      try {
        performance.measure('🔥 main-thread block', 'busy:start', 'busy:end');
      } catch {
        /* ignore */
      }
      timer = window.setTimeout(burn, YIELD_MS);
    };

    timer = window.setTimeout(burn, YIELD_MS);
    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [busy]);

  return (
    <DemoSplit
      reactSide={<ReactScroll />}
      cssSide={<CssScroll />}
      reactHeaderExtra={
        <label className={`perf-toggle ${busy ? 'is-busy' : ''}`}>
          <input
            type="checkbox"
            checked={busy}
            onChange={(e) => setBusy(e.target.checked)}
          />
          Simulate busy main thread
        </label>
      }
      reactNotes={
        <ul>
          <li>
            One IntersectionObserver per item, state per item, re-render per
            transition.
          </li>
          <li>Scroll the container — watch the counter spike.</li>
        </ul>
      }
      cssNotes={
        <ul>
          <li>
            <code>animation-timeline: view()</code> + <code>animation-range</code>{' '}
            ties an animation to scroll position natively.
          </li>
          <li>
            Falls back gracefully — without support, items just appear (no
            broken UI).
          </li>
        </ul>
      }
    />
  );
}
