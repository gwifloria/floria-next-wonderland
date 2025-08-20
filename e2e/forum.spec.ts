import { expect, test } from "@playwright/test";

const LIST_URL = "**/api/message/list**";
const SEND_URL = "**/api/message/send";
const MAX_CHARS = 200; // 与前端校验保持一致
const nowTs = () => Date.now();

// 生成指定长度的字符串
const str = (len: number, ch = "A") => Array(len).fill(ch).join("");

test.describe("forum editor", () => {
  test.beforeEach(async ({ page }) => {
    // Mock 列表为空
    await page.route(LIST_URL, async (route) => {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });
  });

  test("render editor and post message", async ({ page }) => {
    let sendHit = 0;
    // 拦截发布接口
    await page.route(SEND_URL, async (route) => {
      sendHit++;
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

    // 基础渲染
    await expect(page.getByRole("heading", { name: /留言板/i })).toBeVisible();
    const editor = page.locator('[contenteditable="true"]').first();
    await expect(editor).toBeVisible();
    await expect(page.getByTestId("post-btn")).toBeVisible();

    // 输入与发布
    await editor.click();
    await editor.type("Hello world!");
    await page.getByTestId("post-btn").click();

    // 新消息出现在顶部
    const firstArticle = page.locator("article").first();
    await expect(firstArticle).toContainText("Hello world!");
    expect(sendHit).toBe(1);
  });

  test("block empty submit with warning", async ({ page }) => {
    let sendHit = 0;
    await page.route(SEND_URL, async (route) => {
      sendHit++;
      const body = route.request().postDataJSON() as { content?: string };
      const created = {
        _id: "mock-empty",
        content: body?.content ?? "<p></p>",
        createdAt: nowTs(),
      };
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(created),
      });
    });

    await page.goto("/forum");

    // 不输入直接发布
    await page.getByTestId("post-btn").click();

    // 应出现“内容不能为空”的提示（antd message）且不应触发发送
    await expect(page.getByText(/内容不能为空/)).toBeVisible();
    await page.waitForTimeout(200); // 给路由一点时间（若误触发会增加 sendHit）
    expect(sendHit).toBe(0);
  });

  test("block when exceeding max characters", async ({ page }) => {
    let sendHit = 0;
    await page.route(SEND_URL, async (route) => {
      sendHit++;
      const body = route.request().postDataJSON() as { content?: string };
      const created = {
        _id: "mock-long",
        content: body?.content ?? "<p></p>",
        createdAt: nowTs(),
      };
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(created),
      });
    });

    await page.goto("/forum");

    const editor = page.locator('[contenteditable="true"]').first();
    await editor.click();
    // 输入超过限制的文本
    await editor.type(str(MAX_CHARS + 5));
    await page.getByTestId("post-btn").click();

    // 应出现“最多只能输入 XXX 个字”的提示，且不应发送请求
    await expect(
      page.getByText(new RegExp(`最多只能输入\\s*${MAX_CHARS}\\s*个字`)),
    ).toBeVisible();
    await page.waitForTimeout(200);
    expect(sendHit).toBe(0);
  });

  test("allow when within max characters", async ({ page }) => {
    let sendHit = 0;
    await page.route(SEND_URL, async (route) => {
      sendHit++;
      const body = route.request().postDataJSON() as { content?: string };
      const created = {
        _id: "mock-fit",
        content: body?.content ?? "<p></p>",
        createdAt: nowTs(),
      };
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(created),
      });
    });

    await page.goto("/forum");

    const editor = page.locator('[contenteditable="true"]').first();
    await editor.click();
    await editor.type(str(MAX_CHARS));
    await page.getByTestId("post-btn").click();

    // 允许提交并渲染一条新消息
    await expect(page.locator("article").first()).toBeVisible();
    expect(sendHit).toBe(1);
  });
});
