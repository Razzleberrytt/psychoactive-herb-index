/* global herbData */
// DEBUG ALERT VERSION
alert('HERBDATA length: ' + (Array.isArray(herbData) ? herbData.length : 'NOT ARRAY'));

let currentFilter = '';
let showFavoritesOnly = false;
let currentSort = 'alphabetical';

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function saveFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));
}

function createHerbCard(herb) {
  const section = document.createElement('section');
  section.className = 'herb-card';
  section.innerHTML = \`
    <h2>
      \${herb.Herb}
      <button class="favorite-btn \${getFavorites().includes(herb.Herb) ? 'active' : ''}" title="Toggle Favorite">★</button>
    </h2>
    <p><strong>Category:</strong> \${herb.Category}</p>
    <p><strong>Effects:</strong> \${herb.Effects}</p>
    <details><summary>Details</summary><p>More info here</p></details>
  \`;
  const header = section.querySelector('h2');
  header.style.cursor = 'pointer';
  header.addEventListener('click', () => {
    alert('HEADER CLICKED: ' + herb.Herb);
    const details = section.querySelectorAll('details');
    const anyClosed = Array.from(details).some(d => !d.open);
    details.forEach(d => d.open = anyClosed);
  });
  return section;
}

function renderHerbs() {
  const container = document.getElementById('herb-list');
  container.innerHTML = '';
  if (!Array.isArray(herbData)) return;
  herbData.forEach(h => container.appendChild(createHerbCard(h)));
}

document.addEventListener('DOMContentLoaded', () => {
  renderHerbs();
});
