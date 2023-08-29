import heroImg from "./imgs/hero.svg";
import {AiFillGithub} from "react-icons/ai"

const Hero = () => {
	return (
		<div className="container grid items-center grid-cols-1 py-8 md:grid-cols-2">
			<img src={heroImg} className="w-full animate-float" />
			<div>
				<section className="bg-normal">
					<div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16">
						<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
							Chào bạn, mình là Nguyễn Thanh Cảnh
						</h1>
						<p className="sub-heading">
							Mình đang theo học Software Engineer tại IUH. <br/> Tại đây lưu giữ những dự án của mình và source code của chúng nếu các bạn muốn nghiên cứu.
						</p>
						<div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
							<a
								href="#"
								className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
							>
								Đăng ký viết bài
								<svg
									className="w-3.5 h-3.5 ml-2"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 10"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M1 5h12m0 0L9 1m4 4L9 9"
									/>
								</svg>
							</a>
							<a
								href="https://github.com/thanhcanhit"
								className="inline-flex items-center justify-center gap-2 px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
							>
								<AiFillGithub/>
								Github
							</a>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Hero;
