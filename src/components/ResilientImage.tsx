import { useState } from 'react';
import { Cloud } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FDF4F6] via-[#FAF0F3] to-[#F7DCE4] text-[#725D64] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Cloud className="w-8 h-8 text-[#C85175] mb-2 stroke-[1.5]" />
        <span className="text-xs font-medium tracking-wide text-[#24191D]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#FAF0F3] ${className}`}>
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#FDF4F6] to-[#F7E4EA]"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
