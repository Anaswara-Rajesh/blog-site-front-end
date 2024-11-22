import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog } from "../types/BlogType";

interface BlogState {
    blog: Blog | null;
    blogs: Blog[];
}

const initialState: BlogState = {
    blog: null,
    blogs: [],
};

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        setBlog(state, action: PayloadAction<Blog>) {
            state.blog = action.payload;
        },
        setBlogs(state, action: PayloadAction<Blog[]>) {
            state.blogs = action.payload;
        },
        addBlog(state, action: PayloadAction<Blog>) {
            state.blogs.push(action.payload);
        },
    },
});

export const { setBlog, setBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer;

