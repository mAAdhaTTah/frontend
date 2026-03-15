'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useKeyBindings } from 'rooks';
import {
  FiArrowLeft,
  FiArrowRight,
  FiMaximize2,
  FiMinimize2,
} from 'react-icons/fi';

/**
 * @type {import('react').FC<{
 *   slides: import('react').ReactNode[];
 * }>}
 */
export const Talk = ({ slides }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = Math.min(
    parseInt(searchParams.get('slide') ?? '0', 10),
    slides.length - 1,
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const goTo = useCallback(
    index => router.push(`?slide=${index}`, { scroll: false }),
    [router],
  );
  const goNext = useCallback(
    () => goTo(Math.min(current + 1, slides.length - 1)),
    [current, goTo, slides.length],
  );
  const goPrev = useCallback(
    () => goTo(Math.max(current - 1, 0)),
    [current, goTo],
  );
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
    else document.exitFullscreen();
  }, []);

  useKeyBindings({
    ArrowRight: goNext,
    ' ': goNext, // spacebar (KeyboardEvent.key value for U+0020)
    ArrowLeft: goPrev,
    f: toggleFullscreen,
  });

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden h-screen w-screen bg-black font-montserrat"
    >
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10 text-white">
        <button
          onClick={goPrev}
          disabled={current === 0}
          aria-label="Previous slide"
        >
          <FiArrowLeft />
        </button>
        <span className="text-sm">
          {current + 1} / {slides.length}
        </span>
        <button
          onClick={goNext}
          disabled={current === slides.length - 1}
          aria-label="Next slide"
        >
          <FiArrowRight />
        </button>
        <button onClick={toggleFullscreen} aria-label="Toggle fullscreen">
          {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
        </button>
      </div>
    </div>
  );
};
