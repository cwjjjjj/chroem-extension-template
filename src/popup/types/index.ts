export interface V2exPost {
  node: V2exNode;
  member: Member;
  last_reply_by: string;
  last_touched: number;
  title: string;
  url: string;
  created: number;
  deleted: number;
  content: string;
  content_rendered: string;
  last_modified: number;
  replies: number;
  id: number;
}

export interface V2exNode {
  avatar_large: string;
  name: string;
  avatar_normal: string;
  title: string;
  url: string;
  topics: number;
  footer: string;
  header: string;
  title_alternative: string;
  avatar_mini: string;
  stars: number;
  aliases: any[];
  root: boolean;
  id: number;
  parent_node_name: string;
}

export interface Member {
  id: number;
  username: string;
  url: string;
  website: string;
  twitter: any;
  psn: any;
  github: any;
  btc: any;
  location: string;
  tagline: string;
  bio: string;
  avatar_mini: string;
  avatar_normal: string;
  avatar_large: string;
  created: number;
  last_modified: number;
}
