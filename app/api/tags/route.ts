import { NextResponse } from "next/server";

import { getTags } from "@/app/services/daily-dev/tags";

export async function GET(): Promise<NextResponse> {
	const tags = await getTags();

	return NextResponse.json(tags);
}
