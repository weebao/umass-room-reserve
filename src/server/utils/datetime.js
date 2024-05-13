/**
 * Checks if the given date is in the format "YYYY-MM-DD".
 *
 * @param {string} date - The date to be checked.
 * @returns {boolean} Returns true if the date is in the correct format, otherwise false.
 */
export const checkDateFormat = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

/**
 * Checks if the given time string is in the format HH:MM:SS.
 *
 * @param {string} time - The time string to be checked.
 * @returns {boolean} - Returns true if the time string is in the correct format, otherwise returns false.
 */
export const checkTimeFormat = (time) => {
  const timeRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/;
  return timeRegex.test(time);
};

/**
 * Get the date range for a given date.
 *
 * @param {Date} date - The input date.
 * @returns {Object} - An object containing the today's date and tomorrow's date in ISO format.
 */
export const getDateRange = (date) => {
  const todayDate = new Date(date).toISOString().split("T")[0];
  let tomorrowDate = new Date(date);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  tomorrowDate = tomorrowDate.toISOString().split("T")[0];
  return { todayDate, tomorrowDate };
};

/**
 * Checks if a booking can be made within a specified time range.
 *
 * @param {string} startTime - The start time of the booking in HH:MM:SS format.
 * @param {string} endTime - The end time of the booking in HH:MM:SS format.
 * @returns {(time: string) => boolean} - A function that takes a time string in HH:MM-HH:MM format and returns true if the time falls within the specified range, otherwise false.
 */
export const canBookInTimeRange = (startTime, endTime) => {
  const startHour = parseInt(startTime.split(":")[0]);
  const endHour = parseInt(endTime.split(":")[0]);
 
  return (time) => {
    const [start, end] = time.split("-");
    const sHour = parseInt(start.split(":")[0]);
    const eHour = parseInt(end.split(":")[0]);
    return sHour >= startHour && eHour <= endHour;
  }
}