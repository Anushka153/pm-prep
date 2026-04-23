import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Service role client — bypasses RLS for server-side writes
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-log-secret");
  if (secret !== process.env.LOG_SESSION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = await req.json();

  const { data: maxRow } = await supabaseAdmin
    .from("case_logs")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  const nextId = (maxRow?.id ?? 0) + 1;

  const { error } = await supabaseAdmin.from("case_logs").insert({
    id: nextId,
    company: parsed.company ?? "Unknown",
    score: parsed.score ?? null,
    practice: false,
    type: parsed.type ?? [],
    title: parsed.title ?? "Untitled",
    question: parsed.question ?? "",
    nailed: parsed.nailed ?? [],
    missed: parsed.missed ?? [],
    keywords: parsed.keywords ?? [],
    model: parsed.model ?? [],
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, id: nextId });
}
