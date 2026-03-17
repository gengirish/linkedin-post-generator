import { NextRequest, NextResponse } from "next/server";
import { logShare, getShareStats } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, course, postIndex } = await req.json();
  const id = logShare(name, course, postIndex);
  return NextResponse.json({ ok: true, id });
}

export async function GET() {
  const stats = getShareStats();
  return NextResponse.json(stats);
}
