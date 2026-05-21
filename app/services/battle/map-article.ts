import "server-only";

import type { BattleArticle, DailyFeedPost } from "@/app/lib/types";

import { calculateEngagement } from "./calculate-engagement";

export function mapArticle(
	article: DailyFeedPost,
	rank: number,
): BattleArticle {
	const score = calculateEngagement({
		comments: article.numComments,

		upvotes: article.numUpvotes,
	});

	return {
		id: article.id,
		rank,
		title: article.title,
		source: article.source.name,
		comments: article.numComments,
		upvotes: article.numUpvotes,
		score: score.total,
	};
}
