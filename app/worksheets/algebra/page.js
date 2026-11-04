import TopicHub, { topicHubMetadata } from "@/components/worksheets/TopicHub";

export const metadata = topicHubMetadata("algebra");

export default function Page() {
  return <TopicHub slug="algebra" />;
}
