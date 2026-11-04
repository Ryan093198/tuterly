import YearMaths, { yearMathsMetadata } from "@/components/tests/YearMaths";

export const metadata = yearMathsMetadata(7);

export default function Page() {
  return <YearMaths n={7} />;
}
