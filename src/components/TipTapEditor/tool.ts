import DOMPurify from "dompurify";

let __sanHooksInstalled = false;

export function sanitizeHtml(html: string): string {
  if (!html) return "";

  // Install one-time hooks (idempotent) to enforce safe attrs after sanitize
  if (!__sanHooksInstalled && typeof window !== "undefined") {
    DOMPurify.addHook("afterSanitizeAttributes", (node: Element) => {
      const tag = (node.tagName || "").toUpperCase();
      // Normalize links: enforce safe href, _blank and rel
      if (tag === "A") {
        // strip dangerous protocols
        const href = (node.getAttribute("href") || "").trim();
        const isHttp = /^https?:\/\//i.test(href);
        if (!isHttp) node.setAttribute("href", "#");
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer nofollow");
      }
      // Only allow http/https or data:image on <img>
      if (tag === "IMG") {
        const src = (node.getAttribute("src") || "").trim();
        const isSafe = /^https?:\/\//i.test(src) || /^data:image\//i.test(src);
        if (!isSafe) node.removeAttribute("src");
        // Avoid JS in alt/title via weird encodings
        ["alt", "title"].forEach((attr) => {
          const v = node.getAttribute(attr);
          if (v && /javascript:/i.test(v)) node.removeAttribute(attr);
        });
      }
      // Drop any inline event handlers that might slip through
      // (config also forbids them, this is a hard guard)
      for (const { name, value } of Array.from(node.attributes)) {
        if (/^on/i.test(name) || /javascript:/i.test(value || "")) {
          node.removeAttribute(name);
        }
      }
    });
    __sanHooksInstalled = true;
  }

  return DOMPurify.sanitize(html, {
    // Use DOMPurify profiles for typical HTML; we still fine-tune below
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "b",
      "strong",
      "i",
      "em",
      "u",
      "s",
      "span",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "code",
      "pre",
      "h2",
      "h3",
      "img",
      "hr",
      "mark",
      // allow basic tables if用户需要粘贴表格
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "target",
      "rel",
      // basic table attrs
      "colspan",
      "rowspan",
      "scope",
    ],
    // Only allow http/https, and data:image/* (no other data: payloads)
    ALLOWED_URI_REGEXP: /^(?:https?:|data:image\/)/i,
    FORBID_TAGS: ["script", "style"],
    FORBID_ATTR: ["on*"],
    ADD_ATTR: ["rel", "target"],
    // Keep IDs & classes out unless你确实需要它们在富文本中
    ALLOW_ARIA_ATTR: false,
    KEEP_CONTENT: true,
  }) as string;
}
