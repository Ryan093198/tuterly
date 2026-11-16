import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Eyebrow } from "@/components/brand";
import NaplanTest from "@/components/naplan/NaplanTest";
import NaplanUnlock from "@/components/naplan/NaplanUnlock";
import { naplanQuestions } from "@/components/naplan/naplanQuestions";
import { NAPLAN_YEARS, hasNaplanTestFile, naplanSlug, yearFromSlug } from "@/lib/naplan";
import { NAPLAN_PASS, NAPLAN_TESTS, PASS_YEARS, emailFromCookies, hasNaplanAccess } from "@/lib/naplan-access";
import { appCta } from "@/lib/study-app";
import { STUDY_PLANS } from "@/lib/study-plus";
import "@/components/study/study-landing.css";
import "@/components/study/worked-examples.css";
import "@/components/naplan/naplan.css";

// Paid NAPLAN practice tests 2 to 5 (/naplan/year-N-numeracy/test-K). The
// questions are only rendered for a browser with access (lib/naplan-access).
// Not indexed: the year page (Test 1) is the page for Google.
export const dynamic = "force-dynamic";

function parse(params) {
  const year = yearFromSlug(params.slug);
  const m = /^test-([2-9])$/.exec(params.test || "");
  const n = m ? Number(m[1]) : null;
  if (!year || !NAPLAN_YEARS.includes(year) || !n || n > NAPLAN_TESTS || !hasNaplanTestFile(year, n)) return null;
  return { year, n };
}

export async function generateMetadata({ params }) {
  const p = parse(await params);
  if (!p) return {};
  return {
    title: { absolute: `Year ${p.year} NAPLAN Practice Test ${p.n} | Tuterly` },
    robots: { index: false, follow: true },
  };
}

export default async function NaplanPaidTest({ params }) {
  const p = parse(await params);
  if (!p) notFound();
  const { year, n } = p;
  const email = emailFromCookies(await cookies());
  const ok = email ? await hasNaplanAccess(email, year) : false;
  const cta = appCta();
  const base = `/naplan/${naplanSlug(year)}`;
  const tests = Array.from({ length: NAPLAN_TESTS }, (_, i) => i + 1).filter((k) => k === 1 || hasNaplanTestFile(year, k));
  const next = tests.find((k) => k > n);

  return (
    <div className="sl">
      <MarketingNav />
      <main>
        <section className="tb np-hero" aria-labelledby="np-h1">
          <div className="tb-wrap">
            <p className="np-crumbs"><Link href="/naplan">NAPLAN</Link> / <Link href={base}>Year {year} numeracy</Link> / Practice test {n}</p>
            <Eyebrow>NAPLAN-style numeracy · Year {year}</Eyebrow>
            <h1 id="np-h1" className="tb-h1">Year {year} NAPLAN practice test {n}</h1>
            <nav className="npt-tabs" aria-label="Year practice tests">
              {tests.map((k) => (
                <Link key={k} href={k === 1 ? `${base}#naplan-test` : `${base}/test-${k}`} aria-current={k === n ? "page" : undefined} className={k === n ? "is-on" : ""}>
                  Test {k}{k === 1 ? " (free)" : ""}
                </Link>
              ))}
            </nav>
          </div>
        </section>
        <section className="tb-section np-testsec" id="test">
          <div className="tb-wrap">
            {ok ? (
              <>
                <p className="np-note">Signed in as {email}. 20 new NAPLAN-style questions, marked as soon as you finish.</p>
                <NaplanTest year={year} questions={naplanQuestions(year, n)} appYears={[7, 9]} testNo={n} nextHref={next ? `${base}/test-${next}` : null} />
              </>
            ) : (
              <NaplanUnlock
                year={year}
                testNo={n}
                pass={PASS_YEARS.includes(year)}
                passPrice={NAPLAN_PASS.price}
                sub={{ live: cta.live, href: cta.href, label: cta.live ? `Get Tuterly (${STUDY_PLANS.monthly.price} a month)` : cta.label, price: STUDY_PLANS.monthly.price }}
                signedInAs={email}
              />
            )}
            <p className="np-disclaimer">
              These are Tuterly&rsquo;s own NAPLAN-style questions, modelled on ACARA&rsquo;s example tests and past papers. They aren&rsquo;t official NAPLAN questions. NAPLAN is run by ACARA, and Tuterly isn&rsquo;t affiliated with ACARA.
            </p>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
