import React, { useEffect, useCallback } from 'react';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import styles from '../page.module.css';

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

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
          <div className={styles.embla__slide}>Preprocessed Image</div>
          <div className={styles.embla__slide}>Feature Maps</div>
          <div className={styles.embla__slide}>Heatmaps</div>
          <div className={styles.embla__slide}>Output</div>
        </div>
      </div>
      <button className={styles.primaryBtn} onClick={scrollPrev}>
        &lt;
      </button>
      <button className={styles.primaryBtn} onClick={scrollNext}>
        &gt;
      </button>
    </div>
  );
}
