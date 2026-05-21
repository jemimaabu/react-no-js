import { useState } from 'react';
import { ThemeSwitcherDemo } from './demos/ThemeSwitcher';
import { AccordionDemo } from './demos/Accordion';
import { ModalDemo } from './demos/Modal';
import { ScrollDemo } from './demos/Scroll';
import { CarouselDemo } from './demos/Carousel';
import { SelectDemo } from './demos/Select';
import { PerfProvider, PerfPanel, usePerfReset } from './perf/PerfPanel';
import { GlobalThemeSwitch } from './components/GlobalThemeSwitch';

const DEMOS = [
  { id: 'theme', label: 'Theme Switcher', component: ThemeSwitcherDemo },
  { id: 'accordion', label: 'Accordion', component: AccordionDemo },
  { id: 'modal', label: 'Modal', component: ModalDemo },
  { id: 'scroll', label: 'Scroll Animations', component: ScrollDemo },
  { id: 'carousel', label: 'Carousel', component: CarouselDemo },
  { id: 'select', label: 'Customizable Select', component: SelectDemo },
] as const;

type DemoId = (typeof DEMOS)[number]['id'];

function AppShell() {
  const [active, setActive] = useState<DemoId>('theme');
  const Active = DEMOS.find((d) => d.id === active)!.component;
  const resetPerf = usePerfReset();

  // Clear perf counters BEFORE switching demos, so the new demo's initial-
  // mount measurements (which fire in child useEffects, before any parent
  // effect could reset) survive the rAF flush.
  const switchTo = (id: DemoId) => {
    if (id === active) return;
    resetPerf();
    setActive(id);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-titlebar">
          <div>
            <h1>Your React App Doesn't Need All That JavaScript</h1>
            <p className="tagline">
              The <strong>React way</strong> vs the{' '}
              <strong>Inbuilt way</strong>.
            </p>
          </div>
          <GlobalThemeSwitch />
        </div>
        <nav className="tabs" role="tablist">
          {DEMOS.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={active === d.id}
              className={active === d.id ? 'tab active' : 'tab'}
              onClick={() => switchTo(d.id)}
            >
              {d.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="demo-stage" key={active}>
        <Active />
      </main>

      <PerfPanel />
    </div>
  );
}

export function App() {
  return (
    <PerfProvider>
      <AppShell />
    </PerfProvider>
  );
}
