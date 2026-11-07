import MathMd from "./MathMd";

// Practice questions with the answer behind a tap, so students try first.
// The answers are still in the page for search engines.
export default function Practice({ items }) {
  return (
    <ol className="mx-practice">
      {items.map((it, i) => (
        <li key={i}>
          <MathMd md={it.q} />
          <details>
            <summary>Show the answer</summary>
            <MathMd md={it.a} />
          </details>
        </li>
      ))}
    </ol>
  );
}
