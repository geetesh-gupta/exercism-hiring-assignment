export function addQueriesToUrl(
  url: string,
  queries: { [key: string]: string | number }
) {
  const queryStrings = [];
  for (const queryName in queries) {
    if (queries[queryName] !== "") {
      queryStrings.push(`${queryName}=${queries[queryName]}`);
    }
  }
  const filteredQueryStrings = queryStrings.filter((q) => q != "track=all");
  if (filteredQueryStrings.length) {
    return `${url}?${filteredQueryStrings.join("&")}`;
  }
  return url;
}
