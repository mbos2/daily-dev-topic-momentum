export interface BattleArticle {
	id: string;
	rank: number;
	title: string;
	source: string;
	comments: number;
	upvotes: number;
	clicks: number;
	score: number;
}

export interface BattleArticlePage {
	data: BattleArticle[];
	nextCursor: string | null;
}
