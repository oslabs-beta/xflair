import { Suspense, useEffect, useRef, useState } from 'react';
import styles from '../page.module.css';
import Image from 'next/image';

let gridMapGif: File | undefined;

export default function GridMapGif(props) {
  useEffect(() => {
    console.log(props.fgifURL);
  }, [props.fgifURL]);

  const fGifURL = 'https://res.cloudinary.com/dufc4fu9r/image/multi/f_gif/v1711062953/featuremaps_gif.gif'

  return (
    <div className={styles.embla__slide}>
      <Suspense fallback={<img src="/loadspinner.gif" alt="loading" />}>
        <img className={styles.otherImg} src={fGifURL} alt="gridMapGif" />
      </Suspense>
    </div>
  );
}