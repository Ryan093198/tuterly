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
  "/tutors",
  "/centres",
  "/directory",
  "/worksheets",
  "/get-started",
];

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

  const isMarketingDomain = MARKETING_HOSTS.has(host);
  const isAppDomain = host === APP_HOST;

  // ── Hostname-based routing ───────────────────────────────────────
  if (isMarketingDomain) {
    // App-only paths bounce to app.tuterly.com.au, preserving query.
    if (pathMatchesPrefix(pathname, APP_PATH_PREFIXES)) {
      return NextResponse.redirect(`${APP_URL}${pathname}${search}`, 308);
    }
    // Marketing root rewrites to /parents until we ship a dedicated
    // multi-audience home (parents + tutors + centres tiles).
    if (pathname === "/") {
      const target = request.nextUrl.clone();
      target.pathname = "/parents";
      return NextResponse.rewrite(target);
    }
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
