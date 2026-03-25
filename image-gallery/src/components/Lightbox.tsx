import React, { useEffect } from "react";

type Props = {
  images: any[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
};

export const Lightbox: React.FC<Props> = ({
  images,
  index,
  setIndex,
  onClose,
}) => {
  const image = images[index];

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index]);

  const next = () => {
    setIndex((prev:number) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Preload next image (pro UX)
  useEffect(() => {
    const nextImg = new Image();
    nextImg.src = images[(index + 1) % images.length].variants.jpg.large;
  }, [index,images]);

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="close">✕</button>

      <button
        className="prev"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
      >
        ‹
      </button>

      <img
        src={image.variants.jpg.large}
        alt={image.alt}
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="next"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
      >
        ›
      </button>
    </div>
  );
};