---
name: "AI Engineering & Fieldnotes"
description: "A Swiss editorial publication for Mohamed EL Hammouchi’s engineering work."
colors:
  paper: "#141819"
  ink: "#F1F0EA"
  line: "#3B4343"
  accent: "#B6C7BB"
  light-paper: "#F1F0EA"
  light-ink: "#141819"
  light-line: "#3B4343"
  light-accent: "#3B4343"
  muted: "#B6C7BB"
  soft: "var(--paper)"
  diagram: "var(--paper)"
  dot: "var(--line)"
typography:
  display:
    fontFamily: "Public Sans Variable, sans-serif"
    fontSize: "clamp(30px, 3.8vw, 48px)"
    fontWeight: 550
    lineHeight: 1.18
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Public Sans Variable, sans-serif"
    fontSize: "clamp(38px, 4.8vw, 64px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-.04em"
  title:
    fontFamily: "Public Sans Variable, sans-serif"
    fontSize: "23px"
    fontWeight: 550
    lineHeight: 1.35
    letterSpacing: "-.025em"
  body:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "18px"
    lineHeight: 1.85
  summary:
    fontFamily: "Public Sans Variable, sans-serif"
    fontSize: "12px"
    lineHeight: 1.8
  label:
    fontFamily: "Public Sans Variable, sans-serif"
    fontSize: "10px"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: ".8em"
rounded:
  square: "0"
  circle: "50%"
spacing:
  small: "8px"
  compact: "12px"
  control: "16px"
  group: "20px"
  column: "24px"
  wide: "32px"
  section: "48px"
components:
  text-link:
    textColor: "{colors.ink}"
    padding: "4px 0"
    size: "12px"
  filter-button:
    textColor: "{colors.muted}"
    backgroundColor: "transparent"
    padding: "9px 0"
    size: "10px"
  filter-button-selected:
    textColor: "{colors.accent}"
    backgroundColor: "transparent"
    padding: "9px 0"
    size: "10px"
  topic-select:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "8px 20px 8px 8px"
    size: "10px"
  topic-tag:
    textColor: "{colors.ink}"
    padding: "4px 8px"
    size: "9px"
  featured-story:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
  primary-link:
    textColor: "{colors.ink}"
    backgroundColor: "transparent"
    padding: "12px 0"
    height: "44px"
  theme-toggle:
    textColor: "{colors.ink}"
    backgroundColor: "transparent"
    width: "44px"
    height: "44px"
  feed-entry:
    textColor: "{colors.ink}"
    padding: "29px 0 30px"
  main-navigation:
    textColor: "{colors.ink}"
    size: "12px"
  retrieval-diagram:
    backgroundColor: "{colors.diagram}"
    padding: "12px 17px"
---

# Design System: AI Engineering & Fieldnotes

## Overview

**Creative North Star: "An open engineering notebook"**

Published technical work demonstrates understanding through explanation, reproducible examples, and honest tradeoffs. The interface stays quiet: a text-only masthead, a short production-AI statement with one primary CTA, a featured story, up to four recent posts, topic links, and a small utility footer. Keep the personal introduction concise.

Public Sans carries the interface and headings; Georgia gives long articles a distinct reading texture. Original SVG diagrams explain systems using dots, lines, and annotations. Surfaces stay flat and square.

**Key Characteristics:**
- A concise statement and one clear action that lead directly to useful writing.
- Aligned editorial columns and hairline rules.
- Charcoal canvas, warm text, and a restrained sage accent.
- Static reading content with small, accessible interactive controls.

## Colors

Use only #141819, #F1F0EA, #3B4343, and #B6C7BB. Do not generate blends, tonal variants, or additional green shades. Light mode exchanges warm white and charcoal and uses the existing slate color for readable secondary text, links, borders, and controls. Content fields use the active page background. The header toggle stores a valid preference when possible; otherwise, system preference selects the initial theme before paint.

- **Charcoal:** `paper` is the page background.
- **Warm white:** `ink` is the primary reading color.
- **Slate:** `line` defines section rules, table borders, and controls.
- **Sage:** `accent` marks active navigation, links, retrieval points, text selection, and focus.
- **Reused roles:** `muted` uses the supplied pale accent in dark mode and slate in light mode. `soft` and `diagram` reuse the page background. Document dots use slate in dark mode and the pale accent in light mode.

**The Shared Palette Rule.** Use the semantic CSS variables and only the four supplied colors. Preserve the roles across light and dark themes, with visible contrast for controls and text.

## Typography

**Display and interface font:** Public Sans Variable, locally bundled, with sans serif fallback. **Article body:** Georgia with Times New Roman and serif fallbacks. **Code:** the system monospace stack.

The home statement uses a responsive heading from 30px to 48px, limited to 25ch with 1.18 leading. Article headline tokens retain a larger reading hierarchy for individual stories. Feed titles use the `title` role; supporting interface copy uses the smaller `summary` and `label` roles. Featured titles use a responsive size (`clamp(27px, 2.75vw, 38px)`), medium weight (550), and compact leading (1.17). Page titles use a separate clamp (`clamp(45px, 6.5vw, 80px)`).

