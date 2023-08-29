import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type MainLayout = {
	children: React.ReactElement;
};

const MainLayout = ({ children }: MainLayout) => {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-normal">{children}</main>
			<Footer />
		</>
	);
};

export default MainLayout;
