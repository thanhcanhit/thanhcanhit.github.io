import notFound from "./imgs/not_found.svg";

const NotFound = () => {
	return (
		<div className="container grid py-8 place-items-center">
			<img
				src={notFound}
				loading="lazy"
				alt="not found illustrator"
				className="block w-1/2"
			/>
			<p className="mt-4 text-xl text-normal">
				Không tìm thấy trang mà bạn yêu cầu
			</p>
		</div>
	);
};

export default NotFound;
