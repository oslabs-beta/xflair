import styles from '../page.module.css';
import { EmblaCarousel } from './carousel';
import { Suspense, lazy } from 'react';

const Heatmap = lazy(() => import('./heatmap'));

export default function Modal(props) {
  return (
    <div className={styles.modalcontainer}>
      <div className={styles.modaltitlecontainer}>
        <div className={styles.test}/>
        <h1 className={styles.modaltitle}>Analysis</h1>
        <svg
          onClick={props.closeViz}
          className={styles.modalxicon}
          xmlns='http://www.w3.org/2000/svg'
          width='200'
          height='200'
          viewBox='0 0 24 24'
        ></svg>
      </div>
      {/* <Suspense fallback={<img src='/loadspinner.gif' alt='loading' />}>
        <Heatmap />
      </Suspense> */}
      <EmblaCarousel closeViz={props.closeViz} 
          hGifURL={props.hGifURL}
          fGifURL={props.fGifURL}
          top5={props.top5}
          preprocessFilePath={props.preprocessFilePath}/>
      {/* <div className={styles.modalbutton}>
        <button className={styles.primaryBtn} onClick={props.closeViz}>
          Okay
        </button>
      </div> */}
    </div>
  );
}
