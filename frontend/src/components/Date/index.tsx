type DateDisplayType = { date: string | Date; hasTime?: boolean };
import { Popover } from "antd";

const DateDisplay = ({ date, hasTime }: DateDisplayType) => {
	const dateInstance: Date = new Date(date);
	return (
		<Popover content={dateInstance.toString()}>
			<span className="text-blue-500">
				{hasTime && dateInstance.toLocaleTimeString("vi-VN")}{" "}
			</span>
			<span>{dateInstance.toLocaleDateString("vi-VN")}</span>
		</Popover>
	);
};

export default DateDisplay;
