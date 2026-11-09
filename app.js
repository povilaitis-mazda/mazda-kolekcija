const items = window.collection;
const $ = id => document.getElementById(id);
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const placeholder = (item, large = false) => `<div class="placeholder ${large ? 'large' : ''}"><span class="ghost">${esc(item.model)}</span><span class="photo-label">NUOTRAUKA RUOŠIAMA</span><span class="photo-number">${esc(item.maker)} / ${esc(item.scale)}*</span></div>`;
const photosFor = item => [
  ...(item.catalog ? [{...item.catalog, label: 'Kataloginė nuotrauka'}] : []),
  ...(item.photos || []).map(url => ({url, label: 'Mano kolekcijos nuotrauka'}))
];
const photo = (item, large = false, index = 0) => {
  const entry = photosFor(item)[index];
  if (!entry) return placeholder(item, large);
  const fallback = entry.sourceUrl && item.photos?.length ? item.photos[0] : '';
  return `<div class="model-photo ${large ? 'large-photo' : ''}"><img src="${esc(encodeURI(entry.url))}" ${fallback ? `data-fallback="${esc(encodeURI(fallback))}"` : ''} alt="${esc(item.name)} – ${esc(entry.label)}" loading="${large ? 'eager' : 'lazy'}" decoding="async" referrerpolicy="no-referrer"></div>`;
};
let activeItem;
const gallery = (item, index = 0) => {
  const entries = photosFor(item), entry = entries[index];
  return `${photo(item,true,index)}<div class="gallery-caption" role="status">${esc(entry.label)}${entry.sourceUrl ? ` · <a href="${esc(entry.sourceUrl)}" target="_blank" rel="noopener noreferrer">Šaltinis: ${esc(entry.sourceName)} ↗</a>` : ''}</div><div class="gallery-tabs" role="group" aria-label="Nuotraukų pasirinkimas">${entries.map((entry,i)=>`<button type="button" data-photo-index="${i}" aria-pressed="${i===index}">${i+1}. ${esc(entry.label)}</button>`).join('')}</div>`;
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
  const button = event.target.closest('[data-photo-index]');
  if (!button || !activeItem) return;
  const index = Number(button.dataset.photoIndex);
  $('detail-gallery').innerHTML = gallery(activeItem,index);
  $('detail-gallery').querySelector(`[data-photo-index="${index}"]`).focus({preventScroll:true});
});
for (const key of ['maker','model','scale']) {
  for (const value of [...new Set(items.map(item => item[key]))].sort()) {
    const option = document.createElement('option'); option.value = value;
    option.textContent = `${value}${key === 'scale' ? ' (apytikslis)' : ''} · ${items.filter(item => item[key] === value).length}`;
    $(key).append(option);
  }
}
$('total').textContent = items.length;
$('makers').textContent = new Set(items.map(item => item.maker)).size;
$('packed').textContent = items.filter(item => item.packaged).length;
$('updated').textContent = items.map(item => item.added).sort().at(-1) || '—';
function render() {
  const query = $('query').value.trim().toLocaleLowerCase('lt');
  const shown = items.filter(item => ['maker','model','scale'].every(key => !$(key).value || item[key] === $(key).value) && [item.name,item.maker,item.series,item.color,item.description].join(' ').toLocaleLowerCase('lt').includes(query));
  $('results').textContent = `Rodoma ${shown.length} iš ${items.length}`;
  $('cards').innerHTML = shown.map(item => `<article class="card"><button class="card-open" data-id="${esc(item.id)}" aria-label="Plačiau: ${esc(item.name)}">${photo(item)}<div class="card-body"><p class="eyebrow">${esc(item.maker)} <span>↗</span></p><h3>${esc(item.name)}</h3><p class="series">${esc(item.series)}</p><p class="description">${esc(item.description)}</p><div class="tags"><span>${esc(item.scale)}*</span><span>${esc(item.color)}</span><span>Pakuotėje</span></div><div class="card-bottom"><span>PRIDĖTA ${esc(item.added)}</span><span>Peržiūrėti →</span></div></div></button></article>`).join('');
  $('empty').hidden = shown.length !== 0;
}
$('filters').addEventListener('input',render);
$('filters').addEventListener('submit',e => e.preventDefault());
$('filters').addEventListener('reset',() => setTimeout(render,0));
$('cards').addEventListener('click', event => {
  const button = event.target.closest('[data-id]'); if (!button) return;
  const item = items.find(item => item.id === button.dataset.id);
  activeItem = item;
  $('detail-body').innerHTML = `<div id="detail-gallery">${gallery(item)}</div><div class="detail-content"><p class="eyebrow">${esc(item.maker)} / ${esc(item.series)}</p><h2 id="detail-title">${esc(item.name)}</h2><p>${esc(item.description)}</p><dl><div><dt>Mastelis</dt><dd>${esc(item.scale)}*</dd></div><div><dt>Spalva</dt><dd>${esc(item.color)}</dd></div><div><dt>Būklė</dt><dd>Originalioje pakuotėje</dd></div><div><dt>Pridėta</dt><dd>${esc(item.added)}</dd></div></dl><p class="small">* ${esc(item.scaleNote)}</p><h3>Modelio istorija</h3><p>${esc(item.story)}</p></div>`;
  $('detail').showModal();
});
document.querySelector('.close').addEventListener('click',() => $('detail').close());
$('detail').addEventListener('click',event => { if (event.target === $('detail')) { const r = $('detail').getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) $('detail').close(); } });
render();
