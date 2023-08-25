import Home from "../pages/Home";

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
];

export default routes;
