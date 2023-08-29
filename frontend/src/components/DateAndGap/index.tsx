import { getDayGapString } from "../../util/time";

const DateAndGap = ({ date }: { date: string | Date }) => {
	return (
		<div className="flex justify-between text-xs font-semibold text-normal">
			<span>{new Date(date).toLocaleDateString("vi-VN")}</span>
			<span>{getDayGapString(date)} trước</span>
		</div>
	);
};

export default DateAndGap;
