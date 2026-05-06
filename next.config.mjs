/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Audio uploads (Whisper) and resource files can be larger than the
    // default 10MB. Cap matches the Whisper API limit so we reject early.
    proxyClientMaxBodySize: "26mb",
  },
};

export default nextConfig;
