import styles from '../page.module.css';
import Image from 'next/image';

interface Props {
  hGifURL: string;
}

export default function HeatMapGif(props: Props) {
  return (
    <div className={styles.embla__slide}>
      <Image
        src={props.hGifURL}
        className={styles.otherImg}
        alt='heatMapGif'
        width={350}
        height={350}
      />
    </div>
  );
}
