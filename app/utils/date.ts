export const parseToString = (date: Date, includeTime: boolean): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const dayDisplay = day < 10 ? '0' + day.toString() : day.toString();
  const monthDisplay = month < 10 ? '0' + month.toString() : month.toString();
  if (includeTime) {
    const hourDisplay = hour < 10 ? '0' + hour.toString() : hour.toString();
    const minuteDisplay =
      minute < 10 ? '0' + minute.toString() : minute.toString();
    return `${dayDisplay}/${monthDisplay}/${year}  ${hourDisplay}:${minuteDisplay}`;
  } else {
    return `${dayDisplay}/${monthDisplay}/${year}`;
  }
};
