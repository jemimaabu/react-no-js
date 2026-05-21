import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRenderCount } from '../../perf/PerfPanel';

export function ReactModal() {
  useRenderCount('Modal · <ReactModal>');
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement;
      closeRef.current?.focus();
    } else {
      lastFocus.current?.focus();
    }
  }, [open]);

  // Esc to close + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>
        Open React modal
      </button>
      {open &&
        createPortal(
          <div
            className="r-backdrop"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <div role="dialog" aria-modal="true" aria-labelledby="r-title" className="r-modal">
              <h4 id="r-title">React modal</h4>
              <p>Manually implement backdrop, focus trap (ish), esc-to-close, scroll lock, portal.</p>
              <button ref={closeRef} className="btn" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
