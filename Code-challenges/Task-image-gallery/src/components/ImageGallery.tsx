// import { useState } from "react";
import ImageCard from "./ImageCard";
// import { images } from "../data/images";
import images from "../data/image-gallery-50.json"


const Gallery = () => {

  return (
    <>
      <div
>
        {images.map((img) => (
          <ImageCard
            key={img.id}
            low={img.variants.jpg.large}
            lowSmall ={img.variants.jpg.small}
            lowMedium ={img.variants.jpg.medium}
            lowLarge ={img.variants.jpg.large}
            highSmall ={img.variants.webp.small}
            highMedium ={img.variants.webp.medium}
            highLarge ={img.variants.webp.large}
            fallback={img.variants.jpg.large}          
          />
        ))}
      </div>
    </>
  );
};

export default Gallery;