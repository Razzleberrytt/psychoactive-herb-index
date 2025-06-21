
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("herb-list");
  if (!window.herbIndex || !Array.isArray(window.herbIndex)) {
    container.innerHTML = "<p>Error loading data.</p>";
    return;
  }
  container.innerHTML = window.herbIndex.map(herb => `
    <div class="herb">
      <strong>${herb.name}</strong><br/>
      <em>${herb.category}</em><br/>
      <span>${herb.effects}</span>
    </div>
  `).join("");
});
