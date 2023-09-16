import { useSelector } from "react-redux";
import { userSelector } from "../../redux/authSlice";
import Forbidden from "../../components/Forbidden";
import { Post } from "../../interface/Post";
import { Empty, Table } from "antd";
import TagList from "../../components/TagList";
import { getAllTags } from "../../api/tagRequest";
import { ColumnType, ColumnsType } from "antd/es/table";

const tags: string[] = (await getAllTags()).data;

const tagsFilters = tags.map((item) => {
	return {
		text: item,
		value: item,
	};
});

const columns: ColumnsType<Post> = [
	{
		title: "Tiêu đề",
		dataIndex: "title",
		key: "title",
		sorter: (a: Post, b: Post) => a.title.localeCompare(b.title),
	},
	{
		title: "Thời gian tạo",
		dataIndex: "createdAt",
		key: "createdAt",
		defaultSortOrder: "descend",
		render: (dateString: string) => (
			<span>{new Date(dateString).toLocaleDateString()}</span>
		),
		sorter: (a: Post, b: Post) =>
			new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
	},
	{
		title: "Mô tả",
		dataIndex: "shortDesc",
		key: "shortDesc",
	},
	{
		title: "Gắn thẻ",
		dataIndex: "tags",
		key: "tags",
		filters: tagsFilters,
		onFilter: (value: string | number | boolean, record) =>
			record.tags.includes(value.toString()),
		render: (tags: string[]) => <TagList tags={tags} />,
	},
];

type PostManagerType = {
	posts: Post[];
	actions: ColumnType<Post>;
	title?: string;
};

const PostManager = ({ posts, actions, title }: PostManagerType) => {
	const user = useSelector(userSelector);

	if (!user)
		return <Forbidden message="Vui lòng đăng nhập để sử dụng tính năng này" />;

	if (posts?.length == 0)
		return (
			<div className="flex justify-center pt-8">
				<div className="p-4 bg-white rounded-md shadow-md mx-autotext-center w-fit">
					<h1>Ở đây hiện không có bài viết nào</h1>
					<Empty />
				</div>
			</div>
		);

	return (
		<div className="container py-4 rounded-md w-fit">
			<h1 className="mb-4 text-xl font-semibold text-center text-normal">
				{title ? title : "Danh sách các bài viết mà bạn đã đăng tải"} (
				{posts?.length})
			</h1>
			<div className="overflow-scroll bg-white">
				<Table
					dataSource={posts.map((post) => {
						return { ...post, key: post._id };
					})}
					columns={[...columns, actions]}
				/>
			</div>
		</div>
	);
};

export default PostManager;
