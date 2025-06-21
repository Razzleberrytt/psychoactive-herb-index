document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('herb-list');
  const searchInput = document.getElementById('search');

  function createHerbCard(herb) {
    const card = document.createElement('div');
    card.className = 'card';
    const slug = herb.Herb.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const fieldBlock = (label, value) => value ? `<p><strong>${label}:</strong> ${value}</p>` : '';

    card.innerHTML = `
      <h2>${herb.Herb}</h2>
      <p><em>${herb.Category || ''}</em></p>
      <p><strong>Effects:</strong> ${herb.Effects || ''}</p>
      <div class="details">
        ${fieldBlock("Preparation", herb.Preparation)}
        ${fieldBlock("Intensity", herb.Intensity)}
        ${fieldBlock("Onset", herb.Onset)}
        ${fieldBlock("Region", herb.Region)}
        ${fieldBlock("Mechanism of Action", herb["Mechanism of Action"])}
        ${fieldBlock("Therapeutic Uses", herb["Therapeutic Uses"])}
        ${fieldBlock("Side Effects", herb["Side Effects"])}
        ${fieldBlock("Legal Status", herb["Legal Status"])}
        <p><a href="./herb/${slug}.html">🔗 More Info</a></p>
      </div>
      <button onclick="this.parentNode.classList.toggle('open')">Toggle Details</button>
    `;
    return card;
  }

  function renderHerbs(data) {
    container.innerHTML = '';
    data.forEach(h => container.appendChild(createHerbCard(h)));
  }

  renderHerbs(herbs);

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    const filtered = herbs.filter(h => h.Herb.toLowerCase().includes(q));
    renderHerbs(filtered);
  });
});