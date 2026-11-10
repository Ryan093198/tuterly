import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Domain split:
//   tuterly.com.au + www.tuterly.com.au    marketing surface
//   app.tuterly.com.au                     login + dashboards + API
//
// The single Next.js project serves both. This middleware looks at the
// incoming Host header and either rewrites or 308-redirects so each
// surface only exposes the paths it should.
//
// Localhost dev and Vercel preview URLs fall through to single-domain
// behaviour — no redirects, both surfaces work on the same origin so
// `npm run dev` is unchanged.

const MARKETING_HOSTS = new Set(["tuterly.com.au", "www.tuterly.com.au"]);
const APP_HOST = "app.tuterly.com.au";

// Path prefixes that belong to the app surface. Hitting any of these on
// the marketing domain bounces to the app subdomain (login/auth flow,
// dashboards, onboarding picker, accept-invite token).
const APP_PATH_PREFIXES = ["/dashboard", "/auth", "/onboarding", "/invite"];

// Path prefixes that belong to the marketing surface. Hitting any of
// these on the app domain bounces back to the bare domain so we don't
// dupe the same content across two URLs (SEO + ads canonical clarity).
const MARKETING_PATH_PREFIXES = [
  "/parents",
  "/students",
  "/maths-exam-preparation",
  "/features",
  "/try",
  "/guarantee",
  "/naplan",
  "/formula-sheets",
  "/mind-maps",
  "/year-7-maths-revision",
  "/year-8-maths-revision",
  "/year-9-maths-revision",
  "/year-10-maths-revision",
  "/exam-generator",
  "/results",
  "/start",
  "/scholarship-practice",
  "/tutors",
  "/centres",
  "/directory",
  "/worksheets",
  "/get-started",
  "/years",
  "/scholarship",
  "/mathspace-alternative",
  "/photomath-alternative",
  "/quizlet-maths-australia",
  "/maths",
  "/maths-tests",
  "/calculators",
  "/teachers",
  "/paper",
  "/study-planner",
  "/plan",
  "/method",
  "/best-maths-apps-australia",
  // Tuterly Study checkout, manage and parent consent (linked from app emails)
  "/study",
];

// Paused while the Tuterly tutor marketplace is on hold (Oct 2026): the
// site's only call to action is the Tuterly app, so these pages
// send visitors to the home page. Temporary (307) so they can come back
// by deleting entries here. Keep app/sitemap.js in step.
const PAUSED_PREFIXES = [
  "/directory",
  "/maindirectory",
  "/find-a-tutor",
  "/get-started",
  "/centres",
  "/sample-report",
  "/tutor-jobs",
  "/practice-maths-tests-primary",
];
const PAUSED_EXACT = ["/tutors"];

// Removed for good (Ryan, 9 Nov 2026): VCE content from the old tutor
// marketplace. 410 Gone tells Google to drop them; the site is now about
// the Years 7 to 10 maths app.
const GONE_EXACT = new Set([
  "/vce-tutoring",
  "/atar-planner",
  "/learn/atar-results-day-guide-victorian-parents-year-12",
  "/learn/vce-accounting-year-11-guide-victoria",
  "/learn/vce-biology-year-11-guide-victoria",
  "/learn/vce-biology-year-12-guide-victoria",
  "/learn/vce-chemistry-year-11-guide-victoria",
  "/learn/vce-chemistry-year-12-guide-victoria",
  "/learn/vce-economics-year-11-guide-victoria",
  "/learn/vce-economics-year-12-guide-victoria",
  "/learn/vce-english-analysing-argument-year-12-guide-victoria",
  "/learn/vce-english-creative-writing-year-12-guide-victoria",
  "/learn/vce-english-essay-writing-year-12-guide-victoria",
  "/learn/vce-english-exam-preparation-year-12-term-4",
  "/learn/vce-english-language-guide-year-11-12-victoria",
  "/learn/vce-english-oral-presentation-year-12-guide-victoria",
  "/learn/vce-english-what-makes-9-out-of-10-essay",
  "/learn/vce-english-what-makes-a-high-scoring-essay",
  "/learn/vce-english-year-11-guide-victoria",
  "/learn/vce-english-year-12-guide-victoria",
  "/learn/vce-exam-study-timetable-guide-year-12-victoria",
  "/learn/vce-further-mathematics-year-11-guide-victoria",
  "/learn/vce-further-mathematics-year-12-guide-victoria",
  "/learn/vce-history-year-11-guide-victoria",
  "/learn/vce-legal-studies-year-11-guide-victoria",
  "/learn/vce-legal-studies-year-12-guide-victoria",
  "/learn/vce-maths-methods-year-11-guide-victoria",
  "/learn/vce-maths-methods-year-12-guide-victoria",
  "/learn/vce-methods-study-plan-40-plus",
  "/learn/vce-physics-year-11-guide-victoria",
  "/learn/vce-physics-year-12-guide-victoria",
  "/learn/vce-psychology-year-11-guide-victoria",
  "/learn/vce-psychology-year-12-guide-victoria",
  "/learn/vce-sac-season-guide-year-11-parents-victoria",
  "/learn/vce-specialist-mathematics-year-11-guide-victoria",
  "/learn/vce-specialist-mathematics-year-12-guide-victoria",
  "/learn/vce-year-11-what-students-need-to-do-differently",
]);
// Retired posts with a current equivalent.
const MOVED = {
  "/learn/vce-maths-methods-vs-further-mathematics-guide-victoria": "/learn/vce-general-maths-vs-methods",
  "/learn/how-much-does-online-tutoring-cost-victoria": "/parents/maths-tutoring-cost-australia",
};

