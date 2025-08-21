import PostDetails from "@/shared/components/post-details";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="flex justify-center">
      <PostDetails postId={id} />
    </div>
  );
}
