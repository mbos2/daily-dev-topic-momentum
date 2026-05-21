import "server-only";

export interface OverlapResult {
	readonly sharedPostIds: Set<string>;
	readonly overlapCount: number;
}

export function calculateOverlap(groups: readonly string[][]): OverlapResult {
	const occurrences = new Map<string, number>();

	groups.forEach((postIds) => {
		const unique = new Set(postIds);

		unique.forEach((id) => {
			occurrences.set(id, (occurrences.get(id) ?? 0) + 1);
		});
	});

	const shared = new Set<string>();

	occurrences.forEach((count, id) => {
		if (count > 1) {
			shared.add(id);
		}
	});

	return {
		sharedPostIds: shared,
		overlapCount: shared.size,
	};
}
