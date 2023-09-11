import { useDispatch } from "react-redux";
import { setSearchTags } from "../SearchBox/searchSlice";
import { useNavigate } from "react-router-dom";

const Tag = ({ name }: { name: string }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(setSearchTags([name]));
		navigate("/search");
	};
	return (
		<button
			onClick={handleClick}
			className="cursor-pointer hover:brightness-125 transition-all bg-gray-200 border border-gray-400 dark:border-0 text-gray-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap"
		>
			#{name}
		</button>
	);
};

export default Tag;
