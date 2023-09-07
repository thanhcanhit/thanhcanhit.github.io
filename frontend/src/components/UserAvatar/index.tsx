import whale from "./imgs/whale.png";
import { Avatar } from "antd";

const UserAvatar = ({
	source,
	size,
}: {
	source: string | undefined;
	size: number;
}) => {
	return (
		<Avatar size={size} src={source ? source : whale} />
	);
};

export default UserAvatar;
