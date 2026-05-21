import "server-only";

import { dailyDevClient } from "./client";

interface DailyTag {
	readonly name: string;
}

interface TagsResponse {
	readonly data: readonly DailyTag[];
}

export async function getTags(): Promise<readonly DailyTag[]> {
	const response = await dailyDevClient.get<TagsResponse>("/tags");

	return response.data;
}
