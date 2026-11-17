import "./marketing-ux.css";

// "On this page" chips for the long marketing pages (Ryan, 18 Nov 2026).
// Plain anchor links, no JavaScript. Targets get room under the sticky
// nav from scroll-padding-top in marketing-ux.css.
export default function JumpNav({ items, label = "On this page" }) {
  return (
    <nav className="mx-jump" aria-label={label}>
      <div className="mx-jump__in">
        <span className="mx-jump__label">{label}</span>
        {items.map((it) => (
          <a key={it.href} href={it.href} className="mx-jump__chip">{it.label}</a>
        ))}
      </div>
    </nav>
  );
}
