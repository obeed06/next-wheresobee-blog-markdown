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
        <article>
          <div className="relative w-full aspect-video">
            <Image
              fill
              src={frontmatter.heroImage}
              alt='Post hero image'
              className="object-cover"
            />
          </div>

          <header className="mb-12 flex flex-col md:flex-row md:items-start">
            <div className="w-full md:pr-8 text-sm text-gray-600 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight text-center">
                {frontmatter.title}
              </h1>
            </div>
          </header>

          <div className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </main>
    </div>
  );
}