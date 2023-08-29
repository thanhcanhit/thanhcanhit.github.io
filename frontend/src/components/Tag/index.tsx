const Tag = ({ name }: { name: string }) => {
	return (
		<span className="bg-gray-200 border border-gray-400 dark:border-0 text-gray-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap">
			#{name}
		</span>
	);
};

export default Tag;
