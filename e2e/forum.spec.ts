import { expect, test } from "@playwright/test";

const LIST_URL = "**/api/message/list**";
const SEND_URL = "**/api/message/send";
const nowTs = () => Date.now();

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
  const editor = page.locator('[contenteditable="true"]').first();
  await expect(editor).toBeVisible();
  await expect(page.getByTestId("post-btn")).toBeVisible();
  // 输入内容
  await editor.click();
  await editor.type("Hello world!");

  // 发布
  await page.getByTestId("post-btn").click();

  // 新消息出现在顶部
  const firstArticle = page.locator("article").first();
  await expect(firstArticle).toContainText("Hello world!");
});
