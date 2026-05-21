import { useEffect, useRef, useState } from 'react';
import { useRenderCount } from '../../perf/PerfPanel';

const CARDS = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`);

function ReactScrollItem({ label }: { label: string }) {
  useRenderCount('Scroll · <ScrollItem>');
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scroll-card r-scroll ${visible ? 'in' : 'out'}`}>
      <h4>{label}</h4>
      <p>React + IntersectionObserver + per-item state.</p>
    </div>
  );
}

export function ReactScroll() {
  useRenderCount('Scroll · <ReactScroll>');
  return (
    <div className="scroll-track">
      {CARDS.map((c) => (
        <ReactScrollItem key={c} label={c} />
      ))}
    </div>
  );
}
