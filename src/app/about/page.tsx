import type { Metadata } from 'next';
import Image from 'next/image';
import { getMarkdownContent } from '../lib/markdown';

interface AboutFrontmatter {
  title: string;
  author: string;
  heroImage: string;
}

export default async function AboutPage() {
  const pageContent = await getMarkdownContent<AboutFrontmatter>('about.md');

  if (!pageContent) {
    return <div className="text-center py-20">About page content not found.</div>;
  }

  const { frontmatter, contentHtml } = pageContent;

  return (
    <div className="bg-white py-12 sm:py-16">
      <main className="container mx-auto max-w-4xl px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-900">{frontmatter.title}</h1>
        <div className="flex justify-center mb-6">
          <Image
            src={frontmatter.heroImage}
            alt={`Photo of ${frontmatter.author}`}
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        </div>
        <div
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>
    </div>
  );
}