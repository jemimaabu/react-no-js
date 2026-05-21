import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type Stat = { count: number; totalMs: number; lastMs: number };
type Stats = Record<string, Stat>;

type Actions = {
  record: (label: string, durationMs: number) => void;
  reset: () => void;
  subscribe: (fn: (s: Stats) => void) => () => void;
  getSnapshot: () => Stats;
};

const ActionsCtx = createContext<Actions | null>(null);

export function PerfProvider({ children }: { children: ReactNode }) {
  // Stats live in a ref + manual subscription so updating them does NOT
  // re-render the provider tree. Only the PerfPanel subscribes.
  const statsRef = useRef<Stats>({});
  const listenersRef = useRef<Set<(s: Stats) => void>>(new Set());

  type PendingEntry = { count: number; totalMs: number; lastMs: number };
  const buffer = useRef<Record<string, PendingEntry>>({});
  const scheduled = useRef(false);

  const flush = useCallback(() => {
    scheduled.current = false;
    const buf = buffer.current;
    buffer.current = {};
    const next: Stats = { ...statsRef.current };
    for (const k in buf) {
      const prev = next[k] ?? { count: 0, totalMs: 0, lastMs: 0 };
      const inc = buf[k];
      next[k] = {
        count: prev.count + inc.count,
        totalMs: prev.totalMs + inc.totalMs,
        lastMs: inc.lastMs,
      };
    }
    statsRef.current = next;
    listenersRef.current.forEach((fn) => fn(next));
  }, []);

  const record = useCallback(
    (label: string, durationMs: number) => {
      const entry = buffer.current[label] ?? { count: 0, totalMs: 0, lastMs: 0 };
      entry.count += 1;
      entry.totalMs += durationMs;
      entry.lastMs = durationMs;
      buffer.current[label] = entry;
      if (!scheduled.current) {
        scheduled.current = true;
        requestAnimationFrame(flush);
      }
    },
    [flush]
  );

  const reset = useCallback(() => {
    statsRef.current = {};
    buffer.current = {};
    try {
      performance.clearMarks();
      performance.clearMeasures();
    } catch {
      /* ignore */
    }
    listenersRef.current.forEach((fn) => fn(statsRef.current));
  }, []);

  const subscribe = useCallback((fn: (s: Stats) => void) => {
    listenersRef.current.add(fn);
    return () => {
      listenersRef.current.delete(fn);
    };
  }, []);

  const getSnapshot = useCallback(() => statsRef.current, []);

  // Stable context value — never changes after mount, so children never
  // re-render because of the perf system itself.
  const actionsRef = useRef<Actions>({ record, reset, subscribe, getSnapshot });

  return (
    <ActionsCtx.Provider value={actionsRef.current}>
      {children}
    </ActionsCtx.Provider>
  );
}

function useActions() {
  const v = useContext(ActionsCtx);
  if (!v) throw new Error('PerfProvider missing');
  return v;
}

/** Returns a stable function that clears the perf panel. */
export function usePerfReset() {
  return useActions().reset;
}

/**
 * Counts every render of the calling component under `label` and records
 * its render duration via `performance.measure()`.
 */
export function useRenderCount(label: string) {
  const { record } = useActions();
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Mark the start of this render synchronously, before commit.
  const startMark = `${label}:start:${renderCount.current}`;
  const endMark = `${label}:end:${renderCount.current}`;
  const measureName = `⚛ ${label}`;
  try {
    performance.mark(startMark);
  } catch {
    /* ignore */
  }

  useEffect(() => {
    let durationMs = 0;
    try {
      performance.mark(endMark);
      const m = performance.measure(measureName, startMark, endMark);
      durationMs = m?.duration ?? 0;
    } catch {
      durationMs = 0;
    }
    record(label, durationMs);
    // Runs after every render; record is stable and does not cause re-renders here.
  });

  return renderCount.current;
}

export const PerfPanel = memo(function PerfPanel() {
  const { subscribe, getSnapshot, reset } = useActions();
  const [, force] = useState(0);
  const [showTime, setShowTime] = useState(false);

  useEffect(() => subscribe(() => force((n) => n + 1)), [subscribe]);

  const stats = getSnapshot();
  const entries = Object.entries(stats).sort((a, b) => b[1].count - a[1].count);
  const totalRenders = entries.reduce((s, [, v]) => s + v.count, 0);
  const totalMs = entries.reduce((s, [, v]) => s + v.totalMs, 0);

  const fmt = (ms: number) =>
    ms >= 10 ? ms.toFixed(1) : ms >= 1 ? ms.toFixed(2) : ms.toFixed(3);

  return (
    <div className="perf-sidebar">
      <button
        type="button"
        className="perf-handle"
        popovertarget="perf-popover"
        aria-label="Toggle render counters"
      >
        <span className="perf-handle__arrow" aria-hidden />
        <span className="perf-handle__label">Renders</span>
        <span className="perf-handle__count">{totalRenders}</span>
      </button>
      <aside
        id="perf-popover"
        popover="manual"
        className="perf-panel"
        aria-label="Render performance"
      >
        <header>
          <h2>Render counters</h2>
          <button onClick={reset}>Reset</button>
        </header>
        <label className="perf-toggle">
          <input
            type="checkbox"
            checked={showTime}
            onChange={(e) => setShowTime(e.target.checked)}
          />
          Show performance time
        </label>
        <p className="perf-total">
          Total React renders: <strong>{totalRenders}</strong>
          {showTime && (
            <>
              <br />
              Total render time: <strong>{fmt(totalMs)} ms</strong>
            </>
          )}
        </p>
        {entries.length === 0 ? (
          <p className="perf-empty">Interact with the demos to see counts.</p>
        ) : (
          <ul>
            {entries.map(([label, s]) => {
              const isCss = label.includes('[CSS]');
              return (
                <li key={label} className={isCss ? 'is-css' : 'is-react'}>
                  <span className="perf-label">{label}</span>
                  <span className="perf-count">
                    {s.count}×
                    {showTime && <> · {fmt(s.totalMs)} ms</>}
                    {showTime && (
                      <small className="perf-last"> (last {fmt(s.lastMs)} ms)</small>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </aside>
    </div>
  );
});
