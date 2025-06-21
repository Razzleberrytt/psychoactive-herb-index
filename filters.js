
function setupFilters(data) {
  const categorySet = new Set();
  const intensitySet = new Set();
  const regionSet = new Set();
  data.forEach(h => {
    if (h.Category) categorySet.add(h.Category.trim());
    if (h.Intensity) intensitySet.add(h.Intensity.trim());
    if (h.Region) regionSet.add(h.Region.trim());
  });

  const filterUI = document.getElementById("filters");
  if (!filterUI) return;

  function createDropdown(name, options) {
    const label = document.createElement("label");
    label.textContent = name + ": ";
    const select = document.createElement("select");
    select.innerHTML = `<option value="">All</option>`;
    options.forEach(opt => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      select.appendChild(o);
    });
    select.onchange = () => applyFilters(data);
    label.appendChild(select);
    filterUI.appendChild(label);
  }

  createDropdown("Category", Array.from(categorySet).sort());
  createDropdown("Intensity", Array.from(intensitySet).sort());
  createDropdown("Region", Array.from(regionSet).sort());
}

function applyFilters(data) {
  const selects = document.querySelectorAll("#filters select");
  const filters = Array.from(selects).map(s => s.value);

  const filtered = data.filter(h => {
    return (!filters[0] || h.Category === filters[0]) &&
           (!filters[1] || h.Intensity === filters[1]) &&
           (!filters[2] || h.Region === filters[2]);
  });
  renderHerbs(filtered);
}
