'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      <div ref={sliderRef} className="keen-slider rounded overflow-hidden">
        {images.map((src, idx) => (
          <div className="keen-slider__slide" key={idx}>
            <img src={src} alt={`slide-${idx}`} className="w-full h-96 object-cover" />
          </div>
        ))}
      </div>

      {/* 이전/다음 버튼 */}
      <button
        onClick={slideToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={slideToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 인디케이터 (선택) */}
      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              currentSlide === idx ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}