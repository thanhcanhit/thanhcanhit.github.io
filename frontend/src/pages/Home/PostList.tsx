import { useEffect, useState } from "react";
import { Post } from "../../interface/Post";

import PostCard from "../../components/PostCard/index.js";
import { Pagination, Skeleton, Spin } from "antd";
import { getPostsWithQuery, getTotalItems } from "../../api/postRequest.js";

const skeletonWhenLoading = (
	<>
		<Skeleton avatar loading paragraph={{ rows: 4 }} />
		<Skeleton avatar loading paragraph={{ rows: 4 }} />
		<Skeleton avatar loading paragraph={{ rows: 4 }} />
		<Skeleton avatar loading paragraph={{ rows: 4 }} />
		<Skeleton avatar loading paragraph={{ rows: 4 }} />
		<Skeleton avatar loading paragraph={{ rows: 4 }} />
	</>
);

const PostList = () => {
	const [totalItems, setTotalItems] = useState<number>(0);
	const limit = 6;

	const [posts, setPosts] = useState<Post[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const offset: number = (currentPage - 1) * limit;

	useEffect(() => {
		const getSize = async () => {
			const res = await getTotalItems();
			setTotalItems(res.data);
		};

		getSize();
	}, []);

	useEffect(() => {
		const getData = async () => {
			const res = await getPostsWithQuery(limit, offset);
			setPosts(res.data);
		};

		getData();
	}, [offset]);

	const postsRendered = posts.map((item) => (
		<PostCard post={item} key={item._id} />
	));

	return (
		<div className="pb-12">
			<div className="container grid grid-cols-2 gap-3 py-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
				{posts.length > 0 ? postsRendered : skeletonWhenLoading}
			</div>
			<div className="container flex justify-center">
				<div className="p-2 bg-gray-200 border rounded-md dark:bg-gray-50 w-fit">
					<Pagination
						current={currentPage}
						responsive
						defaultCurrent={currentPage}
						defaultPageSize={limit}
						onChange={(page) => setCurrentPage(page)}
						total={totalItems}
					/>
				</div>
			</div>
		</div>
	);
};

export default PostList;
