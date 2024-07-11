// Import some helpful tools from our code library and React library
import { cn } from '@/lib/utils'; // This helps combine class names
import { HTMLAttributes } from 'react'; // This lets us use HTML attributes in our component

// Define what properties our Phone component will have
interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string; // The source URL of the image we want to show on the phone screen
  dark?: boolean; // An optional property to decide if the phone should have dark edges
}

// Create the Phone component
const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    // The outer container of the phone
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden', // These are styles for positioning and interaction
        className // Any extra class names we might add
      )}
      {...props} // Spread any additional properties onto the div
    >
      {/* Decide which phone template image to use based on the 'dark' property */}
      <img
        src={
          dark
            ? '/phone-template-dark-edges.png' // Use the dark edges image if 'dark' is true
            : '/phone-template-white-edges.png' // Use the white edges image if 'dark' is false
        }
        className="pointer-events-none z-50 select-none" // Styles to prevent interactions and control layering
        alt="phone image" // Alternative text for the image
      />

      {/* This is the container for the overlaying image */}
      <div className="absolute -z-10 inset-0">
        <img
          className="object-cover min-w-full min-h-full" // Styles to make the image cover the entire container
          src={imgSrc} // Use the image source passed as a property
          alt="overlaying phone image" // Alternative text for the overlaying image
        />
      </div>
    </div>
  );
};

// Make the Phone component available for other files to use
export default Phone;

// Import React library to use its features
import React from 'react';
