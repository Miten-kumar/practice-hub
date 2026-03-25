import React, { useEffect, useRef, useState } from "react";

type SrcSet = {
  src: string;
  width: number;
};

type Props = {
  alt: string;
  src: string;
  placeholder: string;

  srcSet?: SrcSet[];
  avifSrcSet?: string;
  webpSrcSet?: string;

  sizes?: string;

  width: number;
  height: number;

  className?: string;
};

export const OptimizedImage: React.FC<Props> = ({
  alt,
  src,
  placeholder,
  srcSet,
  avifSrcSet,
  webpSrcSet,
  sizes = "100vw",
  width,
  height,
  className,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // 🔥 Intersection Observer (real lazy loading)
  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // preload before entering
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  // Build srcset
  const buildSrcSet = () => {
    if (!srcSet) return undefined;
    return srcSet.map((img) => `${img.src} ${img.width}w`).join(", ");
  };

  return (
    <picture className={className} style={{ display: "block" }}>
      {/* Only load sources when in view */}
      {inView && avifSrcSet && (
        <source srcSet={avifSrcSet} type="image/avif" sizes={sizes} />
      )}

      {inView && webpSrcSet && (
        <source srcSet={webpSrcSet} type="image/webp" sizes={sizes} />
      )}

      <img
        ref={imgRef}
        src={inView ? src : placeholder}
        srcSet={inView ? buildSrcSet() : undefined}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          width: "100%",
          height: "auto",

          // ✨ blur-up + fade-in combo
          filter: loaded ? "blur(0px)" : "blur(20px)",
          opacity: loaded ? 1 : 0.6,

          transition: "filter 0.4s ease, opacity 0.4s ease",

          backgroundColor: "#eee",
        }}
      />
    </picture>
  );
};