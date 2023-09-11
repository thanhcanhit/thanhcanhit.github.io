import { useEffect, useState } from "react";
import searchImg from "./imgs/searching.svg";
import { useSelector } from "react-redux";
import {
	searchTagsSelector,
	searchTextSelector,
} from "../../components/SearchBox/searchSlice";
import TagList from "../../components/TagList";
import { Post } from "../../interface/Post";
import { searchPost } from "../../api/postRequest";
import PostCard from "../../components/PostCard";
import SearchBox from "../../components/SearchBox";
import { Empty } from "antd";

const SearchPage = () => {
	const input = useSelector(searchTextSelector);
	const tags = useSelector(searchTagsSelector);
	const [posts, setPosts] = useState<Post[]>();

	useEffect(() => {
		const getSearchResults = async () => {
			const response = await searchPost(input, tags);
			setPosts(response.data);
		};

		getSearchResults();
	}, [input, tags]);

	const postListRendered = posts?.map((post) => {
		return <PostCard post={post} key={post._id} />;
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="container">
			<div className="flex flex-col items-center justify-center gap-4 pt-4 md:gap-20 md:flex-row">
				<img src={searchImg} className="w-[200px] md:w-[250px]" />
				<div className="text-xl font-semibold md:text-3xl text-normal">
					<h1>Có {posts?.length} kết quả tìm kiếm cho:</h1>
					<span className="block my-2 text-xl">
						Tiêu đề: {input ? input : "Bất kỳ"}
					</span>
					<div className="flex gap-2">
						<span className="text-xl">Chủ đề:</span>
						<TagList tags={tags} />
					</div>
				</div>
			</div>
			<SearchBox open />
			{/* Post rendered */}
			{posts && posts?.length > 0 ? (
				<div className="container grid grid-cols-2 gap-3 py-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3 scroll-mt-2">
					{postListRendered}
				</div>
			) : (
				<div className="flex justify-center mt-8">
					<Empty
						className="p-4 mx-auto bg-white rounded-md"
						description="Không có bài viết nào phù hợp"
					/>
				</div>
			)}
		</div>
	);
};

export default SearchPage;
