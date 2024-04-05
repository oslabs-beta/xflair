import React, { useEffect, useCallback, Suspense, lazy } from 'react';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import styles from '../page.module.css';
import { DotButton, useDotButton } from './dotButton';
import ResizedImage from './resizedImage';
import HeatMapGif from './heatMapGif';
import GridMapGif from './gridMapGif';
import Top5Classes from './top5Classes';
import { Top5Obj } from '../lib/definitions';

interface Props {
  hGifURL: string;
  fGifURL: string;
  top5: Top5Obj;
  preprocessFilePath: string;
}

export function EmblaCarousel(props: Props) {
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
