import { useState } from 'react';
import { useRenderCount } from '../../perf/PerfPanel';
import './CarouselReact.css';

const SLIDES = ['🍓', '🍊', '🍋', '🍇', '🍉', '🍑'];

export function ReactCarousel() {
  useRenderCount('Carousel · <ReactCarousel>');
  const [i, setI] = useState(0);
  const prev = () => setI((v) => (v - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setI((v) => (v + 1) % SLIDES.length);

  return (
    <div className="carousel r-carousel">
      <div className="r-viewport">
        <div
          className="r-rail"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {SLIDES.map((s, idx) => (
            <div className="r-slide" key={idx}>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <button
          className="r-scroll-button r-scroll-button--left"
          onClick={prev}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className="r-scroll-button r-scroll-button--right"
          onClick={next}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
      <div className="r-dots" role="tablist">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={i === idx}
            aria-label={`Slide ${idx + 1}`}
            className={`dot ${i === idx ? 'on' : ''}`}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </div>
  );
}
