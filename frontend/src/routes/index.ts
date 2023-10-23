import React from "react";
const UpdatePost = React.lazy(() => import("../pages/UpdatePost"));
const DeletedPostManager = React.lazy(() => import("../pages/DeletedPostManager"));
const Detail = React.lazy(() => import("../pages/Detail"));
const Home = React.lazy(() => import("../pages/Home"));
const NewPost = React.lazy(() => import("../pages/NewPost"));
const PostManagerPage = React.lazy(() => import("../pages/PostManagerPage"));
const SearchPage = React.lazy(() => import("../pages/SearchPage"));

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
		path: "/me/posts/deleted",
		element: DeletedPostManager,
	},
	{
		path: "/me/posts",
		element: PostManagerPage,
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
