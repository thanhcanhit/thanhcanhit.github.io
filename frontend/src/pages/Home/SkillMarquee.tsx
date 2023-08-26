import Marquee from "react-fast-marquee";
import { IconType } from "react-icons";
import { AiFillHtml5, AiOutlineAntDesign } from "react-icons/ai";
import { FaCss3Alt, FaReact, FaSass, FaNodeJs } from "react-icons/fa";
import {
	BiLogoJavascript,
	BiLogoTypescript,
	BiLogoTailwindCss,
	BiLogoBootstrap,
} from "react-icons/bi";
import { SiRedux, SiExpress, SiMongodb } from "react-icons/si";

const icons: { title: string; icon: IconType }[] = [
	{ title: "HTML5", icon: AiFillHtml5 },
	{ title: "CSS3", icon: FaCss3Alt },
	{ title: "JavaScript", icon: BiLogoJavascript },
	{ title: "Sass", icon: FaSass },
	{ title: "React.js", icon: FaReact },
	{ title: "TypeScript", icon: BiLogoTypescript },
	{ title: "Redux", icon: SiRedux },
	{ title: "Tailwindcss", icon: BiLogoTailwindCss },
	{ title: "Bootstrap", icon: BiLogoBootstrap },
	{ title: "Ant Design", icon: AiOutlineAntDesign },
	{ title: "Node.js", icon: FaNodeJs },
	{ title: "Express.js", icon: SiExpress },
	{ title: "NoSQL MongoDB", icon: SiMongodb },
];

const SkillMarquee = () => {
	return (
		<Marquee className="py-12 overflow-hidden text-6xl text-normal">
			{icons.map((item) => (
				<div
					key={item.title}
					className="mx-8"
					title={item.title}
					data-popover-target={item.title}
					data-popover-trigger="hover"
				>
					{item.icon({})}

					<div
						data-popover
						id={item.title}
						role="tooltip"
						className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
					>
						<div className="px-3 py-2">
							<p>{item.title}</p>
						</div>
						<div data-popper-arrow></div>
					</div>
				</div>
			))}
		</Marquee>
	);
};

export default SkillMarquee;
