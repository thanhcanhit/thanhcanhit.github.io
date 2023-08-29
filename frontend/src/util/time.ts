function getTimestampGap(day: string | Date) {
	const currentUTC = new Date().getTime();
	const inputUTC = new Date(day).getTime();

	const dayGap = new Date(currentUTC - inputUTC);

	return dayGap;
}
function getDayGapString(day: string | Date) {
	const timeStamp = getTimestampGap(day);
	let dayGapString = "";
	const gapDate = new Date(timeStamp);

	const gapDay = gapDate.getUTCDate(); // Sử dụng getUTCDate() để lấy ngày theo múi giờ UTC

	if (gapDay === 1) {
		const [hours, minutes] = [
			gapDate.getUTCHours(),
			gapDate.getUTCMinutes(),
		]; // Sử dụng getUTCHours() và getUTCMinutes() để lấy thời gian theo múi giờ UTC
		if (hours > 0) dayGapString += `${hours} giờ`;
		else dayGapString += `${minutes} phút`;
	} else {
		dayGapString = `${gapDay} ngày`;
		if (gapDay > 30) dayGapString = `${Math.round(gapDay / 30)} tháng`;
		if (gapDay > 365) dayGapString = `${Math.round(gapDay / 365)} năm`;
	}

	return dayGapString;
}

export { getTimestampGap, getDayGapString };
