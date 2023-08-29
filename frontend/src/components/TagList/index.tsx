import TagComponent from "../Tag";

const TagList = ({ tags }: { tags: string[] }) => {
	return tags.map((tag, index) => <TagComponent name={tag} key={index} />);
};

export default TagList;
