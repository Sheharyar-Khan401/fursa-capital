import React, { useEffect, useState } from 'react';
import { carouselRightArrow, playButton } from '../../helper/images';
import { useScreenDimensions } from '../../hooks/useScreenDimension';

const SlideableContainer = (props) => {
   const { containerVisibile, media } = props
   const [width] = useScreenDimensions()
   const [activeIndex, setActiveIndex] = useState(0);
   const [content, setContent] = useState([
      { type: 'image', src: 'https://uploads.republic.com/p/offerings/card_images/default/000/002/007/2007-1670460146-8f91e7a366bc468aa7d13df7d7770c6461a5d783.jpg', thumbnail: 'https://uploads.republic.com/p/offerings/slider_media_items/contents/default/000/020/834/20834-1702977501-e3b6f3ab6d4dbd62c6f39e0dde6a53a879b56349.png' },
      // { type: 'video', src: 'https://firebasestorage.googleapis.com/v0/b/nadi-d6d8a.appspot.com/o/videos%2Fpexels-tima-miroshnichenko-5377268%20(2160p).mp4?alt=media&token=34246bad-b55d-4990-81b2-a5b00f3f01ba', thumbnail: 'https://via.placeholder.com/150' },
      // { type: 'image', src: 'https://via.placeholder.com/800', thumbnail: 'https://via.placeholder.com/150' },
      { type: 'video', src: 'https://firebasestorage.googleapis.com/v0/b/nadi-d6d8a.appspot.com/o/videos%2Fpexels_videos_2278095%20(1080p).mp4?alt=media&token=a00cde66-77e7-4b1b-865c-2e97c7e97cf9', thumbnail: 'https://via.placeholder.com/250' },
   ]);

   console.log("media --", media)

   useEffect(() => {
      if (media?.length > 0) {
         const updatedContent = media.map(item => {
            let type;
            let thumbnail;
            if (item.name.endsWith('.png') || item.name.endsWith('.jpg')) {
               type = 'image';
               thumbnail = item.url
            } else if (item.name.endsWith('.mp4')) {
               type = 'video';
               thumbnail = "https://via.placeholder.com/250"
            } else {
               type = 'unknown';
               thumbnail = "https://via.placeholder.com/250"
            }

            return {
               type: type,
               src: item.url,
               thumbnail: thumbnail
            };
         });

         setContent(prevContent => updatedContent);
      }
   }, [media])

   const handleItemClick = (index) => {
      setActiveIndex(index);
   };

   const handlePrevious = () => {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? content.length - 1 : prevIndex - 1));
   };

   const handleNext = () => {
      setActiveIndex((prevIndex) => (prevIndex === content.length - 1 ? 0 : prevIndex + 1));
   };

   const renderContent = () => {
      const currentItem = content[activeIndex];
      if (width > 640) {
         if (currentItem.type === 'image') {
            return (
               <div className='w-full'>
                  <img src={currentItem.src} className="w-full h-[25rem] object-cover" alt="Gallery Item" />
               </div>
            )
         } else if (currentItem.type === 'video') {
            return (
               <div className='h-[25rem]'>
                  <video controls className="w-full h-full">
                     <source src={currentItem.src} type="video/mp4" />
                  </video>
               </div>
            );
         }
      } else {
         return (
            <div className="flex flex-nowrap gap-2 overflow-auto">
               {content.map((item, index) => (
                  <div
                     key={index}
                     className={`min-w-[90%] min-h-[12rem] border-gray-400 rounded overflow-hidden ${activeIndex === index ? 'bg-blue-500 text-white' : ''
                        }`}
                     onClick={() => handleItemClick(index)}
                  >
                     {
                        item.type === 'image' ?
                           <div className=''>
                              <img src={item.src} className="object-cover w-full h-[12rem]" alt="Gallery Item" />
                           </div> :
                           <div className='w-full'>
                              <video controls className="w-full h-[12rem] object-cover">
                                 <source src={item.src} type="video/mp4" />
                              </video>
                           </div>
                     }
                  </div>
               ))}
            </div>
         )
      }
   };

   return (
      <div className="relative">
         {renderContent()}
         <div className="flex gap-5 mt-3 mb-4 overflow-auto">
            {width > 640 &&
               content.map((item, index) => (
                  <div
                     key={index}
                     className={`border border-gray-400 rounded overflow-hidden ${activeIndex === index ? 'bg-blue-500 text-white' : ''
                        }`}
                     onClick={() => handleItemClick(index)}
                  >
                     {
                        item.type === 'image' ?
                           <div className='w-[140px]'>
                              <img src={item.src} className="h-[80px] w-full object-cover" alt="Gallery Item" />
                           </div> :
                           <div className='h-[80px] w-[140px] relative drop-shadow-2xl'>
                              <img src={playButton} className='absolute drop-shadow-2xl right-[36%] top-[25%] w-[2.5rem]' />
                              <img src={item.thumbnail} className="h-[80px] w-full object-cover" alt="Gallery Item" />
                           </div>
                     }
                  </div>
               ))}
         </div>
         {width > 640 && <>
            <button onClick={handlePrevious} className="bg-[#ABB2B9] rounded-full drop-shadow-lg absolute top-[43%] transform -translate-y-1/2 left-0 ml-[-20px] focus:outline-none">
               <img
                  src={carouselRightArrow}
                  alt={"arrow-icon"}
                  className="w-[37px] h-[37px] xs:w-[40px] xs:h-[40px] rotate-180"
               />
            </button>
            <button onClick={handleNext} className="bg-[#ABB2B9] rounded-full drop-shadow-lg absolute top-[43%] transform -translate-y-1/2 z-10 right-0 mr-[-20px] focus:outline-none">
               <img
                  src={carouselRightArrow}
                  alt={"arrow-icon"}
                  className="w-[37px] h-[37px] xs:w-[40px] xs:h-[40px]"
               />
            </button>
         </>}
      </div>
   );
};

export default SlideableContainer;
