import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './types';
import FeaturedPostTile from './components/FeaturedPostTile';
import PostTile from './components/PostTile';
import ScrollingImage from './components/ImageGalleryScroll';
// import VisitedMap from './components/VisitedMap';

// This function runs on the server to get all posts
const getPosts = (): Post[] => {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const slug = filename.replace('.md', '');
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      frontmatter: data,
    } as Post;
  });

  // Sort posts by date, newest first
  const sortedPosts = posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  // Limit to 17 posts
  return sortedPosts.slice(0, 17);
};

export default function HomePage() {
  const posts = getPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>

      {/* <div className="bg-white py-12 sm:py-16"> */}
              {/* <VisitedMap /> */}

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn about my adventures and insights from the road.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {/* Featured Post */}
            {featuredPost && <FeaturedPostTile post={featuredPost} />}

            {/* Other Posts */}
            {otherPosts.map((post) => (
              <PostTile key={post.slug} post={post} />
            ))}
          </div>
          <div className="my-16 text-center">
            <Link href="/blog" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              See Older Posts
            </Link>
          </div>
        </div>
      {/* </div> */}
      <ScrollingImage />
    </>
  );
}