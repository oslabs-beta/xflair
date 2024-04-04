import styles from '../page.module.css';
import Image from 'next/image';

interface Props {
  fGifURL: string;
}

export default function GridMapGif(props: Props) {
  return (
    <div className={styles.embla__slide}>
      <Image
        src={props.fGifURL}
        className={styles.otherImg}
        alt='featMapGif'
        width={350}
        height={350}
      />
    </div>
  );
}