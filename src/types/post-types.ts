export interface Tag {
  id: string;
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
  liked?: boolean;
}

export interface Comment {
  id: string;
  text: string;
  user: {
    id: string;
    name: string;
  };
}

export interface DetailedPost extends Post {
  fullText: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  published: boolean;
}

export interface RawPost {
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

  liked?: boolean;
}

export interface RawPostById {
  id: string;
  title: string;
  description: string;
  text: string;
  bannerImg: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  tags: { id: string; name: string }[];
  comments: Comment[];
  _count: {
    comments: number;
    views: number;
    likes: number;
  };
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  liked?: boolean;
}
