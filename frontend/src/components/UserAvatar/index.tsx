import whale from "./imgs/whale.png";
import cat from "./imgs/cat.png";
import frog from "./imgs/frog.png";
import hen from "./imgs/hen.png";
import koala from "./imgs/koala.png";
import turtle from "./imgs/turtle.png";
import { Avatar } from "antd";

const UserAvatar = ({
	source,
	size,
}: {
	source: string | undefined;
	size: number;
}) => {
	if (!source) return <Avatar size={size} src={whale} />;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const defaultImg: any = { whale, cat, frog, hen, koala, turtle };
	const animalSrc = defaultImg[source];

	return (
		<div className="overflow-hidden rounded-full w-fit">
			<Avatar size={size} src={animalSrc ? animalSrc : source} />
		</div>
	);
};

export default UserAvatar;
