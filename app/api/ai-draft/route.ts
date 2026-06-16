import { NextResponse } from "next/server";

type DraftInput = {
  title?: string;
  location?: string;
  timePeriod?: string;
  duration?: string;
  dailyMileage?: string;
  topics?: string;
  audience?: string;
  logistics?: string;
  tone?: string;
  knownDetails?: string;
};

export async function POST(request: Request) {
  const input = (await request.json()) as DraftInput;
  const title = input.title?.trim() || "Untitled Walking Salon";
  const location = input.location?.trim() || "a location to be developed";
  const timePeriod = input.timePeriod?.trim() || "timing to be confirmed";
  const topics = input.topics?.trim() || "place, conversation, and shared attention";
  const dailyMileage = input.dailyMileage?.trim() || "a comfortable daily distance";

  return NextResponse.json({
    input,
    output: {
      title,
      shortSummary: `A tentative walking salon in ${location} around ${topics}.`,
      fullDescription: `${title} is an initial framework for a walking salon in ${location}, proposed for ${timePeriod}. Participants can expect a route shaped around ${topics}, with practical logistics developed as the group forms. This proposal is an initial framework and may evolve as participants, route, and logistics are confirmed.`,
      organizerFramework: `The anticipated structure is daily walking, shared meals, and focused conversation. Distances are proposed around ${dailyMileage}; route, lodging, transportation, and safety arrangements are tentative unless separately confirmed by the organizer.`,
      dailyRhythm: "Morning briefing, walking blocks with paired conversation, afternoon rest or site visit, evening synthesis over a shared meal.",
      conversationStructure: "One daily prompt, rotating walking pairs, and a short evening gathering for notes and questions.",
      participantExpectations: "Participants should be comfortable with tentative planning, mixed weather, shared discussion, and basic self-sufficiency.",
      logisticsAssumptions: input.logistics || "Lodging, meals, permits, guides, and transportation are proposed and to be developed.",
      whoThisIsFor: input.audience || "People interested in walking, careful observation, and generous conversation.",
      suggestedTags: topics.split(",").map((topic) => topic.trim()).filter(Boolean),
      suggestedMinimumParticipantsForTakeoff: 5,
      suggestedMaxParticipants: 8
    },
    status: "draft"
  });
}
