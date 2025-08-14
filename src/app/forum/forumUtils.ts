export interface MessageItem {
  _id?: string;
  content: string;
  createdAt: number;
}

export function sanitizeHtml(dirty: string): string {
  const ALLOWED_TAGS = new Set([
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
  ]);
  const ALLOWED_ATTRS = new Set(["href", "target", "rel"]);
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${dirty}</div>`, "text/html");
  const container = doc.body.firstElementChild as HTMLElement | null;
  if (!container) return "";
  const walk = (node: Element) => {
    if (!ALLOWED_TAGS.has(node.tagName.toLowerCase())) {
      const p = doc.createElement("p");
      p.textContent = node.textContent || "";
      node.replaceWith(p);
      return;
    }
    [...node.getAttributeNames()].forEach((attr) => {
      const lower = attr.toLowerCase();
      if (!ALLOWED_ATTRS.has(lower)) node.removeAttribute(attr);
      if (lower === "href") {
        const href = (node.getAttribute("href") || "").trim();
        if (href && !/^https?:\/\//i.test(href)) node.setAttribute("href", "#");
        node.setAttribute("rel", "noopener noreferrer");
        node.setAttribute("target", "_blank");
      }
    });
    [...node.children].forEach((child) => walk(child));
  };
  [...container.children].forEach((child) => walk(child));
  return container.innerHTML.replace(/<p>\s*<\/p>/g, "").trim();
}

export function formatTime(ts: number) {
  const d = new Date(ts);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}
