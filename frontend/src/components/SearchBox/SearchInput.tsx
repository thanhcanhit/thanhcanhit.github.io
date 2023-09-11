import { useState, useLayoutEffect } from "react";
import { AutoComplete, Input } from "antd";
import type { SelectProps } from "antd/es/select";
import { useDispatch, useSelector } from "react-redux";
import {
	searchTagsSelector,
	searchTextSelector,
	setSearchTags,
	setSearchText,
} from "./searchSlice";
import { searchPost } from "../../api/postRequest";
import { Post } from "../../interface/Post";
import { Link } from "react-router-dom";

const SearchInput = () => {
	const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
	const input = useSelector(searchTextSelector);
	const tags = useSelector(searchTagsSelector);
	const dispatch = useDispatch();

	const handleSearch = (value: string) => {
		setOptions(value ? options : []);
	};

	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		const value: string = event.currentTarget.value;
		dispatch(setSearchText(value));
	};

	useLayoutEffect(() => {
		const getSearchResult = async () => {
			const response = await searchPost(input, tags);
			const responseData: Post[] = response.data;

			const first5Pieces = responseData.filter((_i, index) => index < 5);

			let resultData = first5Pieces.map((item: Post) => {
				return {
					value: item.title,
					label: (
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Link
								to={`/post/${item._id}`}
								onClick={() => {
									dispatch(setSearchText(""));
									dispatch(setSearchTags([]));
								}}
							>
								<span>
									Found {input} on {item.title}
								</span>
							</Link>
						</div>
					),
				};
			});

			if (responseData.length > 4)
				resultData = [
					...resultData,
					{
						value: "",
						label: (
							<Link to={"/search"}>
								Xem toàn bộ {responseData.length} kết quả
							</Link>
						),
					},
				];

			setOptions(resultData);
		};

		getSearchResult();

		const scrollToTop = () => {
			window.scrollTo({ behavior: "smooth", top: 0 });
		};
		const to = setTimeout(scrollToTop, 150);

		return () => {
			clearTimeout(to);
		};
	}, [dispatch, input, tags]);

	return (
		<AutoComplete options={options} onSearch={handleSearch}>
			<Input.Search
				size="middle"
				value={input}
				onChange={onChange}
				placeholder="Tên bài viết"
				className="bg-white rounded-lg"
			/>
		</AutoComplete>
	);
};

export default SearchInput;
