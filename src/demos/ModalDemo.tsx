import { DemoSplit } from '../components/DemoSplit';
import { ReactModal } from './React components/ModalReact';
import { CssModal } from './Inbuilt components/ModalCss';

export function ModalDemo() {
  return (
    <DemoSplit
      reactSide={<ReactModal />}
      cssSide={<CssModal />}
      reactNotes={
        <ul>
          <li>Open state, portal, two effects, ref-based focus, scroll lock.</li>
          <li>Trap focus and inert-the-rest properly is an entire library.</li>
        </ul>
      }
      cssNotes={
        <ul>
          <li>
            <code>popovertarget</code> on the button + <code>popover</code> on
            the element. Zero JS — top-layer, backdrop, focus and Esc are free.
          </li>
          <li>
            <code>popover="auto"</code> also gives light-dismiss (click outside
            to close) without any handler.
          </li>
        </ul>
      }
    />
  );
}
