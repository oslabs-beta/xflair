'use server';

import { useEffect, useRef, useState, Suspense } from 'react';
import Image from 'next/image';
import { style } from 'd3';
import styles from '../page.module.css';
import { fetchHgif } from '../lib/actions';

export default async function HeatMapGif(props) {
  const data = 'test1';
  const filePath = 'test2';

  const hGifUrl = await fetchHgif(data, filePath);

  return (
    // <div className={styles.embla__slide}>
    <div>
      {/* <img className={styles.otherImg} src={props.hGifURL} alt='heatMapGif' /> */}
      <img className={styles.otherImg} src={hGifUrl} alt='heatMapGif' />
    </div>
  );
}
