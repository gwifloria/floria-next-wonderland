// -----------------------------
// Markdown element overrides

import { Components } from "react-markdown";

// -----------------------------
export const mdxComponents: Components = {
  a: ({ node, ...props }) => (
    <a {...props} className="no-underline hover:underline text-nepal-600" />
  ),
  code(props) {
    const { inline, className, children, ...rest } = props as any;
    if (inline) {
      return (
        <code
          className="rounded bg-neutral-50 px-1 py-0.5 text-[0.9em] text-rose-600"
          {...rest}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={(className || "") + " text-sm font-mono"} {...rest}>
        {children}
      </code>
    );
  },
  pre: ({ node, ...props }) => (
    <pre
      {...props}
      className="not-prose rounded-lg bg-neutral-900/90text-neutral-100 p-4 overflow-x-auto my-5 border border-neutral-700/50"
    />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      {...props}
      className="rounded-md border-l-4 border-nepal-500/70 bg-neutral-50 px-4 py-3 my-5"
    />
  ),
};
