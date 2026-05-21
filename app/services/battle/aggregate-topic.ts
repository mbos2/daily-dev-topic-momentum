import "server-only";

import { calculateEngagement } from "./calculate-engagement";
import { mapArticle } from "./map-article";
import type {
	DailyFeedPost,
	DailyComment,
	BattleTopic,
	TopicStats,
} from "@/app/lib/types";

export interface AggregateTopicInput {
	readonly topic: string;
	readonly posts: DailyFeedPost[];
	readonly commentsByPostId: ReadonlyMap<string, DailyComment[]>;
	readonly overlapPostIds: ReadonlySet<string>;
}

function countAwards(comments: readonly DailyComment[]): number {
	return comments.reduce(
		(total, comment) =>
			total + comment.numAwards + countAwards(comment.children),
		0,
	);
}

export function aggregateTopic(input: AggregateTopicInput): BattleTopic {
	const uniquePosts = input.posts.filter(
		(post) => !input.overlapPostIds.has(post.id),
	);

	const totalComments = uniquePosts.reduce(
		(total, post) => total + post.numComments,
		0,
	);

	const totalUpvotes = uniquePosts.reduce(
		(total, post) => total + post.numUpvotes,
		0,
	);

	const totalClicks = uniquePosts.reduce(
		(total, post) => total + post.clicks,
		0,
	);

	const totalReadTime = uniquePosts.reduce(
		(total, post) => total + (post.readTime ?? 0),
		0,
	);

	const totalAwards = input.posts.reduce(
		(total, post) =>
			total + countAwards(input.commentsByPostId.get(post.id) ?? []),
		0,
	);

	const engagement = calculateEngagement({
		comments: totalComments,
		upvotes: totalUpvotes,
		clicks: totalClicks,
	});

	const stats: TopicStats = {
		topic: input.topic,
		totalArticles: input.posts.length,
		totalComments,
		totalUpvotes,
		totalClicks,
		totalAwards,
		totalReadTime,
		uniquePosts: uniquePosts.length,
		overlapPosts: input.overlapPostIds.size,
		engagement,
	};

	const articles = uniquePosts
		.map((article, index) => mapArticle(article, index + 1))
		.sort((left, right) => right.score - left.score);

	return {
		stats,
		articles,
	};
}
