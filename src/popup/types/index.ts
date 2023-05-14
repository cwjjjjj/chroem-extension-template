export interface Post {
  id: string;
  url: string;
  title: string;
  summary: string;
  scope: string;
  createdAt: string;
  updatedAt: string;
  viewed: number;
  image?: string;
  type: "VIDEO" | "GENERAL";
  description: string;
}

export interface User {
  id: string;
  // 内部用户
  isBeta: boolean;
  nickname?: string;
  avatar?: string;
  subscribedCount: number;
  subscriberCount: number;
}

export interface CreatePost extends Partial<Post> {
  url: string;
  title: string;
}

export type PostWithUser = Post & {
  user: User;
};
