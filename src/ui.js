// This file can not be modified.
// Each zone has one corresponding chart.
// UI code calls attachChart for each zone and corresponding chart.
import { attachChart } from './data.js';
const zones = ['zone-a', 'zone-b', 'zone-c', /* ... */];
for (const zoneId of zones) {
  const chart = createChartForZone(zoneId);
  attachChart(chart, zoneId);
}
