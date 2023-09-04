import { Popover } from "antd";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";

const GoTopButton = () => {
	const [show, setShow] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }

	useEffect(() => {
		const handleScroll = () => {
			const currentY = window.scrollY;
			setShow(currentY > 100);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	if (!show) return <></>;

	return (
		<Popover content="Lên đầu trang">
			<button className="fixed z-20 block p-4 text-xl rounded-full button-normal right-4 md:right-8 bottom-4 md:bottom-16 animate-flyUp" onClick={scrollToTop}>
				<IoIosArrowUp />
			</button>
		</Popover>
	);
};

export default GoTopButton;
