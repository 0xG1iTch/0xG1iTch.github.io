---
title: "Your LLM needs an evaluation set, not another prompt"
description: "A small, thoughtful evaluation loop is worth more than a hundred prompt tweaks. Here’s how to build one you’ll actually use."
date: 2026-10-14
type: Article
topics: [LLMs, Evaluation]
sample: true
---

The most convincing model demo is often the least useful test. You know the example, you know the desired answer, and you have already changed the prompt until the output looks good.

That is a fine way to explore an idea. It is a poor way to know whether the next change makes the system better.

This sample article proposes a compact evaluation loop for a fictional support assistant. It uses illustrative examples rather than measured benchmark results. The aim is to make progress visible without building a second product just to measure the first.

## Write down what good means

“Helpful” is a starting intention, not a testable outcome. For a support assistant, useful criteria might include identifying the relevant policy, asking for missing details, and refusing to promise an exception that does not exist.

Choose a small number of observable behaviors. Make each one specific enough that two reviewers can discuss a disagreement using the actual response.

| Dimension | Question for the reviewer |
| --- | --- |
| Correctness | Does the answer match the supplied policy? |
| Grounding | Can each policy claim be traced to the evidence? |
| Completeness | Does it answer the user’s actual question? |
| Boundaries | Does it avoid inventing authority or missing facts? |

Do not compress these dimensions into a single score too early. A response can be correct but incomplete, or readable but unsupported. The distinction tells you what to fix.

## Build a small, difficult set

Start with questions drawn from the intended workflow. A few dozen carefully reviewed examples can reveal more than a large synthetic set whose answers nobody has checked.

Include ordinary requests as well as the edges: an underspecified question, a tempting unsupported conclusion, a policy with an exception, and a request whose answer is absent. Keep personally identifying information out of fixtures.

```json
{
  "id": "refund-outside-window",
  "question": "Can I return this after 90 days?",
  "evidence": "Standard returns are accepted within 30 days.",
  "expected_behavior": [
    "State the documented 30-day policy",
    "Do not invent a 90-day exception",
    "Explain that the provided policy does not authorize it"
  ]
}
```

Keep development examples separate from a held-out set. If you tune against every example you own, the evaluation gradually becomes another prompt-writing surface.

Version the fixtures with the prompt and model configuration. When a source policy changes, update the expected behavior deliberately; do not silently call yesterday’s correct answer a regression.

## Separate checks from judgment

Use deterministic checks for things you can specify exactly: a required output schema, a valid citation identifier, or an empty field where no answer is available. These checks are cheap, repeatable, and easy to debug.

Use human review for the decisions that need context. A model-based evaluator can help triage a larger set, but its judgment is another model output. Calibrate it against human labels, inspect disagreements, and avoid treating it as ground truth.

```python
def valid_citations(answer, allowed_ids):
    cited_ids = answer.get("citation_ids", [])
    return (
        isinstance(cited_ids, list)
        and all(item in allowed_ids for item in cited_ids)
    )
```

This check validates identifiers. It does **not** prove that a source supports the associated claim. That requires a separate grounding review. Naming the limitation is part of making the test useful.

## Compare one change at a time

Save the baseline responses. Change one meaningful variable, run the same set, and review the difference. If the prompt, retrieval settings, and model all change at once, a higher aggregate score does not tell you what caused it.

For nondeterministic systems, repeat important cases and record variation. A single lucky response can hide an unreliable behavior. Pin the model version where the provider supports it, and record the parameters you actually sent.

Track per-example outcomes rather than only averages. A gain on ordinary questions can mask a new failure on the one case where the assistant must decline to answer.

> A useful evaluation is a conversation with your failure modes. The score is just the index.

Review costs, latency, and quality together. A larger model that improves one narrow dimension may be a sensible choice, but the tradeoff should be visible instead of implied by a single leaderboard number.

## Keep the loop alive

An evaluation set is a maintained artifact. When you find a real failure, preserve a sanitized version of the case, explain what should have happened, and add it to the next review.

Retire redundant examples carefully. Keep a short changelog so a future reader can distinguish an actual improvement from an easier test set. Review samples of passing responses as well as failures; an evaluator can be wrong in both directions.

The practical goal is not to eliminate judgment. It is to give judgment a repeatable place in the engineering process. A small set you understand, run regularly, and improve with care is an excellent start.

## Further reading

The [HELM research project](https://crfm.stanford.edu/helm/) offers a broader framework for evaluating language models across multiple dimensions. Its emphasis on transparent scenarios and metrics is useful even when your own evaluation is deliberately small.
