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
    <div className="min-h-[640px] w-full divide-y">
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
        "grid-cols-[40px_2fr_1fr_8px] grid-rows-[2fr_1fr] gap-x-2 p-md " +
        "md:grid-cols-[40px_56px_2fr_3fr_1fr_8px] md:grid-rows-1 md:gap-4 md:p-xl"
      }
      href={`/testimonials/${id}`}
    >
      <span className="col-span-1 col-start-1 row-start-2 md:col-auto md:row-auto">
        <Icon src={track.icon_url} alt={track.title} />
      </span>
      <div className="col-span-1 col-start-1 md:col-auto md:ml-2">
        <Icon src={mentor.avatar_url} alt={mentor.handle} rounded />
      </div>
      <div className="col-span-1 col-start-2 flex  flex-col truncate md:col-auto md:row-auto">
        <span className="truncate text-lg leading-lg text-labelDefault">
          {mentor.handle}
        </span>
        <span className="truncate text-sm font-normal leading-sm text-labelSecondary ">
          on {exercise.title}{" "}
          <span className="hidden truncate lg:inline">in {track.title}</span>
        </span>
      </div>
      <span className="col-span-5 col-start-2 row-start-2 overflow-hidden truncate text-ellipsis whitespace-nowrap text-md font-normal leading-xl text-default md:col-auto md:row-auto">
        {content}
      </span>
      <span className="mr-4 shrink-0 whitespace-nowrap text-right text-sm leading-xs text-labelSecondary md:col-auto md:row-auto">
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
