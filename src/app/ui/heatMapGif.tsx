import { image } from 'd3';
import styles from '../page.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Props {
  hGifURL: string;
}

export default function HeatMapGif(props: Props) {
  const [hGifListener, setHGifListener] = useState(false);


  useEffect(() => {
    if(props.hGifURL)setHGifListener(true)
  },[props.hGifURL])

  return (
    <>
      {(!hGifListener &&
        <img src="/loadspinner.gif" alt='loading'/>)}
      {hGifListener && 
        (
        <svg width="40vw" height="40vh" xmlns="http://www.w3.org/2000/svg">
          <image
              href={props.hGifURL}
              width="40vw"
              height="40vh"
              preserveAspectRatio="xMidYMid meet"
          />
        </svg>)}
    </>
  );
}