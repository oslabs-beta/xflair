import { Top5Obj } from '../lib/definitions';
import styles from '../page.module.css';
import { EmblaCarousel } from './carousel';

interface Props {
  closeViz: () => void;
  hGifURL: string;
  fGifURL: string;
  top5: Top5Obj;
  preprocessFilePath: string;
}

export default function Modal(props: Props) {
  return (
    <div className={styles.modalcontainer}>
      <div className={styles.modaltitlecontainer}>
        <div className={styles.test} />
        <h1 className={styles.modaltitle}>Analysis</h1>
        <h1 onClick={props.closeViz} style={{ color: 'white' }}>
          X
        </h1>
      </div>
      <EmblaCarousel
        hGifURL={props.hGifURL}
        fGifURL={props.fGifURL}
        top5={props.top5}
        preprocessFilePath={props.preprocessFilePath}
      />
      <div className={styles.modalbutton}>
        <button className={styles.primaryBtn} onClick={props.closeViz}>
          Okay
        </button>
      </div>
    </div>
  );
}
