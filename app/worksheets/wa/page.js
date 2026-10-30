import StateHub, { stateMetadata } from "@/components/state/StateHub";

export const metadata = stateMetadata("wa");

export default function Page() {
  return <StateHub code="wa" />;
}
