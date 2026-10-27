import Link from "next/link";
import Image from "next/image";
import {
  Camera, Inbox, Zap, FileQuestion, FileText, Flame, Star, BookOpen, Flag,
  ChevronRight, Upload, ShieldCheck, Link2, Lightbulb, ListChecks, Target,
} from "lucide-react";
import "./brand.css";

// Shared building blocks for the marketing site, in the Tuterly Study app's
// style. Styling lives in ./brand.css (tb- classes, tokens from globals.css).

// One icon set (Lucide, 2px stroke), with the app's meanings.
export const ICONS = {
  snap: Camera, bank: Inbox, practice: Zap, test: FileQuestion, notes: FileText,
  streak: Flame, star: Star, book: BookOpen, flag: Flag, upload: Upload,
  privacy: ShieldCheck, link: Link2, explain: Lightbulb, drill: ListChecks, goal: Target,
};

export function Icon({ name, size = 22, ...rest }) {
  const C = ICONS[name] || Star;
  return <C size={size} strokeWidth={2.25} aria-hidden="true" {...rest} />;
}

// Primary / secondary button with the ledge. Renders a Link for internal
// hrefs, <a> for external, <button> otherwise.
export function Button({ href, variant = "primary", size, fluid, className = "", children, ...rest }) {
  const cls = ["tb-btn", `tb-btn--${variant}`, size === "sm" && "tb-btn--sm", fluid && "tb-btn--fluid", className]
    .filter(Boolean)
    .join(" ");
  if (href && href.startsWith("/")) return <Link href={href} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

export function Eyebrow({ children, as: Tag = "p", ...rest }) {
  return <Tag className="tb-eyebrow" {...rest}>{children}</Tag>;
}

// Eyebrow + heading + optional lead, as one block.
export function SectionHead({ eyebrow, title, lead, id, align, level = 2, className = "" }) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <div className={`tb-head ${align === "center" ? "tb-head--center" : ""} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H id={id} className={level === 1 ? "tb-h1" : "tb-h2"}>{title}</H>
      {lead && <p className="tb-lead">{lead}</p>}
    </div>
  );
}

export function Card({ as: Tag = "div", soft, className = "", children, ...rest }) {
  return <Tag className={`tb-card ${soft ? "tb-card--soft" : ""} ${className}`} {...rest}>{children}</Tag>;
}

// Feature row like the app's option tiles: icon box, title, text, chevron.
export function OptionTile({ icon, tone, title, text, href }) {
  const inner = (
    <>
      <span className="tb-tile__icon"><Icon name={icon} /></span>
      <span>
        <span className="tb-tile__title" style={{ display: "block" }}>{title}</span>
        {text && <span className="tb-tile__text" style={{ display: "block" }}>{text}</span>}
      </span>
      <ChevronRight className="tb-tile__chev" size={18} strokeWidth={2.5} aria-hidden="true" />
    </>
  );
  if (href) return <Link href={href} className="tb-tile" data-tone={tone}>{inner}</Link>;
  return <div className="tb-tile" data-tone={tone}>{inner}</div>;
}

// Real app screenshot (1206 x 2622) inside a drawn iPhone outline. Pass no
// src to show a labelled placeholder frame for a screen we don't have yet.
export function PhoneFrame({ src, alt, width = 280, priority = false, sizes, className = "", style, placeholder }) {
  return (
    <div className={`tb-phone ${className}`} style={{ "--phone-w": `${width}px`, ...style }}>
      <div className="tb-phone__screen">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            fetchPriority={priority ? "high" : undefined}
            sizes={sizes || `(max-width: 600px) 70vw, ${width}px`}
          />
        ) : (
          <div className="tb-phone__placeholder" role="img" aria-label={placeholder || "Screenshot to come"}>
            {placeholder || "Screenshot to come"}
          </div>
        )}
      </div>
    </div>
  );
}

// Quinn the quokka. Only quinn-happy and quinn-celebrate, kept small.
export function Quinn({ pose = "celebrate", size = 110, className = "" }) {
  const file = pose === "happy" ? "quinn-happy" : "quinn-celebrate";
  return (
    <Image
      src={`/quinn/${file}.svg`}
      alt="Quinn the quokka, the Tuterly Study mascot"
      width={Math.min(size, 120)}
      height={Math.min(size, 120)}
      unoptimized
      className={className}
    />
  );
}

export function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  return <Tag className={`tb-reveal ${className}`} {...rest}>{children}</Tag>;
}

// Final call-to-action band: headline, line, the app CTA, small Quinn.
export function CtaBand({ title, lead, children, quinn = false, id }) {
  return (
    <section className="tb-section" aria-labelledby={id}>
      <div className="tb-wrap">
        <div className={`tb-cta-band ${quinn ? "tb-cta-band--quinn" : ""}`}>
          <div>
            <h2 id={id} className="tb-h2">{title}</h2>
            {lead && <p className="tb-lead" style={{ marginTop: 12 }}>{lead}</p>}
          </div>
          {quinn && <Quinn pose="celebrate" className="tb-cta-band__quinn" />}
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
