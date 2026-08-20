# Coimbatore Startup Map — Design Directions

## Three stylistic approaches

### 1. Atlas Field Notes
**Very Brief Intro:** A warm, city-research interface that feels like a well-used urban field guide: ink, paper, turmeric, and small moments of cartographic detail. It makes the map feel discovered rather than merely displayed.

**Probability:** 0.07

### 2. Civic Signal
**Very Brief Intro:** A crisp municipal-data visual system with cool white panels, cobalt coordinates, and strong information hierarchy. It emphasizes clarity, filters, and fast comparison.

**Probability:** 0.04

### 3. Night Market Network
**Very Brief Intro:** A dark, luminous network map with glowing pins and soft ambient depth. It would lean into after-hours founder energy and layered city infrastructure.

**Probability:** 0.09

---

## Chosen approach — Atlas Field Notes

### Design Movement
**Contemporary cartographic editorial design**—an interface informed by survey maps, urban field notes, and quiet Indian print ephemera rather than generic SaaS dashboards.

### Core Principles
1. **The map is the document.** Controls and startup information read as carefully placed annotations on a living city atlas.
2. **Information earns its surface.** Compact filter tools, result counts, and detail panels stay legible without competing with geographic context.
3. **Warm precision.** Earthy neutrals make data approachable; one saturated signal color focuses attention and interaction.
4. **Motion follows geography.** Selection, zoom, and panel transitions should feel like pages, pins, and annotations settling into place.

### Color Philosophy
The map uses CARTO Voyager as the geographic canvas, then frames it with **unbleached paper, charcoal ink, weathered terracotta, and a single marigold signal**. Terracotta speaks to Coimbatore’s craft and industrial texture; marigold is reserved for selected companies, active filters, and movement. Colors never decorate without a data role.

### Layout Paradigm
The map fills the viewport. A top-left **field-note masthead** acts as a working label, a floating left **filter folio** contains search and facets, and a right **startup dossier** slides in for selected companies. On mobile, the filter folio condenses into a toolbar and the dossier becomes a bottom sheet.

### Signature Elements
1. **Coordinate label:** a small monospaced latitude/longitude strip anchoring the map interface.
2. **Marker seals:** startup logos sit inside cream cartographic seals, with terracotta selected rings and discreet cluster counts.
3. **Field-note dividers:** thin ink rules, tiny datum dots, and smallcaps labels structure panels.

### Interaction Philosophy
Every action has a spatial consequence: choosing a company focuses the map, selecting a filter changes the visible field, and clearing filters restores the full city. Interfaces stay direct, reversible, and keyboard-accessible.

### Animation
Use `transform` and `opacity` only. Panels enter in 240ms with a strong ease-out; markers scale from 0.95 with a 150ms settle; selected markers add a contained halo pulse once, then remain still. Filter chips fade/slide by 8px. Respect `prefers-reduced-motion` and remove non-essential movement.

### Typography System
**DM Sans** provides compact, contemporary UI text. **Fraunces** gives the title and selected company name a civic-editorial voice. **IBM Plex Mono** labels coordinates, counts, and micro-metadata. Headings use tightened tracking; metadata uses tabular numerals and modest positive tracking.

### Brand Essence
**A legible atlas of Coimbatore’s startup landscape for founders, talent, investors, and the curious.**

**Personality:** observant, grounded, generous.

### Brand Voice
Headlines are specific and calm; CTAs describe the action rather than marketing the product.

Examples:

> “130 companies, one evolving city.”

> “Focus this startup on the map.”

### Wordmark & Logo
The mark is a **nested coordinate seal**: an offset square grid with one marigold datum point, suggesting both an urban block and a plotted company. The wordmark is a compact serif/sans pairing rather than a default font treatment.

### Signature Brand Color
**Foundry Marigold — #E5A93E**
