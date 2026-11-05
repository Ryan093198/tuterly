import { RevisionYearPage, revisionYearMetadata } from "@/components/mind-maps/RevisionPages";

// "Year 10 maths revision": the Year 10 mind maps (lib/mind-maps.js).
export const metadata = revisionYearMetadata(10);

export default function Page() {
  return <RevisionYearPage year={10} />;
}
