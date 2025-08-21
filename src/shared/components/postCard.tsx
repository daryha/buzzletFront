import { cn } from "@/lib/utils";
import { ArrowRight, Eye, Heart, MessageCircle, Undo2 } from "lucide-react";
import Link from "next/link";
import { Container } from "./container";
import { fetchLike, optimisticToggleLike, revertOptimisticLike } from "@/redux/slices/postSlice";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Tag } from "@/types/post-types";

interface Props {
  className?: string;
  id: string;
  authorName: string;
  avatar: string;
  title: string;
  desc: string;
  bannerImage: string;
  tags?: Tag[];
  countComments: number;
  countLikes: number;
  countViews: number;
  liked?: boolean;
  detailed?: boolean;
  fullText?: string; // добавляем
}

export const PostCard: React.FC<Props> = ({
  className,
  authorName,
  id,
  avatar,
  bannerImage,
  desc,
  fullText,
  countComments,
  countLikes,
  countViews,
  title,
  tags,
  liked: initialLiked,
  detailed = false,
}) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.posts.items.find((p) => p.id === id));
  const currentLiked = post?.liked ?? initialLiked ?? false;
  const { protectAction } = useAuthGuard();

  const toggleLike = async (postId: string) => {
    if (!localStorage.getItem("accessToken")) return;
    dispatch(optimisticToggleLike({ postId }));
    try {
      await dispatch(fetchLike(postId)).unwrap();
    } catch {
      dispatch(revertOptimisticLike({ postId }));
    }
  };

  const handleLike = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    e.preventDefault();
    protectAction(() => toggleLike(postId), { message: "Войдите, чтобы поставить лайк" });
  };

  return (
    <>
      {" "}
      <article className={cn("w-[640px] bg-primary rounded-2xl p-5 mb-10", className)}>
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
            alt="изображениe"
            className="w-full h-[410px] object-cover rounded-2xl"
            loading="lazy"
          />
        </div>

        {!detailed && (
          <Link
            href={`/post/${id}`}
            className="!text-secondary w-[200px] mb-4 flex gap-1 items-center group transition-transform"
          >
            <p className="!text-secondary group-hover:!text-secondary-light">Подробнее</p>
            <ArrowRight
              width={20}
              className="group-hover:!text-secondary-light group-hover:translate-x-1 transition-transform"
            />
          </Link>
        )}

        {detailed && (
          <div className="prose prose-invert max-w-none whitespace-pre-wrap mb-5">{fullText}</div>
        )}

        {tags?.length ? (
          <div className="flex flex-wrap gap-4 gap-y-4 items-center mb-5">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="outline p-2 text-[14px] !text-gray rounded-2xl cursor-pointer hover:!text-secondary"
              >
                {tag.name}
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <button
              className="flex items-center gap-1 cursor-pointer text-gray hover:text-secondary select-none"
              onClick={(e) => handleLike(e, id)}
            >
              <Heart
                size={20}
                className={cn("scale-x-[-1]", currentLiked ? "fill-secondary text-secondary" : "")}
              />
              <p className={cn("text-gray", currentLiked ? "text-secondary" : "")}>{countLikes}</p>
            </button>

            <div className="flex items-center gap-1 text-gray">
              <MessageCircle size={20} className="scale-x-[-1]" />
              {countComments}
            </div>
            <div className="flex items-center gap-1 text-gray">
              <Undo2 size={20} className="scale-x-[-1]" />
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1">
              <Eye size={20} className="text-gray scale-x-[-1]" />
              <p className="text-gray">{countViews}</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
