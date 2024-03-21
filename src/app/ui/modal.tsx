import styles from '../page.module.css';
import { EmblaCarousel } from './carousel';
import { Suspense, lazy } from 'react';


const Heatmap = lazy(() => import('./heatmap'));

export default function Modal(props) {
  

  return (
    <div className={styles.modalcontainer}>
      <h1 className={styles.modaltitle}>Analysis</h1>
      {/* <Suspense fallback={<img src='/loadspinner.gif' alt='loading' />}>
        <Heatmap />
      </Suspense> */}
      <EmblaCarousel/>
      <div className={styles.modalbutton}>
        <button className={styles.primaryBtn} onClick={props.closeViz}>
          Okay
        </button>
      </div>
    </div>
  );
}
