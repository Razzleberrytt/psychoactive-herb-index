// Debugging App.js: logs steps to console
/* global herbData */

console.log("Debug App.js loaded. herbData length:", Array.isArray(herbData) ? herbData.length : herbData);

let currentFilter = '';
let showFavoritesOnly = false;
let currentSort = 'alphabetical';

function getFavorites() {
  console.log("getFavorites called");
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function saveFavorites(favs) {
  console.log("saveFavorites:", favs);
  localStorage.setItem('favorites', JSON.stringify(favs));
}

function createHerbCard(herb) {
  console.log("Creating card for herb:", herb.Herb);
  const section = document.createElement('section');
  section.className = 'herb-card';

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

  const favBtn = section.querySelector('.favorite-btn');
  favBtn.addEventListener('click', e => {
    e.stopPropagation();
    console.log("Favorite button clicked for:", herb.Herb);
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

  const header = section.querySelector('h2');
  header.style.cursor = 'pointer';
  header.addEventListener('click', () => {
    console.log("Header clicked for:", herb.Herb);
    const details = section.querySelectorAll('details');
    const anyClosed = Array.from(details).some(d => !d.open);
    console.log("Toggling details, anyClosed:", anyClosed);
    details.forEach(d => d.open = anyClosed);
  });

  return section;
}

function renderHerbs() {
  console.log("renderHerbs called with filter:", currentFilter, "favoritesOnly:", showFavoritesOnly, "sort:", currentSort);
  const container = document.getElementById('herb-list');
  if (!container) {
    console.error("Container #herb-list not found!");
    return;
  }
  container.innerHTML = '';

  let list = Array.isArray(herbData) ? herbData : [];
  if (!Array.isArray(herbData)) {
    console.error("herbData is not an array:", herbData);
  }

  list = list.filter(h => {
    const hay = (h.Herb + h.Effects + h.Tags + h.Category).toLowerCase();
    const bySearch = !currentFilter || hay.includes(currentFilter.toLowerCase());
    const byFav = !showFavoritesOnly || getFavorites().includes(h.Herb);
    return bySearch && byFav;
  });

  console.log("Filtered list length:", list.length);

  if (currentSort === 'alphabetical') {
    list.sort((a, b) => a.Herb.localeCompare(b.Herb));
  } else {
    const order = ['Mild', 'Moderate', 'High'];
    list.sort((a, b) => order.indexOf(a.Intensity) - order.indexOf(b.Intensity));
  }

  list.forEach(h => container.appendChild(createHerbCard(h)));
}

document.addEventListener('DOMContentLoaded', () => {
  renderHerbs();

  document.getElementById('searchInput').addEventListener('input', e => {
    currentFilter = e.target.value;
    renderHerbs();
  });

  document.getElementById('favoritesToggle').addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly;
    renderHerbs();
  });

  document.getElementById('sortSelect').addEventListener('change', e => {
    currentSort = e.target.value;
    renderHerbs();
  });

  document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  const rnd = document.getElementById('randomHerb');
  if (rnd) {
    rnd.addEventListener('click', () => {
      const pick = herbData[Math.floor(Math.random() * herbData.length)].Herb;
      currentFilter = pick;
      document.getElementById('searchInput').value = pick;
      renderHerbs();
    });
  }
});
