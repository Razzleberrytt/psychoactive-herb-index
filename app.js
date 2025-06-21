document.addEventListener("DOMContentLoaded", () => {
  const herbList = document.getElementById("herb-list");
  const searchInput = document.getElementById("search");

  fetch("./psychoactive_herbs_export.json")
    .then(response => response.json())
    .then(data => {
      let allHerbs = data;

      function renderHerbs(herbs) {
        if (!herbs.length) {
          herbList.innerHTML = "<p>No herbs found.</p>";
          return;
        }
        herbList.innerHTML = herbs.map(herb => `
          <div class="herb-card">
            <h3>${herb.Herb}</h3>
            <p><strong>Category:</strong> ${herb.Category}</p>
            <p><strong>Effects:</strong> ${herb.Effects}</p>
          </div>
        `).join("");
      }

      renderHerbs(allHerbs);

      searchInput.addEventListener("input", () => {
        const term = searchInput.value.toLowerCase();
        const filtered = allHerbs.filter(h =>
          h.Herb.toLowerCase().includes(term) ||
          h.Effects.toLowerCase().includes(term)
        );
        renderHerbs(filtered);
      });
    })
    .catch(err => {
      herbList.innerHTML = "<p>Error loading data.</p>";
    });
});