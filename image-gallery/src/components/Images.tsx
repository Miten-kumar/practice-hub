import axios from "axios";
import { useEffect, useState } from "react";

interface Image {
  id: number;
  src: {
    small: string;
    medium: string;
    large: string;
  };
}

export default function Images() {
  const [images, setImages] = useState<Image[]>([]);
  const [loaded, setLoaded] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    axios
      .get("https://api.pexels.com/v1/curated?page=2&per_page=20", {
        headers: {
          Authorization:
            "CGN0jqXtS7l8XXCogzjCV1YbvLv3mWkqQQGrc25j7zb4Se07BRxGF526",
        },
      })
      .then((res) => {
        setImages(res.data.photos);
        console.log(res.data.photos);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="gallery">
      {images.map((image) => (
        <div key={image.id} className="image-container">
          {/* Blur Placeholder */}
          {!loaded[image.id] && (
            <img src={image.src.small} className="blur" alt="" />
          )}

          {/* Actual Image */}
          <img
            src={image.src.large}
            srcSet={`
              ${image.src.small} 480w,
              ${image.src.medium} 800w,
              ${image.src.large} 1200w
            `}
            sizes="(max-width: 600px) 480px, 
                   (max-width: 900px) 800px, 
                   1200px"
            loading="lazy"
            onLoad={() => setLoaded((prev) => ({ ...prev, [image.id]: true }))}
            className={`main ${loaded[image.id] ? "loaded" : ""}`}
            alt="gallery"
            width="400"
            height="300"
          />
        </div>
      ))}
    </div>
  );
}
