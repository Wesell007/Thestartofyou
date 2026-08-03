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

test("Ask AI sends the question and renders a streamed answer", async ({ page }) => {
  await page.route("**/functions/v1/ai-search", async (route) => {
    expect(new URL(route.request().url()).hostname).not.toBe("placeholder.supabase.co");
    expect(route.request().method()).toBe("POST");
    expect(route.request().postDataJSON()).toMatchObject({
      query: "When should I take a pregnancy test?",
    });
    await route.fulfill({
      status: 200,
      contentType: "text/event-stream",
      body: [
        `data: ${JSON.stringify({ choices: [{ delta: { content: "A test can be useful at the right point in your cycle.\n\n### Sources\n\nhttps://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/" } }] })}`,
        "",
        "data: [DONE]",
        "",
      ].join("\n"),
    });
  });

  await page.goto("/ask");
  await page.getByText("When should I take a pregnancy test?", { exact: true }).click();

  await expect(page.getByText(/A test can be useful at the right point/)).toBeVisible();
  await expect(page.getByText("Sources", { exact: true })).toBeVisible();
});

test("email sign-in reaches the configured auth service", async ({ page }) => {
  await page.route("**/auth/v1/otp**", async (route) => {
    expect(new URL(route.request().url()).hostname).not.toBe("placeholder.supabase.co");
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });

  await page.goto("/auth?intent=sign_in");
  await page.locator('input[type="email"]').fill("returning-user@example.invalid");
  await page.getByRole("button", { name: /Email me a sign-in code/i }).click();

  await expect(page.getByRole("heading", { name: "Enter your sign-in code" })).toBeVisible();
});
