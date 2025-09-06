import { getMarkdownContent } from '../../lib/markdown';
import { PostFrontmatter } from '../../types';


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
          {/* Header section with side metadata */}
          <header className="mb-12 flex flex-col md:flex-row md:items-start">
            {/* Side Meta */}
            <div className="w-full md:w-1/4 md:pr-8 text-sm text-gray-600 mb-8 md:mb-0">
              <div className="border-t border-b border-gray-200 py-4 space-y-4">
                <div>
                  <span className="font-semibold text-gray-900 block">By:</span>
                  <span>{frontmatter.author}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block">Posted on:</span>
                  <time dateTime={frontmatter.date}>
                    {new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
              </div>
            </div>

            {/* Entry Title */}
            <div className="w-full md:w-3/4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                {frontmatter.title}
              </h1>
            </div>
          </header>

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