import Logo from "../../elements/Logo";
import exercismLogo from "../../assets/images/exercismLogo.svg";
import TrackDropdownItem from "./DropdownItem";
import { TrackWithTestimonialCountType } from "./types";

export type TracksDropdownProps = {
  tracks: TrackWithTestimonialCountType[];
  selectedTrack: TrackWithTestimonialCountType | undefined;
  onTracksChange: (track: TrackWithTestimonialCountType) => void;
};

export const defaultTrack = {
  slug: "all",
  title: "All",
  course: false,
  num_concepts: 0,
  num_exercises: 0,
  web_url: "https://exercism.org/tracks",
  icon_url: exercismLogo,
  tags: [],
  last_touched_at: "",
  is_new: false,
  links: {
    self: "https://exercism.org/tracks",
    exercises: "https://exercism.org/tracks",
    concepts: "https://exercism.org/tracks",
  },
  testimonialCount: 0,
};

const TracksDropdown: React.FC<TracksDropdownProps> = ({
  tracks,
  selectedTrack,
  onTracksChange,
}) => (
  <div className="group inline-block relative">
    {selectedTrack ? (
      <>
        <button className="bg-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
          <>
            <span className="mr-1">
              <Logo src={selectedTrack.icon_url} alt={selectedTrack.title} />
            </span>
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </>
        </button>
        <ul
          role="list"
          className="group-hover:block absolute hidden text-gray-700 rounded min-w-max bg-white p-2 pointer z-20 h-96 overflow-y-scroll drop-shadow-md"
        >
          <TrackDropdownItem
            track={{
              ...defaultTrack,
              testimonialCount: tracks.reduce(
                (total, track) => total + track.testimonialCount,
                0
              ),
            }}
            selected={selectedTrack.slug === "all"}
            onTracksChange={onTracksChange}
          />
          {tracks.map((track) => (
            <TrackDropdownItem
              key={track.slug}
              track={track}
              onTracksChange={onTracksChange}
              selected={selectedTrack.slug === track.slug}
            />
          ))}
        </ul>
      </>
    ) : (
      <>Loading...</>
    )}
  </div>
);

export default TracksDropdown;
