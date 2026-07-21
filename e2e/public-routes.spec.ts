import { expect, test } from "../playwright-fixture";

const publicRoutes = [
  ["/", /Week by week/i],
  ["/pregnancy/week/1", /1 Week Pregnant/i],
  ["/trying-to-conceive", /Understand your cycle/i],
  ["/ivf", /Understand your stage/i],
  ["/first-year", /first year/i],
  ["/support", /right words/i],
  ["/product", /moments worth holding/i],
  ["/privacy", /privacy/i],
  ["/terms", /terms/i],
] as const;

for (const [path, heading] of publicRoutes) {
  test(`${path} renders its primary content`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading }).first()).toBeVisible();
  });
}

test("unknown articles and routes show a not-found recovery page", async ({ page }) => {
  await page.goto("/articles/not-a-real-article");
  await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
  await page.goto("/not-a-real-route");
  await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
});

test("AI questions are carried in router state rather than the URL", async ({ page }) => {
  await page.goto("/trying-to-conceive");
  const input = page.getByPlaceholder(/ask anything about trying to conceive/i);
  await input.fill("Could this be a sensitive health question?");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/ask(?:\?|$)/);
  expect(new URL(page.url()).searchParams.has("q")).toBe(false);
});
