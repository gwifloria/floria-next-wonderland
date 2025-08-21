import { expect, Page, test } from "@playwright/test";

// Helpers
async function skipIfEmpty(page: Page) {
  const empty = page.getByText("暂无可用文章");
  if (await empty.isVisible()) {
    test.skip(true, "No posts available in content directories.");
  }
}

function accentLocator(page: Page) {
  // The accent bar is the first top divider inside <main>
  return page.locator("main > div").first();
}

test.describe("/blog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
    await skipIfEmpty(page);
  });

  test("shows grouped sidebar with ByteNotes & Murmurs", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
    await expect(page.getByText("ByteNotes")).toBeVisible();
    await expect(page.getByText("Murmurs")).toBeVisible();
  });

  test("navigates to a ByteNotes post and sets nepal accent", async ({
    page,
  }) => {
    const bytenoteLink = page.locator('a[href*="post=bytenotes/"]').first();
    await bytenoteLink.click();

    await expect(page).toHaveURL(/post=bytenotes\//);

    // Accent bar color class should use nepal palette for ByteNotes
    const accent = accentLocator(page);
    await expect(accent).toHaveClass(/bg-nepal-300\/40/);

    // Article content renders
    await expect(page.locator("article")).toBeVisible();
  });

  test("navigates to a Murmurs post and sets rose accent", async ({ page }) => {
    const murmursLink = page.locator('a[href*="post=murmurs/"]').first();
    await murmursLink.click();

    await expect(page).toHaveURL(/post=murmurs\//);

    const accent = accentLocator(page);
    await expect(accent).toHaveClass(/bg-rose-300\/40/);
    await expect(page.locator("article")).toBeVisible();
  });

  test("selection persists across reload via query param", async ({ page }) => {
    // Pick first ByteNotes link
    const bytenoteLink = page.locator('a[href*="post=bytenotes/"]').first();
    const href = await bytenoteLink.getAttribute("href");
    await bytenoteLink.click();
    await expect(page).toHaveURL(/post=bytenotes\//);

    // Reload and ensure accent still matches ByteNotes
    await page.reload();
    const accent = accentLocator(page);
    await expect(accent).toHaveClass(/bg-nepal-300\/40/);

    // Active item should be visually highlighted (font-semibold or bg-neutral)
    if (href) {
      const active = page.locator(`a[href='${href}']`);
      await expect(active).toHaveClass(/font-semibold/);
    }
  });
});
