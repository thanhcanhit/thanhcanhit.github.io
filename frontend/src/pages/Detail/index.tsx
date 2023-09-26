import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import htmlParser, { HTMLReactParserOptions, Element } from "html-react-parser";
import { Image, Spin, notification } from "antd";
import { BsSendFill } from "react-icons/bs";
import { Post } from "../../interface/Post";
import { User } from "../../interface/User";
import { CommentInterface } from "../../interface/Comments";
import { createComment, getComments } from "../../api/commentRequest";
import { getPost } from "../../api/postRequest";
import RatingAndView from "../../components/RatingAndView";
import DateAndGap from "../../components/DateAndGap";
import TagList from "../../components/TagList";
import UserDisplay from "../../components/UserDisplay";
import CommentBox from "./CommentBox";
import Comment from "./Comment";

const imgClassName = "block object-contain w-fit mx-auto rounded-md";
const options: HTMLReactParserOptions = {
	replace: (domNode) => {
		if (domNode instanceof Element && domNode.attribs.src) {
			return (
				<div className="grid items-center mx-auto rounded-md w-fit">
					<Image className={imgClassName} src={domNode.attribs.src} />
				</div>
			);
		}
	},
};

const Detail = () => {
	const { id } = useParams();
	const [post, setPost] = useState<Post>();
	const [author, setAuthor] = useState<User | null>(null);
	const [comments, setComments] = useState<CommentInterface[]>([]);
	const [api, contextHolder] = notification.useNotification();
	const [seed, setSeed] = useState<number | null>(null);

	const reset = () => {
		setSeed(Math.random());
	};

	const handleSubmitComment = async (
		name: string | null,
		user_id: string | null,
		content: string,
		rating: number
	) => {
		try {
			let newComment: Partial<CommentInterface> = {
				user_id: user_id,
				content: content,
				rating: rating,
				post_id: id,
			};
			if (name) newComment = { ...newComment, displayName: name };
			await createComment(newComment);

			// Open notification
			api.open({
				message: "Bình luận của bạn đã được đăng tải",
				description: "Mình rất cảm ơn sự quan tâm từ bạn❤️",
				icon: <BsSendFill style={{ color: "#108ee9" }} />,
			});

			reset();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const getData = async () => {
			const res = await getPost(String(id));
			setPost(res.data.post);
			setAuthor(res.data.user);
		};

		const getComment = async () => {
			const res = await getComments(String(id));
			setComments(res.data);
		};

		getData();
		getComment();
	}, [id, seed]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (!post)
		return (
			<div className="flex justify-center pt-10">
				<Spin />
			</div>
		);

	const commentsRendered = comments?.map((comment) => (
		<Comment key={comment._id} comment={comment} />
	));

	return (
		<div className="container py-4 text-normal">
			<div className="grid lg:grid-cols-[70%_30%] grid-cols-1 gap-4">
				<div className="h-fit">
					<div className="w-full p-4 bg-white rounded-lg shadow-sm border-normal dark:bg-gray-800">
						<h1 className="pb-4 text-4xl font-semibold text-center">
							{post.title}
						</h1>
						<div className="flex flex-col gap-1 my-2 text-lg" key={seed}>
							{author && <UserDisplay user={author} />}
							<DateAndGap date={post.createdAt} hasTime />
							<RatingAndView post={post} />
						</div>
						<Image.PreviewGroup>
							<div className="max-w-full mt-4 jodit-render">
								{htmlParser(post.content, options)}
							</div>
						</Image.PreviewGroup>
					</div>
				</div>

				{/* Col 2 */}
				<div className="h-fit">
					<div className="w-full p-4 mb-4 bg-white rounded-lg shadow-sm border-normal dark:bg-gray-800">
						{/* Detail and link */}
						<div>
							<div className="flex justify-center w-full mb-2 ">
								<Image
									src={post.img_path}
									className={imgClassName + " max-h-[200px]"}
								/>
							</div>

							<p className="my-2 italic">{post.shortDesc}</p>
							<TagList tags={post.tags} />
						</div>
						<hr className="my-2" />
						<a href={post.procLink} target="_blank">
							<button
								className="w-full button-primary"
								disabled={!post.procLink}
							>
								Sản phẩm
							</button>
						</a>
						<a href={post.sourceLink} target="_blank">
							<button
								className="w-full button-primary"
								disabled={!post.sourceLink}
							>
								Source code
							</button>
						</a>
					</div>

					{/* Comment */}
					<div className="w-full p-4 bg-white rounded-lg shadow-sm border-normal dark:bg-gray-800">
						<CommentBox onSubmit={handleSubmitComment} />
						<h1 className="mb-2 text-lg font-semibold">
							Bình luận ({comments?.length})
						</h1>
						<hr />
						<div className="flex flex-col gap-2 mt-2 py-2 max-h-[80vh] overflow-y-auto">
							{commentsRendered}
							<p className="text-sm text-center opacity-60">
								{comments?.length === 0
									? "Chưa có bình luận nào"
									: "Bạn đã xem những bình luận cuối cùng"}
							</p>
						</div>
					</div>
				</div>
			</div>
			{contextHolder}
		</div>
	);
};

export default Detail;
