import "server-only";

import type { BattleTopic, DailyFeedPost } from "@/app/lib/types";

const SHARED_SCORE_MULTIPLIER = 0.2;

interface AggregateTopicInput {
	readonly topic: string;

	readonly posts: readonly DailyFeedPost[];

	readonly overlapPostIds: ReadonlySet<string>;
}

function engagementScore(comments: number, upvotes: number): number {
	return comments * 1.5 + upvotes * 1.2;
}

export function aggregateTopic(input: AggregateTopicInput): BattleTopic {
	const uniquePosts = input.posts.filter(
		(post) => !input.overlapPostIds.has(post.id),
	);

	const overlapPosts = input.posts.filter((post) =>
		input.overlapPostIds.has(post.id),
	);

	const totalComments = uniquePosts.reduce(
		(total, post) => total + post.numComments,
		0,
	);

	const totalUpvotes = uniquePosts.reduce(
		(total, post) => total + post.numUpvotes,
		0,
	);

	const totalReadTime = uniquePosts.reduce(
		(total, post) => total + (post.readTime ?? 0),
		0,
	);

	const uniqueScore = engagementScore(totalComments, totalUpvotes);

	const sharedScore =
		engagementScore(
			overlapPosts.reduce((total, post) => total + post.numComments, 0),

			overlapPosts.reduce((total, post) => total + post.numUpvotes, 0),
		) * SHARED_SCORE_MULTIPLIER;

	return {
		stats: {
			topic: input.topic,

			totalArticles: input.posts.length,

			totalComments,

			totalUpvotes,

			totalAwards: 0,

			totalReadTime,

			uniquePosts: uniquePosts.length,

			overlapPosts: overlapPosts.length,

			engagement: {
				comments: totalComments,

				upvotes: totalUpvotes,

				total: Number((uniqueScore + sharedScore).toFixed(2)),
			},
		},
	};
}
