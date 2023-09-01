import Hero from "./Hero";
import PostList from "./PostList";
import SearchAndFilter from "../../components/SearchBox/SearchAndFilter";
import SkillMarquee from "./SkillMarquee";
const Home = () => {
	return (
		<div>
			<Hero />
			<SkillMarquee />
			<hr className="container" />
			<SearchAndFilter />
			<PostList />
		</div>
	);
};

export default Home;
