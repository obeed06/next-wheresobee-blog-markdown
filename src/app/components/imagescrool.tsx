'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  '/images/posts/three-p-s-of-kosovo/hero.jpg',
  '/images/posts/5-days-in-macedonia/hero.jpg',
  '/images/posts/7-days-on-crete/hero.jpg',
  '/images/posts/the-white-towns-of-santorini/hero.jpg',
  '/images/posts/mykonos-town/hero.jpg',
  '/images/posts/4-days-in-athens/hero.jpg',
  '/images/posts/rocking-around-meteora/hero.jpg',
  '/images/posts/markha-valley-trek/hero.jpg',
  '/images/posts/west-highland-way-trek/hero.jpg',
  '/images/posts/the-buses-of-ecuador/hero.jpg',
  '/images/posts/the-perfect-plan-to-spend-a-week-in-norway/hero.jpg',
  '/images/posts/three-p-s-of-kosovo/hero.jpg', // 12th image
];

export default function ScrollingImage() {
  const containerRef = useRef < HTMLDivElement > (null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalImageScroll = 3000;
  const imageStep = totalImageScroll / images.length;
  const imageScroll = useTransform(scrollYProgress, [0, 1], [0, totalImageScroll]);

  // 1. --- MODIFIED: Set initial dimensions to full screen ---
  const width = useTransform(scrollYProgress, [0, 0.7], ['100vw', '30vw']);
  const height = useTransform(scrollYProgress, [0, 0.7], ['100vh', '30vw']);
  const borderRadius = useTransform(scrollYProgress, [0, 0.7], ['0px', '24px']);

  return (
    <section ref={containerRef} className="w-full h-[300vh] relative">
      {/* 2. --- MODIFIED: Simplified layout with flexbox for centering --- */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative overflow-hidden"
          style={{
            width,
            height,
            borderRadius,
          }}
        >
          {images.map((src, index) => {
            const opacity = useTransform(
              imageScroll,
              [index * imageStep - imageStep, index * imageStep, index * imageStep + imageStep],
              [0, 1, 0]
            );
            
            return (
              <motion.div
                key={src + index}
                className="absolute inset-0"
                style={{ opacity }}
              >
                <Image
                  src={src}
                  alt={`Scrolling image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index < 2}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}