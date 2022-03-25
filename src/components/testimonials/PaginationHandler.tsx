import Icon from "../../elements/Icon";
import {
  ceilPaginateRange,
  floorPaginateRange,
  paginateNumsRange,
} from "../../utils/pageUtils";
import arrowLeft from "../../assets/images/arrowLeft.svg";
import arrowRight from "../../assets/images/arrowRight.svg";
import Button from "../../elements/Button";

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
    <div className="flex items-center justify-between w-full bg-white h-20 px-6 text-gray-700">
      <Button
        onClick={() =>
          onPageChange(activePage, floorPaginateRange(activePage, 1))
        }
        disabled={!numPages || activePage === 1}
      >
        <Icon src={arrowLeft} alt="Previous Page" />
        <p className="ml-2">Previous</p>
      </Button>
      <div className="flex gap-2 items-center">
        {paginateNumsRange(activePage, numPages).map((num, i) =>
          num ? (
            <button
              key={num}
              onClick={() => onPageChange(activePage, num)}
              className={`py-2 px-4 border-1 rounded hover:bg-gray-200 font-bold ${
                activePage === num
                  ? "bg-gray-200 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {num}
            </button>
          ) : (
            <span key={i + 1}>...</span>
          )
        )}
      </div>
      <Button
        onClick={() =>
          onPageChange(activePage, ceilPaginateRange(activePage, numPages, 1))
        }
        disabled={!numPages || activePage === numPages}
      >
        <p className="mr-2">Next</p>
        <Icon src={arrowRight} alt="Next Page" />
      </Button>
    </div>
  );
};

export default PaginationHandler;
