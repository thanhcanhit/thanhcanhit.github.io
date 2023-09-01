import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../components/SearchBox/searchSlice";
import postsSlice from "../pages/Home/postsSlice";

const store = configureStore({
	reducer: {
		search: searchSlice,
    posts: postsSlice
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
