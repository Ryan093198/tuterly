import { RevisionYearPage, revisionYearMetadata } from "@/components/mind-maps/RevisionPages";

// "Year 9 maths revision": the Year 9 mind maps (lib/mind-maps.js).
export const metadata = revisionYearMetadata(9);

export default function Page() {
  return <RevisionYearPage year={9} />;
}
