
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("herbTable");
  if (!herbData || !Array.isArray(herbData)) {
    container.innerHTML = "<p>Error loading herb data.</p>";
    return;
  }

  const columns = [
    "Herb",
    "Category",
    "Effects",
    "Preparation",
    "Region",
    "Legal Status",
    "Therapeutic Uses",
    "Side Effects"
  ];

  let html = `<table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;">
    <thead>
      <tr>${columns.map(col => `<th>${col}</th>`).join('')}</tr>
    </thead>
    <tbody>`;

  herbData.forEach(h => {
    html += "<tr>" + columns.map(col => `<td>${h[col] || ''}</td>`).join('') + "</tr>";
  });

  html += "</tbody></table>";
  container.innerHTML = html;
});
