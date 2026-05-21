import { useRenderCount } from '../../perf/PerfPanel';

export function CssModal() {
  useRenderCount('Modal · <CssModal> [CSS]');
  return (
    <>
      <button className="btn" popovertarget="native-popover">
        Open native popover
      </button>
      <div id="native-popover" popover="auto" className="native-popover">
        <h4>Native popover</h4>
        <p>
          Top-layer rendering, backdrop, focus management, Esc-to-close and
          light-dismiss are all built-in. <br></br>Animated open/close with{' '}
          <code>::backdrop</code> and <code>@starting-style</code>.
        </p>
        <button className="btn" popovertarget="native-popover" popovertargetaction="hide">
          Close
        </button>
      </div>
    </>
  );
}
