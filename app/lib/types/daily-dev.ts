import type {Cursor, ISODateString, Nullable} from './common';

export interface DailySource {
  id: string;
  name: string;
  handle: string;
  image: Nullable<string>;
}

export interface DailyAuthor {
  name: string;
  image: Nullable<string>;
}

export interface DailyAuthorWithId {
  id: string;
  name: string;
  image: Nullable<string>;
  username: Nullable<string>;
}

export interface DailyFeedPost {
  id: string;
  title: string;
  url: string;
  image: Nullable<string>;
  summary: Nullable<string>;
  type: string;
  publishedAt: Nullable<ISODateString>;
  createdAt: ISODateString;
  commentsPermalink: string;
  source: DailySource;
  tags: string[];
  readTime: Nullable<number>;
  numUpvotes: number;
  numComments: number;
  author: Nullable<DailyAuthor>;
  score: number;
}

export interface BattleTopicPost {
  feedPost: DailyFeedPost;
  score: number;
}

export interface DailyPostDetail {
  id: string;
  title: string;
  url: Nullable<string>;
  image: Nullable<string>;
  summary: Nullable<string>;
  type: string;
  publishedAt: Nullable<ISODateString>;
  createdAt: ISODateString;
  commentsPermalink: string;
  source: DailySource;
  author: Nullable<DailyAuthorWithId>;
  tags: string[];
  readTime: Nullable<number>;
  numUpvotes: number;
  numComments: number;
  bookmarked: boolean;
  content: Nullable<string>;
}

export interface DailyComment {
  id: string;
  createdAt: ISODateString;
  content: string;
  numUpvotes: number;
  numAwards: number;
  children: DailyComment[];
}

export interface DailyPagination {
  hasNextPage: boolean;
  cursor: Nullable<Cursor>;
}

export interface DailyCollectionResponse<T> {
  data: T[];
  pagination: DailyPagination;
}

export interface DailySingleResponse<T> {
  data: T;
}
