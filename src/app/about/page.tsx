import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Me | Wanderlust Tales',
};

export default function AboutPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto mt-8">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-900">About Me</h1>
      <div className="flex justify-center mb-6">
        <Image 
          src="/images/author-photo.jpg" // Path relative to the 'public' folder
          alt="Photo of Alex Wanderer"
          width={150}
          height={150}
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-lg text-gray-800 leading-relaxed space-y-4">
        <p>
          Hi, I'm Alex Wanderer! For as long as I can remember, I've been fascinated by the world and its diverse cultures. After years of dreaming, I finally decided to pack my bags and turn my passion for travel into a lifestyle.
        </p>
        <p>
          This blog is my personal journal, a place where I share my stories, tips, and photos from the road. My goal is to inspire you to explore, to step out of your comfort zone, and to discover the beauty of our planet. Thanks for joining me on this journey!
        </p>
      </div>
    </div>
  );
}