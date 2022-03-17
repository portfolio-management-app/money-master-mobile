type ParseConfig = {
  withYear?: boolean;
  withDay?: boolean;
  withMoth?: boolean;
  withTime?: boolean;
};

export const parseToString = (date: Date, config?: ParseConfig): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const dayDisplay = day < 10 ? '0' + day.toString() : day.toString();
  const monthDisplay = month < 10 ? '0' + month.toString() : month.toString();
  const hourDisplay = hour < 10 ? '0' + hour.toString() : hour.toString();
  const minuteDisplay =
    minute < 10 ? '0' + minute.toString() : minute.toString();
  if (!config) {
    return `${dayDisplay}/${monthDisplay}/${year}  ${hourDisplay}:${minuteDisplay}`;
  } else {
    const {
      withDay = true,
      withYear = true,
      withTime = true,
      withMoth = true,
    } = config;
    if (withDay && withTime && withYear && withMoth) {
      return `${dayDisplay}/${monthDisplay}/${year}  ${hourDisplay}:${minuteDisplay}`;
    } else {
      if (!withDay && withTime && withMoth && withYear) {
        return `${monthDisplay}/${year}  ${hourDisplay}:${minuteDisplay}`;
      }
      if (withDay && !withTime && withMoth && withYear) {
        return `${dayDisplay}/${monthDisplay}/${year}`;
      }
      if (withDay && withTime && withMoth && !withYear) {
        return `${dayDisplay}/${monthDisplay}  ${hourDisplay}:${minuteDisplay}`;
      }
      if (withDay && !withTime && withMoth && !withYear) {
        return `${dayDisplay}/${monthDisplay}`;
      }
    }
  }
  return '';
};

export const getUnixTimeStamp = (date: Date) => {
  return Math.round(date.getTime() / 1000);
};
