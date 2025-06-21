document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("herb-container");
  herbData.forEach(herb => {
    const div = document.createElement("div");
    div.innerHTML = `<h2>${herb.name}</h2><p>${herb.category} - ${herb.intensity}</p><p>${herb.effects}</p>`;
    container.appendChild(div);
  });
});