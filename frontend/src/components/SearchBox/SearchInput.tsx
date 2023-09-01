import { useState } from "react";
import { AutoComplete, Input } from "antd";
import type { SelectProps } from "antd/es/select";
import { useDispatch, useSelector } from "react-redux";
import { searchTextSelector, setSearchText } from "./searchSlice";

const getRandomInt = (max: number, min = 0) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
	new Array(getRandomInt(5))
		.join(".")
		.split(".")
		.map((_, idx) => {
			const category = `${query}${idx}`;
			return {
				value: category,
				label: (
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<span>
							Found {query} on{" "}
							<a
								href={`https://s.taobao.com/search?q=${query}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{category}
							</a>
						</span>
						<span>{getRandomInt(200, 100)} results</span>
					</div>
				),
			};
		});

const SearchInput = () => {
	const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
	const searchText = useSelector(searchTextSelector);
	const dispatch = useDispatch();

	const handleSearch = (value: string) => {
		setOptions(value ? searchResult(value) : []);
	};

	const onSelect = (value: string) => {
		dispatch(setSearchText(value));
	};

	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		const value: string = event.currentTarget.value;
		dispatch(setSearchText(value));
	};

	return (
		<AutoComplete
			options={options}
			onSelect={onSelect}
			onSearch={handleSearch}
		>
			<Input.Search
				size="middle"
				value={searchText}
				onChange={onChange}
				placeholder="Tên bài viết"
				className="bg-white rounded-lg"
			/>
		</AutoComplete>
	);
};

export default SearchInput;
