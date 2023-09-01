import TagComponent from "../Tag";

const TagList = ({ tags }: { tags: string[] }) => {
	const tagsRendered = tags.map((tag, index) => (
		<TagComponent name={tag} key={index} />
	));

	return <div className="flex flex-wrap gap-1">{tagsRendered}</div>;
};

export default TagList;
