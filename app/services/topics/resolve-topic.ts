import "server-only";

import type { ResolvedTopicType, TimeRange } from "@/app/lib/types";

import { searchTags } from "../daily-dev/search";

interface ResolvedTopic {
	readonly resolvedType: ResolvedTopicType;

	readonly resolvedValue: string;
}

export async function resolveTopic(
	query: string,
	_range: TimeRange,
): Promise<ResolvedTopic> {
	const normalized = query.trim().toLowerCase();

	const response = await searchTags(normalized);

	const match = response.data.find(
		(tag) => tag.name.toLowerCase() === normalized,
	);

	if (match === undefined) {
		throw new Error(`Topic not found: ${query}`);
	}

	return {
		resolvedType: "tag",

		resolvedValue: match.name,
	};
}
