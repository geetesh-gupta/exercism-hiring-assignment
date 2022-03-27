import Icon, { IconSizes } from "../elements/Icon";
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
    <div className="min-h-[640px] min-w-[640px] divide-y">
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
      className={
        "grid w-full cursor-pointer items-center bg-default text-left hover:bg-defaultHover  " +
        "grid-cols-[24px_2fr_3fr_1fr_8px] gap-2 p-md " +
        "gap-4 md:grid-cols-[40px_2fr_3fr_1fr_8px] md:p-xl "
      }
      href={`/testimonials/${id}`}
    >
      <Icon src={track.icon_url} alt={track.title} />
      <div className={"flex items-center truncate"}>
        <div className="ml-1 mr-2 w-8 flex-shrink-0 md:ml-2 md:mr-4 md:w-12">
          <Icon src={mentor.avatar_url} alt={mentor.handle} rounded />
        </div>
        <div className="flex flex-col truncate">
          <span className="truncate text-lg leading-lg text-labelDefault">
            {mentor.handle}
          </span>
          <span className="truncate text-sm font-normal leading-sm text-labelSecondary ">
            on {exercise.title}{" "}
            <span className="hidden truncate lg:inline">in {track.title}</span>
          </span>
        </div>
      </div>
      <span className="overflow-hidden truncate text-ellipsis whitespace-nowrap text-md font-normal leading-xl text-default ">
        {content}
      </span>
      <span className="mr-4 shrink-0 whitespace-nowrap text-right text-sm leading-xs text-labelSecondary">
        {formatTimeToRelative(created_at)}
      </span>
      <Icon
        size={IconSizes.xs}
        src={chevronRight}
        alt={"Icon to open the testimonial"}
      />
    </a>
  );
};

export default TestimonialsList;
