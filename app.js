/* global herbData */
let currentFilter = '';
let showFavoritesOnly = false;
let currentSort = 'alphabetical';

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function saveFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));
}

function exportFavorites() {
  const favs = getFavorites();
  const blob = new Blob([JSON.stringify(favs, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'favorites.json';
  a.click();
  URL.revokeObjectURL(url);
}

function createHerbCard(herb) {
  const section = document.createElement('section');
  section.className = 'herb-card';
  section.innerHTML = `
    <h2>${herb.Herb}<button class="favorite-btn ${getFavorites().includes(herb.Herb) ? 'active' : ''}">★</button></h2>
    <p><strong>Category:</strong> ${herb.Category}</p>
    <p><strong>Tags:</strong> ${herb.Tags || ''}</p>
    <p><strong>Effects:</strong> ${herb.Effects}</p>
    <details><summary>Mechanism of Action</summary><p>${herb['Mechanism of Action'] || 'N/A'}</p></details>
    <details><summary>Pharmacokinetics</summary><p>${herb.Pharmacokinetics || 'N/A'}</p></details>
    <details><summary>Therapeutic Uses</summary><p>${herb['Therapeutic Uses'] || 'N/A'}</p></details>
    <details><summary>Side Effects</summary><p>${herb['Side Effects'] || 'N/A'}</p></details>
    <details><summary>Contraindications</summary><p>${herb.Contraindications || 'N/A'}</p></details>
    <details><summary>Drug Interactions</summary><p>${herb['Drug Interactions'] || 'N/A'}</p></details>
    <details><summary>Toxicity</summary><p>${herb.Toxicity || 'N/A'}</p></details>
  `;

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

  const header = section.querySelector('h2');
  header.style.cursor = 'pointer';
  header.addEventListener('click', () => {
    const details = section.querySelectorAll('details');
    const anyClosed = Array.from(details).some(d => !d.open);
    details.forEach(d => d.open = anyClosed);
  });

  return section;
}

function renderHerbs() {
  const container = document.getElementById('herb-list');
  container.innerHTML = '';
  herbData
    .filter(h => {
      const hay = (h.Herb + h.Effects + h.Tags + h.Category).toLowerCase();
      const bySearch = !currentFilter || hay.includes(currentFilter.toLowerCase());
      const byFav = !showFavoritesOnly || getFavorites().includes(h.Herb);
      return bySearch && byFav;
    })
    .sort((a, b) => {
      if (currentSort === 'alphabetical') {
        return a.Herb.localeCompare(b.Herb);
      }
      const order = ['Mild', 'Moderate', 'High'];
      return order.indexOf(a.Intensity) - order.indexOf(b.Intensity);
    })
    .forEach(h => container.appendChild(createHerbCard(h)));
}

document.addEventListener('DOMContentLoaded', () => {
  renderHerbs();
  document.getElementById('searchInput').addEventListener('input', e => {
    currentFilter = e.target.value.trim();
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
  document.getElementById('randomHerb').addEventListener('click', () => {
    const pick = herbData[Math.floor(Math.random() * herbData.length)].Herb;
    currentFilter = pick;
    document.getElementById('searchInput').value = pick;
    renderHerbs();
  });
  document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
});
