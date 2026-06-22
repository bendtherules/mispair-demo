import { attachChart } from './data.js';
import { createChartForZone } from './chart.js';

const zones = ['zone-a', 'zone-b', 'zone-c'];

for (const zoneId of zones) {
  const chart = createChartForZone(zoneId);
  attachChart(chart, zoneId);
}
