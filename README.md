# Mazda kolekcija

Static Lithuanian collection catalog for https://kolekcija.povilaitis.lt.

GitHub Pages source: `main`, repository root. No build or dependencies required.

Edit model entries in `collection.js`. Counts, filters and the latest addition date are derived automatically. Both initial scales are approximate, as in the original catalog.

The owner manually uploaded the two photographs to this public repository. The catalog references those existing files without re-uploading them. Keep image paths in each entry’s `photos` array. Do not re-upload previously blocked photographs through another route.

Site files: `index.html`, `style.css`, `collection.js`, `app.js`, `CNAME`, `.nojekyll`.

Catalog images are externally hosted and attributed in the detail gallery. Each entry's optional catalog object holds its URL and source link. Personal photos stay last in the gallery and provide a fallback if the catalog host is unavailable. External availability and reuse rights are not guaranteed by this repository.
