import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

const initialState: {
	text: string;
	tags: string[];
} = {
	text: "",
	tags: [],
};

const searchSlice = createSlice({
	name: "search",
	initialState: initialState,
	reducers: {
		setSearchText: (state, action) => {
			state.text = action.payload;
		},
		setSearchTags: (state, action) => {
			state.tags = action.payload;
		},
	},
});

// Selectors
const searchTextSelector = (state: RootState) => state.search.text;
const searchTagsSelector = (state: RootState) => state.search.tags;

export { searchTextSelector, searchTagsSelector };

// Actions
export const { setSearchText, setSearchTags } = searchSlice.actions;

export default searchSlice.reducer;
