import axiosInstance, { API_BASE } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Tag {
  id: number;
  name: string;
}

export interface Post {
  id: string;
  authorName: string;
  avatarUrl: string;
  title: string;
  desc: string;
  bannerImage: string;
  countComments: number;
  countLikes: number;
  countViews: number;
  tags: Tag[];
}

interface RawPost {
  id: string;
  title: string;
  description: string;
  bannerImg: string;
  tags: Tag[];
  author: {
    name: string;
    avatar: string;
  };
  _count: {
    comments: number;
    likes: number;
    views: number;
  };
}

interface PostsState {
  items: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: boolean;
}

const initialState: PostsState = {
  items: [],
  status: "idle",
  error: false,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axiosInstance.get<RawPost[]>("/post");
  return res.data.map((p) => ({
    id: p.id,
    authorName: p.author.name,
    avatarUrl: p.author.avatar || "/default-avatar.png",
    title: p.title,
    desc: p.description,
    bannerImage: p.bannerImg,
    countComments: p._count.comments,
    countLikes: p._count.likes,
    countViews: p._count.views,
    tags: p.tags,
  }));
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export default postsSlice.reducer;
