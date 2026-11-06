import { RevisionYearPage, revisionYearMetadata } from "@/components/mind-maps/RevisionPages";

// "Year 7 maths revision": the Year 7 mind maps (lib/mind-maps.js).
export const metadata = revisionYearMetadata(7);

export default function Page() {
  return <RevisionYearPage year={7} />;
}
