function getTimestampGap(day: string | Date) {
	// Lấy thời gian hiện tại ở định dạng mili giây
	const currentUTC = new Date().getTime();

	// Chuyển đổi ngày đầu vào thành đối tượng Date nếu nó không phải là một đối tượng Date
	const inputDate = day instanceof Date ? day : new Date(day);

	// Lấy thời gian của ngày được truyền vào ở định dạng mili giây
	const inputUTC = inputDate.getTime();

	// Tính khoảng thời gian giữa hai ngày và chuyển kết quả thành mili giây
	const timestampGap = currentUTC - inputUTC;

	return timestampGap;
}

function getDayGapString(day: string | Date) {
	const timeStamp = getTimestampGap(day);
	let dayGapString = "";

	const gapDay = Math.floor(Number(timeStamp) / 86400000); // Sử dụng getUTCDate() để lấy ngày theo múi giờ UTC
	if (gapDay === 0) {
		const gapDate = new Date(timeStamp);
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
