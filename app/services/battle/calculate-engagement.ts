import type { EngagementBreakdown } from "@/app/lib/types";
import "server-only";

const COMMENT_WEIGHT = 1.5;
const UPVOTE_WEIGHT = 1.2;
const CLICK_WEIGHT = 1.1;

export interface EngagementInput {
	readonly comments: number;
	readonly upvotes: number;
	readonly clicks: number;
}

function round(value: number): number {
	return Number(value.toFixed(2));
}

export function calculateEngagement(
	input: EngagementInput,
): EngagementBreakdown {
	const total =
		input.comments * COMMENT_WEIGHT +
		input.upvotes * UPVOTE_WEIGHT +
		input.clicks * CLICK_WEIGHT;

	return {
		comments: input.comments,
		upvotes: input.upvotes,
		clicks: input.clicks,
		total: round(total),
	};
}
