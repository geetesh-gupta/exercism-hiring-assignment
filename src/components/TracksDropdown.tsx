import Icon from "../elements/Icon";
import { TrackWithTestimonialCountType } from "../types/tracks";
import Dropdown, { DropdownListItem } from "../elements/Dropdown";

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
      listClassName="h-96 overflow-y-scroll"
    >
      {tracks.map((track) => (
        <DropdownListItem
          key={track.slug}
          onClick={() => onTracksChange(track)}
          className="min-w-max md:min-w-[360px]"
        >
          <input
            type="radio"
            checked={selectedTrack.slug === track.slug}
            readOnly
            className="mr-6 h-5 w-5"
            title={track.title}
          ></input>
          <Icon src={track.icon_url} alt={track.title} />
          <p className="mx-4 grow text-lg font-medium leading-md text-secondary ">
            {track.title}
          </p>
          <p className="rounded-2xl border-1 border-gray-700 px-3 py-1 text-sm leading-md text-labelSecondary ">
            {track.testimonialCount}
          </p>
        </DropdownListItem>
      ))}
    </Dropdown>
  );
};
export default TracksDropdown;
