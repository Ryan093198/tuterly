import YearTest, { yearTestMetadata } from "@/components/tests/YearTest";

export const metadata = yearTestMetadata(9);

export default function Page() {
  return <YearTest n={9} />;
}
