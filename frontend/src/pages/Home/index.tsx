import Hero from "./Hero";
import PostList from "./PostList";
import SkillMarquee from "./SkillMarquee";
const Home = () => {
	return (
		<div>
			<Hero />
			<SkillMarquee />
			<hr className="container" />
			<PostList />
		</div>
	);
};

export default Home;
