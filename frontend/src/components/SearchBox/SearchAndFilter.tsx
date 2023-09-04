import { useState, useEffect } from "react";
import { Select, Space, Tooltip } from "antd";
import type { SelectProps } from "antd";
import { getAllTags } from "../../api";
import SearchInput from "./SearchInput";
import { BiSearch, BiSolidHide } from "react-icons/bi";

interface ItemProps {
	label: string;
	value: string;
}

const SearchAndFilter = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [options, setOptions] = useState<ItemProps[]>([]);
	const [tags, setTags] = useState<string[]>([]);

	const selectProps: SelectProps = {
		mode: "multiple",
		allowClear: true,
		autoClearSearchValue: true,
		style: { width: "100%", color: "black" },
		value: tags,
		options,
		onChange: (newValue: string[]) => {
			setTags(newValue);
		},
		placeholder: "Chọn các tag bạn muốn tìm ",
		maxTagCount: "responsive",
	};

	useEffect(() => {
		async function getTags() {
			const res = await getAllTags();
			const dataMapped = res.data.map((item: string) => {
				return { label: item, value: item };
			});

			setOptions(dataMapped);
		}

		getTags();
	}, []);

	if (!isOpen)
		return (
			<div className="flex justify-center pt-8">
				<button
					className="flex items-center justify-between gap-2 button-normal w-60 animate-flyUp"
					onClick={() => setIsOpen(true)}
				>
					Tìm kiếm
					<BiSearch />
				</button>
			</div>
		);

	return (
		<div className="container mt-8 rounded-lg text-normal max-w-[800px] transition-all">
			<div className="relative p-4 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 text-normal animate-flyDown">
				<div>
					<p className="mb-2 text-lg font-semibold text-center text-normal">
						Tìm kiếm bài viết
					</p>
					<Tooltip
						placement="top"
						title="Ẩn thanh tìm kiếm"
						className="absolute right-2 top-2"
					>
						<button
							className="p-1 button-normal"
							onClick={() => setIsOpen(false)}
						>
							<BiSolidHide />
						</button>
					</Tooltip>
				</div>
				<div className="flex flex-col gap-2">
					<Space direction="vertical" style={{ width: "100%" }}>
						<Select {...selectProps} size="middle" />
					</Space>
					<SearchInput />
				</div>
			</div>
		</div>
	);
};

export default SearchAndFilter;
