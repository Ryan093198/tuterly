import StateHub, { stateMetadata } from "@/components/state/StateHub";

export const metadata = stateMetadata("qld");

export default function Page() {
  return <StateHub code="qld" />;
}
