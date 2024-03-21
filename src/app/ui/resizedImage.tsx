import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../page.module.css';

let resizedImage: File | undefined;

export default function ResizedImage(props) {
  useEffect(() => {
    console.log(props.preprocessedFilePath);
  }, [props.preprocessedFilePath]);

  return (
    <div className={styles.embla__slide}>
      <Image
        src={`/${props.preprocessedFilePath}`}
        className={styles.otherImg}
        alt=""
        width={350}
        height={350}
      />
    </div>
  );
}
