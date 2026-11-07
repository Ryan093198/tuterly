"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import "@/components/brand/brand.css";

// Shown in the worksheet generator once today's free worksheet is used
// (Years 7 to 10). One tap emails a full 20-question test on the topic they
// picked, with its answer key, and puts them on the Tuterly early list
// (app/api/topic-test/request). The email is already known from the
// worksheet sign-up, so usually there's nothing to type.
//
// Also used under the sample questions on the topic pages
// (TopicTestTeaser), with its own eyebrow/title/intro; the email box there
// is prefilled if this browser has signed up before.
export default function TopicTestOffer({ email: knownEmail, yearLevel, topicId, topicLabel, placement = "worksheet_limit_test", eyebrow, title, intro, count = 20, style }) {
  const pathname = usePathname() || "/";
  const [email, setEmail] = useState(knownEmail || "");
  const [state, setState] = useState("idle"); // idle | busy | done | error
  const [msg, setMsg] = useState("");
  const topic = (topicLabel || "").trim();
  useEffect(() => {
    if (knownEmail) return;
    try {
      const saved = window.localStorage.getItem("tuterly:worksheet_email");
      if (saved) setEmail((e) => e || saved);
    } catch {}
  }, [knownEmail]);

  // Not a <form>: this sits inside the worksheet generator's own form, and a
  // nested form would submit the generator instead.
  async function submit() {
    if (state === "busy") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setMsg("Please enter a valid email address.");
      setState("error");
      return;
    }
    setState("busy");
    setMsg("");
    try {
      const res = await fetch("/api/topic-test/request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, year_level: yearLevel, topic_id: topicId, placement, source_page: pathname }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d?.error || "Something went wrong. Please try again.");
      setState("done");
      trackEvent("generate_lead", { lead_type: "topic_test", source: placement });
    } catch (err) {
      setMsg(err.message);
      setState("error");
    }
  }

  return (
    <aside className="tb-appcta tb-appcta--offer" data-study-cta={placement} style={{ margin: "4px 0 16px", ...style }}>
      <p className="tb-eyebrow" style={{ marginBottom: 8 }}>{eyebrow || "Free full topic test"}</p>
      <p className="tb-appcta__title">{title || <>That&rsquo;s today&rsquo;s free worksheet. Want a full {topic || "topic"} test?</>}</p>
      {state === "done" ? (
        <p role="status" className="tb-appcta__status">
          On its way to {email}. It can take a couple of minutes, so check your junk folder if it&rsquo;s not there.
        </p>
      ) : (
        <div>
          {intro && <p className="tb-appcta__sub">{intro}</p>}
          <ul className="tb-appcta__ticks">
            <li>All {count} questions, from the basics up to the hardest</li>
            <li>A full answer key to mark it</li>
            <li>Printable PDFs, in your inbox in a couple of minutes</li>
          </ul>
          <div className="tb-appcta__form" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {!knownEmail && (
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="Your email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }}
                className="tb-input tb-input--email"
                style={{ flex: "1 1 220px" }}
              />
            )}
            <button type="button" onClick={submit} disabled={state === "busy" || !topicId} className="tb-btn tb-btn--primary tb-btn--fluid">
              {state === "busy" ? "One moment…" : "Email me the free test"}
            </button>
          </div>
          {knownEmail && <p className="tb-small tb-muted" style={{ margin: "8px 0 0" }}>Sending to {knownEmail}</p>}
          {msg && <p role="alert" className="tb-appcta__error">{msg}</p>}
          <p className="tb-appcta__note">
            Free. We&rsquo;ll email you the test, plus Tuterly launch news and maths tips. Unsubscribe any time. See our <a href="/privacy">privacy policy</a>.
          </p>
        </div>
      )}
    </aside>
  );
}
