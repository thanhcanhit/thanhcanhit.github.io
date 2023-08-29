import Rating from "../Rating";
import { AiFillEye } from "react-icons/ai";
import { Post } from "../../interface/Post";

type RatingAndViewType = {
	post: Post;
};

const RatingAndView = ({ post }: RatingAndViewType) => {
	return (
		<div className="flex items-center justify-between">
			<div>
				<Rating rating={post.rating} />
			</div>
			<div className="flex items-center gap-2 text-normal">
				<AiFillEye />
				<span className="text-sm">{post.view}</span>
			</div>
		</div>
	);
};

export default RatingAndView;
