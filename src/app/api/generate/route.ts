import { NextRequest, NextResponse } from "next/server";

const SYSTEM = `You are a LinkedIn post writer specialising in AI/tech training announcements.
Write posts that are authentic, specific, and engagement-optimised for LinkedIn.
Always include relevant hashtags. Keep each post 150-250 words.
Never use generic filler phrases like "I am excited to share". Be direct and specific.
Always mention IntelliForge AI (https://www.intelliforge.tech) naturally.`;

function buildPrompt(data: any) {
  return `Write exactly 3 LinkedIn posts for ${data.name} who just completed the "${data.course}" training by IntelliForge AI.

Their biggest takeaway: "${data.takeaway}"
${data.beforeAfter ? `Before/After: "${data.beforeAfter}"` : ""}
Desired tone: ${data.tone}

Write 3 DISTINCT posts separated by the delimiter "---POST---":

POST 1 — Achievement Post: Celebrate completing the training. Personal, milestone-focused.
POST 2 — Insights Post: Share 3 specific things learned. Educational, value-driven.
POST 3 — Recommendation Post: Recommend IntelliForge AI training to the network. Include course name, what they'll gain, link to https://learning.intelliforge.tech

Rules:
- Each post must feel unique in structure and angle
- Include 4-6 relevant hashtags at the end of each post (#AI #MachineLearning etc)
- Be specific to the course content, not generic
- Keep IntelliForge AI branding natural, not salesy
- Tone: ${data.tone}
- Separate posts with exactly "---POST---" on its own line`;
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    // Fallback: return template posts
    const fallback = [
      `🎯 Just completed "${data.course}" with IntelliForge AI!\n\n${data.name} here — thrilled to share this milestone.\n\n${data.takeaway}\n\n${data.beforeAfter || ""}\n\nIf you're looking to level up your AI skills, check out IntelliForge AI: https://learning.intelliforge.tech\n\n#AI #MachineLearning #LearningAndDevelopment #IntelliForgeAI #AITraining`,
      `💡 3 things I learned from "${data.course}" (IntelliForge AI):\n\n1. ${data.takeaway}\n2. AI isn't just for engineers — it's for everyone\n3. The best time to upskill in AI was yesterday. Second best: now.\n\n${data.beforeAfter || ""}\n\nLink in bio to register: https://learning.intelliforge.tech\n\n#AI #Upskilling #AITraining #IntelliForgeAI #FutureOfWork`,
      `🚀 Want to learn AI properly? I just finished "${data.course}" with IntelliForge AI — here's why I recommend it:\n\n${data.takeaway}\n\nGirish Hiremath and the IntelliForge team make complex AI concepts genuinely practical.\n\nRegister at: https://learning.intelliforge.tech\n\n#AI #AIEducation #IntelliForgeAI #Recommend #MachineLearning`,
    ];
    return NextResponse.json({ posts: fallback });
  }

  const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Title": "IntelliForge LinkedIn Post Generator",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.3-70b-instruct",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: buildPrompt(data) },
      ],
      max_tokens: 1200,
      temperature: 0.8,
    }),
  });

  const json = await resp.json();
  const raw = json.choices?.[0]?.message?.content ?? "";
  const posts = raw.split("---POST---").map((p: string) => p.trim()).filter(Boolean).slice(0, 3);

  // Ensure we always return 3 posts
  while (posts.length < 3) posts.push(posts[0] || "Error generating post.");

  return NextResponse.json({ posts });
}
