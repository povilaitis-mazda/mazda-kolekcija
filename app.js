window.mazdaTheme?.syncControls();
const items = [...window.collection].reverse().sort((a, b) => b.added.localeCompare(a.added));
const $ = id => document.getElementById(id);
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const approximateScale = item => item.scaleApproximate ?? item.scaleNote.startsWith('Apytikslis');
const scaleLabel = item => `${item.scale}${approximateScale(item) ? '*' : ''}`;
const brandLabel = item => item.publisher ? `Leidėjas: ${item.publisher}` : item.maker;
const condition = item => item.condition || (item.packaged ? 'Originalioje pakuotėje' : 'Be pakuotės');
const conditionTag = item => item.conditionTag || (item.packaged ? 'Pakuotėje' : 'Be pakuotės');
const modelValues = item => item.models || [item.model];
const filterValues = (item, key) => key === 'model' ? modelValues(item) : [item[key]];
const ownerPhotos = item => (item.photos || []).map(entry => typeof entry === 'string' ? {url:entry, label:'Mano kolekcijos nuotrauka'} : entry);
const placeholder = (item, large = false) => `<div class="placeholder ${large ? 'large' : ''}"><span class="ghost">${esc(item.model)}</span><span class="photo-label">NUOTRAUKA RUOŠIAMA</span><span class="photo-number">${esc(brandLabel(item))} / ${esc(scaleLabel(item))}</span></div>`;
const photosFor = item => [
  ...(item.catalog ? [{...item.catalog, label: 'Kataloginė nuotrauka'}] : []),
  ...ownerPhotos(item)
];
const primaryPhotoIndex = item => item.catalog ? 0 : Math.max(0, photosFor(item).length - 1);
const photo = (item, large = false, index = primaryPhotoIndex(item)) => {
  const entry = photosFor(item)[index];
  if (!entry) return placeholder(item, large);
  const fallback = entry.sourceUrl ? (ownerPhotos(item).at(-1)?.url || '') : '';
  return `<div class="model-photo ${large ? 'large-photo' : ''}"><img src="${esc(encodeURI(entry.url))}" ${fallback ? `data-fallback="${esc(encodeURI(fallback))}"` : ''} alt="${esc(item.name)} – ${esc(entry.label)}" loading="${large ? 'eager' : 'lazy'}" decoding="async" referrerpolicy="no-referrer"></div>`;
};
let activeItem;
let activePhotoIndex = 0;
let swipeStart;
const gallery = (item, index = primaryPhotoIndex(item)) => {
  const entries = photosFor(item), entry = entries[index];
  if (!entry) return placeholder(item,true);
  const navigation = entries.length > 1 ? `<button type="button" class="gallery-nav gallery-prev" data-photo-step="-1" aria-label="Ankstesnė nuotrauka"><span aria-hidden="true">‹</span></button><button type="button" class="gallery-nav gallery-next" data-photo-step="1" aria-label="Kita nuotrauka"><span aria-hidden="true">›</span></button><span class="gallery-counter" aria-hidden="true">${index+1} / ${entries.length}</span>` : '';
  return `<div class="gallery-stage">${photo(item,true,index)}${navigation}</div><div class="gallery-caption" role="status"><span class="sr-only">Nuotrauka ${index+1} iš ${entries.length}. </span>${esc(entry.label)}${entry.sourceUrl ? ` · <a href="${esc(entry.sourceUrl)}" target="_blank" rel="noopener noreferrer">Šaltinis: ${esc(entry.sourceName)} ↗</a>` : ''}</div><div class="gallery-tabs" role="group" aria-label="Nuotraukų pasirinkimas">${entries.map((entry,i)=>`<button type="button" data-photo-index="${i}" aria-pressed="${i===index}">${i+1}. ${esc(entry.label)}</button>`).join('')}</div>`;
};
const selectPhoto = (index, focusSelector) => {
  if (!activeItem || !$('detail').open) return;
  const count = photosFor(activeItem).length;
  if (!count) return;
  activePhotoIndex = ((index % count) + count) % count;
  $('detail-gallery').innerHTML = gallery(activeItem,activePhotoIndex);
  if (focusSelector) $('detail-gallery').querySelector(focusSelector)?.focus({preventScroll:true});
};
document.addEventListener('error',event => {
  const image = event.target;
  if (image.tagName !== 'IMG' || !image.dataset.fallback) return;
  image.src = image.dataset.fallback;
  image.alt = image.alt.replace('Kataloginė nuotrauka','Mano kolekcijos nuotrauka');
  delete image.dataset.fallback;
  const caption = image.closest('#detail-gallery')?.querySelector('.gallery-caption');
  if (caption) caption.textContent = 'Kataloginė nuotrauka nepasiekiama. Rodoma mano kolekcijos nuotrauka.';
},true);
$('detail-body').addEventListener('click',event => {
  const button = event.target.closest('[data-photo-index], [data-photo-step]');
  if (!button || !activeItem) return;
  if (button.dataset.photoStep) {
    selectPhoto(activePhotoIndex + Number(button.dataset.photoStep),`[data-photo-step="${button.dataset.photoStep}"]`);
  } else {
    selectPhoto(Number(button.dataset.photoIndex),`[data-photo-index="${button.dataset.photoIndex}"]`);
  }
});
document.addEventListener('keydown',event => {
  if (!$('detail').open || !activeItem || photosFor(activeItem).length < 2 ||
      event.altKey || event.ctrlKey || event.metaKey ||
      event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
  const direction = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
  if (!direction) return;
  event.preventDefault();
  const focused = document.activeElement;
  const focusSelector = focused?.hasAttribute('data-photo-step') ? `[data-photo-step="${focused.dataset.photoStep}"]` :
    focused?.hasAttribute('data-photo-index') ? `[data-photo-index="${focused.dataset.photoIndex}"]` : undefined;
  selectPhoto(activePhotoIndex + direction,focusSelector);
});
$('detail-body').addEventListener('pointerdown',event => {
  if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
  if (!event.isPrimary) { swipeStart = undefined; return; }
  if (!event.target.closest('.gallery-stage') || event.target.closest('button, a')) return;
  swipeStart = {id:event.pointerId,x:event.clientX,y:event.clientY};
});
$('detail-body').addEventListener('pointerup',event => {
  const start = swipeStart;
  swipeStart = undefined;
  if (!start || start.id !== event.pointerId || !activeItem || photosFor(activeItem).length < 2) return;
  const dx = event.clientX - start.x, dy = event.clientY - start.y;
  if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.5) selectPhoto(activePhotoIndex + (dx < 0 ? 1 : -1));
});
$('detail-body').addEventListener('pointercancel',() => { swipeStart = undefined; });
$('detail').addEventListener('close',() => { activeItem = undefined; swipeStart = undefined; });
const filterKeys = ['maker','model','scale'];
const filterNames = {maker:'Visi gamintojai', model:'Visi modeliai', scale:'Visi masteliai'};
let filterPriority = [...filterKeys];
const matchesSelection = (item, selection, excludedKey) => filterKeys.every(key =>
  key === excludedKey || !selection[key] || filterValues(item, key).includes(selection[key]));
