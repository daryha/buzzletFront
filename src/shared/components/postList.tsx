"use client";

import React from "react";
import { PostCard } from "./postCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchPosts } from "@/redux/slices/postSlice";

interface Props {
  className?: string;
}

export const PostList: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: posts, status } = useSelector((state: RootState) => state.posts);

  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className={className}>Загрузка...</div>;
  }
  if (status === "failed") {
    return <div className={className}>Ошибка загрузки</div>;
  }

  return (
    <div className={className}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          authorName={post.authorName}
          avatar={post.avatarUrl}
          title={post.title}
          desc={post.desc}
          bannerImage={post.bannerImage}
          countComments={post.countComments}
          countLikes={post.countLikes}
          countViews={post.countViews}
          tags={post.tags}
        />
      ))}
    </div>
  );
};