Article text sits in a column up to 720px wide. Its section headings return to Public Sans; second-level headings are 29px and third-level headings 22px. Dates and tables use tabular numerals. Small labels remain sentence case except the article contents heading and diagram annotations.

**The Reading Pair Rule.** Use Public Sans for navigation, titles, metadata, summaries, and article headings; reserve Georgia for long-form prose.

## Layout

The centered shell caps at 1440px with 72px side padding. Layouts use explicit CSS grids rather than a universal twelve-column utility: the feature splits evenly, the desktop feed uses date/content/arrow columns, About uses a 1:2 split, and articles pair a sticky contents column with the reading column.

Spacing is purpose-led, with compact control gaps, larger editorial gutters, and substantial section separation. Feed rows use hairline bottoms instead of floating cards. The article grid caps at 1000px, with a 180px contents column and 55px gap.

Responsive thresholds are inclusive: at widths up to 1050px shell padding becomes 40px and grids tighten; up to 720px padding becomes 24px, feature and About stack, feed dates move above their titles, and the article contents becomes a static ruled block. The home heading scales to 30px on mobile; article text becomes 17px with 1.8 leading. Up to 370px, shell padding becomes 18px and the compact author identity stays visible. From 1600px, shell padding becomes 88px.

On mobile, type filters scroll horizontally, the topic select wraps below, external masthead navigation is hidden, and the full author name remains visible and wraps when needed. Tables and code blocks scroll within their reading area.

## Elevation & Depth

There are no shadows. Hairline borders, whitespace, and the soft feature/diagram fields establish hierarchy. Hover responses use color, a small arrow translation, and retrieval-point opacity. Transitions are short (160–250ms, ease); reduced-motion preference disables transitions and animations and restores automatic scrolling.

**The Flat Surface Rule.** Keep publication surfaces flat; distinguish them through rules, spacing, and semantic tonal fields.

## Shapes

Controls, tags, code blocks, and feature surfaces are square. Thin straight rules establish structure. Circles are meaningful marks: active navigation dots, article type markers, and the retrieval diagram. Project markers are tiny squares. Focus is a visible accent outline (2px) separated from its target by 5px.

## Components

- **Navigation:** compact text links with a 44px minimum link height. The current page uses accent text and a small dot below. The header shows the author identity without a monogram, plus a 44px theme button with an accessible name and pressed state.
- **Text links:** understated, unfilled actions paired with inline SVG arrows. Their arrows move diagonally by 2px on hover. The same treatment serves the empty-state reset button; the homepage primary link is underlined, has no rectangle background or border, and keeps a 44px minimum hit area.
- **Feed controls:** unfilled type buttons turn accent when `aria-pressed` is true. A labeled, square native select handles topics. Topic tags are small outlined links; hover changes their border to accent. Keyboard focus uses the shared outline.
- **Featured story:** one large link combines a soft text field and a diagram field. The title changes to accent on hover, while selected diagram points subtly vary in opacity. The copy has generous internal padding; the pair stacks on mobile.
- **Feed entries:** editorial rows expose date, type, title, description, tags, reading time, and a separate accessible arrow link. Dividers carry the grouping; rows have no independent raised surface.
- **Retrieval diagram:** an original inline SVG dot matrix with an accented neighborhood, dashed radius, query cross, hairline frame, and small annotations. Decorative instances are hidden from assistive technology; article figures provide explanatory captions.
- **About portrait:** use the supplied `pfp/pfp.jpeg`, imported through Astro assets with explicit dimensions and alt text. Display it at up to 240px square on desktop and 80px alongside the identity on mobile.
- **Code:** syntax highlighting uses custom light/dark Shiki themes restricted to the four-color palette; token weight and italics retain syntax distinctions.
- **Article and footer:** long-form text uses ruled quotations, bordered scrolling code, compact tables, and small sans serif captions. The footer contains a writing link, plain external links, copyright, and a back-to-top link. Read-next is a ruled title link with an arrow.

## Do's and Don'ts

### Do:
- **Do** preserve the charcoal/sage palette roles in both themes and visible keyboard focus.
- **Do** use aligned columns, generous whitespace, and hairline rules to organize content.
- **Do** retain the Public Sans / Georgia split between interface and article prose.
- **Do** build explanatory art as original SVG diagrams and keep sample-content labels clear.
- **Do** collapse editorial columns and contain wide code and tables on small screens.

### Don't:
- **Don't** add shadows, rounded card shells, or decorative gradients to publication surfaces.
- **Don't** give the homepage primary CTA a filled rectangle or introduce colors outside the approved four.
- **Don't** replace explanatory vector diagrams with generic decorative stock imagery.
- **Don't** rely on motion or color alone to communicate control state.
