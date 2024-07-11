// read clearly this components
import React from 'react'

const JustForComment = () => {
  return (
    <div>
      
    </div>
  )
}

export default JustForComment


// // 'use client' enables React's experimental features for this component
// 'use client'

// // Importing various components and utilities used in the component
// import HandleComponents from '@/components/HandleComponents' // Custom handle components for resizing
// import { AspectRatio } from '@/components/ui/aspect-ratio' // Component to maintain aspect ratio
// import { ScrollArea } from '@/components/ui/scroll-area' // Component for scrollable areas
// import { cn, formatPrice } from '@/lib/utils' // Utility functions for class names (cn) and price formatting (formatPrice)
// import NextImage from 'next/image' // Next.js Image component for optimized images
// import { Rnd } from 'react-rnd' // Library to make elements resizable and draggable
// import { RadioGroup } from '@headlessui/react' // Headless UI RadioGroup component for creating radio button groups
// import { useRef, useState } from 'react' // React hooks for managing state and references
// import { COLORS, FINISHES, MATERIALS, MODELS } from '@/validators/option-validator' // Constants for configuration options
// import { Label } from '@/components/ui/label' // Custom label component
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu' // Components for dropdown menus
// import { Button } from '@/components/ui/button' // Custom button component
// import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react' // Icon components from Lucide React
// import { BASE_PRICE } from '@/config/products' // Base price constant for product pricing
// import { useUploadThing } from '@/lib/uploadthing' // Custom hook for handling file uploads
// import { useToast } from '@/components/ui/use-toast' // Custom hook for displaying toast notifications
// import { useMutation } from '@tanstack/react-query' // React Query hook for handling mutations (async operations)
// import { saveConfig as _saveConfig, SaveConfigArgs } from './action' // Function and type for saving configuration
// import { useRouter } from 'next/navigation' // Next.js hook for programmatic navigation

// // Interface for the props that the component expects
// interface DesignConfiguratorProps {
//   configId: string // ID of the current configuration
//   imageUrl: string // URL of the image to be used in the configurator
//   imageDimensions: { width: number; height: number } // Dimensions of the image
// }

// // Main component function
// const DesignConfigurator = ({ configId, imageUrl, imageDimensions }: DesignConfiguratorProps) => {
//   const { toast } = useToast() // Custom hook to show toast notifications
//   const router = useRouter() // Next.js hook for navigation

//   // Use React Query's useMutation hook to handle the save configuration process
//   const { mutate: saveConfig, isPending } = useMutation({
//     mutationKey: ['save-config'], // Key for the mutation
//     mutationFn: async (args: SaveConfigArgs) => { // Mutation function that runs the save operation
//       await Promise.all([saveConfiguration(), _saveConfig(args)]) // Run both saveConfiguration and _saveConfig in parallel
//     },
//     onError: () => { // Handler for mutation errors
//       toast({ // Show an error toast
//         title: 'Something went wrong',
//         description: 'There was an error on our end. Please try again.',
//         variant: 'destructive',
//       })
//     },
//     onSuccess: () => { // Handler for successful mutations
//       router.push(`/configure/preview?id=${configId}`) // Navigate to the preview page
//     },
//   })

//   // State for selected options, initialized with default values
//   const [options, setOptions] = useState<{
//     color: (typeof COLORS)[number]
//     model: (typeof MODELS.options)[number]
//     material: (typeof MATERIALS.options)[number]
//     finish: (typeof FINISHES.options)[number]
//   }>({
//     color: COLORS[0],
//     model: MODELS.options[0],
//     material: MATERIALS.options[0],
//     finish: FINISHES.options[0],
//   })

//   // State for dimensions and position of the rendered image
//   const [renderedDimension, setRenderedDimension] = useState({
//     width: imageDimensions.width / 4,
//     height: imageDimensions.height / 4,
//   })
//   const [renderedPosition, setRenderedPosition] = useState({
//     x: 150,
//     y: 205,
//   })

//   // References to DOM elements
//   const phoneCaseRef = useRef<HTMLDivElement>(null) // Reference to the phone case element
//   const containerRef = useRef<HTMLDivElement>(null) // Reference to the container element

//   // Custom hook to handle file uploads
//   const { startUpload } = useUploadThing('imageUploader')

//   // Function to save the current configuration
//   async function saveConfiguration() {
//     try {
//       // Get the bounding rectangle of the phone case element
//       const { left: caseLeft, top: caseTop, width, height } = phoneCaseRef.current!.getBoundingClientRect()

//       // Get the bounding rectangle of the container element
//       const { left: containerLeft, top: containerTop } = containerRef.current!.getBoundingClientRect()

//       // Calculate offsets
//       const leftOffset = caseLeft - containerLeft
//       const topOffset = caseTop - containerTop

//       // Calculate actual position
//       const actualX = renderedPosition.x - leftOffset
//       const actualY = renderedPosition.y - topOffset

//       // Create a canvas element to draw the image
//       const canvas = document.createElement('canvas')
//       canvas.width = width
//       canvas.height = height
//       const ctx = canvas.getContext('2d')

