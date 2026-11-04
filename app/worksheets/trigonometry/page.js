import TopicHub, { topicHubMetadata } from "@/components/worksheets/TopicHub";

export const metadata = topicHubMetadata("trigonometry");

export default function Page() {
  return <TopicHub slug="trigonometry" />;
}
