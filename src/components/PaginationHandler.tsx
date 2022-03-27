import {
  ceilPaginateRange,
  floorPaginateRange,
  paginateNumsRange,
} from "../utils/pageUtils";
import arrowLeft from "../assets/images/arrowLeft.svg";
import arrowRight from "../assets/images/arrowRight.svg";
import Button from "../elements/Button";
import Icon, { IconSizes } from "../elements/Icon";

type PaginationHandlerProps = {
  activePage: number;
  numPages: number;
  onPageChange: (oldPage: number, newPage: number) => void;
};

const PaginationHandler: React.FC<PaginationHandlerProps> = ({
  activePage,
  numPages,
  onPageChange,
}) => {
  return (
    <div className="font-sm flex w-full items-center justify-between bg-default p-xl leading-lg">
      <Button
        onClick={() =>
          onPageChange(activePage, floorPaginateRange(activePage, 1))
        }
        disabled={!numPages || activePage === 1}
      >
        <Icon size={IconSizes.xs} src={arrowLeft} alt="Previous Page" />
        <p className="ml-2.5">Previous</p>
      </Button>
      <div className="flex items-center gap-3 text-labelSecondary">
        {paginateNumsRange(activePage, numPages).map((num, i) =>
          num ? (
            <button
              key={num}
              onClick={() => onPageChange(activePage, num)}
              className={`rounded border-1  p-md ${
                activePage === num
                  ? "border-paginationCurrent bg-paginationCurrent text-labelDefault"
                  : "border-button bg-default "
              }`}
            >
              {num}
            </button>
          ) : (
            <span key={i + 1} className="mx-3">
              ...
            </span>
          )
        )}
      </div>
      <Button
        onClick={() =>
          onPageChange(activePage, ceilPaginateRange(activePage, numPages, 1))
        }
        disabled={!numPages || activePage === numPages}
      >
        <p className="mr-2.5">Next</p>
        <Icon size={IconSizes.xs} src={arrowRight} alt="Next Page" />
      </Button>
    </div>
  );
};

export default PaginationHandler;
