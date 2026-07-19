# Acme App — Roadmap

<!--
  This file is rendered by todo-board. It is ordinary Markdown — edit it in any editor.
  The board derives structure from the headings and list markers below.
  See FORMAT.md for the full contract. Quick version:
    #  Title          → the board title (this line)
    ## Group          → a group caption in the left panel
    ### Theme         → a clickable theme (top level of the left panel)
    - [ ] / - [x]     → an item (To Do / Done)
    - ✅ / 🔄 / ⬜     → an item with an explicit status
    🔴 🟠 🟡 ⚪        → impact (critical / high / medium / low), inline or in a heading
    S · M · L · XL    → effort (from the Prioritization tables or `*(Effort M)*`)
-->

## 🏆 Prioritization — Effort × Impact

**Effort:** S = <1 day · M = 2–5 days · L = 1–2 weeks · XL = 3+ weeks.
**Impact:** 🔴 Critical · 🟠 High · 🟡 Medium · ⚪ Low.

### Tier 1 — do first
| Task | Effort | Impact | Notes |
|------|:---:|:---:|-------|
| **Passwordless login** | M | 🔴 | Blocks onboarding. |
| **Fuzzy search** | S | 🟠 | Cheap, high value. |

### Tier 2 — big bets
| Task | Effort | Impact | Notes |
|------|:---:|:---:|-------|
| **Stripe billing** | L | 🟠 | Revenue. |

## 🚀 Onboarding

### Auth & Accounts
- [ ] **Passwordless login** — send a magic link on sign-in; no password storage. 🔴
  - [ ] Email provider integration
  - [ ] Token expiry + rate limiting
- [x] **OAuth with Google** — shipped last sprint.
- [ ] **Profile page** — avatar, display name, timezone.

### First-run Experience
- [ ] **Welcome checklist** — guide new users through three key actions. *(Effort S, Impact 🟡)*
- [x] **Sample data seed** ✅

## 🔎 Search

### Query
- [ ] **Fuzzy match** — typo-tolerant search across items. 🟠
- [ ] **Filters** — by tag, date, and status.
  - [ ] Persist active filters in the URL

## 💳 Billing

### Payments
- [ ] **Stripe integration** — subscriptions + webhooks. *(Effort L, Impact 🟠)* ⏳ needs deploy
- [ ] **Invoices** — downloadable PDF receipts.

## 🔌 Integrations

Status key: ✅ done · 🔄 partial · ⬜ not started

- ✅ **Segment** — analytics events wired up.
- 🔄 **Slack** — notifications partially built.
- ⬜ **Zapier** — not started.

## ✅ Recently shipped

- **Dark mode** — theme toggle that follows the system default.
- **CSV export** — export any list to CSV.
