import StateHub, { stateMetadata } from "@/components/state/StateHub";

export const metadata = stateMetadata("sa");

export default function Page() {
  return <StateHub code="sa" />;
}
