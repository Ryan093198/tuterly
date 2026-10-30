import StateHub, { stateMetadata } from "@/components/state/StateHub";

export const metadata = stateMetadata("nt");

export default function Page() {
  return <StateHub code="nt" />;
}
