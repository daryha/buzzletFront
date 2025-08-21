import axiosInstance, { API_BASE } from "@/lib/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
import { DetailedPost, Post, RawPost, RawPostById } from "@/types/post-types";

interface PostsState {
  items: Post[];
  currentPost: DetailedPost | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: boolean;
}

const initialState: PostsState = {
  items: [],
  currentPost: null,
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
    liked: p.liked || false,
  }));
});

export const fetchPostById = createAsyncThunk(
  "postById/fetchPostById",
  async (id: string, { getState }) => {
    const res = await axiosInstance.get<RawPostById>(`/post/${id}`);
    const raw = res.data;

    const state = getState() as { posts: PostsState };
    const listItem = state.posts.items.find((p) => p.id === id);

    const detailed: DetailedPost = {
      id: raw.id,
      authorName: raw.author.name,
      avatarUrl: raw.author.avatar || "/default-avatar.png",
      title: raw.title,
      desc: raw.description,
      bannerImage: raw.bannerImg,
      countComments: raw._count.comments,
      countLikes: raw._count.likes,
      countViews: raw._count.views,
      tags: raw.tags,
      liked: typeof raw.liked === "boolean" ? raw.liked : listItem?.liked ?? false,
      fullText: raw.text,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      comments: raw.comments,
      published: raw.published,
    };

    return detailed;
  }
);
export const fetchLike = createAsyncThunk(
  "posts/fetchLike",
  async (postId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<{ liked: boolean }>(`/post/${postId}/like`);
      return { postId, liked: data.liked };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    optimisticToggleLike: (state, action: PayloadAction<{ postId: string }>) => {
      const { postId } = action.payload;

      const post = state.items.find((p) => p.id === postId);
      if (post) {
        const wasLiked = post.liked ?? false;
        post.liked = !wasLiked;
        post.countLikes += post.liked ? 1 : -1;
        if (post.countLikes < 0) post.countLikes = 0;
      }

      if (state.currentPost?.id === postId) {
        const wasLiked = state.currentPost.liked ?? false;
        state.currentPost.liked = !wasLiked;
        state.currentPost.countLikes += state.currentPost.liked ? 1 : -1;
        if (state.currentPost.countLikes < 0) state.currentPost.countLikes = 0;
      }
    },
    revertOptimisticLike: (state, action: PayloadAction<{ postId: string }>) => {
      const { postId } = action.payload;

      const post = state.items.find((p) => p.id === postId);
      if (post) {
        const wasLiked = post.liked ?? false;
        post.liked = !wasLiked;
        post.countLikes += post.liked ? 1 : -1;
        if (post.countLikes < 0) post.countLikes = 0;
      }

      if (state.currentPost?.id === postId) {
        const wasLiked = state.currentPost.liked ?? false;
        state.currentPost.liked = !wasLiked;
        state.currentPost.countLikes += state.currentPost.liked ? 1 : -1;
        if (state.currentPost.countLikes < 0) state.currentPost.countLikes = 0;
      }
    },
    resetAllLikes: (state) => {
      state.items.forEach((p) => {
        if (p.liked) p.liked = false;
      });
      if (state.currentPost?.liked) state.currentPost.liked = false;
    },
  },
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
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
        state.error = false;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(fetchLike.fulfilled, (state, action) => {
        const { postId, liked } = action.payload;

        const update = (p: { liked?: boolean; countLikes: number } | undefined) => {
          if (!p) return;
          const currentLiked = p.liked ?? false;
          if (currentLiked !== liked) {
            p.liked = liked;
            p.countLikes += liked ? 1 : -1;
            if (p.countLikes < 0) p.countLikes = 0;
          }
        };

        update(state.items.find((p) => p.id === postId));
        if (state.currentPost?.id === postId) update(state.currentPost);
      })
      .addCase(fetchLike.rejected, (state, action) => {
        console.error("Ошибка при лайке:", action.payload);
      })
      .addCase(logout, (state) => {
        state.items.forEach((p) => {
          if (p.liked) p.liked = false;
        });
        if (state.currentPost?.liked) state.currentPost.liked = false;
      });
  },
});

export const { optimisticToggleLike, revertOptimisticLike, resetAllLikes } = postsSlice.actions;
export default postsSlice.reducer;
