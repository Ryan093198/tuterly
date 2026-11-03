import YearHub, { yearHubMetadata } from "@/components/worksheets/YearHub";

export const metadata = yearHubMetadata(9);

export default function Page() {
  return <YearHub n={9} />;
}
