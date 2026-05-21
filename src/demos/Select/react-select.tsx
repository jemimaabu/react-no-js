import { useEffect, useRef, useState } from 'react';
import { useRenderCount } from '../../perf/PerfPanel';

type Pokemon = {
  value: string;
  label: string;
  img: string;
  bg: string;
};

const POKEMON: Pokemon[] = [
  {
    value: 'charmander',
    label: 'Charmander',
    img: 'https://static.wikia.nocookie.net/allspecies/images/5/56/Charmander.png/',
    bg: '#F8C9A0',
  },
  {
    value: 'bulbasaur',
    label: 'Bulbasaur',
    img: 'https://static.wikia.nocookie.net/allspecies/images/4/43/Bulbasaur.png',
    bg: '#BEE8D0',
  },
  {
    value: 'pichu',
    label: 'Pichu',
    img: 'https://static.wikia.nocookie.net/allspecies/images/9/9d/Pichu.png',
    bg: '#FFF6B2',
  },
  {
    value: 'squirtle',
    label: 'Squirtle',
    img: 'https://archives.bulbagarden.net/media/upload/thumb/5/54/0007Squirtle.png/500px-0007Squirtle.png',
    bg: '#BEE2F5',
  },
];

export function ReactPokemonSelect() {
  useRenderCount('Select · <ReactPokemonSelect>');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const selected = POKEMON.find((p) => p.value === value) ?? null;

  // Outside-click to close
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Scroll active option into view
  useEffect(() => {
    if (!open) return;
    const el = listboxRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  const choose = (i: number) => {
    setValue(POKEMON[i].value);
    setActiveIndex(i);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) setOpen(true);
        else setActiveIndex((i) => (i + 1) % POKEMON.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!open) setOpen(true);
        else setActiveIndex((i) => (i - 1 + POKEMON.length) % POKEMON.length);
        break;
      case 'Home':
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case 'End':
        if (open) {
          e.preventDefault();
          setActiveIndex(POKEMON.length - 1);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (open) choose(activeIndex);
        else setOpen(true);
        break;
      case 'Escape':
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
    }
  };

  return (
    <div className="react-select" ref={rootRef}>
      <button
        type="button"
        className="react-select__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span className="react-select__value">
          {selected ? (
            <>
              <img src={selected.img} alt="" width={24} height={24} />
              {selected.label}
            </>
          ) : (
            <span className="react-select__placeholder">Choose a baby Pokémon</span>
          )}
        </span>
        <span className="arrow" aria-hidden />
      </button>
      {open && (
        <ul
          className="react-select__listbox"
          role="listbox"
          ref={listboxRef}
          tabIndex={-1}
        >
          {POKEMON.map((p, i) => {
            const isSel = p.value === value;
            const isActive = i === activeIndex;
            return (
              <li
                key={p.value}
                role="option"
                aria-selected={isSel}
                className={
                  'react-select__option' +
                  (isActive ? ' is-active' : '') +
                  (isSel ? ' is-selected' : '')
                }
                style={{ ['--bg' as string]: p.bg }}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => choose(i)}
              >
                <img src={p.img} alt="" width={24} height={24} />
                {p.label}
                {isSel && <span className="react-select__check">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
