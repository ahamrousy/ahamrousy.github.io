---
title: 'POCAB vs GCSE-F: two prompting frameworks for managers'
seoTitle: 'POCAB vs GCSE-F: Prompting Frameworks for Managers'
metaDescription: POCAB structures a single prompt. GCSE-F structures work over your documents. Ahmed Amrousy explains when to use each, with worked examples.
primaryKeyword: POCAB vs GCSE-F
secondaryKeywords:
  - POCAB framework
  - GCSE-F prompting framework
  - prompting frameworks for managers
  - prompt engineering for business
summary: >-
  POCAB and GCSE-F are two prompting frameworks designed by Ahmed Amrousy for managers. POCAB —
  Persona, Objective, Context, Audience, Boundaries — structures a single prompt where the model
  works from what it already knows. GCSE-F — Goal, Context, Source, Expectations, Format —
  structures work over your own documents and data, where the model must answer from a named source
  rather than from memory. Choosing between them depends on one question: is there a source?
published: 2026-07-08
updated: 2026-08-24
order: 2
readingTime: 9
relatedCourse: ai-for-business
answers:
  - What is the POCAB framework?
  - What is the GCSE-F prompting framework?
  - What is the difference between POCAB and GCSE-F?
  - Which prompting framework should a manager use?
faqs:
  - q: What does POCAB stand for?
    a: >-
      Persona, Objective, Context, Audience, Boundaries. It structures a single prompt so the model
      behaves like a named expert working to a defined brief, and it is the right choice when the
      model is working from general knowledge rather than from your documents.
  - q: What does GCSE-F stand for?
    a: >-
      Goal, Context, Source, Expectations, Format. It structures work over documents and data. The
      S is the element that matters most — it forces the model to answer from a named source rather
      than from its own memory.
  - q: What is the difference between POCAB and GCSE-F?
    a: >-
      POCAB is for generation without a source; GCSE-F is for analysis with one. The test is a
      single question — is there a document or dataset the answer must come from? If yes, use
      GCSE-F. If no, use POCAB.
  - q: Do I need both frameworks?
    a: >-
      Most managers use POCAB more often and GCSE-F for the work that matters more. Roughly, POCAB
      handles drafting and thinking; GCSE-F handles anything where being wrong has consequences.
  - q: Are these frameworks specific to one AI tool?
    a: >-
      No. Both work identically across Claude, ChatGPT, Microsoft Copilot and Gemini. They describe
      how to brief a model, not how to operate a particular interface — which is why they outlast
      the tools.
---

Every manager who has used a generative AI tool for more than a week has had the same experience:
the output is fluent, plausible, and not quite usable. The instinct is to blame the model. Usually
the problem is the brief.

I teach two frameworks for fixing that. They are not interchangeable, and the most common mistake I
see in a training room is using the wrong one.

## The distinction that matters

**POCAB** is for work where the model draws on what it already knows.

**GCSE-F** is for work where the model must answer from *your* material — a contract, a dataset, a
set of transcripts, a policy document.

The test is one question: **is there a source the answer must come from?**

If yes, GCSE-F. If no, POCAB. Almost every prompting failure I see in a corporate setting is
someone using POCAB when the situation demanded GCSE-F — asking a model to analyse something it was
never given.

## POCAB — Persona, Objective, Context, Audience, Boundaries

**Persona.** Who should the model be? Not "you are a helpful assistant" — a specific professional
with a specific vantage point. *A commercial director in an airline evaluating a route launch* pulls
different considerations than *a marketing consultant*.

**Objective.** What decision does this serve? Not "write about X" but "help me decide whether to
X". Models optimise for what you ask for; asking for prose gets prose, asking for a decision aid
gets a decision aid.

**Context.** What must it know first? Constraints, history, what has already been tried, what is not
negotiable. This is where most prompts are thin, and thin context is the leading cause of generic
output.

**Audience.** Who reads the result? A board paper, a briefing for a technical team and a customer
email are three different registers.

**Boundaries.** What is off-limits? Length, tone, things not to assume, claims not to make. This is
also where you tell the model to say when it does not know — which is the cheapest hallucination
control available.

### POCAB in practice

> **Persona:** You are a commercial director at a regional airline with fifteen years of network
> planning experience.
> **Objective:** Help me decide whether to argue for a second daily frequency on an existing route
> at the next commercial review.
> **Context:** Load factor has been consistently above 85% for two quarters. We have one aircraft
> available. The competitor added capacity last month. Fuel is our largest variable cost.
> **Audience:** A commercial review committee of five, none of whom are network planners.
> **Boundaries:** One page. No invented figures — mark anything you cannot know as an assumption I
> need to fill in. Give me the strongest argument against as well as for.

That last boundary is the one managers underuse. Asking for the counter-argument turns a
confirmation machine into something closer to a colleague.

## GCSE-F — Goal, Context, Source, Expectations, Format

**Goal.** What must be produced.

**Context.** The situation surrounding it — why this analysis, for whom, what decision follows.

**Source.** *The element that makes this framework work.* Name the documents. State explicitly that
the answer must come from them, and that anything not present in the source must be reported as
absent rather than filled in from general knowledge.

**Expectations.** What good looks like. Level of detail, what to prioritise, how to handle
ambiguity or contradiction between sources.

**Format.** Structure, length, whether you want citations back to the source.

### Why the S changes everything

Without an explicit source instruction, a model handed a document will happily blend what the
document says with what it generally knows about the subject. The result reads authoritatively and
cannot be trusted, because you cannot tell which sentence came from where.

The instruction that fixes it is blunt and worth memorising:

> Answer only from the attached documents. If the documents do not contain the answer, say "not
> stated in the source" rather than inferring it. For each substantive claim, cite the document and
> section it came from.

That single addition converts a plausible summary into something a manager can defend in a meeting.

## Which to use, in practice

| Task | Framework |
|---|---|
| Drafting a strategy argument | POCAB |
| Summarising fifty customer interviews | GCSE-F |
| Writing a job description | POCAB |
| Comparing three supplier contracts | GCSE-F |
| Pressure-testing a decision you have already made | POCAB |
| Extracting commitments from meeting notes | GCSE-F |
| Generating campaign concepts | POCAB |
| Checking a report against last year's figures | GCSE-F |

The pattern: POCAB for generation and thinking, GCSE-F for anything where being wrong has
consequences.

## Both outlast the tools

Neither framework is tied to a product. They work identically in Claude, ChatGPT, Microsoft Copilot
and Gemini, because they describe how to brief a model rather than how to operate an interface.

That is deliberate. Tool training goes stale within a quarter. A team that has internalised POCAB
and GCSE-F is still competent when the interface changes — which it will, repeatedly.

---

*Ahmed Amrousy teaches POCAB and GCSE-F in every Menova programme. He is Executive Education
Instructor at the American University in Cairo's Onsi Sawiris School of Business and Head of
Marketing & PR at Nile Air.*
