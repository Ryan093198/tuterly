# Tuterly competitor-intel agent

Weekly research agent that watches Cluey, Tutor Doctor, EzyMaths, Kip
McGrath, and Begin Bright. Diffs each competitor's `sitemap.xml`
against the previous week's snapshot, samples titles + meta
descriptions from new pages, and asks Claude to produce a markdown
intel report.

The output is just a markdown file you read - the agent never edits
user-facing site content. Decisions about what to do with the intel
(write a counter-page, update positioning, etc.) stay with you.

## How it runs

A GitHub Actions workflow (`.github/workflows/competitor-intel.yml`)
fires every Monday at 09:00 AEST, runs `node agent/research.js`, and
commits the snapshot diff + report back to `main`.

Reports land in `agent/competitor-intel/YYYY-MM-DD.md`. Snapshots
sit in `agent/snapshots/` so the next week's run has something to
diff against.

## Running it locally

You need an Anthropic API key.

```bash
export ANTHROPIC_API_KEY=sk-ant-...
node agent/research.js
```

Useful flags:

- `--dry-run` - print the report to stdout, don't write any files
- `--competitor=cluey` - run for a single competitor only

The very first run for a new competitor has no previous snapshot so
it'll be reported as a "baseline" - subsequent runs do real diffing.

## Adding a competitor

Edit `agent/competitors.js` and add an entry with `slug`, `name`,
`sitemap`, and `homepage`. The slug becomes the snapshot filename so
keep it stable and filesystem-safe.

## Removing or changing a competitor

Delete its entry from `competitors.js`. The snapshot file in
`agent/snapshots/` can be deleted at the same time but isn't
strictly required - it'll just stop being read.

## Limits and intent

This is intel only. Do not write pages that paraphrase competitor
content - Google's March 2024 spam policy specifically targets
"scaled content abuse" of that shape. Use the intel to:

- Spot topic gaps (they cover Year 11 Methods, we don't)
- Spot positioning shifts (they're now leading with selective entry,
  not tutoring in general)
- Watch pricing changes
- Identify new market segments

Any page Tuterly publishes should be written from scratch in our
voice, informed by intel but never structurally derived from it.
