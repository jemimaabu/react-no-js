import type { ReactNode } from 'react';

export function DemoSplit({
  reactSide,
  cssSide,
  reactNotes,
  cssNotes,
  reactHeaderExtra,
  cssHeaderExtra,
}: {
  reactSide: ReactNode;
  cssSide: ReactNode;
  reactNotes: ReactNode;
  cssNotes: ReactNode;
  reactHeaderExtra?: ReactNode;
  cssHeaderExtra?: ReactNode;
}) {
  return (
    <div className="split">
      <section className="pane react-pane">
        <header>
          <span className="badge react">React</span>
          <h3>The React way</h3>
          {reactHeaderExtra}
        </header>
        <div className="pane-body">{reactSide}</div>
        <details className="pane-notes">
          <summary>What's going on</summary>
          {reactNotes}
        </details>
      </section>
      <section className="pane css-pane">
        <header>
          <span className="badge css">HTML + CSS</span>
          <h3>The inbuilt way</h3>
          {cssHeaderExtra}
        </header>
        <div className="pane-body">{cssSide}</div>
        <details className="pane-notes">
          <summary>What's going on</summary>
          {cssNotes}
        </details>
      </section>
    </div>
  );
}
