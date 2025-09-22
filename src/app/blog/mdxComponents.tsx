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
        <code className="rounded bg-rose-50/80 px-1 py-0.5 text-[0.9em] text-rose-600">
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
      className="not-prose rounded-lg bg-neutral-100 text-sm leading-relaxed font-mono p-4 overflow-x-auto whitespace-pre-wrap break-words my-5 border border-neutral-300 scrollbar-thin scrollbar-thumb-neutral-700/50 scrollbar-track-transparent"
    />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      {...props}
      className="rounded-md border-l-4 border-nepal-500/70 bg-neutral-50 px-4 py-3 my-5"
    />
  ),
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-6 shadow-sm">
      <table
        {...props}
        className="min-w-full divide-y divide-neutral-300 border border-neutral-300 rounded-lg bg-white"
      />
    </div>
  ),
  thead: ({ node, ...props }) => <thead {...props} className="bg-rose-50/80" />,
  tbody: ({ node, ...props }) => (
    <tbody {...props} className="divide-y divide-neutral-200 bg-white" />
  ),
  tr: ({ node, ...props }) => (
    <tr
      {...props}
      className="hover:bg-neutral-50/80 transition-colors duration-150"
    />
  ),
  th: ({ node, ...props }) => (
    <th
      {...props}
      className="px-3 py-3 text-left text-sm font-semibold text-neutral-900 border-r border-neutral-300 last:border-r-0 min-w-0"
    />
  ),
  td: ({ node, ...props }) => (
    <td
      {...props}
      className="px-3 py-3 text-sm text-neutral-700 border-r border-neutral-200 last:border-r-0 min-w-0 break-words"
    />
  ),
};
