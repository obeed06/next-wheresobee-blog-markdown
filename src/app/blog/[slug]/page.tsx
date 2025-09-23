import { getMarkdownContent } from '../../lib/markdown';
import { PostFrontmatter } from '../../types';
import Image from 'next/image';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getMarkdownContent<PostFrontmatter>(`posts/${params.slug}.md`);

  if (!post) {
    // In a real app, you'd render a 404 page here
    return <div className="text-center py-20">Post not found.</div>;
  }

  const { frontmatter, contentHtml } = post;

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
              <div className="flex justify-center py-4 space-y-4">
                <span className="pr-4 text-gray-300 block">By: {frontmatter.author}</span>
                <span className="pl-4 text-gray-300 block">
                  Posted on: <time dateTime={frontmatter.date}>
                    {new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </span>
              </div>

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