// Ensure this file is treated as a client component since it uses hooks
'use client';

// Import necessary modules and components
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import Phone from './Phone';

// Define an array of phone image paths
const PHONES = [
  '/testimonials/1.jpg',
  '/testimonials/2.jpg',
  '/testimonials/3.jpg',
  '/testimonials/4.jpg',
  '/testimonials/5.jpg',
  '/testimonials/6.jpg',
];

// Utility function to split an array into a specified number of parts
// We do this to evenly distribute the phone images into multiple columns
function splitArray<T>(array: Array<T>, numParts: number) {
  // Create an empty array to hold the parts
  const result: Array<Array<T>> = [];

  // Loop through each item in the original array
  for (let i = 0; i < array.length; i++) {
    // Determine which part (sub-array) this item should go into
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    // Add the item to the appropriate part
    result[index].push(array[i]);
  }

  // Return the array of parts
  return result;
}

// Component for a column of reviews
function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  // Calculate the animation duration based on the column height
  const duration = `${columnHeight * msPerPixel}ms`;

  // Use a resize observer to dynamically set the column height
  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      // Update the column height when the column size changes
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    // Start observing the column
    resizeObserver.observe(columnRef.current);

    // Cleanup: stop observing when the component is unmounted
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn('animate-marquee space-y-8 py-4', className)}
      // Set the animation duration as a CSS variable
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {/* Loop through the reviews and display each one twice to create a seamless scrolling effect */}
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  );
}

// Interface for the Review component props
interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

// Component for a single review
function Review({ imgSrc, className, ...props }: ReviewProps) {
  // Define possible animation delays for a staggered effect
  const POSSIBLE_ANIMATION_DELAYS = [
    '0s',
    '0.1s',
    '0.2s',
    '0.3s',
    '0.4s',
    '0.5s',
  ];

  // Randomly pick an animation delay for each review
  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        'animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5',
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      {/* Display the phone image inside the review */}
      <Phone imgSrc={imgSrc} />
    </div>
  );
}

// Component for the grid of reviews
function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Check if the container is in view to trigger animations
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  // Split the phone images into three columns
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  // Further split the third column into two parts for better layout
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView ? (
        <>
          {/* Render the first column of reviews */}
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              cn({
                'md:hidden': reviewIndex >= column1.length + column3[0].length,
                'lg:hidden': reviewIndex >= column1.length,
              })
            }
            msPerPixel={10}
          />
          {/* Render the second column of reviews */}
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          {/* Render the third column of reviews */}
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden md:block"
            msPerPixel={10}
          />
        </>
      ) : null}
      {/* Add gradient overlays at the top and bottom for visual effect */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
}

// Main Reviews component
export function Reviews() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      {/* Decorative image to enhance the look */}
      <img
        aria-hidden="true"
        src="/what-people-are-buying.png"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
     alt='' />
      {/* Render the grid of reviews */}
      <ReviewGrid />
    </MaxWidthWrapper>
  );
}
