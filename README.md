# Mazda kolekcija

Static Lithuanian collection catalog for https://kolekcija.povilaitis.lt.

GitHub Pages source: `main`, repository root. No build or dependencies required.

Edit model entries in `collection.js`. Counts, filters and the latest addition date are derived automatically. Both initial scales are approximate, as in the original catalog.

The owner manually uploaded the two photographs to this public repository. The catalog references those existing files without re-uploading them. Keep image paths in each entry’s `photos` array. Do not re-upload previously blocked photographs through another route.

Site files: `index.html`, `style.css`, `collection.js`, `app.js`, `CNAME`, `.nojekyll`.

Catalog images are externally hosted and attributed in the detail gallery. Each entry's optional catalog object holds its URL and source link. Personal photos stay last in the gallery and provide a fallback if the catalog host is unavailable. External availability and reuse rights are not guaranteed by this repository.

New photographs are published only as copies stripped of EXIF/GPS, XMP, IPTC, comments and embedded auxiliary images. Their main JPEG pixels, dimensions and ICC color profile are preserved; original uploads stay outside the public repository.

Entries may specify publisher separately from maker, a confirmed or unconfirmed scale, and a condition. Hachette Collections Japan is a publisher; the Familia manufacturer is unconfirmed. Manufacturer counts include only confirmed makers. The packaged count includes display cases, with each entry showing its specific condition. Photos accept URLs or labeled objects; keep the owner’s main model photograph last.

Theme choice: the header has accessible Light/Dark buttons (Šviesi / Tamsi). An early head script applies a valid saved `mazda-collection-theme` preference, otherwise follows `prefers-color-scheme`, including system changes until a manual choice. Storage read/write failures are safe. Both palettes cover page surfaces, controls and dialogs; theme-color follows the active theme.
