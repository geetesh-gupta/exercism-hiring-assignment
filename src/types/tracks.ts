export type TrackType = {
  slug: string;
  title: string;
  course?: boolean;
  num_concepts?: number;
  num_exercises?: number;
  web_url?: string;
  icon_url: string;
  tags?: string[];
  last_touched_at?: string;
  is_new?: boolean;
  links?: {
    self: string;
    exercises: string;
    concepts: string;
  };
};

export type TrackWithTestimonialCountType = TrackType & {
  testimonialCount: number;
};

export type TracksApiRespType = {
  tracks: TrackType[];
};
