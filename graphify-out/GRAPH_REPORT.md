# Graph Report - hotel-roma  (2026-11-11)

## Corpus Check
- 3 files · ~2,616 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .ttf 1, .ico 1, .css 1)

## Summary
- 18 nodes · 16 edges · 4 communities (2 shown, 2 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bad5e6cf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- script.js
- Recursos visuales de Hotel Roma
- open_photo

## God Nodes (most connected - your core abstractions)
1. `Recursos visuales de Hotel Roma` - 3 edges
2. `show_photo()` - 2 edges
3. `open_photo()` - 2 edges
4. `header` - 1 edges
5. `menu_toggle` - 1 edges
6. `mobile_nav` - 1 edges
7. `gallery_items` - 1 edges
8. `lightbox` - 1 edges
9. `lightbox_image` - 1 edges
10. `lightbox_caption` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (4 total, 2 thin omitted)

### Community 0 - "script.js"
Cohesion: 0.18
Nodes (7): gallery_items, header, lightbox, lightbox_caption, lightbox_image, menu_toggle, mobile_nav

### Community 1 - "Recursos visuales de Hotel Roma"
Cohesion: 0.50
Nodes (3): Logotipo oficial e identidad, Recursos visuales de Hotel Roma, Vista previa en redes sociales (Open Graph / Twitter)

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._