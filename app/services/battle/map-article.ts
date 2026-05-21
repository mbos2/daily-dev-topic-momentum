import "server-only";

import { calculateEngagement } from "./calculate-engagement";
import type { DailyFeedPost, BattleArticle } from "@/app/lib/types";

export function mapArticle(
	article: DailyFeedPost,
	rank: number,
): BattleArticle {
	const score = calculateEngagement({
		comments: article.numComments,
		upvotes: article.numUpvotes,
		clicks: article.clicks,
	});

	return {
		id: article.id,
		rank,
		title: article.title,
		source: article.source.name,
		comments: article.numComments,
		upvotes: article.numUpvotes,
		clicks: article.clicks,
		score: score.total,
	};
}
