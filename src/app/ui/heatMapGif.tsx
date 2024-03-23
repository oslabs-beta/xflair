'use server';

import { useEffect, useRef, useState, Suspense } from 'react';
import Image from 'next/image';
import { style } from 'd3';
import styles from '../page.module.css';

let gifImage: File | undefined;

export default function HeatMapGif(props) {
  return (
    <div className={styles.embla__slide}>
      <Suspense fallback={<img src='/loadspinner.gif' alt='loading' />}>
        <img className={styles.otherImg} src={props.hGifURL} alt='heatMapGif' />
      </Suspense>
    </div>
  );
}
