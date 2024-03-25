// 'use server';

import { useEffect, useRef, useState, Suspense } from 'react';
import Image from 'next/image';
import { style } from 'd3';
import styles from '../page.module.css';

// const fetchHmap = async (data: string, filePath: string) => {
//   const res = await fetch('http://localhost:3001/api/heatmap', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ data, filePath }),
//     })
//   const resParsed = await res.json();
//   return resParsed.filePath;
// }

// const fetchHgif = async (hFilePath: string) => {
//   const res = await fetch('http://localhost:3001/api/hgif', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ hFilePath }),
//     })
//   const resParsed = await res.json();
//   return resParsed.hGifUrl;
// }

export default function HeatMapGif(props) {
  const data = 'test1';
  const filePath = 'test2';

  // const hFilePath = await fetchHmap(data, filePath);
  // const hGifUrl = await fetchHgif(hFilePath);

  return (
    <div className={styles.embla__slide}>
      <img className={styles.otherImg} src={props.hGifURL} alt='heatMapGif' />
      {/* <img className={styles.otherImg} src={hGifUrl} alt="heatMapGif" /> */}
    </div>
  );
}
