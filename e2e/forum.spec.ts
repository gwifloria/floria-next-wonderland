import { expect, test } from "@playwright/test";

// Helpers
function nowTs() {
  return Date.now();
}

// Route patterns (eco-node backend)
const LIST_URL = "**/api/message/list**";
const SEND_URL = "**/api/message/send";

// --- Test 1: Render editor & post a rich-text message ---
test("forum: render editor and post message", async ({ page }) => {
  // Mock initial list as empty
  await page.route(LIST_URL, async (route) => {
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    });
  });

  // Intercept POST /send and echo a created doc
  await page.route(SEND_URL, async (route) => {
    const body = route.request().postDataJSON() as { content?: string };
    const safeHtml = body?.content || "<p></p>";
    const created = { _id: "mock-1", content: safeHtml, createdAt: nowTs() };
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(created),
    });
  });

  await page.goto("/forum");

  // Basic UI renders
  await expect(page.getByRole("heading", { name: /留言板/i })).toBeVisible();
  await expect(page.locator('[contenteditable="true"]').first()).toBeVisible();
  await expect(page.getByRole("button", { name: "发布" })).toBeVisible();

  // Type some rich text: make a link, bold, etc. (contentEditable)
  const editor = page.locator('[contenteditable="true"]').first();
  await editor.click();
  await editor.type("Hello world ");
  // Insert a link via execCommand through the page context
  await page.evaluate(() => {
    document.execCommand("createLink", false, "https://example.com");
  });
  await editor.type("link");

  // Post
  await page.getByRole("button", { name: "发布" }).click();

  // The newly created message appears at top
  const firstArticle = page.locator("article").first();
  await expect(firstArticle).toContainText("Hello world");

  // Link should be rendered and open in new tab (sanitized attrs added on server)
  const link = firstArticle.locator("a", { hasText: "link" });
  await expect(link).toHaveAttribute("href", "https://example.com/");
  // some browsers normalize missing trailing slash; accept either
  const hrefVal = await link.getAttribute("href");
  expect(hrefVal && hrefVal.startsWith("https://example.com")).toBeTruthy();
  await expect(link).toHaveAttribute("target", "_blank");
});

// --- Test 2: Pagination via `before` cursor ---
test("forum: load more pagination", async ({ page }) => {
  const t1 = nowTs() - 1000; // newer
  const t2 = nowTs() - 5000; // older

  const firstBatch = [
    { _id: "a1", content: "<p>Newest message A1</p>", createdAt: t1 },
  ];
  const secondBatch = [
    { _id: "b1", content: "<p>Older message B1</p>", createdAt: t2 },
  ];

  // Mock list with cursor
  await page.route(LIST_URL, async (route) => {
    const url = new URL(route.request().url());
    const before = Number(url.searchParams.get("before") || "");
    const payload = !before ? firstBatch : secondBatch;
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(payload),
    });
  });

  // No posting in this test
  await page.route(SEND_URL, async (route) => {
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        _id: "noop",
        content: "<p>noop</p>",
        createdAt: nowTs(),
      }),
    });
  });

  await page.goto("/forum");

  // First batch visible
  await expect(page.locator("article").first()).toContainText(
    "Newest message A1",
  );

  // Click Load More -> should fetch second batch and append
  const loadMoreBtn = page.getByRole("button", { name: "加载更多" });
  await expect(loadMoreBtn).toBeVisible();
  await loadMoreBtn.click();

  await expect(page.locator("article").nth(1)).toContainText(
    "Older message B1",
  );
});
