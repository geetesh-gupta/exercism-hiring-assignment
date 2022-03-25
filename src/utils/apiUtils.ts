import { TrackType, TrackWithTestimonialCountType } from "../types/tracks";
import exercismLogo from "../assets/images/exercismLogo.svg";

export enum APIRoutes {
  "Tracks" = "https://exercism.org/api/v2/tracks",
  "Testimonials" = "https://exercism.org/api/v2/hiring/testimonials",
}

export const defaultTrack: TrackWithTestimonialCountType = {
  slug: "all",
  title: "All",
  web_url: "https://exercism.org/tracks",
  icon_url: exercismLogo,
  testimonialCount: 0,
};

export const sumTestimonialsCount = (
  allTracks: TrackWithTestimonialCountType[]
) => {
  return allTracks.reduce((total, track) => total + track.testimonialCount, 0);
};

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
