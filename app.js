document.addEventListener("DOMContentLoaded", () => {
  const herbList = document.getElementById("herb-list");
  const searchInput = document.getElementById("search");

  function renderHerbs(data) {
    herbList.innerHTML = data.map(herb => `
      <div class="herb-card">
        <h3>${herb.Herb}</h3>
        <p><strong>Category:</strong> ${herb.Category || 'N/A'}</p>
        <p><strong>Effects:</strong> ${herb.Effects || 'N/A'}</p>
        <p><strong>Preparation:</strong> ${herb.Preparation || 'N/A'}</p>
        <p><strong>Mechanism:</strong> ${herb.Mechanism || 'N/A'}</p>
      </div>
    `).join("");
  }

  renderHerbs(herbData);

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = herbData.filter(h =>
      h.Herb.toLowerCase().includes(term) ||
      (h.Effects && h.Effects.toLowerCase().includes(term))
    );
    renderHerbs(filtered);
  });
});