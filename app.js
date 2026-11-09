const items = window.collection;
const $ = id => document.getElementById(id);
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const placeholder = (item, large = false) => `<div class="placeholder ${large ? 'large' : ''}"><span class="ghost">${esc(item.model)}</span><span class="photo-label">NUOTRAUKA RUOŠIAMA</span><span class="photo-number">${esc(item.maker)} / ${esc(item.scale)}*</span></div>`;
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
  $('cards').innerHTML = shown.map(item => `<article class="card"><button class="card-open" data-id="${esc(item.id)}" aria-label="Plačiau: ${esc(item.name)}">${placeholder(item)}<div class="card-body"><p class="eyebrow">${esc(item.maker)} <span>↗</span></p><h3>${esc(item.name)}</h3><p class="series">${esc(item.series)}</p><p class="description">${esc(item.description)}</p><div class="tags"><span>${esc(item.scale)}*</span><span>${esc(item.color)}</span><span>Pakuotėje</span></div><div class="card-bottom"><span>PRIDĖTA ${esc(item.added)}</span><span>Peržiūrėti →</span></div></div></button></article>`).join('');
  $('empty').hidden = shown.length !== 0;
}
$('filters').addEventListener('input',render);
$('filters').addEventListener('submit',e => e.preventDefault());
$('filters').addEventListener('reset',() => setTimeout(render,0));
$('cards').addEventListener('click', event => {
  const button = event.target.closest('[data-id]'); if (!button) return;
  const item = items.find(item => item.id === button.dataset.id);
  $('detail-body').innerHTML = `${placeholder(item,true)}<div class="detail-content"><p class="eyebrow">${esc(item.maker)} / ${esc(item.series)}</p><h2 id="detail-title">${esc(item.name)}</h2><p>${esc(item.description)}</p><dl><div><dt>Mastelis</dt><dd>${esc(item.scale)}*</dd></div><div><dt>Spalva</dt><dd>${esc(item.color)}</dd></div><div><dt>Būklė</dt><dd>Originalioje pakuotėje</dd></div><div><dt>Pridėta</dt><dd>${esc(item.added)}</dd></div></dl><p class="small">* ${esc(item.scaleNote)}</p><h3>Modelio istorija</h3><p>${esc(item.story)}</p><p class="small">Fotografijos bus pridėtos vėliau.</p></div>`;
  $('detail').showModal();
});
document.querySelector('.close').addEventListener('click',() => $('detail').close());
$('detail').addEventListener('click',event => { if (event.target === $('detail')) { const r = $('detail').getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) $('detail').close(); } });
render();
