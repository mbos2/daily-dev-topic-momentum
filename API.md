# API

Base URL

```txt
/api
```

---

# GET /battle

Execute topic battle.

## Query Parameters

| Parameter | Type   | Required | Constraints                   |
| --------- | ------ | -------- | ----------------------------- |
| topics    | string | yes      | comma-separated, min=2, max=3 |
| range     | string | yes      | day \| week \| month          |

---

## Response

### 200

```ts
{
	range: "day" | "week" | "month";
	winner: string;
	sharedPosts: number;
	topics: BattleTopic[];
	stats: BattleStats;
}
```

---

## BattleTopic

```ts
{
	stats: TopicStats;
	posts: BattleTopicPost[];
}
```

---

## TopicStats

```ts
{
  topic: string;
  totalArticles: number;
  totalComments: number;
  totalUpvotes: number;
  totalAwards: number;
  totalReadTime: number;
  uniquePosts: number;
  overlapPosts: number;
  engagement: {
    comments: number;
    upvotes: number;
    score: number;
  }
}
```

---

## BattleTopicPost

```ts
{
  feedPost: DailyFeedPost;
  score: number;
}
```

---

## DailyFeedPost

```ts
{
	id: string;
	title: string;
	url: string;
	image: string | null;
	summary: string | null;
	type: string;
	publishedAt: string | null;
	createdAt: string;
	commentsPermalink: string;
	source: {
		id: string;
		name: string;
		handle: string;
		image: string;
	};

	tags: string[];
	readTime: number | null;
	numUpvotes: number;
	numComments: number;
	author: object | null;
}
```

---

## BattleStats

```ts
{
  engagement: {
    topic: string;
    score: number;
  }
  [];

  articles: {
    topic: string;
    totalArticles: number;
  }
  [];

  overlap: {
    topic: string;
    overlapPosts: number;
  }
  [];
}
```

---

## Errors

### 400

```ts
{
  message: string;
}
```

Validation:

- invalid topic count
- invalid range

---

### 404

```ts
{
  message: string;
}
```

Conditions:

- topic not found

---

### 500

```ts
{
  message: string;
}
```

Conditions:

- upstream failure
- internal processing failure

---

# Business Rules

Topics:

- minimum 2
- maximum 3

Ranges:

- day
- week
- month

Topic Score:

```txt

comments × COMMENT_WEIGHT +
upvotes × UPVOTE_WEIGHT +
sharedPosts × SHARED_ARTICLE_WEIGHT +
readTime × READ_TIME_WEIGHT +
discussionRatio × DISCUSSION_WEIGHT
```

discussionRatio:

```txt
totalComments / max(totalUpvotes, 1)
```

Article Score:

```txt

comments × COMMENT_WEIGHT +
upvotes × UPVOTE_WEIGHT +
readTime × READ_TIME_WEIGHT +
discussionRatio × DISCUSSION_WEIGHT

```

Posts:

- sorted DESC by score

Pagination:

- handled server-side

Frontend:

- never calls daily.dev api directly
