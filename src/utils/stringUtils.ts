export function camelize(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function capitalize(str: string) {
  return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
    letter.toUpperCase()
  );
}

export function split(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function camelToCapitalize(str: string) {
  return capitalize(split(str));
}
