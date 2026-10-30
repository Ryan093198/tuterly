import Link from "next/link";
import { topicNotes } from "@/lib/state-curriculum";

// Small "How this fits your state" box on a shared topic page. Shows the
// Year 10A explanation on 10A pages and NSW/WA notes where those states
// teach the topic at a different level. Renders nothing otherwise.
export default function TopicStateNote({ slug, yearLevel }) {
  const n = topicNotes(slug, yearLevel);
  if (!n) return null;
  return (
    <aside className="tsn" aria-label="How this topic fits each state">
      <p className="tsn__title">{n.tenA ? "What is Year 10A?" : "In your state"}</p>
      {n.tenA && <p className="tsn__text">{n.tenA}</p>}
      <ul className="tsn__list">
        {n.notes.map((x) => (
          <li key={x.state}>
            <Link href={`/worksheets/${x.state.toLowerCase()}`} className="tsn__state">In {x.state}</Link>{" "}
            {x.text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
