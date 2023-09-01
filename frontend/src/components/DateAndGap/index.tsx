import { getDayGapString } from "../../util/time";
import DateDisplay from "../Date";

type DateAndGapType = { date: string | Date; hasTime?: boolean };

const DateAndGap = ({ date, hasTime }: DateAndGapType) => {
	return (
		<div className="flex justify-between font-semibold text-inherit">
			<DateDisplay date={date} hasTime={hasTime} />
			<span>{getDayGapString(date)} trước</span>
		</div>
	);
};

export default DateAndGap;
