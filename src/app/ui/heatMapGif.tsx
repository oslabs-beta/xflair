import {Suspense} from 'react';
import styles from '../page.module.css';
// import { fetchHgif } from '../lib/actions';

export default function HeatMapGif(props) {
  const data = 'test1';
  const filePath = 'test2';

  // const hGifUrl = await fetchHgif(data, filePath);
  const hGifUrl = 'https://res.cloudinary.com/dufc4fu9r/image/multi/f_gif/v1711062935/heatmap_gif.gif'

  return (
    <div className={styles.embla__slide}>
    {/* <div> */}
      {/* <img className={styles.otherImg} src={props.hGifURL} alt='heatMapGif' /> */}
      <Suspense fallback={<img src="/loadspinner.gif" alt="loading" />}>
      <img className={styles.otherImg} src={hGifUrl} alt='heatMapGif' />
      </Suspense>
    </div>
  );
}
