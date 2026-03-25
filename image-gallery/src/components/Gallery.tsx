import { useState } from "react";
import { OptimizedImage } from "./OptimizedImage";
import data from "../image-gallery-50.json";
import { Lightbox } from "./Lightbox";

export const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="gallery">
        {data.map((img, index) => (
          <div
            key={img.id}
            className="gallery-item"
            onClick={() => setActiveIndex(index)}
          >
            <OptimizedImage
              alt={img.alt}
              src={img.variants.jpg.large}
              placeholder={img.blur}
              width={img.width}
              height={img.height}
              srcSet={[
                { src: img.variants.jpg.small, width: 300 },
                { src: img.variants.jpg.medium, width: 600 },
                { src: img.variants.jpg.large, width: 1200 },
              ]}
              webpSrcSet={`
                ${img.variants.webp.small} 300w,
                ${img.variants.webp.medium} 600w,
                ${img.variants.webp.large} 1200w
              `}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={data}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          setIndex={setActiveIndex}
        />
      )}
    </>
  );
};