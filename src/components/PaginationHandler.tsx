import {
  ceilPaginateRange,
  floorPaginateRange,
  paginateNumsRange,
} from "../utils/pageUtils";
import arrowLeft from "../assets/images/arrowLeft.svg";
import arrowRight from "../assets/images/arrowRight.svg";
import Button from "../elements/Button";
import Icon, { IconSizes } from "../elements/Icon";
import useWindowDimensions from "../hooks/useWindowDimensions";

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
  const { height, width } = useWindowDimensions();
  const pageStep = width < 768 ? 1 : 2;
  const showStart = width < 512 ? false : true;
  return (
    <div className="font-sm grid w-full grid-cols-2 grid-rows-2 items-center gap-y-2 bg-default p-xl leading-lg md:flex">
      <span className="row-start-2">
        <Button
          onClick={() =>
            onPageChange(activePage, floorPaginateRange(activePage, 1))
          }
          disabled={!numPages || activePage === 1}
        >
          <Icon size={IconSizes.xs} src={arrowLeft} alt="Previous Page" />
          <p className="ml-2.5">Previous</p>
        </Button>
      </span>
      <div className="col-span-full col-start-1 row-start-1 mx-auto flex items-center gap-3 text-labelSecondary md:row-auto">
        {paginateNumsRange(activePage, numPages, pageStep, showStart).map(
          (num, i) =>
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
              <span key={numPages + i + 1} className="mx-3">
                ...
              </span>
            )
        )}
      </div>
      <span className="row-start-2 ml-auto md:ml-0">
        <Button
          onClick={() =>
            onPageChange(activePage, ceilPaginateRange(activePage, numPages, 1))
          }
          disabled={!numPages || activePage === numPages}
        >
          <p className="mr-2.5">Next</p>
          <Icon size={IconSizes.xs} src={arrowRight} alt="Next Page" />
        </Button>
      </span>
    </div>
  );
};

export default PaginationHandler;
