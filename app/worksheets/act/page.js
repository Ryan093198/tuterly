import StateHub, { stateMetadata } from "@/components/state/StateHub";

export const metadata = stateMetadata("act");

export default function Page() {
  return <StateHub code="act" />;
}
