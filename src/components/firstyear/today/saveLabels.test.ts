import { describe, expect, it } from "vitest";
import {
  joinNames,
  saveButtonLabel,
  saveConfirmation,
  targetChangeNotice,
  writingForLabel,
} from "@/components/firstyear/today/saveLabels";

describe("saveButtonLabel", () => {
  it("offers Save when nothing is stored yet", () => {
    expect(saveButtonLabel({ hasSaved: false, saving: false, justSaved: false })).toBe("Save");
  });

  it("offers Update when a note already exists", () => {
    expect(saveButtonLabel({ hasSaved: true, saving: false, justSaved: false })).toBe("Update");
  });

  it("shows the in-flight state", () => {
    expect(saveButtonLabel({ hasSaved: true, saving: true, justSaved: false })).toBe("Saving…");
  });

  it("shows a quiet confirmation just after saving", () => {
    expect(saveButtonLabel({ hasSaved: false, saving: false, justSaved: true })).toBe("Saved");
    expect(saveButtonLabel({ hasSaved: true, saving: false, justSaved: true })).toBe("Updated");
  });
});

describe("joinNames", () => {
  it("joins naturally", () => {
    expect(joinNames(["Ada"])).toBe("Ada");
    expect(joinNames(["Ada", "Bo"])).toBe("Ada and Bo");
    expect(joinNames(["Ada", "Bo", "Cy"])).toBe("Ada, Bo and Cy");
    expect(joinNames([])).toBe("");
  });
});

describe("saveConfirmation", () => {
  it("names babies only when more than one was written for", () => {
    expect(saveConfirmation({ wasExisting: false })).toBe("Saved");
    expect(saveConfirmation({ wasExisting: true })).toBe("Updated");
    expect(saveConfirmation({ wasExisting: false, babyNames: ["Ada"] })).toBe("Saved");
    expect(saveConfirmation({ wasExisting: false, babyNames: ["Ada", "Bo"] })).toBe(
      "Saved for Ada and Bo",
    );
    expect(saveConfirmation({ wasExisting: true, babyNames: ["Ada", "Bo"] })).toBe(
      "Updated for Ada and Bo",
    );
  });
});

describe("writingForLabel", () => {
  it("describes the current target", () => {
    expect(writingForLabel({ allBabies: true, babyName: null })).toBe("Writing for all babies");
    expect(writingForLabel({ allBabies: false, babyName: "Ada" })).toBe("Writing for Ada");
  });
});

describe("targetChangeNotice", () => {
  it("explains what the fields now show", () => {
    expect(targetChangeNotice({ allBabies: false, babyName: "Ada" })).toBe(
      "These fields now show Ada's notes.",
    );
    expect(targetChangeNotice({ allBabies: true, babyName: null })).toContain("all of your babies");
  });
});
