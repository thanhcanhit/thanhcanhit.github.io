import { useState, useEffect } from "react";
import { Popover } from "antd";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { getCommentsQuantity } from "../../api/commentRequest";

type RatingType = {
	rating: number;
	postId?: string;
};

const Rating = ({ rating, postId }: RatingType) => {
	const quantityStar = Math.floor(rating);
	const isHaftStar: boolean = rating / Math.round(rating) < 1;

	const [commentsQuantity, setCommentsQuantity] = useState<number>();

	useEffect(() => {
		if (!postId) return;
		const getData = async () => {
			const res = await getCommentsQuantity(postId);
			setCommentsQuantity(res.data);
		};

		getData();
	}, [postId]);

	const starsRendered = new Array(5).fill(0).map((_item, index) => {
		let current;
		if (index < quantityStar) current = <BsStarFill />;
		else if (index === quantityStar && isHaftStar) current = <BsStarHalf />;
		else current = <BsStar />;

		return <span key={index}>{current}</span>;
	});

	return (
		<Popover
			content={
				rating === 0 ? (
					<>Chưa có đánh giá nào</>
				) : (
					<span className="flex items-center gap-2 ">
						<span>{rating.toFixed(2)}</span>
						{postId && <sup> ({commentsQuantity})</sup>}
					</span>
				)
			}
		>
			<div className="flex items-center gap-1 text-yellow">
				{starsRendered}
			</div>
		</Popover>
	);
};

export default Rating;
