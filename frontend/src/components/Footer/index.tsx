import Logo from "../Logo";
import FavoriteQuote from "../FavoriteQuotes";
import { Image, Input, Popover, Space } from "antd";
import { FaFacebook } from "react-icons/fa";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import qr from "./imgs/qr.jpg";

const about = (
	<div className="flex flex-col gap-2">
		<Space.Compact>
			<Input readOnly style={{ width: "35%" }} defaultValue="Họ tên:" />
			<Input
				readOnly
				style={{ width: "65%" }}
				defaultValue="Nguyễn Thanh Cảnh"
			/>
		</Space.Compact>
		<Space.Compact>
			<Input readOnly style={{ width: "35%" }} defaultValue="Tuổi:" />
			<Input
				readOnly
				style={{ width: "65%" }}
				defaultValue={new Date().getFullYear() - 2003}
			/>
		</Space.Compact>
		<Space.Compact>
			<Input readOnly style={{ width: "35%" }} defaultValue="Học tại:" />
			<Input
				readOnly
				style={{ width: "65%" }}
				defaultValue="Trường Đại học Công nghiệp Hồ Chí Minh (IUH)"
			/>
		</Space.Compact>
		<Space.Compact>
			<Input
				readOnly
				style={{ width: "35%" }}
				defaultValue="Chuyên ngành:"
			/>
			<Input
				readOnly
				style={{ width: "65%" }}
				defaultValue="Kỹ thuật phần mềm (SE)"
			/>
		</Space.Compact>
		<Space.Compact>
			<Input readOnly style={{ width: "35%" }} defaultValue="Quê quán:" />
			<Input readOnly style={{ width: "65%" }} defaultValue="Gia Lai " />
		</Space.Compact>
	</div>
);

const social = (
	<div className="flex flex-col">
		<a
			href="https://github.com/thanhcanhit"
			target="_blank"
			className="block w-full"
		>
			<button className="flex items-center justify-start w-full gap-2 pl-10 button-light ">
				<BsGithub className="text-lg" /> Github
			</button>
		</a>
		<a
			href="https://facebook.com/thanhcanhit"
			target="_blank"
			className="block w-full"
		>
			<button className="flex items-center justify-start w-full gap-2 pl-10 button-light ">
				<FaFacebook className="text-lg text-blue-500" /> Facebook
			</button>
		</a>
		<a
			href="https://www.linkedin.com/in/canh-thanh-nguyen-273436247/"
			target="_blank"
			className="block w-full"
		>
			<button className="flex items-center justify-start w-full gap-2 pl-10 button-light ">
				<BsLinkedin className="text-lg text-blue-700" /> Linkedin
			</button>
		</a>
	</div>
);

const contact = (
	<div className="flex flex-col justify-start">
		<button className="text-left button-light">
			Email:{" "}
			<a href="mailto:thanhcanh.dev@gmai.com" className="text-blue-500">
				thanhcanh.dev@gmail.com
			</a>
		</button>
		<button className="text-left button-light">
			Phone:{" "}
			<a href="tel:0325690224" className="text-blue-500">
				0325690224
			</a>
		</button>
	</div>
);

const donate = (
	<>
		<Image width={300} height={345} src={qr} />
	</>
);

const Footer = () => {
	return (
		<div className="p-4 bg-slate-200 dark:bg-slate-800">
			<footer className="bg-white rounded-lg shadow dark:bg-gray-900">
				<div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
					<FavoriteQuote />
					<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
					<div className="sm:flex sm:items-center sm:justify-between">
						<Logo />
						<ul className="flex flex-wrap items-center justify-center mt-4 mb-6 text-sm font-medium text-gray-500 list-none sm:mb-0 dark:text-gray-400">
							<li>
								<Popover
									content={about}
									title="Thông tin cá nhân"
									trigger="click"
								>
									<button className="button-normal">
										About
									</button>
								</Popover>
							</li>
							<li>
								<Popover
									content={contact}
									title="Thông tin liên hệ"
									trigger="click"
								>
									<button className="button-normal">
										Contact
									</button>
								</Popover>
							</li>
							<li>
								<Popover
									content={social}
									title="Mạng xã hội"
									trigger="click"
								>
									<button className="button-normal">
										Social
									</button>
								</Popover>
							</li>
							<li>
								<Popover
									content={donate}
									title="Cảm ơn bạn đã quan tâm ❤️"
									trigger="click"
								>
									<button className="button-normal">
										Donate
									</button>
								</Popover>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
