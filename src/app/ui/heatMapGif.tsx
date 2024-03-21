import { useEffect, useRef, useState, Suspense } from 'react';
import Image from 'next/image';
import { style } from 'd3';
import styles from '../page.module.css';

let gifImage: File | undefined;

export default function HeatMapGif(props) {
  // const [gifURL, setGifURL] = useState("");
  // const heatMap = () => {
  //     setGifURL(`File Name: ${gifImage?.name}`)
  // }
  useEffect(() => { console.log(props.hgifURL) }, [props.hgifURL])

  return (
    <div className={styles.embla__slide}>
        <Suspense fallback={<img src='/loadspinner.gif' alt='loading' />}>
        <img className={styles.otherImg} src={props.hGifURL} alt="heatMapGif" />
      </Suspense> 
    </div>
  );
}
