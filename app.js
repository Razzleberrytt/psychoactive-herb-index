// ─── 1) Load your data ─────────────────────────────────────────────────────────
/* global herbData */  // assumes you’ve loaded psychoactive_herb_index_data_MASTER_UPDATED.js first

// ─── 2) State & Helpers ──────────────────────────────────────────────────────
let currentFilter = '';
let showFavoritesOnly = false;
let currentSort = 'alphabetical';

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function saveFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));
}

// ─── 3) Create a herb card ────────────────────────────────────────────────────
function createHerbCard(herb) {
  const section = document.createElement('section');
  section.className = 'herb-card';

  // build inner HTML without relying on herb-header class
  section.innerHTML = `
    <h2>
      ${herb.Herb}
      <button class="favorite-btn ${getFavorites().includes(herb.Herb) ? 'active' : ''}"
              title="Toggle Favorite"
      >★</button>
    </h2>
    <p><strong>Category:</strong> ${herb.Category}</p>
    <p><strong>Tags:</strong> ${herb.Tags || ''}</p>
    <p><strong>Effects:</strong> ${herb.Effects}</p>
    <details><summary>Mechanism of Action</summary><p>${herb["Mechanism of Action"] || 'N/A'}</p></details>
    <details><summary>Pharmacokinetics</summary><p>${herb.Pharmacokinetics || 'N/A'}</p></details>
    <details><summary>Therapeutic Uses</summary><p>${herb["Therapeutic Uses"] || 'N/A'}</p></details>
    <details><summary>Side Effects</summary><p>${herb["Side Effects"] || 'N/A'}</p></details>
    <details><summary>Contraindications</summary><p>${herb.Contraindications || 'N/A'}</p></details>
    <details><summary>Drug Interactions</summary><p>${herb["Drug Interactions"] || 'N/A'}</p></details>
    <details><summary>Toxicity</summary><p>${herb.Toxicity || 'N/A'}</p></details>
  `;

  // favorite button handler
  const favBtn = section.querySelector('.favorite-btn');
  favBtn.addEventListener('click', e => {
    e.stopPropagation();
    let favs = getFavorites();
    if (favs.includes(herb.Herb)) {
      favs = favs.filter(h => h !== herb.Herb);
      favBtn.classList.remove('active');
    } else {
      favs.push(herb.Herb);
      favBtn.classList.add('active');
    }
    saveFavorites(favs);
  });

  return section;
}

// ─── 4) Render logic ──────────────────────────────────────────────
function renderHerbs() {
  const container = document.getElementById('herb-list');
  container.innerHTML = '';

  let list = herbData.filter(h => {
    const hay = (h.Herb + h.Effects + h.Tags + h.Category).toLowerCase();
    const bySearch = !currentFilter || hay.includes(currentFilter.toLowerCase());
    const byFav = !showFavoritesOnly || getFavorites().includes(h.Herb);
    return bySearch && byFav;
  });

  // sorting
  if (currentSort === 'alphabetical') {
    list.sort((a, b) => a.Herb.localeCompare(b.Herb));
  } else {
    const order = ['Mild', 'Moderate', 'High'];
    list.sort((a, b) => order.indexOf(a.Intensity) - order.indexOf(b.Intensity));
  }

  list.forEach(h => container.appendChild(createHerbCard(h)));
}

// ─── 5) Global Event Listeners ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHerbs();

  // search
  document.getElementById('searchInput').addEventListener('input', e => {
    currentFilter = e.target.value;
    renderHerbs();
  });

  // favorites only
  document.getElementById('favoritesToggle').addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly;
    renderHerbs();
  });

  // sort
  document.getElementById('sortSelect').addEventListener('change', e => {
    currentSort = e.target.value;
    renderHerbs();
  });

  // dark mode
  document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // random herb
  const rnd = document.getElementById('randomHerb');
  if (rnd) {
    rnd.addEventListener('click', () => {
      const pick = herbData[Math.floor(Math.random() * herbData.length)].Herb;
      currentFilter = pick;
      document.getElementById('searchInput').value = pick;
      renderHerbs();
    });
  }

  // delegate click on H2 to toggle details
  document.getElementById('herb-list').addEventListener('click', e => {
    const hdr = e.target.closest('h2');
    if (!hdr) return;
    const section = hdr.closest('section.herb-card');
    if (!section) return;
    const details = section.querySelectorAll('details');
    const anyClosed = Array.from(details).some(d => !d.open);
    details.forEach(d => d.open = anyClosed);
  });
});
