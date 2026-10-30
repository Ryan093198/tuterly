import StateHub, { stateMetadata } from "@/components/state/StateHub";

export const metadata = stateMetadata("nsw");

export default function Page() {
  return <StateHub code="nsw" />;
}
