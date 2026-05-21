import "server-only";
import { dailyDevClient } from "./client";
import type {
	DailySingleResponse,
	DailyPostDetail,
	DailyCollectionResponse,
	DailyComment,
} from "../../lib/types";

interface CommentsParams {
	readonly limit?: number;
	readonly cursor?: string;
	readonly sort?: "oldest" | "newest";
}

export async function getPost(
	postId: string,
): Promise<DailySingleResponse<DailyPostDetail>> {
	return dailyDevClient.get(`/posts/${postId}`);
}

export async function getComments(
	postId: string,
	params?: CommentsParams,
): Promise<DailyCollectionResponse<DailyComment>> {
	return dailyDevClient.get(`/posts/${postId}/comments`, {
		params,
	});
}
