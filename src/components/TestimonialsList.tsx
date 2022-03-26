import Icon from "../elements/Icon";
import Logo from "../elements/Logo";
import { formatTimeToRelative } from "../utils/dateUtils";
import chevronRight from "../assets/images/chevronRight.svg";
import { TestimonialsApiRespResult } from "../types/testimonials";

type TestimonialsListProps = {
  listItems: TestimonialsApiRespResult[];
};

export const TestimonialsList: React.FC<TestimonialsListProps> = ({
  listItems,
}) => {
  return (
    <div className="divide-y">
      {listItems.map((listItem) => (
        <TestimonialsListItem key={listItem.id} {...listItem} />
      ))}
    </div>
  );
};

export const TestimonialsListItem: React.FC<TestimonialsApiRespResult> = ({
  id,
  track,
  exercise,
  mentor,
  content,
  created_at,
}) => {
  return (
    <a
      className="grid cursor-pointer grid-cols-testimonial items-center gap-4 bg-default p-xl text-left hover:bg-defaultHover"
      href={`/testimonials/${id}`}
    >
      <Logo src={track.icon_url} alt={track.title} />
      <div className="flex">
        <div className="ml-2 mr-4">
          <Logo src={mentor.avatar_url} alt={mentor.handle} rounded />
        </div>
        <div className="flex flex-col">
          <p className="text-lg leading-lg text-labelDefault">
            {mentor.handle}
          </p>
          <p className="text-sm font-normal leading-sm text-labelSecondary">
            on {exercise.title} in {track.title}
          </p>
        </div>
      </div>
      <p className="w-[60ch] overflow-hidden text-ellipsis whitespace-nowrap text-md font-normal leading-xl text-default">
        {content}
      </p>
      <p className="mr-4 text-right text-sm leading-xs text-labelSecondary">
        {formatTimeToRelative(created_at)}
      </p>
      <Icon src={chevronRight} alt={"Icon to open the testimonial"} />
    </a>
  );
};

export default TestimonialsList;
