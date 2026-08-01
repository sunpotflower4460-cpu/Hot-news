# Hot News Product Principles

## Product promise

Hot News is a **bright-news app**.

It does not soften dark news, hide distressing details behind gentle wording, or treat a warm ending as sufficient. The event itself must be bright, hopeful, life-affirming, creative, kind, beautiful, or demonstrably progressive.

> Hot News does not dilute the darkness of the news. It finds real light in the world and delivers it every day.

## Non-negotiable editorial rule

An article may be published only when all of the following are true:

1. The central event itself is positive.
2. A reader does not need to endure substantial tragedy, fear, illness, violence, loss, or outrage before reaching the positive part.
3. The story leaves credible hope, joy, wonder, gratitude, connection, or a sense of progress.
4. The source is sufficiently reliable and traceable.
5. The summary preserves the factual core of the source.
6. Text and image rights are cleared, or the app uses an explicitly safe publication mode.

A story must not be approved merely because it is touching, calming, or heartwarming.

## Examples of eligible subjects

- A scientific or medical advance with verified positive results
- A new accessibility tool that expands participation
- Nature restoration with measurable improvement
- A community project creating connection or opportunity
- Art, music, education, or craft that brings new value into the world
- A kind action whose premise is not dominated by tragedy or danger
- A constructive technology that improves everyday life
- A joyful discovery, achievement, reunion, creation, or cultural milestone

## Normally excluded subjects

- War, crime, violence, disasters, accidents, abuse, outrage politics, or fear-based reporting
- Death, terminal decline, severe illness, emergency care, or bereavement as the central premise
- “Bad event plus one good action” stories where the dark context dominates
- Miracle claims, unsupported medical claims, rumors, or promotional content presented as news
- Celebrity gossip, humiliation, conflict bait, or engagement bait
- Stories that are emotionally burdensome even when the ending is warm

Exceptional publication requires human editorial approval and must still satisfy the product promise.

## Editorial assessment contract

Every real article must include an `EditorialAssessment` using policy version `bright-news-v1`.

Required dimensions:

- `brightnessScore`: positivity of the event itself
- `emotionalSafetyScore`: likely emotional burden on the reader
- `hopeScore`: credible hope or positive possibility after reading
- `positiveChangeScore`: concrete improvement, creation, recovery, or progress
- `darkContextRatio`: dependence on tragedy, fear, illness, or loss
- `reliabilityScore`: confidence in sources and factual support
- `rightsStatus`: text and image publication safety
- `decision`: approve, review, or reject

Reader-facing selectors must never bypass the central publication gate.

## Product-language rule

Use language such as:

- 明るいニュース
- 希望や喜びを感じられる出来事
- 世界に実在する明るい出来事

Do not define the whole product only as:

- ほっとするニュース
- やさしいニュース
- 不安をあおらないニュース

Those qualities are valuable, but they are supporting qualities. **Brightness of the actual event is the primary requirement.**

## Release checklist

Before release, confirm that:

- Every visible article passes the publication gate.
- No screen reads directly from an unreviewed article source.
- Favorites, notifications, digests, search, and related articles use the same eligibility rule.
- Retracted or quarantined content cannot remain visible through cached URLs.
- Source attribution and publication dates are shown.
- Premium copy matches implemented behavior.
- Notification copy matches actual delivery behavior.
- Automated tests cover approval thresholds and rejected dark-context cases.
- A human administrator can quarantine, retract, and correct an article.
