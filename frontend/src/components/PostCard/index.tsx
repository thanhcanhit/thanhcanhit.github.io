import { useState } from "react";
import { Post } from "../../interface/Post";
import PostModal from "./PostModal";
import RatingAndView from "../RatingAndView";
import TagList from "../TagList";
import DateAndGap from "../DateAndGap";

type PostCardType = {
	post: Post;
};

const PostCard = ({ post }: PostCardType) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="md:h-60">
			<div
				onClick={toggleModal}
				className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow cursor-pointer md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
			>
				<img
					className="object-cover object-top w-full rounded-t-lg h-60 md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
					src={post.img_path}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null; // prevents looping
						currentTarget.src = "/assets/imgs/image_null.png";
					}}
				/>
				<div className="flex flex-col justify-between flex-1 p-4 text-xs leading-normal">
					<div className="mb-2">
						<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
							{post.title}
						</h5>
						<div className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
							<TagList tags={post.tags} />
						</div>
					</div>
					<div className="flex flex-col gap-1 text-normal">
						<RatingAndView post={post} />
						<DateAndGap date={post.createdAt} />
					</div>
				</div>
			</div>

			<PostModal
				post={post}
				isOpen={isOpen}
				key={post._id}
				onCancel={toggleModal}
			/>
		</div>
	);
};

export default PostCard;
