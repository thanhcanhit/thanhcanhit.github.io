import Home from "../pages/Home";
import NewPost from "../pages/NewPost";

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
		path: "/",
		element: Home,
	},
	{
		path: "/new-post",
		element: NewPost,
	},
];

export default routes;
