import TopicHub, { topicHubMetadata } from "@/components/worksheets/TopicHub";

export const metadata = topicHubMetadata("index-laws");

export default function Page() {
  return <TopicHub slug="index-laws" />;
}
