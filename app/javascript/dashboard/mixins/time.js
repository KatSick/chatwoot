import {
  format,
  isSameYear,
  fromUnixTime,
  formatDistanceToNow,
} from 'date-fns';

export default {
  methods: {
    messageStamp(time, dateFormat = 'h:mm a') {
      const unixTime = fromUnixTime(time);
      return format(unixTime, dateFormat);
    },
    messageTimestamp(time, dateFormat = 'MMM d, yyyy') {
      const messageTime = fromUnixTime(time);
      const now = new Date();
      const messageDate = format(messageTime, dateFormat);
      if (!isSameYear(messageTime, now)) {
        return format(messageTime, 'LLL d y, h:mm a');
      }
      return messageDate;
    },
    dynamicTime(time) {
      const unixTime = fromUnixTime(time);
      return formatDistanceToNow(unixTime, { addSuffix: true });
    },
    dateFormat(time, dateFormat = 'MMM d, yyyy') {
      const unixTime = fromUnixTime(time);
      return format(unixTime, dateFormat);
    },
    /**
     * Custom timestamp function to display time in a more readable format
     * @param {number} timestamp unix epoch timestamp
     * @param {*} hoursThreshold number of hours to consider as a day
     * @returns string
     */
    customTimestamp(timestamp, hoursThreshold = 12) {
      const messageTime = fromUnixTime(timestamp);
      const now = new Date();
      const timeDiff = (now - messageTime) / 1000 / 60; // time difference in minutes

      let timeString = messageTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      // Convert hoursThreshold to minutes and check if the time difference exceeds it
      if (timeDiff > hoursThreshold * 60) {
        const dateString = messageTime.toLocaleDateString([], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        timeString += ` ${dateString}`;
      }

      return timeString;
    },
    shortTimestamp(time, withAgo = false) {
      // This function takes a time string and converts it to a short time string
      // with the following format: 1m, 1h, 1d, 1mo, 1y
      // The function also takes an optional boolean parameter withAgo
      // which will add the word "ago" to the end of the time string
      const suffix = withAgo ? ' ago' : '';
      const timeMappings = {
        'less than a minute ago': 'now',
        'a minute ago': `1m${suffix}`,
        'an hour ago': `1h${suffix}`,
        'a day ago': `1d${suffix}`,
        'a month ago': `1mo${suffix}`,
        'a year ago': `1y${suffix}`,
      };
      // Check if the time string is one of the specific cases
      if (timeMappings[time]) {
        return timeMappings[time];
      }
      const convertToShortTime = time
        .replace(/about|over|almost|/g, '')
        .replace(' minute ago', `m${suffix}`)
        .replace(' minutes ago', `m${suffix}`)
        .replace(' hour ago', `h${suffix}`)
        .replace(' hours ago', `h${suffix}`)
        .replace(' day ago', `d${suffix}`)
        .replace(' days ago', `d${suffix}`)
        .replace(' month ago', `mo${suffix}`)
        .replace(' months ago', `mo${suffix}`)
        .replace(' year ago', `y${suffix}`)
        .replace(' years ago', `y${suffix}`);
      return convertToShortTime;
    },
  },
};
