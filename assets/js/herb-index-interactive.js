
fetch('data/herbs.json')
  .then(response => response.json())
  .then(data => {
    window.herbs = data;
    renderHerbs(data);
  });

function renderHerbs(list) {
  const container = document.getElementById("herbTable");
  if (!container) return;
  container.innerHTML = `
    <table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th>Name</th>
          <th>Effects</th>
          <th>Active Compounds</th>
          <th>Origin</th>
          <th>Legal Status</th>
        </tr>
      </thead>
      <tbody>
        ${list.map(h => `
          <tr>
            <td>${h.name}</td>
            <td>${h.effects}</td>
            <td>${h.activeCompounds}</td>
            <td>${h.origin}</td>
            <td>${h.legalStatus}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function filterHerbs() {
  const q = document.getElementById("searchBox").value.toLowerCase();
  const filtered = window.herbs.filter(h =>
    h.name.toLowerCase().includes(q) ||
    h.effects.toLowerCase().includes(q) ||
    h.activeCompounds.toLowerCase().includes(q) ||
    h.origin.toLowerCase().includes(q) ||
    h.legalStatus.toLowerCase().includes(q)
  );
  renderHerbs(filtered);
}
