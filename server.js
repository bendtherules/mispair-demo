import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

const counters = {
  'zone-a': 10,
  'zone-b': 15,
  'zone-c': 20,
};

const app = new Hono();

app.get('/api/v1/zones/:zoneId/primary/temperature', (c) => {
  const zoneId = c.req.param('zoneId');
  if (!(zoneId in counters)) counters[zoneId] = 10;
  const value = counters[zoneId];
  counters[zoneId] += Math.floor(Math.random() * 3) + 3;
  return c.json({ value });
});

app.use('/src/*', serveStatic({ root: '.' }));

app.get('/', serveStatic({ path: './index.html', root: '.' }));

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});
