'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ImageScrollAnimation() {
  const targetRef = useRef(null);

  // useScroll hook to track scroll progress within the target element
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Start animation when the top of the section hits the top of the viewport
    // End animation when the bottom of the section hits the bottom of the viewport
    offset: ['start start', 'end end'],
  });

  const [initialDimensions, setInitialDimensions] = useState({ width: 0, height: 0 });

  // The final, desired size of our square image container in pixels.
  const finalSize = 220;

  // This effect hook calculates the initial dimensions needed to fill the viewport
  useEffect(() => {
    const handleResize = () => {
      if (window) {
        // Set dimensions based on the current window size
        setInitialDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    handleResize(); // Run once on component mount
    window.addEventListener('resize', handleResize); // Add listener for window resize events

    // Cleanup function to remove the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Create independent transforms for width and height, animating from viewport size to final size
  const width = useTransform(scrollYProgress, [0, 0.9], [initialDimensions.width, finalSize]);
  const height = useTransform(scrollYProgress, [0, 0.9], [initialDimensions.height, finalSize]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], [0, 24]); // Animate border radius

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
    '/images/posts/three-p-s-of-kosovo/hero.jpg',
  ];

  return (
    // This is the scrollable container. Its height determines the animation duration.
    <section ref={targetRef} className="h-[300vh] relative">
      {/* This is the sticky container that stays in view during the scroll */}
      <div className="h-screen sticky top-0 flex items-center justify-center">
        {/* The motion.div acts as a clipping mask. Its width and height are animated. */}
        <motion.div
          style={{ width, height, borderRadius }}
          className="relative bg-gray-200 overflow-hidden"
        >
          {images.map((src, i) => {
            // We create a unique opacity transform for each image.
            const opacity = useTransform(
              scrollYProgress,
              // Map scroll progress ranges to opacity values
              [
                (i / images.length) * 0.75, // Start fading in
                ((i + 1) / images.length) * 0.75, // Fully visible
              ],
              [0, 1] // Opacity values
            );

            return (
              <motion.img
                key={i}
                src={src}
                alt={`scrolling image ${i + 1}`}
                // The image is centered and sized to the viewport.
                // The parent div clips it as it animates.
                style={{
                  opacity,
                  width: '100vw',
                  height: '100vh',
                  objectFit: 'cover',
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                // Add an error handler for placeholder images
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/1920x1080/222/fff?text=Image+${i + 1}`;
                }}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}