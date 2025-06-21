
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('herb-list');
  const search = document.getElementById('search');
  const render = () => {
    const term = search.value.toLowerCase();
    container.innerHTML = '';
    herbs.forEach(h => {
      if (!term || h.name.toLowerCase().includes(term)) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h2>${h.name}</h2>
          <p><strong>Category:</strong> ${h.category}</p>
          <p><strong>Effects:</strong> ${h.effects}</p>
          <a href="herbs/${h.name.toLowerCase().replace(/ /g, '-')}.html">Learn More</a>
        `;
        container.appendChild(card);
      }
    });
  };
  search.addEventListener('input', render);
  render();
});
