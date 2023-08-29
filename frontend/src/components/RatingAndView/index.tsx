import Rating from "../Rating";
import { AiFillEye } from "react-icons/ai";
import { Post } from "../../interface/Post";

type RatingAndViewType = {
	post: Post;
};

const RatingAndView = ({ post }: RatingAndViewType) => {
	return (
		<div className="flex items-center justify-between">
			<Rating rating={post.rating} />

			<div className="flex items-center gap-1 text-sm">
				<AiFillEye />
				<span className="text-xs">{post.view}</span>
			</div>
		</div>
	);
};

export default RatingAndView;
