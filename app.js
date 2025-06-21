
function renderHerbCard(herb) {
  const card = document.createElement('details');
  card.className = 'herb-card';

  const summary = document.createElement('summary');
  summary.innerHTML = `<strong>${herb.name}</strong><br><em>${herb.category || ''}</em></div>`;
  card.appendChild(summary);

  const body = document.createElement('div');
  body.className = 'herb-content';

  // Optional image
  if (herb.image_url) {
    const img = document.createElement('img');
    img.src = herb.image_url;
    img.alt = herb.name;
    img.loading = 'lazy';
    body.appendChild(img);
  }

  const fieldMap = {
    'Effects': herb.effects,
    'Preparation': herb.preparation,
    'Intensity': herb.intensity,
    'Onset': herb.onset,
    'Region': herb.region,
    'Mechanism of Action': herb.mechanism_of_action,
    'Therapeutic Uses': herb.therapeutic_uses,
    'Side Effects': herb.side_effects,
    'Legal Status': herb.legal_status,
    'Tags': (herb.tags || []).join(', '),
  };

  for (const [label, value] of Object.entries(fieldMap)) {
    const line = document.createElement('p');
    line.innerHTML = `<strong>${label}:</strong> ${value || 'Not Available'}</div>`;
    body.appendChild(line);
  }

  if (herb.source_url) {
    const link = document.createElement('p');
    link.innerHTML = `<a href="${herb.source_url}" target="_blank">🔗 More Info</a></div>`;
    body.appendChild(link);
  }

  card.appendChild(body);
  return card;
}

// Render all herb cards
herbData.forEach(renderHerbCard);