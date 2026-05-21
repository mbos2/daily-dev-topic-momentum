import "server-only";

import type { EngagementBreakdown } from "@/app/lib/types";

interface EngagementInput {
	comments: number;
	upvotes: number;
}

export function calculateEngagement(
	input: EngagementInput,
): EngagementBreakdown {
	const comments = input.comments;
	const upvotes = input.upvotes;
	const total = comments * 1.5 + upvotes * 1.2;

	return {
		comments,
		upvotes,
		total: Number(total.toFixed(2)),
	};
}
