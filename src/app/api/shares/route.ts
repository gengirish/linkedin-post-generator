import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), "shares.db");

function getDb() {
  const db = new Database(DB_PATH);
  db.exec(`CREATE TABLE IF NOT EXISTS shares (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    course TEXT NOT NULL,
    post_index INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);
  return db;
}

export async function POST(req: NextRequest) {
  const { name, course, postIndex } = await req.json();
  const db = getDb();
  db.prepare("INSERT INTO shares (name, course, post_index) VALUES (?, ?, ?)").run(name || "Anonymous", course, postIndex);
  db.close();
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const db = getDb();
  const total = (db.prepare("SELECT COUNT(*) as count FROM shares").get() as any).count;
  const byCourse = db.prepare("SELECT course, COUNT(*) as count FROM shares GROUP BY course ORDER BY count DESC").all();
  const recent = db.prepare("SELECT name, course, post_index, created_at FROM shares ORDER BY created_at DESC LIMIT 10").all();
  db.close();
  return NextResponse.json({ total, byCourse, recent });
}