function goneResponse() {
  return new NextResponse(
    '<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page removed | Tuterly</title><body style="font-family:system-ui;padding:40px;max-width:560px;margin:auto"><h1>This page has been removed</h1><p>Tuterly is now a Years 7 to 10 maths app. <a href="/">Go to the home page</a> or <a href="/worksheets">get a free maths worksheet</a>.</p></body>',
    { status: 410, headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" } }
  );
}

const APP_URL = "https://app.tuterly.com.au";
const MARKETING_URL = "https://tuterly.com.au";

function pathMatchesPrefix(pathname, prefixes) {
  return prefixes.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export async function proxy(request) {
  const rawHost = (request.headers.get("host") || "").toLowerCase();
  const host = rawHost.split(":")[0]; // strip :3000 in dev
  const { pathname, search } = request.nextUrl;

  // Removed and moved pages, on every host.
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  if (MOVED[cleanPath]) return NextResponse.redirect(new URL(MOVED[cleanPath], request.url), 308);
  if (GONE_EXACT.has(cleanPath)) return goneResponse();

  const isMarketingDomain = MARKETING_HOSTS.has(host);
  const isAppDomain = host === APP_HOST;

  // ── Hostname-based routing ───────────────────────────────────────
  if (isMarketingDomain) {
    // App-only paths bounce to app.tuterly.com.au, preserving query.
    if (pathMatchesPrefix(pathname, APP_PATH_PREFIXES)) {
      return NextResponse.redirect(`${APP_URL}${pathname}${search}`, 308);
    }
    // The marketing root is the Tuterly landing page, rendered by
    // app/page.js (it shows the sign-in card only on the app host). It
    // used to rewrite to /parents.
  }

  if (isAppDomain) {
    // Marketing-only paths bounce to tuterly.com.au — except the
    // post-magic-link landing on /worksheets?welcome=1, where bouncing
    // away would abort the just-completed auth handshake.
    if (pathMatchesPrefix(pathname, MARKETING_PATH_PREFIXES)) {
      const isWorksheetWelcome =
        pathname === "/worksheets" &&
        request.nextUrl.searchParams.get("welcome") === "1";
      if (!isWorksheetWelcome) {
        return NextResponse.redirect(
          `${MARKETING_URL}${pathname}${search}`,
          308
        );
      }
    }
  }

  // Paused marketing pages go to the home page (the app). On the app
  // domain they already bounced to the marketing domain above, or aren't
  // marketing paths at all.
  if (!isAppDomain && (PAUSED_EXACT.includes(pathname) || pathMatchesPrefix(pathname, PAUSED_PREFIXES))) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url, 307);
  }

  // Marketing pages on tuterly.com.au never read the session on the server,
  // so skip the Supabase round trip for them. Running it on every page,
  // client navigation and link prefetch made clicks hang now and then for
  // signed-in visitors (Nov 2026). API routes (signed-in worksheet limits)
  // and the auth paths still refresh the session below.
  if (isMarketingDomain && !pathname.startsWith("/api/") && !pathMatchesPrefix(pathname, APP_PATH_PREFIXES)) {
    return NextResponse.next({ request });
  }

  // ── Supabase auth (existing behaviour, plus shared-domain cookies) ──
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            const enriched = enrichCookieOptions(name, options, host);
            response.cookies.set(name, value, enriched);
          }
        },
      },
    }
  );

  // Refresh the session if it's expired. Do not run logic between
  // createServerClient and getUser — see Supabase SSR guide.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = pathname.startsWith("/dashboard");

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && pathname === "/" && isAppDomain) {
    // Only run the logged-in-to-dashboard redirect on the app subdomain
    // — on the marketing root, `/` is rewritten to /parents above and
    // we don't want to bounce signed-in visitors away from marketing.
    const next = request.nextUrl.searchParams.get("next");
    const safeNext =
      next && next.startsWith("/") && !next.startsWith("//")
        ? next
        : "/dashboard";
    const url = request.nextUrl.clone();
    url.pathname = safeNext;
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  return response;
}

// Supabase SSR sets several cookies named `sb-{project}-auth-token*`. By
// default they're scoped to the host that set them, so a session created
// on app.tuterly.com.au wouldn't authenticate requests on tuterly.com.au.
// Widening the domain to `.tuterly.com.au` makes the cookie valid on the
// bare domain and every subdomain — so a parent who signs in via the
// app subdomain stays signed in on the marketing-domain worksheet
// generator.
//
// Only applied in production (host actually ends with tuterly.com.au).
// In dev / Vercel preview the original cookie options pass through
// unchanged.
function enrichCookieOptions(name, options, host) {
  if (!name.startsWith("sb-")) return options;
  if (!host.endsWith("tuterly.com.au")) return options;
  return { ...options, domain: ".tuterly.com.au" };
}

export const config = {
  matcher: [
    // Skip Next internals and static assets.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
