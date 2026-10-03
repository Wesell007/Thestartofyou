import { expect, test } from "../playwright-fixture";

const publicRoutes = [
  ["/", /From trying to conceive/i],
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
        `data: ${JSON.stringify({ choices: [{ delta: { content: "A test can be useful at the right point in your cycle.\n\nMost home tests are designed for the first day of a missed period, and testing earlier can give a result that is not yet reliable.\n\n### Sources\n\nhttps://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/" } }] })}`,
        "",
        "data: [DONE]",
        "",
      ].join("\n"),
    });
  });

  await page.goto("/ask");
  // The welcome starter chips carry journey-aware copy that changes over time,
  // so the question goes through the labelled field rather than a chip.
  await page.getByRole("textbox", { name: "Ask your question" }).fill("When should I take a pregnancy test?");
  await page.getByRole("button", { name: "Ask", exact: true }).click();

  await expect(page.getByText(/A test can be useful at the right point/)).toBeVisible();
  await expect(page.getByText(/designed for the first day of a missed period/)).toBeVisible();
  // Answers are cleaned for display: the model's trailing sources block and any
  // raw URLs never reach the reader, and the approved trust line stands in.
  await expect(page.getByText(/Based on NHS and approved UK health sources/)).toBeVisible();
  await expect(page.getByText(/nhs\.uk/)).toHaveCount(0);
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
