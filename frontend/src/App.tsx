import { Routes, Route, HashRouter } from "react-router-dom";
import MainLayout from "./pages/Layouts/MainLayout";
import routes from "./routes";
import GoTopButton from "./components/GoTopButton";
import { Suspense } from "react";
import { Spin } from "antd";

const routesRendered = routes.map((route) => {
	// By default, route.layout is undefined
	let element = (
		<MainLayout>
			<route.element />
		</MainLayout>
	);

	// If has alter layout, set it
	if (route.layout)
		element = (
			<route.layout>
				<route.element />
			</route.layout>
		);
	// If layout is null, return just element
	else if (route.layout === null) element = <route.element />;

	return (
		<Route
			key={route.path}
			path={route.path}
			element={
				<Suspense
					fallback={
						<MainLayout>
							<div className="container flex items-center justify-center mx-auto w-lvw h-lvh p-8">
								<Spin />
							</div>
						</MainLayout>
					}
				>
					{element}
				</Suspense>
			}
		/>
	);
});

function App() {
	return (
		<HashRouter>
			<Routes>{routesRendered}</Routes>
			<GoTopButton />
		</HashRouter>
	);
}

export default App;
