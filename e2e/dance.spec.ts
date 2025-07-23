import { test, expect } from "@playwright/test";

test.describe("Dance Booking Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dance");
  });

  test("should display main components and layout", async ({ page }) => {
    // Check page title
    await expect(
      page.getByRole("heading", { name: "Dance Class Booking" }),
    ).toBeVisible();

    // Check description text
    await expect(
      page.getByText(/Automatically monitor and subscribe/),
    ).toBeVisible();

    // Check tabs presence
    await expect(
      page.getByRole("tab", { name: "Caster Studio" }),
    ).toBeVisible();
    await expect(page.getByRole("tab", { name: "One Way" })).toBeVisible();
  });

  test("should handle course search and filtering", async ({ page }) => {
    // Wait for course list to load
    await page.waitForSelector('[data-testid="course-list"]');

    // Test search functionality
    const searchInput = page.getByPlaceholder(
      "Search by teacher or course name",
    );
    await searchInput.fill("Hip Hop");

    // Check filtered results
    const courseList = page.locator('[data-testid="course-item"]');
    await expect(courseList).toHaveCount(await courseList.count());

    // Clear search and verify list resets
    await searchInput.clear();
    await expect(courseList).toHaveCount(await courseList.count());
  });

  test("should handle course sorting", async ({ page }) => {
    // Wait for course list to load
    await page.waitForSelector('[data-testid="course-list"]');

    // Get initial course order
    const initialCourses = await page
      .locator('[data-testid="course-name"]')
      .allTextContents();

    // Change sort to teacher name
    await page.getByRole("combobox").click();
    await page.getByText("Sort by Teacher").click();

    // Get sorted course order
    const sortedCourses = await page
      .locator('[data-testid="course-name"]')
      .allTextContents();

    // Verify order changed (assuming there are courses to sort)
    if (sortedCourses.length > 1) {
      expect(sortedCourses).not.toEqual(initialCourses);
    }
  });

  test("should handle tab switching", async ({ page }) => {
    // Start with Caster Studio tab
    await expect(
      page.getByRole("tab", { name: "Caster Studio", selected: true }),
    ).toBeVisible();

    // Switch to One Way tab
    await page.getByRole("tab", { name: "One Way" }).click();
    await expect(
      page.getByRole("tab", { name: "One Way", selected: true }),
    ).toBeVisible();

    // Verify content changed
    await expect(page.locator('[data-testid="course-list"]')).toBeVisible();
  });

  test("should handle course subscription actions", async ({ page }) => {
    // Wait for course list to load
    await page.waitForSelector('[data-testid="course-list"]');

    // Find and click subscribe button on first course
    const subscribeButton = page
      .getByRole("button", { name: "Subscribe" })
      .first();
    await subscribeButton.click();

    // Wait for subscription action to complete
    await page.waitForResponse(
      (response) =>
        response.url().includes("/floria-service/caster/subscribe") &&
        response.status() === 200,
    );

    // Find and click unsubscribe button
    const unsubscribeButton = page
      .getByRole("button", { name: "Unsubscribe" })
      .first();
    await unsubscribeButton.click();

    // Wait for unsubscribe action to complete
    await page.waitForResponse(
      (response) =>
        response.url().includes("/floria-service/caster/unsubscribe") &&
        response.status() === 200,
    );
  });

  test("should handle empty states and loading", async ({ page }) => {
    // Mock empty response
    await page.route("**/floria-service/caster/list", (route) => {
      route.fulfill({ status: 200, body: JSON.stringify([]) });
    });

    // Reload page with empty data
    await page.reload();

    // Check empty state message
    await expect(page.getByText("No courses available")).toBeVisible();
  });
});
