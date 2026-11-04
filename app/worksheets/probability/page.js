import TopicHub, { topicHubMetadata } from "@/components/worksheets/TopicHub";

export const metadata = topicHubMetadata("probability");

export default function Page() {
  return <TopicHub slug="probability" />;
}
