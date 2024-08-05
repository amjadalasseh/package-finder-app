/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
    };
  }, [src]);

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      {loading && (
        <div
          role="status" // Add this role to identify the spinner in tests
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f0f0f0',
          }}
        >
          <div className="spinner" />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        style={{
          display: loading ? 'none' : 'block',
          width: '100%',
          height: 'auto',
          borderRadius: '4px',
        }}
      />
    </div>
  );
};

export default LazyImage;
