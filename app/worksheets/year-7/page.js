import YearHub, { yearHubMetadata } from "@/components/worksheets/YearHub";

export const metadata = yearHubMetadata(7);

export default function Page() {
  return <YearHub n={7} />;
}
