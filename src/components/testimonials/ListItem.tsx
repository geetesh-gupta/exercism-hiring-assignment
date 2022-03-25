import Icon from "../../elements/Icon";
import Logo from "../../elements/Logo";
import { formatTimeToRelative } from "../../utils/dateUtils";
import chevronRight from "../../assets/images/chevronRight.svg";
import { TestimonialsApiRespResult } from "./types";

const TestimonialsListItem: React.FC<TestimonialsApiRespResult> = ({
  track,
  exercise,
  mentor,
  content,
  created_at,
}) => {
  return (
    <a className="grid grid-cols-testimonial gap-6 items-center text-left px-6 py-2 bg-white text-gray-700 hover:bg-gray-200 cursor-pointer">
      <Logo src={track.icon_url} alt={track.title} />
      <Logo src={mentor.avatar_url} alt={mentor.handle} />
      <div className="flex flex-col">
        <p className="font-bold">{mentor.handle}</p>
        <p>
          on {exercise.title} in {track.title}
        </p>
      </div>
      <p className="text-ellipsis whitespace-nowrap overflow-hidden w-[70ch]">
        {content}
      </p>
      <p className="text-right mr-4">{formatTimeToRelative(created_at)}</p>
      <Icon src={chevronRight} alt={"Icon to open the testimonial"} />
    </a>
  );
};

export default TestimonialsListItem;
