import { useEffect, useState } from "react";
import PaginationHandler from "./PaginationHandler";
import TestimonialsList from "./List";
import {
  addTestimonialCountToTracks,
  APIRoutes,
  filterTracksBySlug,
} from "../../utils/apiUtils";
import { addQueriesToUrl } from "../../utils/urlUtils";
import { defaultTrack } from "../tracks/Dropdown";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";
import {
  TracksApiRespType,
  TrackWithTestimonialCountType,
} from "../tracks/types";
import { SortType, TestimonialsApiRespType } from "./types";
import TestimonialsFilterBar from "./FilterBar";

const TestimonialsContainer: React.FC = () => {
  const [exerciseQuery, setExerciseQuery] = useState("");
  const [selectedSortType, setSelectedSortType] = useState(
    SortType.newest_first
  );
  const [activePage, setActivePage] = useState(1);
  const [selectedTrack, setSelectedTrack] =
    useState<TrackWithTestimonialCountType>(defaultTrack);
  const [tracks, setTracks] = useState<{ [key: string]: number }>({});
  const [tracksDetails, setTracksDetails] = useState<
    TrackWithTestimonialCountType[]
  >([]);
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
        order: selectedSortType,
        page: activePage,
        exercise: debouncedExerciseQuery,
      };
      const urlWithQuery = addQueriesToUrl(api, queries);
      setUrl(urlWithQuery);
    };

    fetchData();
  }, [debouncedExerciseQuery, selectedSortType, selectedTrack, activePage]);

  useEffect(() => {
    const trackSlugs = Object.keys(tracks);
    if (!allTracks || allTracks.tracks.length === 0 || trackSlugs.length === 0)
      return;
    const filteredTracks = filterTracksBySlug(allTracks.tracks, trackSlugs);
    const filteredTracksWithTestimonialCount = addTestimonialCountToTracks(
      filteredTracks,
      tracks
    );
    setTracksDetails(filteredTracksWithTestimonialCount);
  }, [tracks, allTracks]);

  useEffect(() => {
    if (!testimonialsApiResp) return;
    const newTracks = testimonialsApiResp?.testimonials.tracks.filter(
      (trackSlug) => !Object.prototype.hasOwnProperty.call(tracks, trackSlug)
    );
    if (newTracks.length === 0) return;
    const trackCounts = testimonialsApiResp?.testimonials.track_counts;
    setTracks(
      newTracks.reduce((o, key) => ({ ...o, [key]: trackCounts[key] }), {})
    );
  }, [testimonialsApiResp]);

  const onSearchQueryChange = (query: string): void => {
    setActivePage(1);
    setExerciseQuery(query);
  };
  const onSortTypeChange = (sortType: SortType): void => {
    setSelectedSortType(sortType);
  };
  const onTracksChange = (track: TrackWithTestimonialCountType): void => {
    setSelectedTrack(track);
  };
  const onPageChange = (oldPage: number, newPage: number): void => {
    setActivePage(newPage);
  };

  return (
    <div className="flex flex-col divide-y-2 rounded drop-shadow-xl shadow-gray-700 bg-white m-8 max-w-[90rem] min-w-[83rem]">
      <TestimonialsFilterBar
        searchQuery={exerciseQuery}
        onSearchQueryChange={onSearchQueryChange}
        selectedSortType={selectedSortType}
        onSortTypeChange={onSortTypeChange}
        tracks={tracksDetails}
        selectedTrack={selectedTrack}
        onTracksChange={onTracksChange}
      />
      <TestimonialsList
        listItems={
          testimonialsApiResp ? testimonialsApiResp.testimonials.results : []
        }
      />
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
