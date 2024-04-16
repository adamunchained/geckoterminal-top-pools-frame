import { Frog } from 'frog';
import { devtools } from 'frog/dev';
import { neynar } from 'frog/hubs';
import { serveStatic } from 'frog/serve-static';
import { config } from './environments/prod';
import { landingFrame } from './frames/landing-page';
import { viewStats } from './frames/view-stats';
import { vars } from './ui';

export const app = new Frog({
  ui: { vars },
  // Supply a Hub to enable frame verification.
  hub: neynar({ apiKey: config.neynar }),
});

app.frame('/:network', landingFrame);
app.frame('/view/:network', viewStats);
const isCloudflareWorker = typeof caches !== 'undefined';
if (isCloudflareWorker) {
  const manifest = await import('__STATIC_CONTENT_MANIFEST');
  const serveStaticOptions = { manifest, root: './' };
  app.use('/*', serveStatic(serveStaticOptions));
  devtools(app, { assetsPath: '/frog', serveStatic, serveStaticOptions });
} else {
  devtools(app, { serveStatic });
}

export default app;
