import { herbData } from './psychoactive_herb_index_data.js';

const container = document.getElementById('herb-list');
if (container && herbData && Array.isArray(herbData)) {
  herbData.forEach(herb => {
    const div = document.createElement('div');
    div.className = 'herb-card';
    div.innerHTML = `<h3>${herb.name}</h3>
                     <p><strong>Category:</strong> ${herb.category}</p>
                     <p><strong>Effects:</strong> ${herb.effects}</p>`;
    container.appendChild(div);
  });
}