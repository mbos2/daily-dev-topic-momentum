import "server-only";

import { mapArticle } from "./map-article";
import type {
	TimeRange,
	BattleArticle,
	DailyFeedPost,
	BattleArticlePage,
} from "@/app/lib/types";
import { getFeedByTag } from "../daily-dev/feeds";

interface GetBattleArticlesInput {
	readonly topic: string;
	readonly range: TimeRange;
	readonly cursor?: string;
	readonly limit: number;
}

interface RankedArticle {
	readonly article: BattleArticle;
	readonly createdAt: string;
}

function applyRange(
	posts: readonly DailyFeedPost[],
	range: TimeRange,
): DailyFeedPost[] {
	const now = Date.now();
	const days = range === "day" ? 1 : range === "week" ? 7 : 30;
	const min = now - days * 24 * 60 * 60 * 1000;

	return posts.filter((post) => {
		const date = post.publishedAt ?? post.createdAt;

		return new Date(date).getTime() >= min;
	});
}

function paginate(
	articles: readonly RankedArticle[],
	limit: number,
	cursor?: string,
): BattleArticlePage {
	const start = cursor ? Number(cursor) : 0;
	const slice = articles.slice(start, start + limit);
	const next = start + limit < articles.length ? String(start + limit) : null;

	return {
		data: slice.map((item) => item.article),
		nextCursor: next,
	};
}

export async function getBattleArticles(
	input: GetBattleArticlesInput,
): Promise<BattleArticlePage> {
	const feed = await getFeedByTag(input.topic);
	const filtered = applyRange(feed.data, input.range);
	const ranked = filtered
		.map(
			(article, index): RankedArticle => ({
				article: mapArticle(article, index + 1),

				createdAt: article.publishedAt ?? article.createdAt,
			}),
		)
		.sort((left, right) => right.article.score - left.article.score);

	return paginate(ranked, input.limit, input.cursor);
}
