document.addEventListener("DOMContentLoaded", () => {
  const herbList = document.getElementById("herb-list");
  const searchInput = document.getElementById("search");

  function renderHerbs(data) {
    herbList.innerHTML = data.map(herb => `
      <div class="herb-card">
        <h3>${herb.Herb}</h3>
        <p><strong>Category:</strong> ${herb.Category || ''}</p>
        <p><strong>Effects:</strong> ${herb.Effects || ''}</p>
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