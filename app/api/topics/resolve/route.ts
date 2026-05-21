import type { ApiErrorResponse, TopicResolveResultDto } from "@/app/lib/types";
import { resolveTopic } from "@/app/services/topics";
import { type NextRequest, NextResponse } from "next/server";

function errorResponse(
	status: number,
	message: string,
): NextResponse<ApiErrorResponse> {
	return NextResponse.json(
		{
			error: "TOPIC_RESOLVE_ERROR",
			message,
		},
		{
			status,
		},
	);
}

export async function GET(
	request: NextRequest,
): Promise<NextResponse<TopicResolveResultDto | ApiErrorResponse>> {
	const query = request.nextUrl.searchParams.get("q");

	if (!query) {
		return errorResponse(400, 'Missing query parameter "q"');
	}

	try {
		const result = await resolveTopic(query);

		return NextResponse.json(result);
	} catch (error) {
		if (error instanceof Error) {
			return errorResponse(422, error.message);
		}

		return errorResponse(500, "Unexpected error");
	}
}
