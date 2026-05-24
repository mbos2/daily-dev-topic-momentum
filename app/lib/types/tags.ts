export interface DailyTag {
  id: string;
  name: string;
}

export interface TagsResponse {
  data: DailyTag[];
}
