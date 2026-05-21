import "server-only";

import { dailyDevClient } from "./client";
import type { DailyCollectionResponse, DailyFeedPost } from "../../lib/types";

interface FeedParams {
	readonly limit?: number;
	readonly cursor?: string;
}

export async function getFeedByTag(
	tag: string,
	params?: FeedParams,
): Promise<DailyCollectionResponse<DailyFeedPost>> {
	return dailyDevClient.get<DailyCollectionResponse<DailyFeedPost>>(
		`/feeds/tag/${tag}`,
		{
			params,
		},
	);
}
