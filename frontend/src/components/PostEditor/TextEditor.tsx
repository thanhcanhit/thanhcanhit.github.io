import JoditEditor from "jodit-react";
import React from "react";

type TextEditorType = {
	content: string;
	setContent: React.Dispatch<React.SetStateAction<string>>;
};

const TextEditor = ({ content, setContent }: TextEditorType) => {
	return (
		<JoditEditor
			className="text-black"
			value={content}
			config={{ height: 600}}
			onBlur={(newContent) => setContent(newContent)}
		/>
	);
};

export default TextEditor;
