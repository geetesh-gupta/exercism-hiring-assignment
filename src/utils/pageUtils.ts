export const paginateNumsRange = (
  activePage: number,
  numPages: number,
  pageStep = 2
): (number | null)[] => {
  // Handle invalid cases
  activePage = floorPaginateRange(activePage, 0);
  activePage = ceilPaginateRange(activePage, numPages, 0);

  let result = [];

  if (numPages - 1 <= 2 * pageStep) {
    return range(1, numPages);
  }

  // Fill starting values
  if (activePage - 1 > pageStep + 1) {
    result = [
      1,
      null,
      ...range(
        floorPaginateRange(activePage, pageStep),
        ceilPaginateRange(activePage, numPages, pageStep)
      ),
    ];
  } else {
    result = range(1, ceilPaginateRange(activePage, numPages, pageStep));
  }

  // Fill ending values
  if (numPages - activePage > pageStep + 1) {
    result = [...result, null, numPages];
  } else {
    result = [
      ...result,
      ...range(ceilPaginateRange(activePage, numPages, pageStep) + 1, numPages),
    ];
  }

  return result;
};

export function ceilPaginateRange(
  activePage: number,
  numPages: number,
  pageStep = 0
): number {
  return Math.min(activePage + pageStep, numPages);
}

export function floorPaginateRange(activePage: number, pageStep = 0): number {
  return Math.max(activePage - pageStep, 1);
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}
