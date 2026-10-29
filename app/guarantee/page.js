import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { SITE_URL } from "@/lib/site";
import { GUARANTEE as G } from "@/lib/guarantee";
import { STUDY_APP } from "@/lib/study-app";

const TITLE = `Results guarantee | ${STUDY_APP.name}`;
const DESCRIPTION = `${G.headline}. Use ${STUDY_APP.name} every week for ${G.months} months, and if your child’s school maths marks haven’t improved, we refund what you paid.`;
const URL = `${SITE_URL}/guarantee`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
};

export default function GuaranteePage() {
  const name = STUDY_APP.name;
  return (
    <>
      <MarketingNav />
      <main className="flex flex-1 flex-col items-center px-5 py-12 bg-background">
        <div className="w-full max-w-2xl">
          <article className="rounded-3xl border-2 border-border bg-card shadow-[0_4px_0_var(--edge)] p-6 sm:p-10 space-y-6">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand-text">Results guarantee</p>
              <h1 className="text-3xl font-black tracking-tight mt-2">{G.headline}.</h1>
              <p className="text-[16px] leading-[1.65] text-muted mt-3">
                {`We’re confident in ${name} because we’ve seen it work with our own students at Bayside Academics. So if your child uses it every week for ${G.months} months and their school maths marks don’t improve, we’ll refund what you paid. We won’t ask why.`}
              </p>
              <p className="text-sm text-muted mt-2">Last updated: {G.updated}</p>
            </div>

            <Section title={`1. Use it every week for ${G.months} months`}>
              <p>{`The ${G.months} months start on the date of your first paid subscription payment (after the free trial). In every week of those ${G.months} months (Monday to Sunday, Melbourne time), your child needs to:`}</p>
              <ul className="list-disc pl-6 space-y-1">
                {G.usage.map((u) => <li key={u}>{u}</li>)}
              </ul>
              <p>We check this from the app’s own records, so there’s nothing for you to log or send.</p>
            </Section>

            <Section title="2. Compare two school maths marks">
              <p>Send us two of your child’s school maths marks, each as a mark or percentage:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Before:</strong> from a school maths test, exam or report in the 3 months before your first paid payment.</li>
                <li>{<><strong>After:</strong> from a school maths test, exam or report in the last 2 months of the {G.months} months.</>}</li>
              </ul>
              <p>A photo or scan of the marked test or report is fine. If the after mark is not higher than the before mark, the guarantee applies.</p>
            </Section>

            <Section title="3. Claim within 30 days">
              <p>
                Email <a className="font-bold text-brand-text underline" href={`mailto:${G.email}?subject=Results guarantee claim`}>{G.email}</a> within {G.claimDays} days of the end of the {G.months} months, with your child’s {name} account email and the two marks. We’ll check the weekly use and reply within 5 business days.
              </p>
            </Section>

            <Section title="4. Your refund">
              <ul className="list-disc pl-6 space-y-1">
                <li>{`We refund every ${name} subscription payment you made in those ${G.months} months.`}</li>
                <li>Subscriptions are paid through the App Store or Google Play, so the refund comes from us (Bayside Academics) directly, by bank transfer, within 14 days of approving your claim.</li>
                <li>One guarantee refund per student. Please cancel the subscription in your phone’s settings once you’ve claimed.</li>
              </ul>
            </Section>

            <Section title="Your other rights">
              <p>
                This guarantee is extra to your rights under the Australian Consumer Law, and doesn’t limit them. See also our <Link className="font-bold text-brand-text underline" href="/terms">terms</Link> and <Link className="font-bold text-brand-text underline" href="/privacy">privacy policy</Link>.
              </p>
            </Section>
          </article>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-2.5 text-[15px] leading-[1.65] text-zinc-700 dark:text-zinc-300">
      <h2 className="text-base font-bold tracking-tight text-foreground">{title}</h2>
      {children}
    </section>
  );
}
