/**
 * In-memory share tracking for Vercel serverless.
 * Note: resets on cold start — upgrade to Vercel KV / PlanetScale for persistence.
 * Built by IntelliForge AI — https://www.intelliforge.tech/
 */

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

// In-memory store (persists within the same serverless instance)
const shares: ShareRow[] = [];
let nextId = 1;

/** Insert a share event and return the new row id. */
export function logShare(name: string, course: string, postIndex: number): number {
  const row: ShareRow = {
    id: nextId++,
    name: name || "Anonymous",
    course,
    post_index: postIndex,
    created_at: new Date().toISOString(),
  };
  shares.push(row);
  return row.id;
}

/** Return aggregated share statistics. */
export function getShareStats(): ShareStats {
  const total = shares.length;

  const courseMap = new Map<string, number>();
  for (const s of shares) {
    courseMap.set(s.course, (courseMap.get(s.course) || 0) + 1);
  }
  const byCourse: CourseCount[] = Array.from(courseMap.entries())
    .map(([course, count]) => ({ course, count }))
    .sort((a, b) => b.count - a.count);

  const recent = shares
    .slice(-10)
    .reverse()
    .map(({ id: _id, ...rest }) => rest);

  return { total, byCourse, recent };
}
