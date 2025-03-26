'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const slideToPrev = () => instanceRef.current?.prev();
  const slideToNext = () => instanceRef.current?.next();

  return (
    <div className="relative">
      {/* 슬라이더 영역 */}
      <div ref={sliderRef} className="keen-slider overflow-hidden rounded">
        {images.map((src, idx) => (
          <div className="keen-slider__slide" key={idx}>
            <Image
              src={src}
              alt={`slide-${idx}`}
              width={800}
              height={384}
              className="h-96 w-full object-cover"
              priority={idx === 0} // 첫 번째 이미지는 빠르게 로딩
            />
          </div>
        ))}
      </div>

      {/* 이전/다음 버튼 */}
      <button
        onClick={slideToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={slideToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* 인디케이터 (선택) */}
      <div className="mt-2 flex justify-center gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full ${currentSlide === idx ? 'bg-black' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
