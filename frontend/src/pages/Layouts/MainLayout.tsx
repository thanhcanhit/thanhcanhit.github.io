import React from "react";
import Header from "../../components/Header";

type MainLayout = {
	children: React.ReactElement;
};

const MainLayout = ({ children }: MainLayout) => {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
};

export default MainLayout;
