import React, { useEffect, useCallback, Suspense, lazy } from 'react';
import Image from 'next/image';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import styles from '../page.module.css';
import { DotButton, useDotButton } from './dotButton';
import ResizedImage from './resizedImage';
import HeatMapGif from './heatMapGif';
import GridMapGif from './gridMapGif';
import Top5Classes from './top5Classes';

// const HeatMapGif = lazy(() => import('./heatMapGif'));

export function EmblaCarousel(props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          <ResizedImage preprocessedFilePath={props.preprocessFilePath} />
          <GridMapGif fGifURL={props.fGifURL} />

          {/* <div className={styles.embla__slide}>
            <Suspense
              fallback={
                <Image
                  src='/loadspinner.gif'
                  alt='loading'
                  height={350}
                  width={350}
                />
              }
            >
            </Suspense>
          </div> */}

          <HeatMapGif hGifURL={props.hGifURL} />
          <Top5Classes top5={props.top5} />
        </div>
      </div>
      <div className={styles.embla__controls}>
        <button className={styles.primaryBtn} onClick={scrollPrev}>
          &lt;
        </button>
        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => {
            const style =
              index === selectedIndex ? 'embla__dot--selected' : 'embla__dot';
            return (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={styles[style]}
              />
            );
          })}
        </div>
        <button className={styles.primaryBtn} onClick={scrollNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}
