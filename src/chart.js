const MAX_HISTORY = 5;

export function createChartForZone(zoneId) {
  const history = [];

  function formatTime(d) {
    return d.toLocaleTimeString('en-US', { hour12: false });
  }

  function maxValue() {
    let m = 0;
    for (const h of history) {
      if (h.value > m) m = h.value;
    }
    return m || 100;
  }

  function render() {
    if (history.length === 0) {
      chartEl.innerHTML = '<div class="zone-empty">Waiting for data…</div>';
      return;
    }
    const latest = history[history.length - 1];
    header.innerHTML = `
      <span class="zone-name">${zoneId}</span>
      <span>
        <span class="zone-temp">${latest.value}°C</span>
        <span class="zone-time">${formatTime(latest.time)}</span>
      </span>
    `;

    const max = maxValue();
    let html = '';
    for (const h of history) {
      const pct = Math.max(4, (h.value / max) * 100);
      html += `<div class="bar-wrapper"><div class="bar" style="height:${pct}%"></div><span class="bar-label">${formatTime(h.time)}</span></div>`;
    }
    chartEl.innerHTML = html;
  }

  const card = document.createElement('div');
  card.className = 'zone-card';
  card.id = zoneId;

  const header = document.createElement('div');
  header.className = 'zone-header';
  header.innerHTML = `<span class="zone-name">${zoneId}</span><span class="zone-temp">—</span>`;
  card.appendChild(header);

  const chartEl = document.createElement('div');
  chartEl.className = 'bar-chart';
  chartEl.innerHTML = '<div class="zone-empty">Waiting for data…</div>';
  card.appendChild(chartEl);

  document.getElementById('zones').appendChild(card);

  return {
    element: card,
    update(val) {
      const value = typeof val === 'object' && val !== null ? val.value : val;
      history.push({ value, time: new Date() });
      if (history.length > MAX_HISTORY) history.shift();
      render();
    },
  };
}
