import type { TopicResolveResultDto } from "@/app/lib/types";
import "server-only";
import { searchTags, searchPosts } from "../daily-dev/search";

function normalize(value: string): string {
	return value.trim().toLowerCase();
}

function isExactTagMatch(query: string, tag: string): boolean {
	return normalize(query) === normalize(tag);
}

export async function resolveTopic(
	query: string,
): Promise<TopicResolveResultDto> {
	const normalizedQuery = normalize(query);

	if (normalizedQuery.length === 0) {
		throw new Error("Topic query cannot be empty");
	}

	const tagsResponse = await searchTags({
		query: normalizedQuery,
	});

	const exactTag = tagsResponse.data.find((tag) =>
		isExactTagMatch(normalizedQuery, tag.name),
	);

	if (exactTag) {
		return {
			resolvedType: "tag",
			resolvedValue: exactTag.name,
		};
	}

	const postsResponse = await searchPosts({
		query: normalizedQuery,
		limit: 1,
	});

	if (postsResponse.data.length > 0) {
		return {
			resolvedType: "post-search",

			resolvedValue: normalizedQuery,
		};
	}

	throw new Error(`Unable to resolve topic "${query}"`);
}
