import { useState } from "react";
// import { useIntersection } from "../hooks/useIntersection";

type Props = {
  low: string;
  lowSmall:string;
  lowMedium: string;
  lowLarge:string;
  highSmall:string;
  highMedium:string;
  highLarge:string;
  fallback: string;
};

const ImageCard: React.FC<Props> = ({ low,lowSmall,lowMedium,lowLarge,highSmall,highMedium,highLarge, fallback }) => {
  // const { ref, visible } = useIntersection();
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      {!loaded && <h1>jpg</h1>}
      <img
        src={low}
        srcSet={`${lowSmall} 200w ,${lowMedium} 400w, ${lowLarge} 100w`}
        sizes="(max-width: 200px), 400px,1000px"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          filter: "blur(10px)",
          opacity: loaded ? 0 : 1,
          transition: "1.3s",
        }}
      />

 
      {/* {visible && ( */}
        <picture>
          <source 
            srcSet={`${highSmall} 200w ,${highMedium} 400w, ${highLarge} 600w`} 
            sizes="(max-width: 200px), 400px,600px"
            type="image/webp" />
          <img
            // ref={ref}
            src={fallback}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </picture>
      {/* )} */}
    </div>
  );
};

export default ImageCard;