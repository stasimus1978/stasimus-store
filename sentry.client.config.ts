// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://bb89cb0158429d1e9b57568308c5cf28@o4507870904778752.ingest.de.sentry.io/4508997416845392",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
