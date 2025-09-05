import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../types';

interface FeaturedPostTileProps {
  post: Post;
}

export default function FeaturedPostTile({ post }: FeaturedPostTileProps) {
  return (
    <article
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 lg:col-span-4"
    >
      <Image
        src={post.frontmatter.heroImage}
        alt={`Hero image for ${post.frontmatter.title}`}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        fill
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <h3 className="text-xl font-semibold leading-6 text-white">
        <Link href={`/blog/${post.slug}`}>
          <span className="absolute inset-0" />
          {post.frontmatter.title}
        </Link>
      </h3>
      <div className="mt-3 flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        <p>By {post.frontmatter.author}</p>
        <svg viewBox="0 0 2 2" className="mx-2 h-0.5 w-0.5 flex-none fill-white/50">
          <circle cx={1} cy={1} r={1} />
        </svg>
        <time dateTime={post.frontmatter.date}>
          {new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      </div>
    </article>
  );
}
