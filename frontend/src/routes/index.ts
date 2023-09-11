import Detail from "../pages/Detail";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost";
import SearchPage from "../pages/SearchPage";

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
		path: "/new-post",
		element: NewPost,
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
