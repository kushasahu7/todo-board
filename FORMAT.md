# TODO file format

todo-board renders an **ordinary Markdown file** — there is no custom syntax to learn and
nothing proprietary. It just reads meaning from standard Markdown headings and task-list
markers. This document is the contract: write your file this way and the board will render
it correctly. It never modifies your file.

> **For AI agents / automation:** when generating or editing a TODO file that will be viewed
> in todo-board, follow the rules below so the board keeps working. All of it is plain
> Markdown, so the file also reads fine on GitHub or in any editor.

## Structure

| Markdown | Becomes |
|---|---|
| `# Title` (first one) | The **board title** (shown in the header + browser tab). |
| `## Group` | A **group caption** in the left panel (e.g. "Onboarding"). Not clickable. |
| `### Theme` | A **theme** — a top-level, clickable entry in the left panel. |
| `#### Sub-heading` | Treated as context inside the current theme (kept, not a new theme). |
| `- [ ] text` | An **item**, status **To Do**. |
| `- [x] text` | An **item**, status **Done**. |
| `- ✅ text` / `- 🔄 text` / `- ⬜ text` | An item with an explicit status (done / in-progress / to-do). |
| Indented sub-bullets under an item | Folded into that item's **expandable detail**. |

A theme is one `###` section; if a `##` group has checkboxes directly under it (no `###`),
that group becomes a theme in its own right. Items are grouped on the right into three
collapsible panels: **In Progress**, **To Do**, **Done**.

## Item title & description

Put the short title in **bold** at the start of the line; the rest is the description:

```
- [ ] **Passwordless login** — send a magic link on sign-in.
- [ ] **Invoices**: downloadable PDF receipts.
```

The board shows the bold text as the item title and the remainder (after `—`, `:` or `-`)
as the description when expanded. Lines with no bold lead still work — the whole line is
used as the title.

## Status

An item is **Done** if it is `- [x]`, `- ✅`, or lives under a `## Recently shipped` heading.

It is **In Progress** if it is unchecked/marked but contains any of:
`⏳`, `🔄`, `⏸️`, the words *partial*, *paused*, *in progress*, `needs deploy`, or `Remaining:`.
(This lets a `- [x]` that's "done in code but not deployed" show as In Progress — add `⏳ needs deploy`.)

Otherwise it is **To Do**.

## Impact & effort (optional)

These annotate an item or a whole theme; both are optional.

- **Impact** — one of `🔴` (critical) · `🟠` (high) · `🟡` (medium) · `⚪` (low). Put it inline
  in the item text, or in a `###`/`##` heading to apply to the whole theme:
  `### AI Output Quality 🔴`.
- **Effort** — `S` · `M` · `L` · `XL`. Either inline as `*(Effort M)*`, or via a
  Prioritization table (below).

A theme's headline impact/effort in the left panel is the **highest impact** and **largest
effort** among its items (plus anything matched from the Prioritization tables by name).

## Prioritization tables (optional)

A section of `### Tier N …` headings, each followed by a table whose first three columns are
**Task · Effort · Impact**, lets you assign effort/impact to work by name:

```
### Tier 1 — do first
| Task | Effort | Impact | Notes |
|------|:---:|:---:|-------|
| **Passwordless login** | M | 🔴 | Blocks onboarding. |
```

The board matches these rows to themes/items by name (token overlap) and uses them to fill
in impact/effort where an item doesn't state its own. The `Notes` column is free text.

## Recently shipped (optional)

A `## Recently shipped` heading whose bullets are `- **Name** — …` lists completed work; every
entry is shown as **Done**.

## What is ignored

HTML comments (`<!-- … -->`), free prose paragraphs, blockquotes, and any heading/among that
doesn't match the patterns above are ignored by the parser (prose is still visible inside an
item's expanded detail when it sits under that item). So you can keep rationale, links, and
notes in the file freely — only checkboxes and status bullets become items.

## Minimal example

```markdown
# My Project

## Backend
### API
- [ ] **Rate limiting** — token bucket per key. 🟠 *(Effort M)*
- [x] **Health endpoint** ✅

## Recently shipped
- **Logging** — structured JSON logs.
```

See [`example/TODO.md`](example/TODO.md) for a fuller example.