const readSelection = () => Object.fromEntries(filterKeys.map(key => [key, $(key).value]));
function updateFilters(candidates, changedKey) {
  if (filterKeys.includes(changedKey)) filterPriority = [changedKey, ...filterPriority.filter(key => key !== changedKey)];
  const selection = readSelection();
  let compatible = candidates;
  // Keep the most recent choice; clear earlier choices that cannot coexist.
  for (const key of filterPriority) {
    if (!selection[key]) continue;
    const matches = compatible.filter(item => filterValues(item, key).includes(selection[key]));
    if (matches.length) compatible = matches;
    else selection[key] = '';
  }
  for (const key of filterKeys) {
    // A facet's counts apply every other facet, but exclude its own selection.
    const available = candidates.filter(item => matchesSelection(item, selection, key));
    const counts = new Map();
    for (const item of available) for (const value of new Set(filterValues(item, key))) {
      counts.set(value, (counts.get(value) || 0) + 1);
    }
    const options = [new Option(filterNames[key], '')];
    for (const [value, count] of [...counts].sort(([a], [b]) => a.localeCompare(b, 'lt', {numeric:true}))) {
      const approximate = key === 'scale' && available.filter(item => item.scale === value).every(approximateScale);
      options.push(new Option(`${value}${approximate ? ' (apytikslis)' : ''} · ${count}`, value));
    }
    $(key).replaceChildren(...options);
    $(key).value = selection[key];
  }
  return selection;
}
const columnsKey = 'mazda-collection-columns';
const columnChoices = ['auto', '2', '3', '4'];
const applyColumns = value => {
  const choice = columnChoices.includes(value) ? value : 'auto';
  $('columns').value = choice;
  $('cards').dataset.columns = choice;
};
let savedColumns;
try { savedColumns = window.localStorage.getItem(columnsKey); } catch (_) {}
applyColumns(savedColumns);
$('columns').addEventListener('change', () => {
  applyColumns($('columns').value);
  try { window.localStorage.setItem(columnsKey, $('columns').value); } catch (_) {}
});
$('total').textContent = items.length;
$('makers').textContent = new Set(items.filter(item => item.maker !== 'Nepatvirtintas').map(item => item.maker)).size;
$('packed').textContent = items.filter(item => item.packaged).length;
$('updated').textContent = items.map(item => item.added).sort().at(-1) || '—';
function render(changedKey) {
  const query = $('query').value.trim().toLocaleLowerCase('lt');
  const candidates = items.filter(item => [item.name,item.maker,item.publisher,item.series,item.color,item.description].join(' ').toLocaleLowerCase('lt').includes(query));
  const selection = updateFilters(candidates, changedKey);
  const shown = candidates.filter(item => matchesSelection(item, selection));
  $('results').textContent = `Rodoma ${shown.length} iš ${items.length}`;
  $('cards').innerHTML = shown.map(item => `<article class="card"><button class="card-open" data-id="${esc(item.id)}" aria-label="Plačiau: ${esc(item.name)}">${photo(item)}<div class="card-body"><p class="eyebrow">${esc(brandLabel(item))} <span>↗</span></p><h3>${esc(item.name)}</h3><p class="series">${esc(item.series)}</p><p class="description">${esc(item.description)}</p><div class="tags"><span>${esc(scaleLabel(item))}</span><span>${esc(item.color)}</span><span>${esc(conditionTag(item))}</span></div><div class="card-bottom"><span>PRIDĖTA ${esc(item.added)}</span><span>Peržiūrėti →</span></div></div></button></article>`).join('');
  $('empty').hidden = shown.length !== 0;
}
$('filters').addEventListener('input', event => { if (event.target.id === 'query') render('query'); });
$('filters').addEventListener('change', event => { if (filterKeys.includes(event.target.id)) render(event.target.id); });
$('filters').addEventListener('submit',e => e.preventDefault());
$('filters').addEventListener('reset',() => setTimeout(() => {
  for (const key of filterKeys) $(key).value = '';
  filterPriority = [...filterKeys];
  render();
},0));
$('cards').addEventListener('click', event => {
  const button = event.target.closest('[data-id]'); if (!button) return;
  const item = items.find(item => item.id === button.dataset.id);
  activeItem = item;
  activePhotoIndex = primaryPhotoIndex(item);
  swipeStart = undefined;
  $('detail-body').innerHTML = `<div id="detail-gallery">${gallery(item,activePhotoIndex)}</div><div class="detail-content"><p class="eyebrow">${esc(brandLabel(item))} / ${esc(item.series)}</p><h2 id="detail-title">${esc(item.name)}</h2><p>${esc(item.description)}</p><dl><div><dt>Mastelis</dt><dd>${esc(scaleLabel(item))}</dd></div><div><dt>Spalva</dt><dd>${esc(item.color)}</dd></div><div><dt>Būklė</dt><dd>${esc(condition(item))}</dd></div><div><dt>Pridėta</dt><dd>${esc(item.added)}</dd></div></dl><p class="small">${approximateScale(item) ? '* ' : ''}${esc(item.scaleNote)}</p><h3>Modelio istorija</h3><p>${esc(item.story)}</p></div>`;
  $('detail').showModal();
});
document.querySelector('.close').addEventListener('click',() => $('detail').close());
$('detail').addEventListener('click',event => { if (event.target === $('detail')) { const r = $('detail').getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) $('detail').close(); } });
render();
