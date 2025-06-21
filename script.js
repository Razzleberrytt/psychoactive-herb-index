
const container = document.getElementById("herbContainer");
const searchInput = document.getElementById("searchInput");

function renderHerbs(data) {
    container.innerHTML = "";
    data.forEach(herb => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h2>${herb.name}</h2>
            <div class="category">${herb.category}</div>
            <p><strong>Effects:</strong> ${herb.effects}</p>
        `;
        container.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = herbData.filter(h => h.name.toLowerCase().includes(query));
    renderHerbs(filtered);
});

renderHerbs(herbData);
