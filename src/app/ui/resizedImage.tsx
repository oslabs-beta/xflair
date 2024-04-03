import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../page.module.css';

interface Props {
  preprocessedFilePath: string;
}

let resizedImage: File | undefined;

export default function ResizedImage(props: Props) {
  return (
    <div className={styles.embla__slide}>
      <Image
        src={`/${props.preprocessedFilePath}`}
        className={styles.otherImg}
        alt=''
        width={350}
        height={350}
      />
    </div>
  );
}
