import { IoIosArrowDown } from "react-icons/io";
import heroImg from "./imgs/hero.svg";
import { AiFillGithub } from "react-icons/ai";
import { RiProfileFill } from "react-icons/ri";
import { Popover } from "antd";

const Hero = () => {
	const scrollToBottom = () => {
		const windowHeight = document.body.scrollHeight;
		window.scrollTo({
			top: windowHeight,
			behavior: "smooth",
		});
	};

	return (
		<div className="container grid items-center grid-cols-1 py-8 md:grid-cols-2">
			<img
				loading="lazy"
				src={heroImg}
				alt="hero"
				className="w-full animate-float"
			/>
			<div>
				<section className="bg-normal">
					<div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16">
						<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
							Chào bạn, mình là Nguyễn Thanh Cảnh
						</h1>
						<p className="text-base sub-heading">
							<span className="text-xl font-semibold">
								🎯 Mình đang theo học Software Engineer tại IUH.
							</span>{" "}
							<br />
							<span className="block w-full pl-4 mt-4 text-left border-l-4 border-gray-500 dark:border-gray-200">
								Tại đây lưu giữ những dự án của mình trong suốt quá trình học
								tập & nghiên cứu và tất nhiên source code của chúng nếu các bạn
								muốn tham khảo & nghiên cứu.
							</span>
						</p>
						<div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
							<Popover content="Đến trang github">
								<a
									href="https://github.com/thanhcanhit"
									target="_blank"
									className="inline-flex items-center justify-center gap-2 px-5 py-3 text-base font-medium text-center text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg dark:bg-black hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
								>
									<AiFillGithub />
									Github
								</a>
							</Popover>
							<Popover content="Xem CV Online">
								<a
									href="https://www.topcv.vn/xem-cv/BVVbAQhSBgdRVVNQAFcLBFMAXQcHAgNSC1YGUQ1953"
									target="_blank"
									className="inline-flex items-center justify-center gap-2 px-5 py-3 text-base font-medium text-center text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg dark:bg-black hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
								>
									<RiProfileFill />
									My CV
								</a>
							</Popover>
							<Popover content="Đến phần thông tin ở cuối trang">
								<button
									onClick={scrollToBottom}
									className="flex items-center justify-center gap-2 button-primary"
								>
									About me
									<IoIosArrowDown className="relative top-[2px]" />
								</button>
							</Popover>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Hero;
