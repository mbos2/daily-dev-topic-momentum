export const RESOLVED_TOPIC_TYPES = ['tag', 'post-search'] as const;
export type ResolvedTopicType = (typeof RESOLVED_TOPIC_TYPES)[number];

export interface TopicResolveResultDto {
  resolvedType: ResolvedTopicType;
  resolvedValue: string;
}

export interface TopicInput {
  value: string;
}

export interface TopicSummary {
  topic: string;
  score: number;
}
