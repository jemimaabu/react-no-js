import { DemoSplit } from '../../components/DemoSplit';
import { ReactPokemonSelect } from './react-select';
import { CssPokemonSelect } from './inbuilt-select';
import './select.css';

export function SelectDemo() {
  return (
    <DemoSplit
      reactSide={<ReactPokemonSelect />}
      cssSide={<CssPokemonSelect />}
      cssHeaderExtra={
        <label className="css-select-toggle" htmlFor="toggle-select">
          <input type="checkbox" id="toggle-select" />
          Hide <code>appearance: base-select</code>
        </label>
      }
      reactNotes={
        <ul>
          <li>
            Open state, active-index state, value state, outside-click effect,
            scroll-into-view effect, full keyboard handler.
          </li>
          <li>
            Every keystroke and hover bumps the render counter — and we still
            haven't shipped the screen-reader semantics a native{' '}
            <code>&lt;select&gt;</code> gets for free.
          </li>
          <li>
            Form integration, mobile native pickers, autofill — all extra work.
          </li>
        </ul>
      }
      cssNotes={
        <ul>
          <li>
            One <code>&lt;select&gt;</code> with{' '}
            <code>appearance: base-select</code>. Put real HTML —{' '}
            <code>&lt;img&gt;</code>, layout, anything — inside{' '}
            <code>&lt;option&gt;</code>.
          </li>
          <li>
            <code>&lt;selectedcontent&gt;</code> mirrors the chosen option into
            the trigger. <code>::picker(select)</code> styles the dropdown
            surface.
          </li>
          <li>
            Staggered open animation via{' '}
            <code>@starting-style</code> + <code>sibling-index()</code>.
            Toggle the checkbox to flip back to the native UA appearance.
          </li>
        </ul>
      }
    />
  );
}
