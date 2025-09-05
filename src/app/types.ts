export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  authorImage?: string;
  excerpt: string;
  heroImage: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
}