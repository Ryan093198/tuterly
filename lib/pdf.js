// Shared PDF text extraction used by resource uploads and lesson-plan
// generation. unpdf is dynamically imported because it pulls in a wasm-ish
// parser that's chunky at module-init time.
export async function extractPdfText(arrayBuffer) {
  const { extractText, getDocumentProxy } = await import("unpdf");
  const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
  const { text } = await extractText(pdf, { mergePages: true });
  return text || "";
}
