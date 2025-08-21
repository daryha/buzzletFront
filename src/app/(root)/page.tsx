import { Container } from "@/shared/components/container";
import { NavList } from "@/shared/components/nav-list";
import { PostList } from "@/shared/components/postList";
import { RightSide } from "@/shared/components/right-side";

export default function Home() {
  return (
    <>
      <div className=" flex justify-center">
        <PostList />
      </div>
    </>
  );
}
