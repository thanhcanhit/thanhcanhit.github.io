import { Modal } from "antd";
import htmlParser from "html-react-parser";
import { Post } from "../../interface/Post";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import RatingAndView from "../RatingAndView";
import DateAndGap from "../DateAndGap";

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
				<div className="flex flex-col gap-1">
					<DateAndGap date={post.createdAt} hasTime={true} />
					<RatingAndView post={post} />
				</div>
				<p className="mb-2 text-sm italic whitespace-normal text-normal line-clamp-3">
					{post.shortDesc}
				</p>
				<div className="line-clamp-5">{htmlParser(post.content)}</div>
			</Modal>
		</>
	);
};

export default PostModal;