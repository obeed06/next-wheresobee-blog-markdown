import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PostFrontmatter } from '../types';

const getAboutContent = async () => {
  const contentDirectory = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDirectory, `about-me.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const matterResult = matter(fileContents);
  
  // Convert markdown content to HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    frontmatter: matterResult.data as PostFrontmatter,
    contentHtml,
  };
};

export default async function AboutPage() {
    const about = await getAboutContent();

  if (!about) {
      // In a real app, you'd render a 404 page here
      return <div className="text-center py-20">Post not found.</div>;
  }
  
  const { frontmatter, contentHtml } = about;

  return (
    <div className="bg-white py-12 sm:py-16">
      <main className="container mx-auto max-w-4xl px-6 lg:px-8">
        <article>

          {/* Entry Content */}
          <div 
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />
        </article>
      </main>
    </div>
  );
}