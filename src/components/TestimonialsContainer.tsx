import { useEffect, useState } from "react";
import PaginationHandler from "./PaginationHandler";
import TestimonialsList from "./TestimonialsList";
import {
  addTestimonialCountToTracks,
  APIRoutes,
  defaultTrack,
  filterTracksBySlug,
  sumTestimonialsCount,
} from "../utils/apiUtils";
import { addQueriesToUrl } from "../utils/urlUtils";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import {
  TracksApiRespType,
  TrackWithTestimonialCountType,
} from "../types/tracks";
import { SortSlugEnum, TestimonialsApiRespType } from "../types/testimonials";
import TestimonialsFilterBar from "./FilterBar";
import loaderIcon from "../assets/images/loader.svg";
import Icon from "../elements/Icon";

const TestimonialsContainer: React.FC = () => {
  const [exerciseQuery, setExerciseQuery] = useState("");
  const [selectedSortSlug, setSelectedSortSlug] = useState(
    SortSlugEnum.newest_first
  );
  const [activePage, setActivePage] = useState(1);
  const [tracks, setTracks] = useState<{ [key: string]: number }>({
    [defaultTrack.slug]: 0,
  });
  const [tracksDetails, setTracksDetails] = useState<
    TrackWithTestimonialCountType[]
  >([defaultTrack]);
  const [selectedTrack, setSelectedTrack] =
    useState<TrackWithTestimonialCountType>(tracksDetails[0]);
  const [url, setUrl] = useState<string>("");
  const debouncedExerciseQuery = useDebounce(exerciseQuery, 200);
  const {
    isLoading: testimonialsLoading,
    error: testimonialsErrored,
    data: testimonialsApiResp,
  } = useFetch<TestimonialsApiRespType>(url);
  const {
    isLoading: allTracksLoading,
    error: allTracksErrored,
    data: allTracks,
  } = useFetch<TracksApiRespType>(APIRoutes.Tracks);

  useEffect(() => {
    const api = APIRoutes.Testimonials;

    const fetchData = async () => {
      const queries = {
        track: selectedTrack ? selectedTrack.slug : "",
        order: selectedSortSlug,
        page: activePage,
        exercise: debouncedExerciseQuery,
      };
      const urlWithQuery = addQueriesToUrl(api, queries);
      setUrl(urlWithQuery);
    };

    fetchData();
  }, [debouncedExerciseQuery, selectedSortSlug, selectedTrack, activePage]);

  useEffect(() => {
    const trackSlugs = Object.keys(tracks);
    if (!allTracks || allTracks.tracks.length === 0 || trackSlugs.length === 0)
      return;
    const filteredTracks = filterTracksBySlug(allTracks.tracks, trackSlugs);
    const filteredTracksWithTestimonialCount = addTestimonialCountToTracks(
      filteredTracks,
      tracks
    );

    setTracksDetails([
      {
        ...defaultTrack,
        testimonialCount: sumTestimonialsCount(
          filteredTracksWithTestimonialCount
        ),
      },
      ...filteredTracksWithTestimonialCount,
    ]);
  }, [tracks, allTracks]);

  useEffect(() => {
    if (!testimonialsApiResp) return;
    const newTracks = testimonialsApiResp?.testimonials.tracks.filter(
      (trackSlug) => !Object.prototype.hasOwnProperty.call(tracks, trackSlug)
    );
    if (newTracks.length === 0) return;
    const trackCounts = testimonialsApiResp?.testimonials.track_counts;
    setTracks(
      newTracks.reduce((o, key) => ({ ...o, [key]: trackCounts[key] }), tracks)
    );
  }, [testimonialsApiResp]);

  const onSearchQueryChange = (query: string): void => {
    setActivePage(1);
    setExerciseQuery(query);
  };
  const onSortSlugChange = (sortSlug: SortSlugEnum): void => {
    setSelectedSortSlug(sortSlug);
  };
  const onTracksChange = (track: TrackWithTestimonialCountType): void => {
    setActivePage(1);
    setSelectedTrack(track);
  };
  const onPageChange = (oldPage: number, newPage: number): void => {
    setActivePage(newPage);
  };

  return (
    <div className="m-8 flex w-[calc(100%_-_2rem)] max-w-[90rem] flex-col justify-between divide-y-2 rounded-lg bg-default drop-shadow-lg">
      <TestimonialsFilterBar
        searchQuery={exerciseQuery}
        onSearchQueryChange={onSearchQueryChange}
        selectedSortSlug={selectedSortSlug}
        onSortSlugChange={onSortSlugChange}
        tracks={tracksDetails}
        selectedTrack={selectedTrack}
        onTracksChange={onTracksChange}
      />
      <div className="relative flex-1">
        <TestimonialsList
          listItems={
            testimonialsApiResp ? testimonialsApiResp.testimonials.results : []
          }
        />
        {testimonialsLoading ? (
          <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
            <div className="absolute top-0 left-0 h-full w-full bg-default opacity-30" />
            <div className="animate-[spin_4s_infinite_linear]">
              <Icon src={loaderIcon} alt="Loading icon" />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <PaginationHandler
        activePage={activePage}
        numPages={
          testimonialsApiResp
            ? testimonialsApiResp.testimonials.pagination.total_pages
            : 1
        }
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default TestimonialsContainer;
