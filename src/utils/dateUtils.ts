export const formatTimeToRelative = (
  timeInISO: string | number | Date
): string => {
  return timeSince(timeInISO);
};

function timeSince(time: string | number | Date): string {
  let dateInMS = 0;
  switch (typeof time) {
    case "number":
      break;
    case "string":
      dateInMS = new Date(time).getTime();
      break;
    case "object":
      if (time.constructor === Date) dateInMS = time.getTime();
      break;
    default:
      dateInMS = new Date().getTime();
  }
  const time_formats = [
    [60, "seconds", 1], // 60
    [120, "a minute ago", "a minute from now"], // 60*2
    [3600, "minutes", 60], // 60*60, 60
    [7200, "an hour ago", "an hour from now"], // 60*60*2
    [86400, "hours", 3600], // 60*60*24, 60*60
    [172800, "a day ago", "a day from now"], // 60*60*24*2
    [604800, "days", 86400], // 60*60*24*7, 60*60*24
    [1209600, "a week ago", "a week from now"], // 60*60*24*7*4*2
    [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "a month ago", "a month from now"], // 60*60*24*7*4*2
    [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "a year ago", "a year from now"], // 60*60*24*7*4*12*2
    [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "a century ago", "a century from now"], // 60*60*24*7*4*12*100*2
    [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  let seconds = (+new Date().getTime() - dateInMS) / 1000,
    token = "ago",
    list_choice = 1;

  if (seconds == 0) {
    return "just now";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "from now";
    list_choice = 2;
  }
  let i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return "" + format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return "" + time;
}
