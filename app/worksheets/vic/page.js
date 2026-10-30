import StateHub, { stateMetadata } from "@/components/state/StateHub";

export const metadata = stateMetadata("vic");

export default function Page() {
  return <StateHub code="vic" />;
}
