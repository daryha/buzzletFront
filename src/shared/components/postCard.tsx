"use client";

import React from "react";
import { Container } from "./container";
import { ArrowRight, Eye, Heart, MessageCircle, Undo2 } from "lucide-react";
import { Tag } from "@/redux/slices/postSlice";

interface Props {
  className?: string;
  authorName: string;
  avatar: string;
  title: string;
  desc: string;
  bannerImage: string;
  tags?: Tag[];
  countComments: number;
  countLikes: number;
  countViews: number;
}

export const PostCard: React.FC<Props> = ({
  className,
  authorName,
  avatar,
  bannerImage,
  desc,
  countComments,
  countLikes,
  countViews,
  title,
  tags,
}) => {
  return (
    <Container>
      <div className="w-[720px]  bg-primary rounded-2xl p-5 mb-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
            <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <p>{authorName}</p>
        </div>

        <h1 className="text-3xl font-bold mb-2">{title}</h1>

        <p className="mb-5">{desc}</p>

        <div className="w-full grid mb-4">
          <img
            src={bannerImage}
            sizes="100vw"
            alt="Описание изображения"
            className="w-full h-[410px] object-cover grid-area-[1/1] rounded-2xl"
            loading="lazy"
            decoding="async"
            width={1200}
            height={410}
          />
        </div>

        <div className="!text-secondary w-[200px] mb-4 flex gap-1 items-center cursor-pointer group transition-transform">
          <p className="!text-secondary group-hover:!text-secondary-light">Подробнее</p>{" "}
          <ArrowRight
            width={20}
            className="group-hover:!text-secondary-light group-hover:translate-x-1  transition-transform "
          />
        </div>

        <div className="flex flex-wrap gap-4 gap-y-4 items-center mb-5">
          {tags?.map((tag: Tag) => (
            <span
              key={tag.id}
              className="outline p-2 text-[14px] !text-gray rounded-2xl cursor-pointer hover:!text-secondary"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center ">
            <div className="flex items-center gap-1 cursor-pointer text-gray hover:text-secondary">
              <Heart size={20} className="scale-x-[-1]" />
              {countLikes}
            </div>

            <div className="flex items-center gap-1 cursor-pointer text-gray hover:text-secondary">
              <MessageCircle size={20} className="scale-x-[-1]" />
              {countComments}
            </div>
            <div className="flex items-center gap-1 cursor-pointer text-gray hover:text-secondary">
              <Undo2 size={20} className=" scale-x-[-1]" />
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1">
              <Eye size={20} className="text-gray scale-x-[-1]" />
              <p className="text-gray">{countViews}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
