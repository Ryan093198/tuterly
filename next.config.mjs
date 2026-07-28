import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Audio uploads (Whisper) and resource files can be larger than the
    // default 10MB. Cap matches the Whisper API limit so we reject early.
    proxyClientMaxBodySize: "26mb",
    // Client-side router cache. In Next 15+ the dynamic default dropped to
    // 0s, so every navigation — even back to a page just viewed — is a
    // fresh server round trip to the (Singapore) DB. For a Melbourne user
    // that ~180ms RTT per navigation is the main remaining "sluggish when
    // moving between pages" cost. Caching visited dynamic segments for 30s
    // makes back-and-forth navigation feel instant; 30s is short enough
    // that dashboard data (new reports, credits) stays acceptably fresh.
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "bayside-academics",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
