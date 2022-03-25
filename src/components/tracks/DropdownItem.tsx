import Logo from "../../elements/Logo";
import { TrackWithTestimonialCountType } from "./types";

type TracksDropdownItemProps = {
  track: TrackWithTestimonialCountType;
  selected: boolean;
  onTracksChange: (track: TrackWithTestimonialCountType) => void;
};
const TrackDropdownItem: React.FC<TracksDropdownItemProps> = ({
  onTracksChange,
  selected,
  track,
}) => {
  return (
    <li
      className="bg-white hover:bg-gray-200 py-2 px-6 flex whitespace-no-wrap items-center text-left pointer"
      onClick={() => onTracksChange(track)}
      key={track.slug}
    >
      <input
        type="radio"
        checked={selected}
        readOnly
        className="w-5 h-5 mr-4"
      ></input>
      <Logo src={track.icon_url} alt={track.title} />
      <p className="grow mx-4 font-bold ">{track.title}</p>
      <p className="font-bold border-1 rounded-2xl border-gray-700 px-2 py-1">
        {track.testimonialCount}
      </p>
    </li>
  );
};

export default TrackDropdownItem;
