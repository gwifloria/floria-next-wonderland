// tests/blog.spec.ts (Playwright 测试文件)
import { expect, Page, test } from "@playwright/test";

// Helpers
async function skipIfNoPosts(page: Page) {
  // 如果侧边栏没有任何文章条目，则跳过
  const count = await page.locator("aside nav a").count();
  if (count === 0) {
    test.skip(true, "No blogs available in content directories.");
  }
}

async function firstLinkUnder(page: Page, headingText: string) {
  // 找到分组标题（ByteNotes / Murmurs）所在 section，然后取第一个链接
  const section = page.getByText(headingText).locator("..");
  const link = section.locator("a").first();
  const href = await link.getAttribute("href");
  return { link, href } as const;
}

function activeLink(page: Page, href: string) {
  return page.locator(`aside nav a[href='${href}']`);
}

function accentSpanIn(linkLocator: ReturnType<typeof activeLink>) {
  // 选中项时，左侧会渲染一个表示分类色条的 span（在 Link 内部）
  return linkLocator.locator("span").first();
}

// ------------------------------
// Tests
// ------------------------------

test.describe("/blog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
    await skipIfNoPosts(page);
  });

  test("shows grouped sidebar with ByteNotes & Murmurs", async ({ page }) => {
    await expect(page.getByText("ByteNotes")).toBeVisible();
    await expect(page.getByText("Murmurs")).toBeVisible();
  });

  test("navigates to a ByteNotes blog and highlights as active (nepal accent)", async ({
    page,
  }) => {
    const { link, href } = await firstLinkUnder(page, "ByteNotes");
    await link.click();

    // URL 应为文件式路由 /blog/ByteNotes/...
    await expect(page).toHaveURL(/\/blog\/ByteNotes\//i);

    // 选中态：侧边栏对应链接加粗/高亮，并带有 nepal 色条
    if (href) {
      const active = activeLink(page, href);
      await expect(active).toHaveClass(/font-semibold|bg-neutral/);
      const accent = accentSpanIn(active);
      await expect(accent).toHaveClass(/bg-nepal-300\/40/);
    }

    // 正文可见
    await expect(page.locator("article")).toBeVisible();
  });

  test("navigates to a Murmurs blog and highlights as active (rose accent)", async ({
    page,
  }) => {
    const { link, href } = await firstLinkUnder(page, "Murmurs");
    await link.click();

    await expect(page).toHaveURL(/\/blog\/Murmurs\//i);

    if (href) {
      const active = activeLink(page, href);
      await expect(active).toHaveClass(/font-semibold|bg-neutral/);
      const accent = accentSpanIn(active);
      await expect(accent).toHaveClass(/bg-rose-300\/40/);
    }

    await expect(page.locator("article")).toBeVisible();
  });

  test("selection persists across reload via path", async ({ page }) => {
    // 选择 ByteNotes 第一篇
    const { link, href } = await firstLinkUnder(page, "ByteNotes");
    await link.click();

    await expect(page).toHaveURL(/\/blog\/ByteNotes\//i);

    // 刷新后仍然保持选中态
    await page.reload();

    if (href) {
      const active = activeLink(page, href);
      await expect(active).toHaveClass(/font-semibold|bg-neutral/);
    }

    // 正文仍可见
    await expect(page.locator("article")).toBeVisible();
  });
});
