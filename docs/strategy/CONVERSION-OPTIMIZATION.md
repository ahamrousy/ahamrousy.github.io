# Conversion Optimization

*Goal: qualified enquiries — corporate programmes, executive sessions, workshops, speaking. Not traffic.*

## Current journey
Search / AI answer → landing page (country, course or guide) → **WhatsApp** (pre-filled message) · **Schedule a meeting** (date/time picker → WhatsApp) · **email** · contact form (composes an email) · chatbot (answers basics, hands off to WhatsApp).

## CTA by page type
| Page type | Primary CTA | Secondary |
|---|---|---|
| Home | Schedule a meeting | WhatsApp · See all programmes · Who is Ahmed Amrousy? |
| Country page | Request a proposal (email with team size, city, dates) | WhatsApp |
| Course page | Schedule a meeting | How programmes are priced (**new**) · Method |
| Guide | The related course | Contact |
| About | Download profile PDF | Schedule a meeting |

## Gaps, in order of impact
| # | Gap | Fix | Owner |
|---|---|---|---|
| 1 | No named client quote at the decision point | 3 LinkedIn recommendations from Kahraba participants → testimonial blocks on Home, Kahraba case study, AI for Business | You → Me |
| 2 | Leads not measured | GA4 `generate_lead` events — **built**; needs the GA4 ID | You |
| 3 | Price question unanswered on course pages | Link to pricing guide — **done** | — |
| 4 | Form depends on the visitor's mail app | Free Formspree ID makes it a real form | You (optional) |
| 5 | Gulf buyers may prefer a call to WhatsApp | Add a Calendly link when you have one (`calendlyUrl` in config — the page switches automatically) | You (optional) |

## Rules
- One primary action per page, visible without scrolling on mobile.
- Never ask for more than name, organisation, team size and dates before the first conversation.
- Proof next to every ask: numbers, logos, a quote.
- Arabic CTAs written in Arabic, not translated button text.

## Monthly review
Leads by method and by landing page (GA4) · conversion rate of country pages vs course pages · which AI-referred visits (chatgpt.com, perplexity.ai, copilot) convert.
