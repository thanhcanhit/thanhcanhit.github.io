import img from "./museum.svg";

const Forbidden = ({ message }: { message?: string }) => {
	return (
		<div className="container flex flex-col items-center justify-center h-screen pt-8 text-2xl text-center text-normal ">
			<div className="w-full">
				<img
					loading="lazy"
					src={img}
					alt="forbidden illustrator"
					className="w-1/2 mx-auto"
				/>
			</div>
			<h3 className="mt-2">
				{message ? message : "Tính năng này chỉ dành cho quản trị viên"}
			</h3>
		</div>
	);
};

export default Forbidden;
