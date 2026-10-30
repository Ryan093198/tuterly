import StateHub, { stateMetadata } from "@/components/state/StateHub";

export const metadata = stateMetadata("tas");

export default function Page() {
  return <StateHub code="tas" />;
}
