
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('herb-list');
  if (!container) return;

  fetch('psychoactive_herb_index_data.js')
    .then(response => response.text())
    .then(data => {
      const herbs = JSON.parse(data.replace('const herbs = ', '').slice(0, -1));
      herbs.forEach(herb => {
        const card = document.createElement('div');
        card.className = 'herb-card';
        card.innerHTML = `
          <h3>${herb.name}</h3>
          <p><strong>Category:</strong> ${herb.category}</p>
          <p><strong>Effects:</strong> ${herb.effects}</p>
        `;
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          window.location.href = 'herb/' + herb.slug + '.html';
        });
        container.appendChild(card);
      });
    });
});
