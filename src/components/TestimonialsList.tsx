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
        " grid w-full cursor-pointer items-center bg-default p-xl text-left hover:bg-defaultHover " +
        "grid-cols-[40px_minmax(160px,_2fr)_16ch_minmax(110px,_1fr)_8px] gap-2 " +
        "md:grid-cols-[40px_minmax(240px,_1fr)_40ch_minmax(110px,_1fr)_8px] " +
        "gap-4 lg:grid-cols-[40px_minmax(320px,_2fr)_50ch_minmax(120px,_1fr)_8px] " +
        "xl:grid-cols-[40px_minmax(360px,_3fr)_66ch_minmax(120px,_1fr)_8px] "
      }
      href={`/testimonials/${id}`}
    >
      <Icon src={track.icon_url} alt={track.title} />
      <div className={"flex items-center"}>
        <div className="ml-2 mr-4 flex-shrink-0">
          <Icon src={mentor.avatar_url} alt={mentor.handle} rounded />
        </div>
        <div className="flex flex-col">
          <p className="text-lg leading-lg text-labelDefault">
            {mentor.handle}
          </p>
          <p
            className={
              "overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal leading-sm text-labelSecondary " +
              "w-[16ch] " +
              "md:w-[18ch] " +
              "lg:w-[24ch] " +
              "xl:w-[50ch] "
            }
          >
            on {exercise.title}{" "}
            <span className="hidden lg:inline-block"> in {track.title}</span>
          </p>
        </div>
      </div>
      <p
        className={
          "overflow-hidden text-ellipsis whitespace-nowrap text-md font-normal leading-xl text-default " +
          "w-[16ch] " +
          "md:w-[40ch] " +
          "lg:w-[50ch] " +
          "xl:w-[60ch] "
        }
      >
        {content}
      </p>
      <p className="mr-4 text-right text-sm leading-xs text-labelSecondary">
        {formatTimeToRelative(created_at)}
      </p>
      <Icon
        size={IconSizes.xs}
        src={chevronRight}
        alt={"Icon to open the testimonial"}
      />
    </a>
  );
};

export default TestimonialsList;
