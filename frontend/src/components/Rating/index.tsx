import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";

type RatingType = {
	rating: number;
};

const Rating = ({ rating }: RatingType) => {
	const quantityStar = Math.floor(rating);
	const isHaftStar: boolean = rating / Math.round(rating) < 1;

	const starsRendered = new Array(5).fill(0).map((_item, index) => {
		let current;
		if (index < quantityStar) current = <BsStarFill />;
		else if (index === quantityStar && isHaftStar) current = <BsStarHalf />;
		else current = <BsStar />;

		return <span key={index}>{current}</span>;
	});

	return <div className="flex items-center gap-1 text-yellow">{starsRendered}</div>;
};

export default Rating;
