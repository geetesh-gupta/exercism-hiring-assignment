import {
  TrackType,
  TrackWithTestimonialCountType,
} from "../components/tracks/types";

export enum APIRoutes {
  "Tracks" = "https://exercism.org/api/v2/tracks",
  "Testimonials" = "https://exercism.org/api/v2/hiring/testimonials",
}

export const filterTracksBySlug = (
  allTracks: TrackType[],
  tracksSlugsToUse: string[]
) => {
  return allTracks.filter((track) => tracksSlugsToUse.includes(track.slug));
};

export const addTestimonialCountToTracks = (
  tracks: TrackType[],
  testimonialCounts: { [key: string]: number }
): TrackWithTestimonialCountType[] => {
  return tracks.map((track) => ({
    ...track,
    testimonialCount: testimonialCounts[track.slug],
  }));
};

export const findTrackBySlug = (
  tracks: TrackType[],
  trackSlugToFind: string
) => {
  return tracks.find((track) => track.slug === trackSlugToFind);
};
