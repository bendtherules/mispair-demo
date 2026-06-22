async function fetchTemperature(zoneId) {
  const res = await fetch(`/api/v1/zones/${zoneId}/primary/temperature`);
  return res.json();
}

// Don't change this function signature
export async function attachChart(chartInstance, zoneId) {
  const temp = await fetchTemperature(zoneId);
  chartInstance.update(temp.value);
}
