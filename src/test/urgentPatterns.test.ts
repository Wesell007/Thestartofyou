import { describe, expect, it } from "vitest";
import {
  AI_PAUSED_ANSWER,
  isAiDisabled,
  matchUrgent,
  urgentAnswer,
} from "../../supabase/functions/_shared/urgentPatterns";
import { findBannedVerdicts } from "@/lib/aiAnswerSafety";

const ESCALATION_WORDING = /nhs\s?111|\b999\b|A&E|maternity|GP|health visitor/i;

describe("hard escalation routing", () => {
  it.each([
    ["I am 28 weeks pregnant and my baby is moving less than usual", "clinical"],
    ["I am pregnant and bleeding", "clinical"],
    ["I have a severe headache and vision changes", "clinical"],
    ["My waters have broken", "clinical"],
    ["My baby has blue lips", "clinical"],
    ["My baby is floppy and hard to wake", "clinical"],
    ["My 2 month old has a fever", "clinical"],
    ["My baby has a rash that does not fade", "clinical"],
    ["I am bleeding heavily two weeks after birth", "clinical"],
    ["My caesarean wound is hot and I have a fever", "clinical"],
    ["I had a positive test and now severe one sided pain and I feel faint", "clinical"],
    ["I have shoulder-tip pain and some bleeding", "clinical"],
    ["I cannot keep myself safe", "crisis"],
    ["I keep having thoughts of harming my baby", "crisis"],
    ["Someone at home is hurting me", "crisis"],
    ["I do not want to be here any more", "crisis"],
  ])("escalates %s", (query, expected) => {
    expect(matchUrgent(query)).toBe(expected);
  });

  it.each([
    "When will I feel the baby move?",
    "What can help with sleep regression?",
    "When might testing make sense?",
    "How can I manage anxiety in pregnancy?",
    "Milestones",
    "What should I pack in my hospital bag?",
    "How often should my baby be feeding?",
  ])("does not escalate %s", (query) => {
    expect(matchUrgent(query)).toBeNull();
  });

  it("gives a crisis answer for self-harm and a support answer for abuse", () => {
    expect(urgentAnswer("I keep thinking about hurting myself")).toContain("999");
    expect(urgentAnswer("My partner hurt me and I am pregnant")).toMatch(/domestic abuse support service/i);
    expect(urgentAnswer("My baby has blue lips")).toMatch(/urgent clinical help/i);
  });

  it("keeps every escalation answer short, routed and free of banned verdicts", () => {
    for (const query of ["I cannot keep myself safe", "Someone at home is hurting me", "My waters have broken"]) {
      const answer = urgentAnswer(query);
      expect(answer).toMatch(ESCALATION_WORDING);
      expect(answer.split(/\s+/).length).toBeLessThan(140);
      expect(findBannedVerdicts(answer)).toEqual([]);
      expect(answer).not.toMatch(/https?:\/\/|\bsources\b|\breferences\b|low risk|high risk|symptom checker/i);
    }
  });
});

describe("kill switch flag", () => {
  it.each(["true", "TRUE", "1", " yes ", "on"])("treats %s as disabled", (value) => {
    expect(isAiDisabled(value)).toBe(true);
  });

  it.each([undefined, null, "", "false", "0", "off"])("treats %s as enabled", (value) => {
    expect(isAiDisabled(value as string | undefined)).toBe(false);
  });

  it("uses calm, non-diagnostic pause wording with no links", () => {
    expect(AI_PAUSED_ANSWER).toMatch(/short pause/i);
    expect(AI_PAUSED_ANSWER).toMatch(/NHS 111/);
    expect(AI_PAUSED_ANSWER).not.toMatch(/https?:\/\//);
    expect(findBannedVerdicts(AI_PAUSED_ANSWER)).toEqual([]);
  });
});
