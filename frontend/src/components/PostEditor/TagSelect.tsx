import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button } from "antd";
import type { SelectProps } from "antd";
import { createTag, getAllTags } from "../../api/tagRequest";

interface ItemProps {
	label: string;
	value: string;
}

type TagSelectType = {
	value: string[];
	setValue: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagSelect = ({ value, setValue }: TagSelectType) => {
	const [name, setName] = useState("");
	const [options, setOptions] = useState<ItemProps[]>([]);

	const selectProps: SelectProps = {
		mode: "multiple",
		allowClear: true,
		autoClearSearchValue: true,
		defaultValue: value,
		options,
		onChange: (newValue: string[]) => {
			setValue(newValue);
		},
		placeholder: "Chọn các tag liên quan đến bài viết ",
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

	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const addItem = async (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => {
		e.preventDefault();
		try {
			await createTag(name);
			// Thêm tag mới vào options và value
			setOptions([...options, { label: name, value: name.toString() }]);
			setValue((prev) => [...prev, name]);
			setName("");
		} catch (err) {
			console.log("Error when creating tag", err);
		}
	};

	return (
		<Select
			placeholder="Thêm tag vào vài viết của bạn"
			mode="multiple"
			{...selectProps}
			dropdownRender={(menu) => (
				<>
					{menu}
					<Divider style={{ margin: "8px 0" }} />
					<Space style={{ padding: "0 8px 4px" }}>
						<Input
							placeholder="Tag name"
							value={name}
							onChange={onNameChange}
							required
						/>
						<Button type="text" icon={<PlusOutlined />} onClick={addItem}>
							Thêm tag
						</Button>
					</Space>
				</>
			)}
		/>
	);
};

export default TagSelect;
