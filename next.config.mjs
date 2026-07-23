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

export default nextConfig;
