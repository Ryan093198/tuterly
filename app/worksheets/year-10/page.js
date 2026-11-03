import YearHub, { yearHubMetadata } from "@/components/worksheets/YearHub";

export const metadata = yearHubMetadata(10);

export default function Page() {
  return <YearHub n={10} />;
}
