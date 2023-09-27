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

const icons: { title: string; icon: IconType, color?: string }[] = [
	{ title: "HTML5", icon: AiFillHtml5, color: "#ff5c29" },
	{ title: "CSS3", icon: FaCss3Alt, color: "#299cf8"},
	{ title: "JavaScript", icon: BiLogoJavascript, color: "#f7e025" },
	{ title: "Sass", icon: FaSass, color: "#cf6c9c" },
	{ title: "React.js", icon: FaReact, color: "#08daff"},
	{ title: "TypeScript", icon: BiLogoTypescript, color: "#377cc8" },
	{ title: "Redux", icon: SiRedux, color: "#7a50be" },
	{ title: "Tailwindcss", icon: BiLogoTailwindCss, color: "#21b4bc" },
	{ title: "Bootstrap", icon: BiLogoBootstrap, color: "#7f18f9" },
	{ title: "Ant Design", icon: AiOutlineAntDesign, color: "#228eff" },
	{ title: "Node.js", icon: FaNodeJs, color: "#72aa62" },
	{ title: "Express.js", icon: SiExpress },
	{ title: "NoSQL MongoDB", icon: SiMongodb, color: "#5dad55" },
];

const SkillMarquee = () => {
	return (
		<Marquee className="py-12 overflow-hidden text-6xl text-normal">
			{icons.map((item) => (
				<div key={item.title} className="mx-8" title={item.title} style={{color: item.color}}>
					{item.icon({})}
				</div>
			))}
		</Marquee>
	);
};

export default SkillMarquee;
