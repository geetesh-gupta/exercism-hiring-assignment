export type TestimonialsApiRespType = {
  testimonials: {
    results: TestimonialsApiRespResult[];
    pagination: {
      current_page: number;
      total_count: number;
      total_pages: number;
    };
    tracks: string[];
    track_counts: {
      [name: string]: number;
    };
  };
};

export type TestimonialsApiRespResult = {
  id: number;
  track: {
    slug: string;
    title: string;
    icon_url: string;
  };
  exercise: {
    slug: string;
    title: string;
    icon_url: string;
  };
  mentor: {
    handle: string;
    avatar_url: string;
  };
  content: string;
  created_at: string;
};

export enum SortType {
  oldest_first = "oldest_first",
  newest_first = "newest_first",
}
