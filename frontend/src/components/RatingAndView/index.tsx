import Rating from "../Rating";
import { AiFillEye } from "react-icons/ai";
import { Post } from "../../interface/Post";

type RatingAndViewType = {
	post: Post;
};

const RatingAndView = ({ post }: RatingAndViewType) => {
	return (
		<div className="flex items-center justify-between">
			<Rating postId={post._id} rating={post.rating} />

			<div className="flex items-center gap-1 text-inherit">
				<AiFillEye className="text-gray-600 text-inherit" />
				<span className="text-inherit">{post.view}</span>
			</div>
		</div>
	);
};

export default RatingAndView;
