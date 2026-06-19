const requests = new Map();

function fallbackDraft(input) {
  const title = input.title?.trim() || "Untitled Walking Salon";
  const location = input.location?.trim() || "a place to be developed";
  const topics = input.topics?.trim() || "place, conversation, and shared attention";
  const timing = input.timing?.trim() || "timing to be confirmed";
  const mileage = input.mileage?.trim() || "a comfortable daily distance";

  return {
    title,
    summary: `A tentative walking salon in ${location} around ${topics}.`,
    description: `${title} is an initial framework for a walking salon in ${location}, proposed for ${timing}. Participants can expect a route shaped around ${topics}, with practical details developed as the group forms. This proposal may evolve as participants, route, and logistics are confirmed.`,
    dailyRhythm: `Morning briefing, walking blocks around ${mileage}, an afternoon rest or site visit, and an evening conversation over a shared meal.`,
    conversation: "One daily prompt, rotating walking pairs, and a short evening gathering for notes and questions.",
    expectations: "Participants should be comfortable with tentative planning, mixed weather, shared discussion, and basic self-sufficiency.",
    source: "fallback"
  };
}

function rateLimited(req) {
  const key = req.headers["x-forwarded-for"]?.split(",")[0] || "unknown";
  const now = Date.now();
  const recent = (requests.get(key) || []).filter((time) => now - time < 60000);
  if (recent.length >= 6) return true;
  recent.push(now);
  requests.set(key, recent);
  return false;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (rateLimited(req)) return res.status(429).json({ error: "Please wait a moment before generating another draft." });

  const input = req.body || {};
  if (!process.env.OPENAI_API_KEY) return res.status(200).json(fallbackDraft(input));

  const schema = {
    type: "object",
    additionalProperties: false,
    required: ["title", "summary", "description", "dailyRhythm", "conversation", "expectations"],
    properties: {
      title: { type: "string" },
      summary: { type: "string" },
      description: { type: "string" },
      dailyRhythm: { type: "string" },
      conversation: { type: "string" },
      expectations: { type: "string" }
    }
  };

  const instructions = [
    "Draft a practical, warm proposal for a private multi-day walking salon.",
    "Never invent confirmed bookings, permits, guides, transport, lodging, or safety arrangements.",
    "Use tentative language for unknown details.",
    "Keep the writing specific, understated, and useful.",
    "Include that the proposal may evolve as participants, route, and logistics are confirmed."
  ].join(" ");

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions,
        input: JSON.stringify(input),
        text: {
          format: {
            type: "json_schema",
            name: "walk_proposal",
            strict: true,
            schema
          }
        }
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("OpenAI response error", response.status, detail);
      return res.status(502).json({ error: "The AI drafting service is temporarily unavailable." });
    }

    const data = await response.json();
    const outputText = data.output
      ?.flatMap((item) => item.content || [])
      .find((content) => content.type === "output_text")?.text;

    if (!outputText) throw new Error("No text returned from OpenAI");

    return res.status(200).json({ ...JSON.parse(outputText), source: "openai" });
  } catch (error) {
    console.error("AI draft error", error);
    return res.status(500).json({ error: "Could not generate a draft right now." });
  }
}
