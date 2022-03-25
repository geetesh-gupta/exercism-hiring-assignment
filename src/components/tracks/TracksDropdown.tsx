import Logo from "../../elements/Logo";
import { TrackWithTestimonialCountType } from "./types";
import Dropdown, { DropdownListItem } from "../../elements/Dropdown";

export type TracksDropdownProps = {
  tracks: TrackWithTestimonialCountType[];
  selectedTrack: TrackWithTestimonialCountType;
  onTracksChange: (track: TrackWithTestimonialCountType) => void;
};

const TracksDropdown: React.FC<TracksDropdownProps> = ({
  tracks,
  selectedTrack,
  onTracksChange,
}) => {
  return (
    <Dropdown
      selected={{
        icon_url: selectedTrack?.icon_url,
        title: selectedTrack.title,
      }}
      showLogo
    >
      {tracks.map((track) => (
        <DropdownListItem
          key={track.slug}
          onClick={() => onTracksChange(track)}
        >
          <input
            type="radio"
            checked={selectedTrack.slug === track.slug}
            readOnly
            className="w-5 h-5 mr-4"
          ></input>
          <Logo src={track.icon_url} alt={track.title} />
          <p className="grow mx-4 font-bold ">{track.title}</p>
          <p className="font-bold border-1 rounded-2xl border-gray-700 px-2 py-1">
            {track.testimonialCount}
          </p>
        </DropdownListItem>
      ))}
    </Dropdown>
  );
};
export default TracksDropdown;
