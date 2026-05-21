import "server-only";

import { aggregateTopic } from "./aggregate-topic";
import { buildStats } from "./build-stats";
import { calculateOverlap } from "./calculate-overlap";
import type {
	DailyFeedPost,
	DailyComment,
	BattleQuery,
	BattleResponseDto,
} from "@/app/lib/types";
import { getFeedByTag } from "../daily-dev/feeds";
import { getComments } from "../daily-dev/posts";

interface TopicFeed {
	topic: string;

	posts: DailyFeedPost[];
}

async function fetchFeeds(topics: readonly string[]): Promise<TopicFeed[]> {
	const result: TopicFeed[] = [];

	for (const topic of topics) {
		const feed = await getFeedByTag(topic);

		result.push({
			topic,
			posts: feed.data,
		});
	}

	return result;
}

async function fetchComments(
	posts: readonly DailyFeedPost[],
): Promise<Map<string, DailyComment[]>> {
	const result = new Map<string, DailyComment[]>();

	for (const post of posts) {
		const comments = await getComments(post.id);
		result.set(post.id, comments.data);
	}

	return result;
}

export async function runBattle(
	query: BattleQuery,
): Promise<BattleResponseDto> {
	const feeds = await fetchFeeds(query.topics);

	const overlap = calculateOverlap(
		feeds.map((feed) => feed.posts.map((post) => post.id)),
	);

	const topics = [];

	for (const feed of feeds) {
		const comments = await fetchComments(feed.posts);

		topics.push(
			aggregateTopic({
				topic: feed.topic,
				posts: feed.posts,
				commentsByPostId: comments,
				overlapPostIds: overlap.sharedPostIds,
			}),
		);
	}

	const winner = topics.reduce((best, current) =>
		current.stats.engagement.total > best.stats.engagement.total
			? current
			: best,
	);

	return {
		range: query.range,
		winner: winner.stats.topic,
		sharedPosts: overlap.overlapCount,
		topics,
		stats: buildStats(topics),
	};
}
