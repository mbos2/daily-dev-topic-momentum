import { runBattle } from "@/app/services/battle";
import { createSnapshot, writeHistory } from "@/app/services/history";
import type {
	ApiErrorResponse,
	BattleQuery,
	BattleResponseDto,
	TimeRange,
} from "@/app/lib/types";
import { type NextRequest, NextResponse } from "next/server";

const VALID_RANGES = ["day", "week", "month"] as const;

function errorResponse(
	status: number,
	message: string,
): NextResponse<ApiErrorResponse> {
	return NextResponse.json(
		{
			error: "BATTLE_REQUEST_ERROR",
			message,
		},
		{
			status,
		},
	);
}

function isRange(value: string): value is TimeRange {
	return VALID_RANGES.some((range): boolean => range === value);
}

function parseTopics(value: string): BattleQuery["topics"] {
	const topics = value
		.split(",")
		.map((topic: string): string => topic.trim())
		.filter((topic): boolean => topic.length > 0);

	if (topics.length < 2 || topics.length > 3) {
		throw new Error("Battle supports 2 or 3 topics");
	}

	if (topics.length === 2) {
		return [topics[0], topics[1]];
	}

	return [topics[0], topics[1], topics[2]];
}

export async function GET(
	request: NextRequest,
): Promise<NextResponse<BattleResponseDto | ApiErrorResponse>> {
	try {
		const topics = request.nextUrl.searchParams.get("topics");
		const range = request.nextUrl.searchParams.get("range");
		if (topics === null) {
			return errorResponse(400, 'Missing "topics"');
		}

		if (range === null) {
			return errorResponse(400, 'Missing "range"');
		}

		if (!isRange(range)) {
			return errorResponse(400, `Invalid range "${range}"`);
		}

		const battle = await runBattle({
			topics: parseTopics(topics),
			range,
		});

		const snapshot = createSnapshot(battle);

		await writeHistory(snapshot);

		return NextResponse.json(battle);
	} catch (error) {
		console.error(error);
		return errorResponse(500, String(error));
	}
}
