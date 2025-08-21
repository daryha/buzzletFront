// components/PostDetails.tsx
"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchPostById, fetchPosts } from "@/redux/slices/postSlice";
import { PostCard } from "./postCard";
import CommentsList from "./comment-list";
import CommentForm from "./forms/comment-form";

export default function PostDetails({ postId }: { postId: string }) {
  const dispatch = useAppDispatch();
  const { currentPost, status } = useAppSelector((s) => s.posts);

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  if (status === "loading" || !currentPost || currentPost.id !== postId) {
    return <div className="px-4 py-6">Загрузка...</div>;
  }

  return (
    <div className="px-4 ">
      <PostCard
        detailed
        id={currentPost.id}
        authorName={currentPost.authorName}
        avatar={currentPost.avatarUrl}
        title={currentPost.title}
        desc={currentPost.desc}
        bannerImage={currentPost.bannerImage}
        tags={currentPost.tags}
        countComments={currentPost.countComments}
        countLikes={currentPost.countLikes}
        countViews={currentPost.countViews}
        liked={currentPost.liked}
        fullText={currentPost.fullText}
      />

      <div className="max-w-[640px] mx-auto bg-primary rounded-2xl p-5 mb-10">
        <h3 className="text-xl font-semibold mb-4">Комментарии ({currentPost.countComments})</h3>
        <CommentForm postId={currentPost.id} />
        <CommentsList comments={currentPost.comments} />
      </div>
    </div>
  );
}
