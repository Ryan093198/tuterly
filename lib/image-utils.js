// Server-side image compression for uploads. Phones easily produce 5-10MB
// photos; running them through sharp at upload time gives us a 5-10×
// reduction with no visible quality loss for whiteboard / notes shots
// — and dramatically slows storage growth at scale.

import sharp from "sharp";

const DEFAULT_MAX_EDGE = 1500;
const DEFAULT_QUALITY = 80;

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  // HEIC/HEIF are intentionally NOT in this set. sharp needs libheif to
  // decode them and Vercel's runtime doesn't ship with it. The session-
  // photo upload action checks for HEIC explicitly and returns a tutor-
  // friendly "convert to JPEG first" message rather than failing silently
  // here.
]);

/**
 * Compress an image buffer to a JPEG, capping its longest edge.
 *
 * @param {Buffer} buffer - the raw uploaded bytes
 * @param {object} [opts]
 * @param {number} [opts.maxEdge=1500] - longest edge in pixels
 * @param {number} [opts.quality=80] - JPEG quality (1-100)
 * @returns {Promise<{ buffer: Buffer, contentType: string, ext: string }>}
 */
export async function compressImage(buffer, opts = {}) {
  const maxEdge = opts.maxEdge ?? DEFAULT_MAX_EDGE;
  const quality = opts.quality ?? DEFAULT_QUALITY;

  // rotate() applies the EXIF orientation flag and then strips it so the
  // saved image looks the right way up regardless of which way the phone
  // was held.
  const out = await sharp(buffer)
    .rotate()
    .resize({
      width: maxEdge,
      height: maxEdge,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  return { buffer: out, contentType: "image/jpeg", ext: "jpg" };
}

// Map an original filename to the post-compression filename (.jpg).
export function rewriteImageFilename(name) {
  const base = (name || "photo").replace(/\.[a-zA-Z0-9]+$/, "");
  return `${base}.jpg`;
}
