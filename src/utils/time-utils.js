const SECONDS_IN_ONE_HOUR = 3600;
const SECONDS_IN_ONE_MINUTE = 60;

const zeroPad = (num, places) => String(num).padStart(places, '0');

/**
 *
 * @param timeInSeconds e.g. 12:00 AM as 0 and 12:30 AM as 1800
 */
export function secondsToHhMm(timeInSeconds) {
	const hoursInMilitaryTime = Math.floor(timeInSeconds / SECONDS_IN_ONE_HOUR);
	const hoursIn12HourFormat = hoursInMilitaryTime === 0 ? 12 : hoursInMilitaryTime % 12;
	const minutes = Math.floor((timeInSeconds % SECONDS_IN_ONE_HOUR) / SECONDS_IN_ONE_MINUTE);
	const unit = hoursInMilitaryTime > 12 ? 'PM' : 'AM';
	return `${zeroPad(hoursIn12HourFormat, 2)}:${zeroPad(minutes, 2)} ${unit}`;
}
