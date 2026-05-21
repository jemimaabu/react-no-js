// Augment React's typings with the Popover API attributes used by several
// demos and the perf panel. These shipped in HTML before React's types
// caught up, so we declare them here once.
declare module 'react' {
  interface HTMLAttributes<T> {
    popover?: '' | 'auto' | 'manual';
    popovertarget?: string;
  }
  interface ButtonHTMLAttributes<T> {
    popovertarget?: string;
    popovertargetaction?: 'toggle' | 'show' | 'hide';
  }
}

// Side-effect CSS imports (Vite handles these at build time).
declare module '*.css';

export {};
