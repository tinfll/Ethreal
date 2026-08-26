# Ethreal

A worldbuilding archive — characters, lore, works, and games — for the
world of Ethreal.

## Stack

- **[Astro](https://astro.build/)** — static site generator, markdown-first.
- **Content Collections** — typed folders under `src/content/`:
  - `characters/` — `.mdx` files per character (frontmatter + body).
  - `lore/` — wiki entries, grouped by `section` (metaphysics, history, …).
  - `works/` — `.md` entries supporting pictures + text (frontmatter `cover`).
  - `games/` — entries for indie games set in this world.
- **three.js** — interactive 3D viewer (`src/components/CharacterViewer.astro`)
  for character pages. Supports GLB / glTF / FBX. **GLB recommended.**
- **KaTeX** — LaTeX-style math in markdown (`$inline$`, `$$display$$`).
- **Container directives** — `:::name` blocks rendered via `remark-directive`
  (custom renderer in `src/lib/remark-directive-containers.js`).

## Callouts & details

Works in `.md` and `.mdx` files.

```
:::details[Click to expand]
Hidden content goes here.
:::

:::warning
Something might be off.
:::

:::danger[Do not]
This will erase things.
:::

:::note
Just a note.
:::
```

Supported callout types: `note`, `tip`, `info`, `warning`, `caution`, `danger`.
The `[Title]` part is optional; without it, `details` shows "Details" and
callouts show their type name.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # writes ./dist
npm run preview  # serve the built site
```

## Adding content

Create a new file in the appropriate `src/content/<collection>/` folder. The
schema (in `src/content/config.ts`) is validated at build time — if you miss
a required field, the build will tell you exactly which one.

### Character with a 3D model

1. Convert your FBX → GLB (Blender export, or `FBX2glTF`). GLB is ~5–10×
   smaller and loads much faster.
2. Drop the file in `public/models/your-character.glb`.
3. Reference it in frontmatter:

   ```yaml
   model:
     src: /models/your-character.glb
     format: glb
     scale: 1
   ```

Large binary assets should live behind Git LFS or on a CDN — don't commit
multi-megabyte GLBs to the main repo history.

### Math in markdown

```md
Inline: $E = mc^2$.

Display:
$$
\rho(\mathbf{x}, t) = \int e^{-S/\hbar^\star}\, \mathcal{D}\gamma
$$
```

## Deploy

This is a static site — any host works. Recommended: Cloudflare Pages or
Netlify (no asset size limits like GitHub Pages has). Build command:
`npm run build`. Publish directory: `dist`.
