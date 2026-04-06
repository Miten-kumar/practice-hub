export const ImageGallery = () => {
  const images = Array.from({ length: 100 }, (_, i) => 
    `https://picsum.photos/1200/800?random=${i}`
  );

  return (
    <div>
      <h2>📸 Gallery</h2>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          style={{ width: '100%', marginBottom: '20px' }}
          fetchPriority="high"
        />
      ))}
    </div>
  );
};