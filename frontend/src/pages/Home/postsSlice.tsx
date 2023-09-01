import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { FetchState } from "../../interface";
import { Post } from "../../interface/Post";

const initialState: {
	status: FetchState;
	posts: Post[];
} = {
	status: "idle",
	posts: [],
};

const postsSlice = createSlice({
	name: "posts",
	initialState: initialState,
	reducers: {
		getPostsStart: (state) => {
			state.status = "pending";
		},
		getPostsComplete: (state, action) => {
			state.posts = action.payload;
			state.status = "resolve";
		},
		getPostsFailed: (state) => {
			state.status = "reject";
		},
	},
});

// Selectors
const postsStatusSelector = (state: RootState) => state.posts.status;
const postsSelector = (state: RootState) => state.posts.posts;

export { postsStatusSelector, postsSelector };

// Actions
export const { getPostsStart, getPostsComplete, getPostsFailed } =
	postsSlice.actions;

export default postsSlice.reducer;
