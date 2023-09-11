import Hero from "./Hero";
import PostList from "./PostList";
import SearchBox from "../../components/SearchBox";
import SkillMarquee from "./SkillMarquee";
const Home = () => {
	return (
		<div>
			<Hero />
			<SkillMarquee />
			<SearchBox gotoButton/>
			<PostList />
		</div>
	);
};

export default Home;
