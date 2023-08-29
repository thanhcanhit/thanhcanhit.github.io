import { Modal } from "antd";
import htmlParser from "html-react-parser";
import { Post } from "../../interface/Post";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import RatingAndView from "../RatingAndView";

type PostModalType = {
	post: Post;
	isOpen: boolean;
	onCancel: React.MouseEventHandler;
};

const PostModal = ({ post, isOpen, onCancel }: PostModalType) => {
	return (
		<>
			<Modal
				open={isOpen}
				onCancel={onCancel}
				title={post.title}
				footer={[
					<button key="read-btn">
						<Link
							to={`/post/${post._id}`}
							className="flex items-center gap-2 button-normal"
						>
							<span>Đọc bài này</span> <BsArrowRightShort />
						</Link>
					</button>,
				]}
			>
				<RatingAndView post={post} />
				<div className="line-clamp-5">{htmlParser(post.content)}</div>
			</Modal>
		</>
	);
};

export default PostModal;
