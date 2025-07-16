import axiosInstance, { API_BASE } from "@/lib/axios";
import React from "react";
import { PostCard } from "./postCard";

interface Props {
  className?: string;
}

export interface Tag {
  id: number;
  name: string;
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

export const PostList: React.FC<Props> = async ({ className }) => {
  const { data: rawPosts } = await axiosInstance.get<RawPost[]>("/post");

  const posts = rawPosts.map((p) => ({
    id: p.id,
    authorName: p.author.name,
    avatarUrl: p.author.avatar ? `${API_BASE}/avatars/${p.author.avatar}` : "/default-avatar.png",
    title: p.title,
    desc: p.description,
    bannerImage: p.bannerImg,
    countComments: p._count.comments,
    countLikes: p._count.likes,
    countViews: p._count.views,
    tags: p.tags,
  }));

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
