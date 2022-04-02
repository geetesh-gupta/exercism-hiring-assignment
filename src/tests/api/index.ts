import { TracksApiRespType } from "./../../types/tracks";
import { TestimonialsApiRespType } from "./../../types/testimonials";
import {
  SortSlugEnum,
  TestimonialsApiRespResult,
} from "../../types/testimonials";
import testimonialsJson from "./testimonials.json";
import tracks from "./tracks.json";

export function getTestimonials(
  trackSlug = "",
  exercise = "",
  sortSlug = "newest_first",
  page = 1
): TestimonialsApiRespType {
  const testimonials: TestimonialsApiRespResult[] =
    testimonialsJson.testimonials;
  const numOfItems = 5;
  const filtered = testimonials
    .filter(
      (t) =>
        (exercise === "" || t.exercise.title.includes(exercise)) &&
        (trackSlug === "" || t.track.slug == trackSlug)
    )
    .sort((a, b) => {
      const diff =
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return sortSlug === "oldest_first" ? diff : -diff;
    });

  return {
    testimonials: {
      results: filtered.slice((page - 1) * numOfItems, page * numOfItems),
      pagination: {
        current_page: page,
        total_count: filtered.length,
        total_pages: Math.ceil(filtered.length / numOfItems),
      },
      tracks: ["java", "cpp"],
      track_counts: { cpp: 9, java: 40 },
    },
  };
}

export function getTracks(): TracksApiRespType {
  return tracks;
}
