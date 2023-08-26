import JoditEditor from "jodit-react";
import { useState } from "react";

const TextEditor = () => {
	const [content, setContent] = useState<string>("");

	return (
		<JoditEditor
			className="text-black"
			value={content}
			onChange={(newContent) => setContent(newContent)}
		/>
	);
};

export default TextEditor;
