import { getDayGapString } from "../../util/time";

type DateAndGapType = { date: string | Date; hasTime?: boolean };

const DateAndGap = ({ date, hasTime: hasTime }: DateAndGapType) => {
	const dateInstance = new Date(date);
	return (
		<div className="flex justify-between text-xs font-semibold">
			<div>
				<span className="text-blue-500">
					{hasTime && dateInstance.toLocaleTimeString("vi-VN")}{" "}
				</span>
				<span>{dateInstance.toLocaleDateString("vi-VN")}</span>
			</div>
			<span>{getDayGapString(date)} trước</span>
		</div>
	);
};

export default DateAndGap;