//       // Create an image element and set its source to the provided image URL
//       const userImage = new Image()
//       userImage.crossOrigin = 'anonymous'
//       userImage.src = imageUrl
//       await new Promise((resolve) => (userImage.onload = resolve)) // Wait for the image to load

//       // Draw the image on the canvas at the calculated position and dimensions
//       ctx?.drawImage(userImage, actualX, actualY, renderedDimension.width, renderedDimension.height)

//       // Convert the canvas content to a base64 data URL
//       const base64 = canvas.toDataURL()
//       const base64Data = base64.split(',')[1] // Extract the base64 data

//       // Convert base64 data to a Blob
//       const blob = base64ToBlob(base64Data, 'image/png')
//       const file = new File([blob], 'filename.png', { type: 'image/png' }) // Create a File object from the Blob

//       // Start the file upload
//       await startUpload([file], { configId })
//     } catch (err) {
//       // Show an error toast if something goes wrong
//       toast({
//         title: 'Something went wrong',
//         description: 'There was a problem saving your config, please try again.',
//         variant: 'destructive',
//       })
//     }
//   }

//   // Utility function to convert base64 data to a Blob
//   function base64ToBlob(base64: string, mimeType: string) {
//     const byteCharacters = atob(base64) // Decode base64 string
//     const byteNumbers = new Array(byteCharacters.length) // Create an array to hold the byte values
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i) // Convert each character to its byte value
//     }
//     const byteArray = new Uint8Array(byteNumbers) // Create a Uint8Array from the byte values
//     return new Blob([byteArray], { type: mimeType }) // Create a Blob from the byte array
//   }

//   return (
//     <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
//       <div
//         ref={containerRef}
//         className='relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
//         <div className='relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]'>
//           <AspectRatio
//             ref={phoneCaseRef}
//             ratio={896 / 1831}
//             className='pointer-events-none relative z-50 aspect-[896/1831] w-full'>
//             <NextImage
//               fill
//               alt='phone image'
//               src='/phone-template.png'
//               className='pointer-events-none z-50 select-none'
//             />
//           </AspectRatio>
//           <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
//           <div
//             className={cn(
//               'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
//               `bg-${options.color.tw}`
//             )}
//           />
//         </div>

//         <Rnd
//           default={{
//             x: 150,
//             y: 205,
//             height: imageDimensions.height / 4,
//             width: imageDimensions.width / 4,
//           }}
//           onResizeStop={(_, __, ref, ___, { x, y }) => {
//             setRenderedDimension({
//               width: ref.offsetWidth,
//               height: ref.offsetHeight,
//             })
//             setRenderedPosition({ x, y })
//           }}
//           onDragStop={(_, d) => {
//             setRenderedPosition({ x: d.x, y: d.y })
//           }}
//           lockAspectRatio
//           bounds='parent'
//           enableResizing={{
//             top: false,
//             right: true,
//             bottom: true,
//             left: false,
//             topRight: true,
//             bottomRight: true,
//             bottomLeft: true,
//             topLeft: true,
//           }}
//           resizeHandleComponent={HandleComponents}
//           disableDragging={isPending}
//           className='flex items-center justify-center p-2 relative border-2 border-dashed border-gray-300 bg-white/70 backdrop-blur-[1px] rounded-md cursor-move'>
//           <div className='w-full h-full relative'>
//             <NextImage fill alt='phone image' src={imageUrl} className='select-none' />
//           </div>
//         </Rnd>
//       </div>
//       <div className='px-4 sm:px-0'>
//         <div className='max-w-sm'>
//           <RadioGroup
//             value={options.model}
//             onChange={(value) => setOptions((prev) => ({ ...prev, model: value }))}>
//             <RadioGroup.Label className='block text-sm font-medium leading-6 text-gray-900'>
//               Model
//             </RadioGroup.Label>
//             <div className='mt-2 space-y-2'>
//               {MODELS.options.map((model) => (
//                 <RadioGroup.Option
//                   key={model.name}
//                   value={model}
//                   className={({ active, checked }) =>
//                     cn(
//                       active ? 'ring-2 ring-primary ring-offset-2' : '',
//                       checked
//                         ? 'border-transparent bg-primary text-white hover:bg-primary'
//                         : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
//                       'relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none'
//                     )
//                   }>
//                   {({ checked }) => (
//                     <>
//                       <div className='flex flex-1'>
//                         <div className='flex flex-col'>
//                           <RadioGroup.Label as='span' className='block text-sm font-medium'>
//                             {model.name}
//                           </RadioGroup.Label>
//                         </div>
//                       </div>
//                       <div className='pointer-events-none flex items-center'>
//                         {checked && <Check className='h-5 w-5 text-white' />}
//                       </div>
//                     </>
//                   )}
//                 </RadioGroup.Option>
//               ))}
//             </div>
//           </RadioGroup>
//         </div>
//       </div>
//     </div>
//   )
// }
// // 
// export default DesignConfigurator
// createElement, import { saveConfig } from '@/app/configure/design/action'
// import { color } from 'framer-motion'
// import { type } from 'os'
// import { split } from 'postcss/lib/list'
// import { title } from 'process'
// import { map } from 'zod'
