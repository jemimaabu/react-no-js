import { DemoSplit } from '../components/DemoSplit';
import { ReactThemeApp } from './React components/ThemeSwitcherReact';
import { CssThemeApp } from './Inbuilt components/ThemeSwitcherCss';

export function ThemeSwitcherDemo() {
  return (
    <DemoSplit
      reactSide={<ReactThemeApp />}
      cssSide={<CssThemeApp />}
      reactNotes={
        <ul>
          <li>Context provider, custom hook, two effects, memoised value.</li>
          <li>
            Every consumer of the context re-renders when the theme flips —
            watch the counter on the right.
          </li>
          <li>
            Hydration mismatches and SSR flashes ("flash of wrong theme") need
            extra care.
          </li>
        </ul>
      }
      cssNotes={
        <ul>
          <li>One <code>&lt;input type="checkbox"&gt;</code>.</li>
          <li>
            <code>.css-theme-root:has(input:checked) .themed-card</code> applies
            dark styles to every descendant.
          </li>
          <li>No JS, no re-renders, no provider.</li>
        </ul>
      }
    />
  );
}
