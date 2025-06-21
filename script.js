import { herbData } from './herbData_FULL.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('herb-list');

  if (!Array.isArray(herbData) || herbData.length === 0) {
    container.innerHTML = '<p>No herb data available.</p>';
    return;
  }

  herbData.forEach(herb => {
    const card = document.createElement('div');
    card.className = 'herb-card';

    const summary = `
      <h3>${herb.Herb || 'Unknown Herb'}</h3>
      <p><strong>Category:</strong> ${herb.Category || 'Unknown'}</p>
      <p><strong>Effects:</strong> ${herb.Effects || 'Unknown'}</p>
      <button class="toggle-details">Show Details</button>
    `;

    const details = `
      <div class="herb-details" style="display:none;">
        <p><strong>Preparation:</strong> ${herb.Preparation || 'Unknown'}</p>
        <p><strong>Intensity:</strong> ${herb.Intensity || 'Unknown'}</p>
        <p><strong>Onset:</strong> ${herb.Onset || 'Unknown'}</p>
        <p><strong>Mechanism:</strong> ${herb.Mechanism || 'Unknown'}</p>
        <p><strong>Region:</strong> ${herb.Region || 'Unknown'}</p>
        <p><strong>Therapeutic Uses:</strong> ${herb.Therapeutic || 'Unknown'}</p>
        <p><strong>Side Effects:</strong> ${herb.Side_effects || 'Unknown'}</p>
        <p><strong>Legal Status:</strong> ${herb.Legal || 'Unknown'}</p>
        <p><strong>Tags:</strong> ${herb.Tags || ''}</p>
        ${herb.Link ? `<p><a href="${herb.Link}" target="_blank">More Info</a></p>` : ''}
      </div>
    `;

    card.innerHTML = summary + details;

    card.querySelector('.toggle-details').addEventListener('click', () => {
      const d = card.querySelector('.herb-details');
      d.style.display = d.style.display === 'none' ? 'block' : 'none';
    });

    container.appendChild(card);
  });
});