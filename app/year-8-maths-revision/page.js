import { RevisionYearPage, revisionYearMetadata } from "@/components/mind-maps/RevisionPages";

// "Year 8 maths revision": the Year 8 mind maps (lib/mind-maps.js).
export const metadata = revisionYearMetadata(8);

export default function Page() {
  return <RevisionYearPage year={8} />;
}
