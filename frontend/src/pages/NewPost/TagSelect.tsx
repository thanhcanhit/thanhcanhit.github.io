import { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button } from "antd";
import type { InputRef } from "antd";

let index = 0;

const TagSelect: React.FC = () => {
	const [items, setItems] = useState(["Frontend", "Backend"]);
	const [name, setName] = useState("");
	const inputRef = useRef<InputRef>(null);

	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const addItem = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => {
		e.preventDefault();
		setItems([...items, name || `New item ${index++}`]);
		setName("");
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};

	return (
		<tr>
			<td className="hidden md:block">
				<span className="w-10 font-semibold">Danh mục:</span>
			</td>
			<td className="w-full">
				<Select
					className="w-full bg-normal"
					placeholder="Thêm tag vào vài viết của bạn"
					mode="multiple"
					dropdownRender={(menu) => (
						<>
							{menu}
							<Divider style={{ margin: "8px 0" }} />
							<Space style={{ padding: "0 8px 4px" }}>
								<Input
									placeholder="Tag name"
									ref={inputRef}
									value={name}
									onChange={onNameChange}
									required
								/>
								<Button
									type="text"
									icon={<PlusOutlined />}
									onClick={addItem}
								>
									Thêm tag
								</Button>
							</Space>
						</>
					)}
					options={items.map((item) => ({
						label: item,
						value: item,
					}))}
				/>
			</td>
		</tr>
	);
};

export default TagSelect;
