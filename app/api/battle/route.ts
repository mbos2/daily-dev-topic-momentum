import type {
	TimeRange,
	ApiErrorResponse,
	BattleQuery,
	BattleResponseDto,
} from "@/app/lib/types";
import { runBattle } from "@/app/services/battle/run-battle";
import { resolveTopic } from "@/app/services/topics";
import { type NextRequest, NextResponse } from "next/server";

const ALLOWED_RANGES: readonly TimeRange[] = ["day", "week", "month"];

function errorResponse(
	status: number,
	error: string,
	message: string,
): NextResponse<ApiErrorResponse> {
	return NextResponse.json(
		{
			error,
			message,
		},
		{
			status,
		},
	);
}

function parseTopics(value: string | null): BattleQuery["topics"] {
	if (!value) {
		throw new Error('Missing query parameter "topics"');
	}

	const parsed = value
		.split(",")
		.map((topic) => topic.trim())
		.filter(Boolean);

	if (parsed.length < 2 || parsed.length > 3) {
		throw new Error("Battle supports only 2 or 3 topics");
	}

	if (parsed.length === 2) {
		return [parsed[0], parsed[1]];
	}

	return [parsed[0], parsed[1], parsed[2]];
}

function isTimeRange(value: string): value is TimeRange {
	return ALLOWED_RANGES.includes(value as TimeRange);
}

function parseRange(value: string | null): TimeRange {
	if (!value) {
		throw new Error('Missing query parameter "range"');
	}

	if (!isTimeRange(value)) {
		throw new Error(`Invalid range "${value}"`);
	}

	return value;
}

async function resolveTopics(
	topics: BattleQuery["topics"],
): Promise<BattleQuery["topics"]> {
	const resolved: string[] = [];

	for (const topic of topics) {
		const result = await resolveTopic(topic);

		resolved.push(result.resolvedValue);
	}

	if (resolved.length === 2) {
		return [resolved[0], resolved[1]];
	}

	return [resolved[0], resolved[1], resolved[2]];
}

export async function GET(
	request: NextRequest,
): Promise<NextResponse<BattleResponseDto | ApiErrorResponse>> {
	try {
		const topics = parseTopics(request.nextUrl.searchParams.get("topics"));
		const range = parseRange(request.nextUrl.searchParams.get("range"));
		const resolvedTopics = await resolveTopics(topics);
		const result = await runBattle({
			topics: resolvedTopics,
			range,
		});

		return NextResponse.json(result);
	} catch (error) {
		if (error instanceof Error) {
			return errorResponse(400, "BATTLE_REQUEST_ERROR", error.message);
		}

		return errorResponse(500, "INTERNAL_ERROR", "Unexpected error");
	}
}
