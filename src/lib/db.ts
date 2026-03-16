/**
 * SQLite share tracking via better-sqlite3.
 * Used by /api/shares route to persist and query share events.
 *
 * DB_PATH defaults to shares.db in the project root.
 * Override via the DB_PATH environment variable (e.g. for a persistent volume on Vercel / Railway).
 *
 * Note: better-sqlite3 is synchronous by design and performs well for this low-traffic use-case.
 */
import Database from "better-sqlite3";
import path from "path";

export const DB_PATH =
  process.env.DB_PATH || path.join(process.cwd(), "shares.db");

export interface ShareRow {
  id: number;
  name: string;
  course: string;
  post_index: number;
  created_at: string;
}

export interface CourseCount {
  course: string;
  count: number;
}

export interface ShareStats {
  total: number;
  byCourse: CourseCount[];
  recent: Omit<ShareRow, "id">[];
}

/**
 * Open (or create) the SQLite database and ensure the shares table exists.
 * Caller is responsible for calling db.close() when done.
 */
export function getDb(): Database.Database {
  const db = new Database(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS shares (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT,
      course     TEXT    NOT NULL,
      post_index INTEGER NOT NULL,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);
  return db;
}

/** Insert a share event and return the new row id. */
export function logShare(
  name: string,
  course: string,
  postIndex: number
): number {
  const db = getDb();
  try {
    const result = db
      .prepare(
        "INSERT INTO shares (name, course, post_index) VALUES (?, ?, ?)"
      )
      .run(name || "Anonymous", course, postIndex);
    return result.lastInsertRowid as number;
  } finally {
    db.close();
  }
}

/** Return aggregated share statistics. */
export function getShareStats(): ShareStats {
  const db = getDb();
  try {
    const total = (
      db.prepare("SELECT COUNT(*) as count FROM shares").get() as {
        count: number;
      }
    ).count;

    const byCourse = db
      .prepare(
        "SELECT course, COUNT(*) as count FROM shares GROUP BY course ORDER BY count DESC"
      )
      .all() as CourseCount[];

    const recent = db
      .prepare(
        "SELECT name, course, post_index, created_at FROM shares ORDER BY created_at DESC LIMIT 10"
      )
      .all() as Omit<ShareRow, "id">[];

    return { total, byCourse, recent };
  } finally {
    db.close();
  }
}
