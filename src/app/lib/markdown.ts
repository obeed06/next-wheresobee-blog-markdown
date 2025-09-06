import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * A generic interface for any markdown content with frontmatter.
 * @template T - The shape of the frontmatter object.
 */
export interface MarkdownContent<T> {
  frontmatter: T;
  contentHtml: string;
}

/**
 * Reads and processes a markdown file from the `content` directory.
 * @param filePath - The path to the markdown file relative to the `content` directory (e.g., 'posts/my-first-post.md').
 * @returns A promise that resolves to the processed markdown content or null if the file doesn't exist.
 */
export const getMarkdownContent = async <T>(filePath: string): Promise<MarkdownContent<T> | null> => {
  const fullPath = path.join(process.cwd(), 'content', filePath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    frontmatter: matterResult.data as T,
    contentHtml,
  };
};