import TestimonialsListItem from "./ListItem";
import { TestimonialsApiRespResult } from "./types";

type TestimonialsListProps = {
  listItems: TestimonialsApiRespResult[];
};

const TestimonialsList: React.FC<TestimonialsListProps> = ({ listItems }) => {
  return (
    <div className="divide-y">
      {listItems.map((listItem) => (
        <TestimonialsListItem key={listItem.id} {...listItem} />
      ))}
    </div>
  );
};

export default TestimonialsList;
