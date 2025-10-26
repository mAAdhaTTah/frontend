'use client';
import cc from 'classcat';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import marpBrowser from '@marp-team/marp-core/browser';

const MarpSlide = ({ rendered: { css, html }, page = 1 }) => {
  const element = useRef(null);

  useEffect(() => {
    if (!element.current) return;
    if (!element.current.shadowRoot)
      element.current.attachShadow({ mode: 'open' });

    // Render Marp slide to shadow root (tailwind default styles will break Marp slide CSS)
    const root = element.current.shadowRoot;

    root.innerHTML =
      html[page - 1] +
      `<style>${css}</style><style>:host{all:initial;}:host>[data-marpit-svg]{vertical-align:top;}</style>`;

    return marpBrowser(root);
  }, [css, html, page]);

  return <div ref={element}></div>;
};

export const MarpSlides = ({ rendered: { css, html } }) => {
  const [activePageIdx, setActivePageIdx] = useState(0);
  const swiper = useRef();
  const multiple = html.length > 1;

  const onActiveIndexChange = useCallback(instance => {
    setActivePageIdx(instance.activeIndex);
  }, []);

  const onSwiper = useCallback(
    instance => {
      swiper.current = instance;
      onActiveIndexChange(instance);
    },
    [onActiveIndexChange],
  );

  return (
    <section
      className={cc([
        'relative mx-auto w-full border shadow-lg h-full',
        multiple && 'px-8',
      ])}
    >
      {multiple && (
        <button
          aria-label="Prev"
          className="absolute inset-y-0 z-10 w-8 appearance-none text-4xl outline-none left-0"
          disabled={activePageIdx <= 0}
          onClick={() => swiper.current?.slidePrev()}
          translate="no"
        >
          &laquo;
        </button>
      )}
      <Swiper
        enabled={multiple}
        allowTouchMove={multiple}
        speed={200}
        onActiveIndexChange={onActiveIndexChange}
        onSwiper={onSwiper}
        className="h-full"
      >
        {html.map((h, i) => (
          <SwiperSlide key={h}>
            <div
              inert={activePageIdx !== i}
              className="h-full flex flex-col justify-center"
            >
              <MarpSlide rendered={{ html, css }} page={i + 1} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {multiple && (
        <button
          aria-label="Next"
          className="absolute inset-y-0 z-10 w-8 appearance-none text-4xl outline-none right-0"
          disabled={activePageIdx >= html.length - 1}
          onClick={() => swiper.current?.slideNext()}
          translate="no"
        >
          &raquo;
        </button>
      )}
    </section>
  );
};
