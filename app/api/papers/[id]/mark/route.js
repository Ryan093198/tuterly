import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { loadPaper, markPaper, bumpPaper } from "@/lib/teacher-papers";

export const runtime = "nodejs";

// Marks a student's answers to a shared Teacher Zone paper and returns the
// results with the answers and worked solutions. Records the score only.
export async function POST(request, { params }) {
  const { id } = await params;
  const row = await loadPaper(id);
  if (!row) return NextResponse.json({ error: "We couldn't find this paper." }, { status: 404 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 400 }); }
  const marked = markPaper(row, body?.answers || {});
  try {
    await createAdminClient().from("paper_attempts").insert({ paper_id: id, score: marked.score, total: marked.total, correct: marked.correct, questions: marked.questions });
    await bumpPaper(id, "attempts");
  } catch {}
  return NextResponse.json({ ok: true, ...marked });
}
