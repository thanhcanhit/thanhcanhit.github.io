import Detail from "../pages/Detail";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost";
import PostManager from "../pages/PostManager";
import SearchPage from "../pages/SearchPage";
import UpdatePost from "../pages/UpdatePost";

type Props = {
	children?: React.ReactNode;
};

type Route = {
	path: string;
	element: React.FC;
	layout?: React.FC<Props> | null;
};

const routes: Route[] = [
	{
		path: "me/new-post",
		element: NewPost,
	},
	{
		path: "me/post/:postId",
		element: UpdatePost,
	},
	{
		path: "/me/posts",
		element: PostManager,
	},
	{
		path: "/search",
		element: SearchPage,
	},
	{
		path: "/post/:id",
		element: Detail,
	},
	{
		path: "/",
		element: Home,
	},
];

export default routes;
