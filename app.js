
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("herbTable");
  if (!herbData || !Array.isArray(herbData)) {
    container.innerHTML = "<p>Error loading herb data.</p>";
    return;
  }

  let html = `<table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;">
    <thead>
      <tr>
        <th>Name</th>
        <th>Scientific Name</th>
        <th>Effects</th>
        <th>Active Compounds</th>
        <th>Usage</th>
        <th>Legal Status</th>
      </tr>
    </thead>
    <tbody>`;

  herbData.forEach(h => {
    html += `<tr>
      <td>${h.common_name || ''}</td>
      <td>${h.scientific_name || ''}</td>
      <td>${h.effects || ''}</td>
      <td>${h.active_compounds || ''}</td>
      <td>${h.traditional_usage || ''}</td>
      <td>${h.legal_status || ''}</td>
    </tr>`;
  });

  html += "</tbody></table>";
  container.innerHTML = html;
});
