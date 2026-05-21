import "server-only";

import { dailyDevClient } from "./client";
import type {
	DailyCollectionResponse,
	DailyTag,
	DailyFeedPost,
} from "../../lib/types";

interface SearchPostsParams {
	readonly query: string;
	readonly limit?: number;
	readonly time?: "day" | "week" | "month";
}

interface SearchTagsParams {
	readonly query: string;
}

export async function searchTags(
	params: SearchTagsParams,
): Promise<DailyCollectionResponse<DailyTag>> {
	return dailyDevClient.get<DailyCollectionResponse<DailyTag>>("/search/tags", {
		params: {
			q: params.query,
		},
	});
}

export async function searchPosts(
	params: SearchPostsParams,
): Promise<DailyCollectionResponse<DailyFeedPost>> {
	return dailyDevClient.get<DailyCollectionResponse<DailyFeedPost>>(
		"/search/posts",
		{
			params: {
				q: params.query,
				limit: params.limit,
				time: params.time,
			},
		},
	);
}
